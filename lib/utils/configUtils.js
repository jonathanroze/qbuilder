'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getWidgetForFieldOp = exports.getValueSourcesForFieldOp = exports.getWidgetsForFieldOp = exports.getValueLabel = exports.getFieldWidgetConfig = exports.getOperatorConfig = exports.getFieldPathLabels = exports.getFuncPathLabels = exports.getFieldPath = exports.getFirstOperator = exports.getOperatorsForField = exports.getFirstField = exports.getFieldConfig = exports.getFuncArgConfig = exports.getFuncConfig = exports.getFieldRawConfig = exports.extendConfig = void 0;

var _last = _interopRequireDefault(require("lodash/last"));

var _merge = _interopRequireDefault(require("lodash/merge"));

var _mergeWith = _interopRequireDefault(require("lodash/mergeWith"));

var _default = require("../config/default");

var _moment = _interopRequireDefault(require("moment"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _createForOfIteratorHelper(o) { if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (o = _unsupportedIterableToArray(o))) { var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var it, normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(n); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var extendConfig = function extendConfig(config) {
  //operators, defaultOperator - merge
  //widgetProps (including valueLabel, valuePlaceholder, hideOperator, operatorInlineLabel) - concrete by widget
  config.settings = (0, _merge["default"])({}, _default.settings, config.settings);

  _extendTypesConfig(config.types, config);

  _extendFieldsConfig(config.fields, config);

  _extendFuncArgsConfig(config.funcs, config);

  _moment["default"].locale(config.settings.locale["short"]);

  return config;
};

exports.extendConfig = extendConfig;

function _extendTypesConfig(typesConfig, config) {
  for (var type in typesConfig) {
    var typeConfig = typesConfig[type];

    _extendTypeConfig(type, typeConfig, config);
  }
}

;

function _extendTypeConfig(type, typeConfig, config) {
  var operators = null,
      defaultOperator = null;
  typeConfig.mainWidget = typeConfig.mainWidget || Object.keys(typeConfig.widgets).filter(function (w) {
    return w != 'field';
  })[0];

  for (var widget in typeConfig.widgets) {
    var typeWidgetConfig = typeConfig.widgets[widget];

    if (typeWidgetConfig.operators) {
      if (!operators) operators = [];
      operators = operators.concat(typeWidgetConfig.operators.slice());
    }

    if (typeWidgetConfig.defaultOperator) defaultOperator = typeWidgetConfig.defaultOperator;

    if (widget == typeConfig.mainWidget) {
      typeWidgetConfig = (0, _merge["default"])({}, {
        widgetProps: typeConfig.mainWidgetProps || {}
      }, typeWidgetConfig);
    }

    typeConfig.widgets[widget] = typeWidgetConfig;
  }

  if (!typeConfig.valueSources) typeConfig.valueSources = Object.keys(config.settings.valueSourcesInfo);

  var _iterator = _createForOfIteratorHelper(typeConfig.valueSources),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var valueSrc = _step.value;

      if (valueSrc != 'value' && !typeConfig.widgets[valueSrc]) {
        typeConfig.widgets[valueSrc] = {};
      }
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }

  if (!typeConfig.operators && operators) typeConfig.operators = Array.from(new Set(operators)); //unique

  if (!typeConfig.defaultOperator && defaultOperator) typeConfig.defaultOperator = defaultOperator;
}

;

function _extendFieldsConfig(subconfig, config) {
  config._fieldsCntByType = {};

  for (var field in subconfig) {
    _extendFieldConfig(subconfig[field], config);

    if (subconfig[field].subfields) {
      _extendFieldsConfig(subconfig[field].subfields, config);
    }
  }
}

;

function _extendFuncArgsConfig(subconfig, config) {
  if (!subconfig) return;
  config._funcsCntByType = {};

  for (var funcKey in subconfig) {
    var funcDef = subconfig[funcKey];

    if (funcDef.returnType) {
      if (!config._funcsCntByType[funcDef.returnType]) config._funcsCntByType[funcDef.returnType] = 0;
      config._funcsCntByType[funcDef.returnType]++;
    }

    for (var argKey in funcDef.args) {
      _extendFieldConfig(funcDef.args[argKey], config, true);
    } // isOptional can be only in the end


    if (funcDef.args) {
      var argKeys = Object.keys(funcDef.args);
      var tmpIsOptional = true;

      var _iterator2 = _createForOfIteratorHelper(argKeys.reverse()),
          _step2;

      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var _argKey = _step2.value;
          var argDef = funcDef.args[_argKey];

          if (!tmpIsOptional && argDef.isOptional) {
            delete argDef.isOptional;
          }

          if (!argDef.isOptional) tmpIsOptional = false;
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }
    }

    if (funcDef.subfields) {
      _extendFuncArgsConfig(funcDef.subfields, config);
    }
  }
}

function _extendFieldConfig(fieldConfig, config) {
  var isFuncArg = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  var operators = null,
      defaultOperator = null;
  var typeConfig = config.types[fieldConfig.type];
  var excludeOperators = fieldConfig.excludeOperators || [];

  if (fieldConfig.type != '!struct') {
    if (!isFuncArg) {
      if (!config._fieldsCntByType[fieldConfig.type]) config._fieldsCntByType[fieldConfig.type] = 0;
      config._fieldsCntByType[fieldConfig.type]++;
    }

    if (!fieldConfig.widgets) fieldConfig.widgets = {};
    fieldConfig.mainWidget = fieldConfig.mainWidget || typeConfig.mainWidget;
    fieldConfig.valueSources = fieldConfig.valueSources || typeConfig.valueSources;

    for (var widget in typeConfig.widgets) {
      var fieldWidgetConfig = fieldConfig.widgets[widget] || {};
      var typeWidgetConfig = typeConfig.widgets[widget] || {};

      if (!isFuncArg) {
        var shouldIncludeOperators = fieldConfig.preferWidgets && (widget == 'field' || fieldConfig.preferWidgets.includes(widget)) || excludeOperators.length > 0;

        if (fieldWidgetConfig.operators) {
          if (!operators) operators = [];
          operators = operators.concat(fieldWidgetConfig.operators.filter(function (o) {
            return !excludeOperators.includes(o);
          }));
        } else if (shouldIncludeOperators && typeWidgetConfig.operators) {
          if (!operators) operators = [];
          operators = operators.concat(typeWidgetConfig.operators.filter(function (o) {
            return !excludeOperators.includes(o);
          }));
        }

        if (fieldWidgetConfig.defaultOperator) defaultOperator = fieldWidgetConfig.defaultOperator;
      }

      if (widget == fieldConfig.mainWidget) {
        fieldWidgetConfig = (0, _merge["default"])({}, {
          widgetProps: fieldConfig.mainWidgetProps || {}
        }, fieldWidgetConfig);
      }

      fieldConfig.widgets[widget] = fieldWidgetConfig;
    }

    if (!isFuncArg) {
      if (!fieldConfig.operators && operators) fieldConfig.operators = Array.from(new Set(operators));
      if (!fieldConfig.defaultOperator && defaultOperator) fieldConfig.defaultOperator = defaultOperator;
    }

    var keysToPutInFieldSettings = ['listValues', 'allowCustomValues'];
    if (!fieldConfig.fieldSettings) fieldConfig.fieldSettings = {};

    for (var _i = 0, _keysToPutInFieldSett = keysToPutInFieldSettings; _i < _keysToPutInFieldSett.length; _i++) {
      var k = _keysToPutInFieldSett[_i];

      if (fieldConfig[k]) {
        fieldConfig.fieldSettings[k] = fieldConfig[k];
        delete fieldConfig[k];
      }
    }
  }
}

;

var getFieldRawConfig = function getFieldRawConfig(field, config) {
  var fieldsKey = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'fields';
  var subfieldsKey = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'subfields';
  if (!field || field == ':empty:') return null;
  var fieldSeparator = config.settings.fieldSeparator;
  var parts = Array.isArray(field) ? field : field.split(fieldSeparator);
  var fields = config[fieldsKey];
  var fieldConfig = null;

  for (var i = 0; i < parts.length; i++) {
    var part = parts[i];
    var tmpFieldConfig = fields[part];
    if (!tmpFieldConfig) return null;

    if (i == parts.length - 1) {
      fieldConfig = tmpFieldConfig;
    } else {
      fields = tmpFieldConfig[subfieldsKey];
      if (!fields) return null;
    }
  }

  return fieldConfig;
};

exports.getFieldRawConfig = getFieldRawConfig;

var getFuncConfig = function getFuncConfig(func, config) {
  if (!func) return null;
  var funcConfig = getFieldRawConfig(func, config, 'funcs', 'subfields');
  if (!funcConfig) return null; //throw new Error("Can't find func " + func + ", please check your config");

  return funcConfig;
};

exports.getFuncConfig = getFuncConfig;

var getFuncArgConfig = function getFuncArgConfig(funcKey, argKey, config) {
  var funcConfig = getFuncConfig(funcKey, config);
  if (!funcConfig) return null; //throw new Error(`Can't find func ${funcKey}, please check your config`);

  var argConfig = funcConfig.args && funcConfig.args[argKey] || null;
  if (!argConfig) return null; //throw new Error(`Can't find arg ${argKey} for func ${funcKey}, please check your config`);
  //merge, but don't merge operators (rewrite instead)

  var typeConfig = config.types[argConfig.type] || {};
  var ret = (0, _mergeWith["default"])({}, typeConfig, argConfig || {}, function (objValue, srcValue, _key, _object, _source, _stack) {
    if (Array.isArray(objValue)) {
      return srcValue;
    }
  });
  return ret;
};

exports.getFuncArgConfig = getFuncArgConfig;

var getFieldConfig = function getFieldConfig(field, config) {
  if (!field || field == ':empty:') return null;
  if (_typeof(field) == "object" && !field.func) return field;
  if (_typeof(field) == "object" && field.func && field.arg) return getFuncArgConfig(field.func, field.arg, config);
  var fieldConfig = getFieldRawConfig(field, config);
  if (!fieldConfig) return null; //throw new Error("Can't find field " + field + ", please check your config");
  //merge, but don't merge operators (rewrite instead)

  var typeConfig = config.types[fieldConfig.type] || {};
  var ret = (0, _mergeWith["default"])({}, typeConfig, fieldConfig || {}, function (objValue, srcValue, _key, _object, _source, _stack) {
    if (Array.isArray(objValue)) {
      return srcValue;
    }
  });
  return ret;
};

exports.getFieldConfig = getFieldConfig;

var getFirstField = function getFirstField(config) {
  var fieldSeparator = config.settings.fieldSeparator;
  var firstField = null,
      key = null,
      keysPath = [];

  if (Object.keys(config.fields).length > 0) {
    key = Object.keys(config.fields)[0];
    firstField = config.fields[key];
    keysPath.push(key);

    while (firstField.type == '!struct') {
      var subfields = firstField.subfields;

      if (!subfields || !Object.keys(subfields).length) {
        firstField = key = null;
        break;
      }

      key = Object.keys(subfields)[0];
      keysPath.push(key);
      firstField = subfields[key];
    }
  }

  return keysPath.join(fieldSeparator);
};

exports.getFirstField = getFirstField;

var getOperatorsForField = function getOperatorsForField(config, field) {
  var fieldConfig = getFieldConfig(field, config);
  var fieldOps = fieldConfig ? fieldConfig.operators : [];
  return fieldOps;
};

exports.getOperatorsForField = getOperatorsForField;

var getFirstOperator = function getFirstOperator(config, field) {
  var fieldOps = getOperatorsForField(config, field);
  return fieldOps ? fieldOps[0] : null;
};

exports.getFirstOperator = getFirstOperator;

var getFieldPath = function getFieldPath(field, config) {
  var onlyKeys = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  if (!field || field == ':empty:') return null;
  var fieldSeparator = config.settings.fieldSeparator;
  var parts = Array.isArray(field) ? field : field.split(fieldSeparator);
  if (onlyKeys) return parts;else return parts.map(function (_curr, ind, arr) {
    return arr.slice(0, ind + 1);
  }).map(function (parts) {
    return parts.join(fieldSeparator);
  });
};

exports.getFieldPath = getFieldPath;

var getFuncPathLabels = function getFuncPathLabels(field, config) {
  return getFieldPathLabels(field, config, 'funcs', 'subfields');
};

exports.getFuncPathLabels = getFuncPathLabels;

var getFieldPathLabels = function getFieldPathLabels(field, config) {
  var fieldsKey = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'fields';
  var subfieldsKey = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'subfields';
  if (!field || field == ':empty:') return null;
  var fieldSeparator = config.settings.fieldSeparator;
  var parts = Array.isArray(field) ? field : field.split(fieldSeparator);
  return parts.map(function (_curr, ind, arr) {
    return arr.slice(0, ind + 1);
  }).map(function (parts) {
    return parts.join(fieldSeparator);
  }).map(function (part) {
    var cnf = getFieldRawConfig(part, config, fieldsKey, subfieldsKey);
    return cnf && cnf.label || (0, _last["default"])(part.split(fieldSeparator));
  });
};

exports.getFieldPathLabels = getFieldPathLabels;

var getOperatorConfig = function getOperatorConfig(config, operator) {
  var field = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
  if (!operator) return null;
  var opConfig = config.operators[operator];
  var reversedOperator = opConfig.reversedOp; //const revOpConfig = config.operators[reversedOperator];

  if (field) {
    var fieldConfig = getFieldConfig(field, config);
    var widget = getWidgetForFieldOp(config, field, operator);
    var widgetConfig = config.widgets[widget] || {};
    var fieldWidgetConfig = (fieldConfig && fieldConfig.widgets ? fieldConfig.widgets[widget] : {}) || {};
    var widgetOpProps = (widgetConfig.opProps || {})[operator]; //const widgetRevOpProps = (widgetConfig.opProps || {})[reversedOperator];

    var fieldWidgetOpProps = (fieldWidgetConfig.opProps || {})[operator]; //const fieldWidgetRevOpProps = (fieldWidgetConfig.opProps || {})[reversedOperator];

    var mergedOpConfig = (0, _merge["default"])({}, opConfig, widgetOpProps, fieldWidgetOpProps);
    return mergedOpConfig;
  } else {
    return opConfig;
  }
};

exports.getOperatorConfig = getOperatorConfig;

var getFieldWidgetConfig = function getFieldWidgetConfig(config, field, operator) {
  var widget = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
  var valueSrc = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : null;
  if (!field || !(operator || widget)) return null;
  var fieldConfig = getFieldConfig(field, config);
  if (!widget) widget = getWidgetForFieldOp(config, field, operator, valueSrc);
  var widgetConfig = config.widgets[widget] || {};
  var fieldWidgetConfig = (fieldConfig && fieldConfig.widgets ? fieldConfig.widgets[widget] : {}) || {};
  var fieldWidgetProps = fieldWidgetConfig.widgetProps || {};
  var mergedConfig = (0, _merge["default"])({}, widgetConfig, fieldWidgetProps);
  return mergedConfig;
};

exports.getFieldWidgetConfig = getFieldWidgetConfig;

var getValueLabel = function getValueLabel(config, field, operator, delta) {
  var valueSrc = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : null;
  var isSpecialRange = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : false;
  var isFuncArg = _typeof(field) == "object" && field.arg;
  var showLabels = config.settings.showLabels;
  var fieldConfig = getFieldConfig(field, config);
  var fieldWidgetConfig = getFieldWidgetConfig(config, field, operator, null, valueSrc) || {};
  var mergedOpConfig = getOperatorConfig(config, operator, field) || {};
  var cardinality = isSpecialRange ? 1 : mergedOpConfig.cardinality;
  var ret = null;

  if (cardinality > 1) {
    var valueLabels = fieldWidgetConfig.valueLabels || mergedOpConfig.valueLabels;
    if (valueLabels) ret = valueLabels[delta];

    if (ret && _typeof(ret) != 'object') {
      ret = {
        label: ret,
        placeholder: ret
      };
    }

    if (!ret) {
      ret = {
        label: config.settings.valueLabel + " " + (delta + 1),
        placeholder: config.settings.valuePlaceholder + " " + (delta + 1)
      };
    }
  } else {
    var label = fieldWidgetConfig.valueLabel;
    var placeholder = fieldWidgetConfig.valuePlaceholder;

    if (isFuncArg) {
      if (!label) label = fieldConfig.label || field.arg;
      if (!placeholder && !showLabels) placeholder = fieldConfig.label || field.arg;
    }

    ret = {
      label: label || config.settings.valueLabel,
      placeholder: placeholder || config.settings.valuePlaceholder
    };
  }

  return ret;
};

exports.getValueLabel = getValueLabel;

function _getWidgetsAndSrcsForFieldOp(config, field) {
  var operator = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
  var valueSrc = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
  var widgets = [];
  var valueSrcs = [];
  if (!field) return {
    widgets: widgets,
    valueSrcs: valueSrcs
  };
  var isFuncArg = _typeof(field) == 'object';
  var fieldConfig = getFieldConfig(field, config);
  var opConfig = operator ? config.operators[operator] : null;

  if (fieldConfig && fieldConfig.widgets) {
    var _loop = function _loop(widget) {
      var widgetConfig = fieldConfig.widgets[widget];
      var widgetValueSrc = config.widgets[widget].valueSrc || 'value';
      var canAdd = true;
      if (!widgetConfig.operators) canAdd = canAdd && (valueSrc != 'value' || isFuncArg); //if can't check operators, don't add

      if (widgetConfig.operators && operator) canAdd = canAdd && widgetConfig.operators.indexOf(operator) != -1;
      if (valueSrc && valueSrc != widgetValueSrc) canAdd = false;
      if (opConfig && opConfig.isUnary && widgetValueSrc != 'value') canAdd = false;

      if (canAdd) {
        widgets.push(widget);
        if (fieldConfig.valueSources && fieldConfig.valueSources.indexOf(widgetValueSrc) != -1 && !valueSrcs.find(function (v) {
          return v == widgetValueSrc;
        })) valueSrcs.push(widgetValueSrc);
      }
    };

    for (var widget in fieldConfig.widgets) {
      _loop(widget);
    }
  }

  widgets.sort(function (w1, w2) {
    var w1Main = fieldConfig.preferWidgets ? fieldConfig.preferWidgets.indexOf(w1) != -1 : w1 == fieldConfig.mainWidget;

    var _w2Main = fieldConfig.preferWidgets ? fieldConfig.preferWidgets.indexOf(w2) != -1 : w2 == fieldConfig.mainWidget;

    if (w1 != w2) {
      return w1Main ? -1 : +1;
    }

    return 0;
  });
  return {
    widgets: widgets,
    valueSrcs: valueSrcs
  };
}

;

var getWidgetsForFieldOp = function getWidgetsForFieldOp(config, field, operator) {
  var valueSrc = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;

  var _getWidgetsAndSrcsFor = _getWidgetsAndSrcsForFieldOp(config, field, operator, valueSrc),
      widgets = _getWidgetsAndSrcsFor.widgets;

  return widgets;
};

exports.getWidgetsForFieldOp = getWidgetsForFieldOp;

var getValueSourcesForFieldOp = function getValueSourcesForFieldOp(config, field, operator) {
  var fieldDefinition = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
  var leftFieldForFunc = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : null;

  var _getWidgetsAndSrcsFor2 = _getWidgetsAndSrcsForFieldOp(config, field, operator, null),
      valueSrcs = _getWidgetsAndSrcsFor2.valueSrcs;

  var filteredValueSrcs = valueSrcs.filter(function (vs) {
    if (vs == "field" && fieldDefinition) {
      return config._fieldsCntByType[fieldDefinition.type] > 1;
    }

    if (vs == "func" && fieldDefinition) {
      if (!config._funcsCntByType[fieldDefinition.type]) return false;
      if (fieldDefinition.funcs) return fieldDefinition.funcs.length > 0;
      return true;
    }

    return true;
  });
  return filteredValueSrcs;
};

exports.getValueSourcesForFieldOp = getValueSourcesForFieldOp;

var getWidgetForFieldOp = function getWidgetForFieldOp(config, field, operator) {
  var valueSrc = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;

  var _getWidgetsAndSrcsFor3 = _getWidgetsAndSrcsForFieldOp(config, field, operator, valueSrc),
      widgets = _getWidgetsAndSrcsFor3.widgets;

  var widget = null;
  if (widgets.length) widget = widgets[0];
  return widget;
};

exports.getWidgetForFieldOp = getWidgetForFieldOp;