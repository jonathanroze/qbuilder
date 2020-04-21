"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.moveItem = exports.removeGroup = exports.addGroup = exports.removeRule = exports.addRule = exports.setTree = void 0;

var _uuid = _interopRequireDefault(require("../utils/uuid"));

var _defaultUtils = require("../utils/defaultUtils");

var constants = _interopRequireWildcard(require("../constants"));

var _immutable = _interopRequireDefault(require("immutable"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * @param {object} config
 * @param {Immutable.Map} tree
 */
var setTree = function setTree(config, tree) {
  return {
    type: constants.SET_TREE,
    tree: tree
  };
};
/**
 * @param {object} config
 * @param {Immutable.List} path
 * @param {Immutable.Map} properties
 */


exports.setTree = setTree;

var addRule = function addRule(config, path, properties) {
  return {
    type: constants.ADD_RULE,
    path: path,
    id: (0, _uuid["default"])(),
    properties: (0, _defaultUtils.defaultRuleProperties)(config).merge(properties || {})
  };
};
/**
 * @param {object} config
 * @param {Immutable.List} path
 */


exports.addRule = addRule;

var removeRule = function removeRule(config, path) {
  return {
    type: constants.REMOVE_RULE,
    path: path,
    config: config
  };
};
/**
 * @param {object} config
 * @param {Immutable.List} path
 * @param {Immutable.Map} properties
 */


exports.removeRule = removeRule;

var addGroup = function addGroup(config, path, properties) {
  return {
    type: constants.ADD_NEW_GROUP,
    path: path,
    properties: (0, _defaultUtils.defaultGroupProperties)(config).merge(properties || {}),
    config: config
  };
};
/**
 * @param {object} config
 * @param {Immutable.List} path
 */


exports.addGroup = addGroup;

var removeGroup = function removeGroup(config, path) {
  return {
    type: constants.REMOVE_GROUP,
    path: path,
    config: config
  };
};
/**
 * @param {object} config
 * @param {Array} fromPath
 * @param {Array} toPath
 * @param {String} placement, see constants PLACEMENT_*
 */


exports.removeGroup = removeGroup;

var moveItem = function moveItem(config, fromPath, toPath, placement) {
  return {
    type: constants.MOVE_ITEM,
    fromPath: new _immutable["default"].List(fromPath),
    toPath: new _immutable["default"].List(toPath),
    placement: placement,
    config: config
  };
};

exports.moveItem = moveItem;