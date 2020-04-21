"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.checkTree = exports.loadTree = exports.getTree = exports.getTotalNodesCountInTree = exports.getFlatTree = exports.fixPathsInTree = exports.removePathsInTree = exports.getItemByPath = exports.expandTreeSubpath = exports.expandTreePath = void 0;

var _immutable = _interopRequireWildcard(require("immutable"));

var _validation = require("./validation");

var _configUtils = require("./configUtils");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var transit = require('transit-immutable-js');

/**
 * @param {Immutable.List} path
 * @param {...string} suffix
 * @return {Immutable.List}
 */
var expandTreePath = function expandTreePath(path) {
  for (var _len = arguments.length, suffix = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    suffix[_key - 1] = arguments[_key];
  }

  return path.interpose('children1').withMutations(function (list) {
    list.skip(1);
    list.push.apply(list, suffix);
    return list;
  });
};
/**
 * @param {Immutable.List} path
 * @param {...string} suffix
 * @return {Immutable.List}
 */


exports.expandTreePath = expandTreePath;

var expandTreeSubpath = function expandTreeSubpath(path) {
  for (var _len2 = arguments.length, suffix = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
    suffix[_key2 - 1] = arguments[_key2];
  }

  return path.interpose('children1').withMutations(function (list) {
    list.push.apply(list, suffix);
    return list;
  });
};
/**
 * @param {Immutable.Map} path
 * @param {Immutable.List} path
 * @return {Immutable.Map}
 */


exports.expandTreeSubpath = expandTreeSubpath;

var getItemByPath = function getItemByPath(tree, path) {
  var children = new _immutable["default"].OrderedMap(_defineProperty({}, tree.get('id'), tree));
  var res = tree;
  path.forEach(function (id) {
    res = children.get(id);
    children = res.get('children1');
  });
  return res;
};
/**
 * Remove `path` in every item
 * @param {Immutable.Map} tree
 * @return {Immutable.Map} tree
 */


exports.getItemByPath = getItemByPath;

var removePathsInTree = function removePathsInTree(tree) {
  var newTree = tree;

  function _processNode(item, path) {
    var itemPath = path.push(item.get('id'));

    if (item.get('path')) {
      newTree = newTree.removeIn(expandTreePath(itemPath, 'path'));
    }

    var children = item.get('children1');

    if (children) {
      children.map(function (child, _childId) {
        _processNode(child, itemPath);
      });
    }
  }

  ;

  _processNode(tree, new _immutable["default"].List());

  return newTree;
};
/**
 * Set correct `path` in every item
 * @param {Immutable.Map} tree
 * @return {Immutable.Map} tree
 */


exports.removePathsInTree = removePathsInTree;

var fixPathsInTree = function fixPathsInTree(tree) {
  var newTree = tree;

  function _processNode(item, path, lev) {
    var _id = item.get('id');

    var itemPath = path.push(item.get('id'));
    var currItemPath = item.get('path');

    if (!currItemPath || !currItemPath.equals(itemPath)) {
      newTree = newTree.setIn(expandTreePath(itemPath, 'path'), itemPath);
    }

    var children = item.get('children1');

    if (children) {
      children.map(function (child, _childId) {
        _processNode(child, itemPath, lev + 1);
      });
    }
  }

  ;

  _processNode(tree, new _immutable["default"].List(), 0);

  return newTree;
};
/**
 * @param {Immutable.Map} tree
 * @return {Object} {flat, items}
 */


exports.fixPathsInTree = fixPathsInTree;

var getFlatTree = function getFlatTree(tree) {
  var flat = [];
  var items = {};
  var realHeight = 0;

  function _flatizeTree(item, path, insideCollapsed, lev, info) {
    var type = item.get('type');
    var collapsed = item.get('collapsed');
    var id = item.get('id');
    var children = item.get('children1');
    var childrenIds = children ? children.map(function (_child, childId) {
      return childId;
    }) : null;
    var itemsBefore = flat.length;
    var top = realHeight;
    flat.push(id);
    if (!insideCollapsed) realHeight += 1;
    info.height = (info.height || 0) + 1;

    if (children) {
      var subinfo = {};
      children.map(function (child, _childId) {
        _flatizeTree(child, path.concat(id), insideCollapsed || collapsed, lev + 1, subinfo);
      });

      if (!collapsed) {
        info.height = (info.height || 0) + (subinfo.height || 0);
      }
    }

    var itemsAfter = flat.length;
    var _bottom = realHeight;
    var height = info.height;
    items[id] = {
      type: type,
      parent: path.length ? path[path.length - 1] : null,
      path: path.concat(id),
      lev: lev,
      leaf: !children,
      index: itemsBefore,
      id: id,
      children: childrenIds,
      _top: itemsBefore,
      _height: itemsAfter - itemsBefore,
      top: insideCollapsed ? null : top,
      height: height,
      bottom: (insideCollapsed ? null : top) + height,
      collapsed: collapsed,
      node: item
    };
  }

  _flatizeTree(tree, [], false, 0, {});

  for (var i = 0; i < flat.length; i++) {
    var prevId = i > 0 ? flat[i - 1] : null;
    var nextId = i < flat.length - 1 ? flat[i + 1] : null;
    var item = items[flat[i]];
    item.prev = prevId;
    item.next = nextId;
  }

  return {
    flat: flat,
    items: items
  };
};
/**
 * @param {Immutable.Map} tree
 * @return {Integer}
 */


exports.getFlatTree = getFlatTree;

var getTotalNodesCountInTree = function getTotalNodesCountInTree(tree) {
  if (!tree) return -1;
  var cnt = 0;

  function _processNode(item, path, lev) {
    var id = item.get('id');
    var children = item.get('children1');
    cnt++;

    if (children) {
      children.map(function (child, childId) {
        _processNode(child, path.concat(id), lev + 1);
      });
    }
  }

  ;

  _processNode(tree, [], 0);

  return cnt;
}; //----------


exports.getTotalNodesCountInTree = getTotalNodesCountInTree;

var getTree = function getTree(immutableTree) {
  var light = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  var tree = immutableTree;
  tree = tree.toJS();
  if (light) tree = _lightTree(tree);
  return tree;
};

exports.getTree = getTree;

var loadTree = function loadTree(serTree) {
  if (_immutable.Map.isMap(serTree)) {
    return serTree;
  } else if (_typeof(serTree) == "object") {
    return _fromJS(serTree);
  } else if (typeof serTree == "string" && serTree.startsWith('["~#iM"')) {
    //tip: old versions of RAQB were saving tree with `transit.toJSON()`
    // https://github.com/ukrbublik/react-awesome-query-builder/issues/69
    return transit.fromJSON(serTree);
  } else if (typeof serTree == "string") {
    return _fromJS(JSON.parse(serTree));
  } else throw "Can't load tree!";
};

exports.loadTree = loadTree;

var checkTree = function checkTree(tree, config) {
  var extendedConfig = (0, _configUtils.extendConfig)(config);
  return (0, _validation.validateTree)(tree, null, extendedConfig, extendedConfig, true, true);
};

exports.checkTree = checkTree;

function _fromJS(tree) {
  return (0, _immutable.fromJS)(tree, function (key, value) {
    var outValue;

    if (key == 'value' && value.get(0) && value.get(0).toJS !== undefined) {
      var valueJs = value.get(0).toJS();

      if (valueJs.func) {
        outValue = value.toOrderedMap();
      } else {
        // only for raw values keep JS representation
        outValue = _immutable["default"].List.of(valueJs);
      }
    } else outValue = _immutable["default"].Iterable.isIndexed(value) ? value.toList() : value.toOrderedMap();

    return outValue;
  });
}

; // Remove fields that can be calced: "id", "path"
// Remove empty fields: "operatorOptions"

function _lightTree(tree) {
  var newTree = tree;

  function _processNode(item, itemId) {
    if (item.path) delete item.path;
    if (itemId) delete item.id;
    var properties = item.properties;

    if (properties) {
      if (properties.operatorOptions == null) delete properties.operatorOptions;
    }

    var children = item.children1;

    if (children) {
      for (var id in children) {
        _processNode(children[id], id);
      }
    }
  }

  ;

  _processNode(tree, null);

  return newTree;
}

;