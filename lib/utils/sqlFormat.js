"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sqlFormat = exports.SqlString = void 0;

var _configUtils = require("./configUtils");

var _omit = _interopRequireDefault(require("lodash/omit"));

var _pick = _interopRequireDefault(require("lodash/pick"));

var _stuff = require("./stuff");

var _defaultUtils = require("./defaultUtils");

var _default = require("../config/default");

var _funcUtils = require("./funcUtils");

var _immutable = require("immutable");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(n); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var SqlString = require('sqlstring');

exports.SqlString = SqlString;

SqlString.trim = function (val) {
  if (val.charAt(0) == "'") return val.substring(1, val.length - 1);else return val;
};

SqlString.escapeLike = function (val) {
  // normal escape
  var res = SqlString.escape(val); // unwrap ''

  res = SqlString.trim(res); // escape % and _

  res = res.replace(/[%_]/g, '\\$&'); // wrap with % for LIKE

  res = "%" + res + "%"; // wrap ''

  res = "'" + res + "'";
  return res;
};

var sqlFormatValue = function sqlFormatValue(config, currentValue, valueSrc, valueType, fieldWidgetDefinition, fieldDefinition, operator, operatorDefinition) {
  if (currentValue === undefined) return undefined;
  var fieldSeparator = config.settings.fieldSeparator;
  var ret;

  if (valueSrc == 'field') {
    //format field
    var rightField = currentValue;
    var formattedField = null;

    if (rightField) {
      var rightFieldDefinition = (0, _configUtils.getFieldConfig)(rightField, config) || {};
      var fieldParts = Array.isArray(rightField) ? rightField : rightField.split(fieldSeparator);

      var _fieldKeys = (0, _configUtils.getFieldPath)(rightField, config);

      var fieldPartsLabels = (0, _configUtils.getFieldPathLabels)(rightField, config);
      var fieldFullLabel = fieldPartsLabels ? fieldPartsLabels.join(fieldSeparator) : null;
      var formatField = config.settings.formatField || _default.settings.formatField;
      var rightFieldName = rightField;

      if (rightFieldDefinition.tableName) {
        var fieldPartsCopy = _toConsumableArray(fieldParts);

        fieldPartsCopy[0] = rightFieldDefinition.tableName;
        rightFieldName = fieldPartsCopy.join(fieldSeparator);
      }

      formattedField = formatField(rightFieldName, fieldParts, fieldFullLabel, rightFieldDefinition, config);
    }

    ret = formattedField;
  } else if (valueSrc == 'func') {
    var funcKey = currentValue.get('func');
    var args = currentValue.get('args');
    var funcConfig = (0, _configUtils.getFuncConfig)(funcKey, config);
    var funcName = funcConfig.sqlFunc || funcKey;
    var formattedArgs = {};

    for (var argKey in funcConfig.args) {
      var argConfig = funcConfig.args[argKey];
      var fieldDef = (0, _configUtils.getFieldConfig)(argConfig, config);
      var argVal = args ? args.get(argKey) : undefined;
      var argValue = argVal ? argVal.get('value') : undefined;
      var argValueSrc = argVal ? argVal.get('valueSrc') : undefined;
      var formattedArgVal = sqlFormatValue(config, argValue, argValueSrc, argConfig.type, fieldDef, argConfig, null, null);
      if (formattedArgVal !== undefined) // skip optional in the end
        formattedArgs[argKey] = formattedArgVal;
    }

    if (typeof funcConfig.sqlFormatFunc === 'function') {
      var fn = funcConfig.sqlFormatFunc;
      var _args = [formattedArgs];
      ret = fn.apply(void 0, _args);
    } else {
      ret = "".concat(funcName, "(").concat(Object.entries(formattedArgs).map(function (_ref) {
        var _ref2 = _slicedToArray(_ref, 2),
            k = _ref2[0],
            v = _ref2[1];

        return v;
      }).join(', '), ")");
    }
  } else {
    if (typeof fieldWidgetDefinition.sqlFormatValue === 'function') {
      var _fn = fieldWidgetDefinition.sqlFormatValue;
      var _args2 = [currentValue, (0, _pick["default"])(fieldDefinition, ['fieldSettings', 'listValues']), //useful options: valueFormat for date/time
      (0, _omit["default"])(fieldWidgetDefinition, ['formatValue', 'mongoFormatValue', 'sqlFormatValue'])];

      if (operator) {
        _args2.push(operator);

        _args2.push(operatorDefinition);
      }

      if (valueSrc == 'field') {
        var valFieldDefinition = (0, _configUtils.getFieldConfig)(currentValue, config) || {};

        _args2.push(valFieldDefinition);
      }

      ret = _fn.apply(void 0, _args2);
    } else {
      ret = SqlString.escape(currentValue);
    }
  }

  return ret;
};

var sqlFormat = function sqlFormat(item, config) {
  var type = item.get('type');
  var properties = item.get('properties') || new _immutable.Map();
  var children = item.get('children1');

  if (type === 'group' && children && children.size) {
    var not = properties.get('not');
    var list = children.map(function (currentChild) {
      return sqlFormat(currentChild, config);
    }).filter(function (currentChild) {
      return typeof currentChild !== 'undefined';
    });
    if (!list.size) return undefined;
    var conjunction = properties.get('conjunction');
    if (!conjunction) conjunction = (0, _defaultUtils.defaultConjunction)(config);
    var conjunctionDefinition = config.conjunctions[conjunction];
    return conjunctionDefinition.sqlFormatConj(list, conjunction, not);
  } else if (type === 'rule') {
    var field = properties.get('field');
    var operator = properties.get('operator');
    var operatorOptions = properties.get('operatorOptions');
    if (field == null || operator == null) return undefined;
    var fieldDefinition = (0, _configUtils.getFieldConfig)(field, config) || {};
    var operatorDefinition = (0, _configUtils.getOperatorConfig)(config, operator, field) || {};
    var reversedOp = operatorDefinition.reversedOp;
    var revOperatorDefinition = (0, _configUtils.getOperatorConfig)(config, reversedOp, field) || {};
    var cardinality = (0, _stuff.defaultValue)(operatorDefinition.cardinality, 1);
    var fieldSeparator = config.settings.fieldSeparator; //format value

    var valueSrcs = [];
    var valueTypes = [];
    var hasUndefinedValues = false;
    var value = properties.get('value').map(function (currentValue, ind) {
      var valueSrc = properties.get('valueSrc') ? properties.get('valueSrc').get(ind) : null;
      var valueType = properties.get('valueType') ? properties.get('valueType').get(ind) : null;
      currentValue = (0, _funcUtils.completeValue)(currentValue, valueSrc, config);
      var widget = (0, _configUtils.getWidgetForFieldOp)(config, field, operator, valueSrc);
      var fieldWidgetDefinition = (0, _omit["default"])((0, _configUtils.getFieldWidgetConfig)(config, field, operator, widget, valueSrc), ['factory']);
      var fv = sqlFormatValue(config, currentValue, valueSrc, valueType, fieldWidgetDefinition, fieldDefinition, operator, operatorDefinition);

      if (fv === undefined) {
        hasUndefinedValues = true;
        return undefined;
      }

      valueSrcs.push(valueSrc);
      valueTypes.push(valueType);
      return fv;
    });
    if (hasUndefinedValues || value.size < cardinality) return undefined;
    var formattedValue = cardinality == 1 ? value.first() : value; //find fn to format expr

    var isRev = false;
    var fn = operatorDefinition.sqlFormatOp;

    if (!fn && reversedOp) {
      fn = revOperatorDefinition.sqlFormatOp;

      if (fn) {
        isRev = true;
      }
    }

    if (!fn) {
      var _operator = operatorDefinition.sqlOp || operator;

      if (cardinality == 0) {
        fn = function fn(field, op, values, valueSrc, valueType, opDef, operatorOptions) {
          return "".concat(field, " ").concat(_operator);
        };
      } else if (cardinality == 1) {
        fn = function fn(field, op, value, valueSrc, valueType, opDef, operatorOptions) {
          return "".concat(field, " ").concat(_operator, " ").concat(value);
        };
      } else if (cardinality == 2) {
        // between
        fn = function fn(field, op, values, valueSrc, valueType, opDef, operatorOptions) {
          var valFrom = values.first();
          var valTo = values.get(1);
          return "".concat(field, " ").concat(_operator, " ").concat(valFrom, " AND ").concat(valTo);
        };
      }
    }

    if (!fn) return undefined; //format field

    var fieldName = field;
    var fieldParts = Array.isArray(field) ? field : field.split(fieldSeparator);

    if (fieldDefinition.tableName) {
      var fieldPartsCopy = _toConsumableArray(fieldParts);

      fieldPartsCopy[0] = fieldDefinition.tableName;
      fieldName = fieldPartsCopy.join(fieldSeparator);
    }

    var _fieldKeys = (0, _configUtils.getFieldPath)(field, config);

    var fieldPartsLabels = (0, _configUtils.getFieldPathLabels)(field, config);
    var fieldFullLabel = fieldPartsLabels ? fieldPartsLabels.join(config.settings.fieldSeparator) : null;
    var formatField = config.settings.formatField || _default.settings.formatField;
    var formattedField = formatField(fieldName, fieldParts, fieldFullLabel, fieldDefinition, config); //format expr

    var args = [formattedField, operator, formattedValue, valueSrcs.length > 1 ? valueSrcs : valueSrcs[0], valueTypes.length > 1 ? valueTypes : valueTypes[0], (0, _omit["default"])(operatorDefinition, ['formatOp', 'mongoFormatOp', 'sqlFormatOp']), operatorOptions];
    var ret = fn.apply(void 0, args);

    if (isRev) {
      ret = config.settings.sqlFormatReverse(ret, operator, reversedOp, operatorDefinition, revOperatorDefinition);
    }

    return ret;
  }

  return undefined;
};

exports.sqlFormat = sqlFormat;