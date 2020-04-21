"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.escapeRegExp = exports.shallowEqual = exports.eqArrSet = exports.eqSet = exports.deepEqual = exports.immutableEqual = exports.BUILT_IN_PLACEMENTS = exports.truncateString = exports.calcTextWidth = exports.bindActionCreators = exports.defaultValue = exports.SELECT_WIDTH_OFFSET_RIGHT = void 0;

var _mapValues = _interopRequireDefault(require("lodash/mapValues"));

var _immutable = _interopRequireWildcard(require("immutable"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _createForOfIteratorHelper(o) { if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (o = _unsupportedIterableToArray(o))) { var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var it, normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(n); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var SELECT_WIDTH_OFFSET_RIGHT = 48;
exports.SELECT_WIDTH_OFFSET_RIGHT = SELECT_WIDTH_OFFSET_RIGHT;
var DEFAULT_FONT = '14px'; // RegExp.quote = function (str) {
//     return str.replace(/([.?*+^$[\]\\(){}|-])/g, "\\$1");
// };

var defaultValue = function defaultValue(value, _default) {
  return typeof value === "undefined" ? _default || undefined : value;
};

exports.defaultValue = defaultValue;

var bindActionCreators = function bindActionCreators(actionCreators, config, dispatch) {
  return (0, _mapValues["default"])(actionCreators, function (actionCreator) {
    return function () {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return dispatch(actionCreator.apply(void 0, [config].concat(args)));
    };
  });
};

exports.bindActionCreators = bindActionCreators;

var calcTextWidth = function calcTextWidth(str, font) {
  var f = font || DEFAULT_FONT;
  var div = document.createElement("div");
  div.innerHTML = str;
  var css = {
    'position': 'absolute',
    'float': 'left',
    'white-space': 'nowrap',
    'visibility': 'hidden',
    'font': f
  };

  for (var k in css) {
    div.style[k] = css[k];
  }

  div = document.body.appendChild(div);
  var w = div.offsetWidth;
  document.body.removeChild(div);
  return w;
};

exports.calcTextWidth = calcTextWidth;

var truncateString = function truncateString(str, n, useWordBoundary) {
  if (!n || str.length <= n) {
    return str;
  }

  var subString = str.substr(0, n - 1);
  return (useWordBoundary ? subString.substr(0, subString.lastIndexOf(' ')) : subString) + "...";
};

exports.truncateString = truncateString;
var BUILT_IN_PLACEMENTS = {
  bottomLeft: {
    points: ['tl', 'bl'],
    offset: [0, 4],
    overflow: {
      adjustX: 0,
      adjustY: 1
    }
  },
  bottomRight: {
    points: ['tr', 'br'],
    offset: [0, 4],
    overflow: {
      adjustX: 1,
      adjustY: 1
    }
  },
  topLeft: {
    points: ['bl', 'tl'],
    offset: [0, -4],
    overflow: {
      adjustX: 0,
      adjustY: 1
    }
  },
  topRight: {
    points: ['br', 'tr'],
    offset: [0, -4],
    overflow: {
      adjustX: 1,
      adjustY: 1
    }
  }
};
exports.BUILT_IN_PLACEMENTS = BUILT_IN_PLACEMENTS;

var immutableEqual = function immutableEqual(v1, v2) {
  if (v1 === v2) {
    return true;
  } else {
    return v1.equals(v2);
  }
};

exports.immutableEqual = immutableEqual;

var deepEqual = function deepEqual(v1, v2) {
  if (v1 === v2) {
    return true;
  } else if (_immutable.Map.isMap(v1)) {
    return v1.equals(v2);
  } else {
    return JSON.stringify(v1) == JSON.stringify(v2);
  }
}; //Do sets have same values?


exports.deepEqual = deepEqual;

var eqSet = function eqSet(as, bs) {
  if (as.size !== bs.size) return false;

  var _iterator = _createForOfIteratorHelper(as),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var a = _step.value;
      if (!bs.has(a)) return false;
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }

  return true;
}; //Do arrays have same values?


exports.eqSet = eqSet;

var eqArrSet = function eqArrSet(arr1, arr2) {
  return eqSet(new Set(arr1), new Set(arr2));
};

exports.eqArrSet = eqArrSet;

var shallowEqual = function shallowEqual(a, b) {
  var deep = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

  if (a === b) {
    return true;
  } else if (Array.isArray(a)) return shallowEqualArrays(a, b, deep);else if (_immutable.Map.isMap(a)) return a.equals(b);else if (_typeof(a) == 'object') return shallowEqualObjects(a, b, deep);else return a === b;
};

exports.shallowEqual = shallowEqual;

function shallowEqualArrays(arrA, arrB) {
  var deep = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

  if (arrA === arrB) {
    return true;
  }

  if (!arrA || !arrB) {
    return false;
  }

  var len = arrA.length;

  if (arrB.length !== len) {
    return false;
  }

  for (var i = 0; i < len; i++) {
    var isEqual = deep ? shallowEqual(arrA[i], arrB[i]) : arrA[i] === arrB[i];

    if (!isEqual) {
      return false;
    }
  }

  return true;
}

function shallowEqualObjects(objA, objB) {
  var deep = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

  if (objA === objB) {
    return true;
  }

  if (!objA || !objB) {
    return false;
  }

  var aKeys = Object.keys(objA);
  var bKeys = Object.keys(objB);
  var len = aKeys.length;

  if (bKeys.length !== len) {
    return false;
  }

  for (var i = 0; i < len; i++) {
    var key = aKeys[i];
    var isEqual = deep ? shallowEqual(objA[key], objB[key]) : objA[key] === objB[key];

    if (!isEqual) {
      return false;
    }
  }

  return true;
}

var escapeRegExp = function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\\/]/g, '\\$&'); // $& means the whole matched string
};

exports.escapeRegExp = escapeRegExp;