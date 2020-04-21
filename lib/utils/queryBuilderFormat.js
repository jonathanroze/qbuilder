'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.queryBuilderFormat = void 0;

var _stuff = require("./stuff");

var _configUtils = require("./configUtils");

var _defaultUtils = require("./defaultUtils");

var _funcUtils = require("./funcUtils");

var _immutable = require("immutable");

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(n); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/*
 Build tree to http://querybuilder.js.org/ like format

 Example:
 {
    "condition": "AND",
    "rules": [
        {
            "id": "price",
            "field": "price",
            "type": "double",
            "input": "text",
            "operator": "less",
            "value": "10.25"
        },
        {
            "condition": "OR",
            "rules": [
                {
                    "id": "category",
                    "field": "category",
                    "type": "integer",
                    "input": "select",
                    "operator": "equal",
                    "value": "2"
                },
                {
                    "id": "category",
                    "field": "category",
                    "type": "integer",
                    "input": "select",
                    "operator": "equal",
                    "value": "1"
                }
            ]
        }
    ]
 }
 */
var queryBuilderFormat = function queryBuilderFormat(item, config) {
  var meta = {
    usedFields: []
  };
  return _objectSpread({}, _queryBuilderFormat(item, config, meta), {}, meta);
}; //meta is mutable


exports.queryBuilderFormat = queryBuilderFormat;

var _queryBuilderFormat = function _queryBuilderFormat(item, config, meta) {
  var type = item.get('type');
  var properties = item.get('properties') || new _immutable.Map();
  var children = item.get('children1');
  var id = item.get('id');

  if (type === 'group' && children && children.size) {
    var list = children.map(function (currentChild) {
      return _queryBuilderFormat(currentChild, config, meta);
    }).filter(function (currentChild) {
      return typeof currentChild !== 'undefined';
    });
    if (!list.size) return undefined;
    var conjunction = properties.get('conjunction');
    if (!conjunction) conjunction = (0, _defaultUtils.defaultConjunction)(config);
    var not = properties.get('not');
    var resultQuery = {};
    resultQuery['rules'] = list.toList();
    resultQuery['condition'] = conjunction.toUpperCase();
    resultQuery['not'] = not;
    return resultQuery;
  } else if (type === 'rule') {
    var fieldSeparator = config.settings.fieldSeparator;
    var operator = properties.get('operator');
    var options = properties.get('operatorOptions');
    var field = properties.get('field');
    var value = properties.get('value');
    var valueSrc = properties.get('valueSrc');
    var valueType = properties.get('valueType');
    var hasUndefinedValues = false;
    value.map(function (currentValue, ind) {
      if (currentValue === undefined) {
        hasUndefinedValues = true;
        return undefined;
      }
    });
    if (field == null || operator == null || hasUndefinedValues) return undefined;
    var fieldDefinition = (0, _configUtils.getFieldConfig)(field, config) || {};
    var operatorDefinition = (0, _configUtils.getOperatorConfig)(config, operator, field) || {};
    var fieldType = fieldDefinition.type || "undefined";
    var cardinality = (0, _stuff.defaultValue)(operatorDefinition.cardinality, 1);
    var typeConfig = config.types[fieldDefinition.type] || {}; //format field

    var fieldName = field;

    if (fieldDefinition.tableName) {
      var fieldParts = Array.isArray(field) ? _toConsumableArray(field) : field.split(fieldSeparator);
      fieldParts[0] = fieldDefinition.tableName;
      fieldName = fieldParts.join(fieldSeparator);
    }

    if (value.size < cardinality) return undefined;
    if (meta.usedFields.indexOf(field) == -1) meta.usedFields.push(field);
    value = value.toArray();
    valueSrc = valueSrc.toArray();
    valueType = valueType.toArray();
    var values = [];

    for (var i = 0; i < value.length; i++) {
      var val = {
        type: valueType[i],
        value: value[i]
      };
      values.push(val);

      if (valueSrc[i] == 'field') {
        var secondField = value[i];
        if (meta.usedFields.indexOf(secondField) == -1) meta.usedFields.push(secondField);
      }
    }

    var operatorOptions = options ? options.toJS() : null;
    if (operatorOptions && !Object.keys(operatorOptions).length) operatorOptions = null;
    var ruleQuery = {
      id: id,
      fieldName: fieldName,
      type: fieldType,
      input: typeConfig.mainWidget,
      operator: operator
    };
    if (operatorOptions) ruleQuery.operatorOptions = operatorOptions;
    ruleQuery.values = values;
    return ruleQuery;
  }

  return undefined;
};