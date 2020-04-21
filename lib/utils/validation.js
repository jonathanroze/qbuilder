"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validateTree = void 0;

var _configUtils = require("./configUtils");

var _stuff = require("../utils/stuff");

var _defaultUtils = require("../utils/defaultUtils");

var _tree = require("../stores/tree");

var validateTree = function validateTree(tree, _oldTree, config, oldConfig) {
  var removeEmptyGroups = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
  var removeInvalidRules = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : false;
  var c = {
    config: config,
    oldConfig: oldConfig,
    removeEmptyGroups: removeEmptyGroups,
    removeInvalidRules: removeInvalidRules
  };
  return _validateItem(tree, [], null, {}, c);
};

exports.validateTree = validateTree;

function _validateItem(item, path, itemId, meta, c) {
  var type = item.get('type');
  var children = item.get('children1');

  if (type === 'group' && children && children.size) {
    return _validateGroup(item, path, itemId, meta, c);
  } else if (type === 'rule') {
    return _validateRule(item, path, itemId, meta, c);
  } else {
    return item;
  }
}

;

function _validateGroup(item, path, itemId, meta, c) {
  var removeEmptyGroups = c.removeEmptyGroups;
  var id = item.get('id');
  var children = item.get('children1');
  var oldChildren = children;

  if (!id && itemId) {
    id = itemId;
    item = item.set('id', id);
    meta.sanitized = true;
  } //validate children


  var submeta = {};
  children = children.map(function (currentChild, childId) {
    return _validateItem(currentChild, path.concat(id), childId, submeta, c);
  });
  if (removeEmptyGroups) children = children.filter(function (currentChild) {
    return currentChild != undefined;
  });
  var sanitized = submeta.sanitized || oldChildren.size != children.size;

  if (!children.size && removeEmptyGroups && path.length) {
    sanitized = true;
    item = undefined;
  }

  if (sanitized) meta.sanitized = true;
  if (sanitized && item) item = item.set('children1', children);
  return item;
}

;

function _validateRule(item, path, itemId, meta, c) {
  var removeInvalidRules = c.removeInvalidRules,
      config = c.config,
      oldConfig = c.oldConfig;
  var id = item.get('id');
  var properties = item.get('properties');
  var field = properties.get('field');
  var operator = properties.get('operator');
  var operatorOptions = properties.get('operatorOptions');
  var valueSrc = properties.get('valueSrc');
  var value = properties.get('value');
  var oldSerialized = {
    field: field,
    operator: operator,
    operatorOptions: operatorOptions ? operatorOptions.toJS() : {},
    valueSrc: valueSrc ? valueSrc.toJS() : null,
    value: value ? value.toJS() : null
  };

  var _wasValid = field && operator && value && !value.find(function (v, ind) {
    return v === undefined;
  });

  if (!id && itemId) {
    id = itemId;
    item = item.set('id', id);
    meta.sanitized = true;
  } //validate field


  var fieldDefinition = field ? (0, _configUtils.getFieldConfig)(field, config) : null;
  if (!fieldDefinition) field = null;

  if (field == null) {
    properties = ['operator', 'operatorOptions', 'valueSrc', 'value'].reduce(function (map, key) {
      return map["delete"](key);
    }, properties);
    operator = null;
  } //validate operator


  operator = properties.get('operator');
  var operatorDefinition = operator ? (0, _configUtils.getOperatorConfig)(config, operator, field) : null;
  if (!operatorDefinition) operator = null;
  var availOps = field ? (0, _configUtils.getOperatorsForField)(config, field) : [];
  if (availOps.indexOf(operator) == -1) operator = null;

  if (operator == null) {
    properties = properties["delete"]('operatorOptions');
    properties = properties["delete"]('valueSrc');
    properties = properties["delete"]('value');
  } //validate operator options


  operatorOptions = properties.get('operatorOptions');

  var _operatorCardinality = operator ? (0, _stuff.defaultValue)(operatorDefinition.cardinality, 1) : null;

  if (!operator || operatorOptions && !operatorDefinition.options) {
    operatorOptions = null;
    properties = properties["delete"]('operatorOptions');
  } else if (operator && !operatorOptions && operatorDefinition.options) {
    operatorOptions = (0, _defaultUtils.defaultOperatorOptions)(config, operator, field);
    properties = properties.set('operatorOptions', operatorOptions);
  } //validate values


  valueSrc = properties.get('valueSrc');
  value = properties.get('value');

  var _getNewValueForFieldO = (0, _tree.getNewValueForFieldOp)(config, oldConfig, properties, field, operator, null, true),
      newValue = _getNewValueForFieldO.newValue,
      newValueSrc = _getNewValueForFieldO.newValueSrc;

  value = newValue;
  valueSrc = newValueSrc;
  properties = properties.set('value', value);
  properties = properties.set('valueSrc', valueSrc);
  var newSerialized = {
    field: field,
    operator: operator,
    operatorOptions: operatorOptions ? operatorOptions.toJS() : {},
    valueSrc: valueSrc ? valueSrc.toJS() : null,
    value: value ? value.toJS() : null
  };
  var sanitized = !(0, _stuff.deepEqual)(oldSerialized, newSerialized);
  var isValid = field && operator && value && !value.find(function (v, _ind) {
    return v === undefined;
  });
  if (sanitized) meta.sanitized = true;
  if (sanitized && !isValid && removeInvalidRules) item = undefined;
  if (sanitized && item) item = item.set('properties', properties);
  return item;
}

;