'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mongodbFormat = void 0;

var _stuff = require("./stuff");

var _configUtils = require("./configUtils");

var _defaultUtils = require("./defaultUtils");

var _funcUtils = require("./funcUtils");

var _omit = _interopRequireDefault(require("lodash/omit"));

var _pick = _interopRequireDefault(require("lodash/pick"));

var _immutable = require("immutable");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(n); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var mongoFormatValue = function mongoFormatValue(config, currentValue, valueSrc, valueType, fieldWidgetDefinition, fieldDefinition, operator, operatorDefinition) {
  if (currentValue === undefined) return [undefined, false];
  var fieldSeparator = config.settings.fieldSeparator;
  var ret;
  var useExpr = false;

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
      var formatField = config.settings.formatField || defaultSettings.formatField;
      var rightFieldName = rightField; // if (rightFieldDefinition.tableName) {
      //     const fieldPartsCopy = [...fieldParts];
      //     fieldPartsCopy[0] = rightFieldDefinition.tableName;
      //     rightFieldName = fieldPartsCopy.join(fieldSeparator);
      // }

      formattedField = formatField(rightFieldName, fieldParts, fieldFullLabel, rightFieldDefinition, config, false);
    }

    ret = "$" + formattedField;
    useExpr = true;
  } else if (valueSrc == 'func') {
    useExpr = true;
    var funcKey = currentValue.get('func');
    var args = currentValue.get('args');
    var funcConfig = (0, _configUtils.getFuncConfig)(funcKey, config);
    var funcName = funcConfig.mongoFunc || funcKey;
    var mongoArgsAsObject = funcConfig.mongoArgsAsObject;
    var formattedArgs = {};
    var argsCnt = 0;
    var lastArg = undefined;

    for (var argKey in funcConfig.args) {
      var argConfig = funcConfig.args[argKey];
      var fieldDef = (0, _configUtils.getFieldConfig)(argConfig, config);
      var argVal = args ? args.get(argKey) : undefined;
      var argValue = argVal ? argVal.get('value') : undefined;
      var argValueSrc = argVal ? argVal.get('valueSrc') : undefined;

      var _mongoFormatValue = mongoFormatValue(config, argValue, argValueSrc, argConfig.type, fieldDef, argConfig, null, null),
          _mongoFormatValue2 = _slicedToArray(_mongoFormatValue, 2),
          formattedArgVal = _mongoFormatValue2[0],
          _argUseExpr = _mongoFormatValue2[1];

      if (argValue != undefined && formattedArgVal === undefined) return [undefined, false];
      argsCnt++;

      if (formattedArgVal !== undefined) {
        // skip optional in the end
        formattedArgs[argKey] = formattedArgVal;
        lastArg = formattedArgVal;
      }
    }

    if (typeof funcConfig.mongoFormatFunc === 'function') {
      var fn = funcConfig.mongoFormatFunc;
      var _args = [formattedArgs];
      ret = fn.apply(void 0, _args);
    } else {
      if (mongoArgsAsObject) ret = _defineProperty({}, funcName, formattedArgs);else if (argsCnt == 1 && lastArg !== undefined) ret = _defineProperty({}, funcName, lastArg);else ret = _defineProperty({}, funcName, Object.values(formattedArgs));
    }
  } else {
    if (typeof fieldWidgetDefinition.mongoFormatValue === 'function') {
      var _fn = fieldWidgetDefinition.mongoFormatValue;
      var _args2 = [currentValue, (0, _pick["default"])(fieldDefinition, ['fieldSettings', 'listValues']), //useful options: valueFormat for date/time
      (0, _omit["default"])(fieldWidgetDefinition, ['formatValue', 'mongoFormatValue', 'sqlFormatValue'])];

      if (operator) {
        _args2.push(operator);

        _args2.push(operatorDefinition);
      }

      ret = _fn.apply(void 0, _args2);
    } else {
      ret = currentValue;
    }
  }

  return [ret, useExpr];
};

var mongodbFormat = function mongodbFormat(item, config) {
  var _not = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

  var type = item.get('type');
  var properties = item.get('properties') || new _immutable.Map();
  var children = item.get('children1');

  if (type === 'group' && children && children.size) {
    var not = _not ? !properties.get('not') : properties.get('not');
    var list = children.map(function (currentChild) {
      return mongodbFormat(currentChild, config, not);
    }).filter(function (currentChild) {
      return typeof currentChild !== 'undefined';
    });
    if (!list.size) return undefined;
    var conjunction = properties.get('conjunction');
    if (!conjunction) conjunction = (0, _defaultUtils.defaultConjunction)(config);
    var conjunctionDefinition = config.conjunctions[conjunction];
    var reversedConj = conjunctionDefinition.reversedConj;

    if (not && reversedConj) {
      conjunction = reversedConj;
      conjunctionDefinition = config.conjunctions[conjunction];
    }

    var mongoConj = conjunctionDefinition.mongoConj;
    var resultQuery = {};
    if (list.size == 1) resultQuery = list.first();else resultQuery[mongoConj] = list.toList().toJS();
    return resultQuery;
  } else if (type === 'rule') {
    var fieldSeparator = config.settings.fieldSeparator;
    var operator = properties.get('operator');
    var operatorOptions = properties.get('operatorOptions');
    var field = properties.get('field');
    var value = properties.get('value');
    if (field == null || operator == null) return undefined;
    var fieldDefinition = (0, _configUtils.getFieldConfig)(field, config) || {};
    var operatorDefinition = (0, _configUtils.getOperatorConfig)(config, operator, field) || {};
    var reversedOp = operatorDefinition.reversedOp;
    var revOperatorDefinition = (0, _configUtils.getOperatorConfig)(config, reversedOp, field) || {};
    var cardinality = (0, _stuff.defaultValue)(operatorDefinition.cardinality, 1);

    if (_not) {
      var _ref = [reversedOp, operator];
      operator = _ref[0];
      reversedOp = _ref[1];
      var _ref2 = [revOperatorDefinition, operatorDefinition];
      operatorDefinition = _ref2[0];
      revOperatorDefinition = _ref2[1];
    } //format field


    var fieldName = field; // if (fieldDefinition.tableName) {
    //   let fieldParts = Array.isArray(field) ? [...field] : field.split(fieldSeparator);
    //   fieldParts[0] = fieldDefinition.tableName;
    //   fieldName = fieldParts.join(fieldSeparator);
    // }
    //format value

    var valueSrcs = [];
    var valueTypes = [];
    var hasUndefinedValues = false;
    var useExpr = false;
    value = value.map(function (currentValue, ind) {
      var valueSrc = properties.get('valueSrc') ? properties.get('valueSrc').get(ind) : null;
      var valueType = properties.get('valueType') ? properties.get('valueType').get(ind) : null;
      currentValue = (0, _funcUtils.completeValue)(currentValue, valueSrc, config);
      var widget = (0, _configUtils.getWidgetForFieldOp)(config, field, operator, valueSrc);
      var fieldWidgetDefinition = (0, _omit["default"])((0, _configUtils.getFieldWidgetConfig)(config, field, operator, widget, valueSrc), ['factory']);

      var _mongoFormatValue3 = mongoFormatValue(config, currentValue, valueSrc, valueType, fieldWidgetDefinition, fieldDefinition, operator, operatorDefinition),
          _mongoFormatValue4 = _slicedToArray(_mongoFormatValue3, 2),
          fv = _mongoFormatValue4[0],
          _useExpr = _mongoFormatValue4[1];

      if (fv === undefined) {
        hasUndefinedValues = true;
        return undefined;
      }

      useExpr = useExpr || _useExpr;
      valueSrcs.push(valueSrc);
      valueTypes.push(valueType);
      return fv;
    });
    if (value.size < cardinality || hasUndefinedValues) return undefined;
    var formattedValue = cardinality > 1 ? value.toArray() : cardinality == 1 ? value.first() : null; //build rule

    var fn = operatorDefinition.mongoFormatOp;
    if (!fn) return undefined;
    var args = [fieldName, operator, formattedValue, useExpr, valueSrcs.length > 1 ? valueSrcs : valueSrcs[0], valueTypes.length > 1 ? valueTypes : valueTypes[0], (0, _omit["default"])(operatorDefinition, ['formatOp', 'mongoFormatOp', 'sqlFormatOp']), operatorOptions];
    var ruleQuery = fn.apply(void 0, args);

    if (ruleQuery && useExpr) {
      ruleQuery = {
        '$expr': ruleQuery
      };
    }

    return ruleQuery;
  }

  return undefined;
};

exports.mongodbFormat = mongodbFormat;