"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setOperatorOption = exports.setValueSrc = exports.setValue = exports.setOperator = exports.setField = void 0;

var constants = _interopRequireWildcard(require("../constants"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/**
 * @param {object} config
 * @param {Immutable.List} path
 * @param {string} field
 */
var setField = function setField(config, path, field) {
  return {
    type: constants.SET_FIELD,
    path: path,
    field: field,
    config: config
  };
};
/**
 * @param {object} config
 * @param {Immutable.List} path
 * @param {string} operator
 */


exports.setField = setField;

var setOperator = function setOperator(config, path, operator) {
  return {
    type: constants.SET_OPERATOR,
    path: path,
    operator: operator,
    config: config
  };
};
/**
 * @param {object} config
 * @param {Immutable.List} path
 * @param {integer} delta
 * @param {*} value
 * @param {string} valueType
 * @param {boolean} __isInternal
 */


exports.setOperator = setOperator;

var setValue = function setValue(config, path, delta, value, valueType, __isInternal) {
  return {
    type: constants.SET_VALUE,
    path: path,
    delta: delta,
    value: value,
    valueType: valueType,
    config: config,
    __isInternal: __isInternal
  };
};
/**
 * @param {object} config
 * @param {Immutable.List} path
 * @param {integer} delta
 * @param {*} srcKey
 */


exports.setValue = setValue;

var setValueSrc = function setValueSrc(config, path, delta, srcKey) {
  return {
    type: constants.SET_VALUE_SRC,
    path: path,
    delta: delta,
    srcKey: srcKey,
    config: config
  };
};
/**
 * @param {object} config
 * @param {Immutable.List} path
 * @param {string} name
 * @param {*} value
 */


exports.setValueSrc = setValueSrc;

var setOperatorOption = function setOperatorOption(config, path, name, value) {
  return {
    type: constants.SET_OPERATOR_OPTION,
    path: path,
    name: name,
    value: value,
    config: config
  };
};

exports.setOperatorOption = setOperatorOption;