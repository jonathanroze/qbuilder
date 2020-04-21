"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.getNewValueForFieldOp = void 0;

var _immutable = _interopRequireDefault(require("immutable"));

var _treeUtils = require("../utils/treeUtils");

var _defaultUtils = require("../utils/defaultUtils");

var constants = _interopRequireWildcard(require("../constants"));

var _uuid = _interopRequireDefault(require("../utils/uuid"));

var _omit = _interopRequireDefault(require("lodash/omit"));

var _configUtils = require("../utils/configUtils");

var _stuff = require("../utils/stuff");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _createForOfIteratorHelper(o) { if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (o = _unsupportedIterableToArray(o))) { var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var it, normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(n); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var hasChildren = function hasChildren(tree, path) {
  return tree.getIn((0, _treeUtils.expandTreePath)(path, 'children1')).size > 0;
};
/**
 * @param {object} config
 * @param {Immutable.List} path
 * @param {Immutable.Map} properties
 */


var addNewGroup = function addNewGroup(state, path, properties, config) {
  var groupUuid = (0, _uuid["default"])();
  state = addItem(state, path, 'group', groupUuid, (0, _defaultUtils.defaultGroupProperties)(config).merge(properties || {}));
  var groupPath = path.push(groupUuid); // If we don't set the empty map, then the following merge of addItem will create a Map rather than an OrderedMap for some reason

  state = state.setIn((0, _treeUtils.expandTreePath)(groupPath, 'children1'), new _immutable["default"].OrderedMap());
  state = addItem(state, groupPath, 'rule', (0, _uuid["default"])(), (0, _defaultUtils.defaultRuleProperties)(config));
  state = (0, _treeUtils.fixPathsInTree)(state);
  return state;
};
/**
 * @param {object} config
 * @param {Immutable.List} path
 * @param {Immutable.Map} properties
 */


var removeGroup = function removeGroup(state, path, config) {
  state = removeItem(state, path);
  var parentPath = path.slice(0, -1);
  var isEmptyGroup = !hasChildren(state, parentPath);
  var isEmptyRoot = isEmptyGroup && parentPath.size == 1;
  var canLeaveEmpty = isEmptyGroup && config.settings.canLeaveEmptyGroup && !isEmptyRoot;

  if (isEmptyGroup && !canLeaveEmpty) {
    state = addItem(state, parentPath, 'rule', (0, _uuid["default"])(), (0, _defaultUtils.defaultRuleProperties)(config));
  }

  state = (0, _treeUtils.fixPathsInTree)(state);
  return state;
};
/**
 * @param {object} config
 * @param {Immutable.List} path
 */


var removeRule = function removeRule(state, path, config) {
  state = removeItem(state, path);
  var parentPath = path.slice(0, -1);
  var isEmptyGroup = !hasChildren(state, parentPath);
  var isEmptyRoot = isEmptyGroup && parentPath.size == 1;
  var canLeaveEmpty = isEmptyGroup && config.settings.canLeaveEmptyGroup && !isEmptyRoot;

  if (isEmptyGroup && !canLeaveEmpty) {
    state = addItem(state, parentPath, 'rule', (0, _uuid["default"])(), (0, _defaultUtils.defaultRuleProperties)(config));
  }

  state = (0, _treeUtils.fixPathsInTree)(state);
  return state;
};
/**
 * @param {Immutable.Map} state
 * @param {Immutable.List} path
 * @param {bool} not
 */


var setNot = function setNot(state, path, not) {
  return state.setIn((0, _treeUtils.expandTreePath)(path, 'properties', 'not'), not);
};
/**
 * @param {Immutable.Map} state
 * @param {Immutable.List} path
 * @param {string} conjunction
 */


var setConjunction = function setConjunction(state, path, conjunction) {
  return state.setIn((0, _treeUtils.expandTreePath)(path, 'properties', 'conjunction'), conjunction);
};
/**
 * @param {Immutable.Map} state
 * @param {Immutable.List} path
 * @param {string} type
 * @param {string} id
 * @param {Immutable.OrderedMap} properties
 */


var addItem = function addItem(state, path, type, id, properties) {
  state = state.mergeIn((0, _treeUtils.expandTreePath)(path, 'children1'), new _immutable["default"].OrderedMap(_defineProperty({}, id, new _immutable["default"].Map({
    type: type,
    id: id,
    properties: properties
  }))));
  state = (0, _treeUtils.fixPathsInTree)(state);
  return state;
};
/**
 * @param {Immutable.Map} state
 * @param {Immutable.List} path
 */


var removeItem = function removeItem(state, path) {
  state = state.deleteIn((0, _treeUtils.expandTreePath)(path));
  state = (0, _treeUtils.fixPathsInTree)(state);
  return state;
};
/**
 * @param {Immutable.Map} state
 * @param {Immutable.List} fromPath
 * @param {Immutable.List} toPath
 * @param {string} placement, see constants PLACEMENT_*: PLACEMENT_AFTER, PLACEMENT_BEFORE, PLACEMENT_APPEND, PLACEMENT_PREPEND
 * @param {object} config
 */


var moveItem = function moveItem(state, fromPath, toPath, placement, config) {
  var from = (0, _treeUtils.getItemByPath)(state, fromPath);
  var sourcePath = fromPath.pop();
  var source = fromPath.size > 1 ? (0, _treeUtils.getItemByPath)(state, sourcePath) : null;
  var sourceChildren = source ? source.get('children1') : null;
  var to = (0, _treeUtils.getItemByPath)(state, toPath);
  var targetPath = placement == constants.PLACEMENT_APPEND || placement == constants.PLACEMENT_PREPEND ? toPath : toPath.pop();
  var target = placement == constants.PLACEMENT_APPEND || placement == constants.PLACEMENT_PREPEND ? to : toPath.size > 1 ? (0, _treeUtils.getItemByPath)(state, targetPath) : null;
  var targetChildren = target ? target.get('children1') : null;
  if (!source || !target) return state;
  var isSameParent = source.get('id') == target.get('id');
  var isSourceInsideTarget = targetPath.size < sourcePath.size && (0, _stuff.deepEqual)(targetPath.toArray(), sourcePath.toArray().slice(0, targetPath.size));
  var isTargetInsideSource = targetPath.size > sourcePath.size && (0, _stuff.deepEqual)(sourcePath.toArray(), targetPath.toArray().slice(0, sourcePath.size));
  var sourceSubpathFromTarget = null;
  var targetSubpathFromSource = null;

  if (isSourceInsideTarget) {
    sourceSubpathFromTarget = _immutable["default"].List(sourcePath.toArray().slice(targetPath.size));
  } else if (isTargetInsideSource) {
    targetSubpathFromSource = _immutable["default"].List(targetPath.toArray().slice(sourcePath.size));
  }

  var newTargetChildren = targetChildren,
      newSourceChildren = sourceChildren;
  if (!isTargetInsideSource) newSourceChildren = newSourceChildren["delete"](from.get('id'));

  if (isSameParent) {
    newTargetChildren = newSourceChildren;
  } else if (isSourceInsideTarget) {
    newTargetChildren = newTargetChildren.updateIn((0, _treeUtils.expandTreeSubpath)(sourceSubpathFromTarget, 'children1'), function (_oldChildren) {
      return newSourceChildren;
    });
  }

  if (placement == constants.PLACEMENT_BEFORE || placement == constants.PLACEMENT_AFTER) {
    newTargetChildren = _immutable["default"].OrderedMap().withMutations(function (r) {
      var _iterator = _createForOfIteratorHelper(newTargetChildren.entries()),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var _step$value = _slicedToArray(_step.value, 2),
              itemId = _step$value[0],
              item = _step$value[1];

          if (itemId == to.get('id') && placement == constants.PLACEMENT_BEFORE) {
            r.set(from.get('id'), from);
          }

          r.set(itemId, item);

          if (itemId == to.get('id') && placement == constants.PLACEMENT_AFTER) {
            r.set(from.get('id'), from);
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    });
  } else if (placement == constants.PLACEMENT_APPEND) {
    newTargetChildren = newTargetChildren.merge(_defineProperty({}, from.get('id'), from));
  } else if (placement == constants.PLACEMENT_PREPEND) {
    newTargetChildren = _immutable["default"].OrderedMap(_defineProperty({}, from.get('id'), from)).merge(newTargetChildren);
  }

  if (isTargetInsideSource) {
    newSourceChildren = newSourceChildren.updateIn((0, _treeUtils.expandTreeSubpath)(targetSubpathFromSource, 'children1'), function (_oldChildren) {
      return newTargetChildren;
    });
    newSourceChildren = newSourceChildren["delete"](from.get('id'));
  }

  if (!isSameParent && !isSourceInsideTarget) state = state.updateIn((0, _treeUtils.expandTreePath)(sourcePath, 'children1'), function (_oldChildren) {
    return newSourceChildren;
  });
  if (!isTargetInsideSource) state = state.updateIn((0, _treeUtils.expandTreePath)(targetPath, 'children1'), function (_oldChildren) {
    return newTargetChildren;
  });
  state = (0, _treeUtils.fixPathsInTree)(state);
  return state;
};
/**
 * @param {object} config
 * @param {object} oldConfig
 * @param {Immutable.Map} current
 * @param {string} newField
 * @param {string} newOperator
 * @param {string} changedField
 * @return {object} - {canReuseValue, newValue, newValueSrc, newValueType}
 */


var getNewValueForFieldOp = function getNewValueForFieldOp(config) {
  var oldConfig = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  var current = arguments.length > 2 ? arguments[2] : undefined;
  var newField = arguments.length > 3 ? arguments[3] : undefined;
  var newOperator = arguments.length > 4 ? arguments[4] : undefined;
  var changedField = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : null;
  var canFix = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : true;
  if (!oldConfig) oldConfig = config;
  var currentField = current.get('field');
  var currentOperator = current.get('operator');
  var currentValue = current.get('value');
  var currentValueSrc = current.get('valueSrc', new _immutable["default"].List());
  var currentValueType = current.get('valueType', new _immutable["default"].List());

  var _currentOperatorConfig = (0, _configUtils.getOperatorConfig)(oldConfig, currentOperator, currentField);

  var newOperatorConfig = (0, _configUtils.getOperatorConfig)(config, newOperator, newField);
  var operatorCardinality = newOperator ? (0, _stuff.defaultValue)(newOperatorConfig.cardinality, 1) : null;
  var currentFieldConfig = (0, _configUtils.getFieldConfig)(currentField, oldConfig);
  var newFieldConfig = (0, _configUtils.getFieldConfig)(newField, config); // get widgets info

  var widgetsMeta = Array.from({
    length: operatorCardinality
  }, function (_ignore, i) {
    var vs = currentValueSrc.get(i) || null;
    var currentWidgets = (0, _configUtils.getWidgetForFieldOp)(oldConfig, currentField, currentOperator, vs);
    var newWidgets = (0, _configUtils.getWidgetForFieldOp)(config, newField, newOperator, vs); // need to also check value widgets if we changed operator and current value source was 'field'
    // cause for select type op '=' requires single value and op 'in' requires array value

    var currentValueWidgets = vs == 'value' ? currentWidgets : (0, _configUtils.getWidgetForFieldOp)(oldConfig, currentField, currentOperator, 'value');
    var newValueWidgets = vs == 'value' ? newWidgets : (0, _configUtils.getWidgetForFieldOp)(config, newField, newOperator, 'value');
    return {
      currentWidgets: currentWidgets,
      newWidgets: newWidgets,
      currentValueWidgets: currentValueWidgets,
      newValueWidgets: newValueWidgets
    };
  });
  var currentWidgets = widgetsMeta.map(function (_ref) {
    var currentWidgets = _ref.currentWidgets;
    return currentWidgets;
  });
  var newWidgets = widgetsMeta.map(function (_ref2) {
    var newWidgets = _ref2.newWidgets;
    return newWidgets;
  });
  var currentValueWidgets = widgetsMeta.map(function (_ref3) {
    var currentValueWidgets = _ref3.currentValueWidgets;
    return currentValueWidgets;
  });
  var newValueWidgets = widgetsMeta.map(function (_ref4) {
    var newValueWidgets = _ref4.newValueWidgets;
    return newValueWidgets;
  });
  var commonWidgetsCnt = Math.min(newWidgets.length, currentWidgets.length);
  var reusableWidgets = newValueWidgets.filter(function (w) {
    return currentValueWidgets.includes(w);
  });
  var firstWidgetConfig = (0, _configUtils.getFieldWidgetConfig)(config, newField, newOperator, null, currentValueSrc.first());
  var valueSources = (0, _configUtils.getValueSourcesForFieldOp)(config, newField, newOperator);
  var canReuseValue = currentField && currentOperator && newOperator && (!changedField || changedField == 'field' && !config.settings.clearValueOnChangeField || changedField == 'operator' && !config.settings.clearValueOnChangeOp) && currentFieldConfig && newFieldConfig && currentFieldConfig.type == newFieldConfig.type && reusableWidgets.length > 0;
  ;
  var valueFixes = {};

  if (canReuseValue) {
    var _loop = function _loop(i) {
      var v = currentValue.get(i);
      var vType = currentValueType.get(i) || null;
      var vSrc = currentValueSrc.get(i) || null;
      var isValidSrc = valueSources.find(function (v) {
        return v == vSrc;
      }) != null;
      var isEndValue = !canFix;

      var _validateValue2 = _validateValue(config, newField, newField, newOperator, v, vType, vSrc, canFix, isEndValue),
          _validateValue3 = _slicedToArray(_validateValue2, 2),
          validateError = _validateValue3[0],
          fixedValue = _validateValue3[1];

      var isValid = !validateError;

      if (!isValidSrc || !isValid) {
        canReuseValue = false;
        return "break";
      } else if (canFix && fixedValue !== v) {
        valueFixes[i] = fixedValue;
      }
    };

    for (var i = 0; i < commonWidgetsCnt; i++) {
      var _ret = _loop(i);

      if (_ret === "break") break;
    }
  }

  var newValue = null,
      newValueSrc = null,
      newValueType = null;
  newValue = new _immutable["default"].List(Array.from({
    length: operatorCardinality
  }, function (_ignore, i) {
    var v = undefined;

    if (canReuseValue) {
      if (i < currentValue.size) {
        v = currentValue.get(i);

        if (valueFixes[i] !== undefined) {
          v = valueFixes[i];
        }
      }
    } else if (operatorCardinality == 1 && (firstWidgetConfig || newFieldConfig)) {
      if (newFieldConfig.defaultValue !== undefined) v = newFieldConfig.defaultValue;else if (newFieldConfig.fieldSettings && newFieldConfig.fieldSettings.defaultValue !== undefined) v = newFieldConfig.fieldSettings.defaultValue;else if (firstWidgetConfig.defaultValue !== undefined) v = firstWidgetConfig.defaultValue;
    }

    return v;
  }));
  newValueSrc = new _immutable["default"].List(Array.from({
    length: operatorCardinality
  }, function (_ignore, i) {
    var vs = null;

    if (canReuseValue) {
      if (i < currentValueSrc.size) vs = currentValueSrc.get(i);
    } else if (valueSources.length == 1) {
      vs = valueSources[0];
    } else if (valueSources.length > 1) {
      vs = valueSources[0];
    }

    return vs;
  }));
  newValueType = new _immutable["default"].List(Array.from({
    length: operatorCardinality
  }, function (_ignore, i) {
    var vt = null;

    if (canReuseValue) {
      if (i < currentValueType.size) vt = currentValueType.get(i);
    } else if (operatorCardinality == 1 && firstWidgetConfig && firstWidgetConfig.type !== undefined) {
      vt = firstWidgetConfig.type;
    }

    return vt;
  }));
  return {
    canReuseValue: canReuseValue,
    newValue: newValue,
    newValueSrc: newValueSrc,
    newValueType: newValueType
  };
};
/**
 * 
 * @param {bool} canFix true is useful for func values to remove bad args
 * @param {bool} isEndValue false if value is in process of editing by user
 * @param {bool} isRawValue false is used only internally from _validateFuncValue
 * @return {array} [validError, fixedValue] - if validError === null and canFix == true, fixedValue can differ from value if was fixed
 */


exports.getNewValueForFieldOp = getNewValueForFieldOp;

var _validateValue = function _validateValue(config, leftField, field, operator, value, valueType, valueSrc) {
  var canFix = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : false;
  var isEndValue = arguments.length > 8 && arguments[8] !== undefined ? arguments[8] : false;
  var isRawValue = arguments.length > 9 && arguments[9] !== undefined ? arguments[9] : true;
  var validError = null;
  var fixedValue = value;

  if (value != null) {
    if (valueSrc == 'field') {
      var _validateFieldValue2 = _validateFieldValue(leftField, field, value, valueSrc, valueType, config, operator, isEndValue, canFix);

      var _validateFieldValue3 = _slicedToArray(_validateFieldValue2, 2);

      validError = _validateFieldValue3[0];
      fixedValue = _validateFieldValue3[1];
    } else if (valueSrc == 'func') {
      var _validateFuncValue2 = _validateFuncValue(leftField, field, value, valueSrc, valueType, config, operator, isEndValue, canFix);

      var _validateFuncValue3 = _slicedToArray(_validateFuncValue2, 2);

      validError = _validateFuncValue3[0];
      fixedValue = _validateFuncValue3[1];
    } else if (valueSrc == 'value' || !valueSrc) {
      var _validateNormalValue2 = _validateNormalValue(leftField, field, value, valueSrc, valueType, config, operator, isEndValue, canFix);

      var _validateNormalValue3 = _slicedToArray(_validateNormalValue2, 2);

      validError = _validateNormalValue3[0];
      fixedValue = _validateNormalValue3[1];
    }

    if (!validError) {
      var fieldConfig = (0, _configUtils.getFieldConfig)(field, config);
      var w = (0, _configUtils.getWidgetForFieldOp)(config, field, operator, valueSrc);
      var fieldWidgetDefinition = (0, _omit["default"])((0, _configUtils.getFieldWidgetConfig)(config, field, operator, w, valueSrc), ['factory', 'formatValue']);
      var rightFieldDefinition = valueSrc == 'field' ? (0, _configUtils.getFieldConfig)(value, config) : null;
      var fn = fieldWidgetDefinition.validateValue;

      if (typeof fn == 'function') {
        var args = [fixedValue, //field,
        fieldConfig];
        if (valueSrc == 'field') args.push(rightFieldDefinition);
        var validResult = fn.apply(void 0, args);

        if (typeof validResult == "string" || validResult === null) {
          validError = validResult;
        } else {
          if (validError == false) validError = "Invalid value";
        }
      }
    }
  }

  if (isRawValue && validError) {
    validError = "Field ".concat(field, ": ").concat(validError);
    console.warn("[RAQB validate]", validError);
  }

  return [validError, validError ? value : fixedValue];
};
/**
 * 
 */


var _validateNormalValue = function _validateNormalValue(leftField, field, value, valueSrc, valueType, config) {
  var operator = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : null;
  var isEndValue = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : false;
  var canFix = arguments.length > 8 && arguments[8] !== undefined ? arguments[8] : false;
  var fixedValue = value;
  var fieldConfig = (0, _configUtils.getFieldConfig)(field, config);
  var w = (0, _configUtils.getWidgetForFieldOp)(config, field, operator, valueSrc);
  var wConfig = config.widgets[w];
  var wType = wConfig.type;
  if (valueType != wType) return ["Value should have type ".concat(wType, ", but got value of type ").concat(valueType), value];
  var fieldSettings = fieldConfig.fieldSettings;

  if (fieldSettings) {
    if (fieldSettings.listValues && !fieldSettings.allowCustomValues) {
      if (value instanceof Array) {
        var _iterator2 = _createForOfIteratorHelper(value),
            _step2;

        try {
          for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
            var v = _step2.value;

            if (fieldSettings.listValues[v] == undefined) {
              return ["Value ".concat(v, " is not in list of values"), value];
            }
          }
        } catch (err) {
          _iterator2.e(err);
        } finally {
          _iterator2.f();
        }
      } else {
        if (fieldSettings.listValues[value] == undefined) {
          return ["Value ".concat(value, " is not in list of values"), value];
        }
      }
    }

    if (fieldSettings.min != null && value < fieldSettings.min) {
      return ["Value ".concat(value, " < min ").concat(fieldSettings.min), value];
    }

    if (fieldSettings.max != null && value > fieldSettings.max) {
      return ["Value ".concat(value, " > max ").concat(fieldSettings.max), value];
    }
  }

  return [null, value];
};
/**
 * 
 */


var _validateFieldValue = function _validateFieldValue(leftField, field, value, _valueSrc, valueType, config) {
  var operator = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : null;
  var isEndValue = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : false;
  var canFix = arguments.length > 8 && arguments[8] !== undefined ? arguments[8] : false;
  var fixedValue = value;
  var rightFieldDefinition = (0, _configUtils.getFieldConfig)(value, config);
  if (!rightFieldDefinition) return ["Unknown field ".concat(value), value];
  if (value == leftField) return ["Can't compare field ".concat(leftField, " with itself"), value];
  if (valueType && valueType != rightFieldDefinition.type) return ["Field ".concat(value, " is of type ").concat(rightFieldDefinition.type, ", but expected ").concat(valueType), value];
  return [null, value];
};
/**
 * 
 */


var _validateFuncValue = function _validateFuncValue(leftField, field, value, _valueSrc, valueType, config) {
  var operator = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : null;
  var isEndValue = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : false;
  var canFix = arguments.length > 8 && arguments[8] !== undefined ? arguments[8] : false;
  var fixedValue = value;

  if (value) {
    var funcKey = value.get('func');

    if (funcKey) {
      var funcConfig = (0, _configUtils.getFuncConfig)(funcKey, config);

      if (funcConfig) {
        if (valueType && funcConfig.returnType != valueType) return ["Function ".concat(funcKey, " should return value of type ").concat(funcConfig.returnType, ", but got ").concat(valueType), value];

        for (var argKey in funcConfig.args) {
          var argConfig = funcConfig.args[argKey];
          var args = fixedValue.get('args');
          var argVal = args ? args.get(argKey) : undefined;
          var fieldDef = (0, _configUtils.getFieldConfig)(argConfig, config);
          var argValue = argVal ? argVal.get('value') : undefined;
          var argValueSrc = argVal ? argVal.get('valueSrc') : undefined;

          if (argValue !== undefined) {
            var _validateValue4 = _validateValue(config, leftField, fieldDef, operator, argValue, argConfig.type, argValueSrc, canFix, isEndValue, false),
                _validateValue5 = _slicedToArray(_validateValue4, 2),
                argValidError = _validateValue5[0],
                fixedArgVal = _validateValue5[1];

            if (argValidError !== null) {
              if (canFix) {
                fixedValue = fixedValue.deleteIn(['args', argKey]);

                if (argConfig.defaultValue !== undefined) {
                  fixedValue = fixedValue.setIn(['args', argKey, 'value'], argConfig.defaultValue);
                  fixedValue = fixedValue.setIn(['args', argKey, 'valueSrc'], 'value');
                }
              } else {
                return ["Invalid value of arg ".concat(argKey, " for func ").concat(funcKey, ": ").concat(argValidError), value];
              }
            } else if (fixedArgVal !== argValue) {
              fixedValue = fixedValue.setIn(['args', argKey, 'value'], fixedArgVal);
            }
          } else if (isEndValue && argConfig.defaultValue === undefined && !canFix) {
            return ["Value of arg ".concat(argKey, " for func ").concat(funcKey, " is required"), value];
          }
        }
      } else return ["Unknown function ".concat(funcKey), value];
    } // else it's not function value

  } // empty value


  return [null, fixedValue];
};
/**
 * @param {Immutable.Map} state
 * @param {Immutable.List} path
 * @param {string} field
 */


var setField = function setField(state, path, newField, config) {
  if (!newField) return removeItem(state, path);
  var fieldSeparator = config.settings.fieldSeparator;
  if (Array.isArray(newField)) newField = newField.join(fieldSeparator);
  return state.updateIn((0, _treeUtils.expandTreePath)(path, 'properties'), function (map) {
    return map.withMutations(function (current) {
      var currentOperator = current.get('operator');
      var currentOperatorOptions = current.get('operatorOptions');

      var _currentField = current.get('field');

      var _currentValue = current.get('value');

      var _currentValueSrc = current.get('valueSrc', new _immutable["default"].List());

      var _currentValueType = current.get('valueType', new _immutable["default"].List()); // If the newly selected field supports the same operator the rule currently
      // uses, keep it selected.


      var newFieldConfig = (0, _configUtils.getFieldConfig)(newField, config);
      var lastOp = newFieldConfig && newFieldConfig.operators.indexOf(currentOperator) !== -1 ? currentOperator : null;
      var newOperator = null;
      var availOps = (0, _configUtils.getOperatorsForField)(config, newField);
      if (availOps && availOps.length == 1) newOperator = availOps[0];else if (availOps && availOps.length > 1) {
        var _iterator3 = _createForOfIteratorHelper(config.settings.setOpOnChangeField || []),
            _step3;

        try {
          for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
            var strategy = _step3.value;
            if (strategy == 'keep') newOperator = lastOp;else if (strategy == 'default') newOperator = (0, _defaultUtils.defaultOperator)(config, newField, false);else if (strategy == 'first') newOperator = (0, _configUtils.getFirstOperator)(config, newField);
            if (newOperator) //found op for strategy
              break;
          }
        } catch (err) {
          _iterator3.e(err);
        } finally {
          _iterator3.f();
        }
      }

      var _getNewValueForFieldO = getNewValueForFieldOp(config, config, current, newField, newOperator, 'field', true),
          canReuseValue = _getNewValueForFieldO.canReuseValue,
          newValue = _getNewValueForFieldO.newValue,
          newValueSrc = _getNewValueForFieldO.newValueSrc,
          newValueType = _getNewValueForFieldO.newValueType;

      var newOperatorOptions = canReuseValue ? currentOperatorOptions : (0, _defaultUtils.defaultOperatorOptions)(config, newOperator, newField);
      return current.set('field', newField).set('operator', newOperator).set('operatorOptions', newOperatorOptions).set('value', newValue).set('valueSrc', newValueSrc).set('valueType', newValueType);
    });
  });
};
/**
 * @param {Immutable.Map} state
 * @param {Immutable.List} path
 * @param {string} operator
 */


var setOperator = function setOperator(state, path, newOperator, config) {
  return state.updateIn((0, _treeUtils.expandTreePath)(path, 'properties'), function (map) {
    return map.withMutations(function (current) {
      var currentField = current.get('field');
      var currentOperatorOptions = current.get('operatorOptions');

      var _currentValue = current.get('value', new _immutable["default"].List());

      var _currentValueSrc = current.get('valueSrc', new _immutable["default"].List());

      var _currentOperator = current.get('operator');

      var _getNewValueForFieldO2 = getNewValueForFieldOp(config, config, current, currentField, newOperator, 'operator', true),
          canReuseValue = _getNewValueForFieldO2.canReuseValue,
          newValue = _getNewValueForFieldO2.newValue,
          newValueSrc = _getNewValueForFieldO2.newValueSrc,
          newValueType = _getNewValueForFieldO2.newValueType;

      var newOperatorOptions = canReuseValue ? currentOperatorOptions : (0, _defaultUtils.defaultOperatorOptions)(config, newOperator, currentField);
      return current.set('operator', newOperator).set('operatorOptions', newOperatorOptions).set('value', newValue).set('valueSrc', newValueSrc).set('valueType', newValueType);
    });
  });
};
/**
 * @param {Immutable.Map} state
 * @param {Immutable.List} path
 * @param {integer} delta
 * @param {*} value
 * @param {string} valueType
 * @param {boolean} __isInternal
 */


var setValue = function setValue(state, path, delta, value, valueType, config, __isInternal) {
  var fieldSeparator = config.settings.fieldSeparator;
  if (valueSrc === 'field' && Array.isArray(value)) value = value.join(fieldSeparator);
  var valueSrc = state.getIn((0, _treeUtils.expandTreePath)(path, 'properties', 'valueSrc', delta + '')) || null;
  var field = state.getIn((0, _treeUtils.expandTreePath)(path, 'properties', 'field')) || null;
  var operator = state.getIn((0, _treeUtils.expandTreePath)(path, 'properties', 'operator')) || null;
  var isEndValue = false;
  var canFix = false;

  var calculatedValueType = valueType || _calculateValueType(value, valueSrc, config);

  var _validateValue6 = _validateValue(config, field, field, operator, value, calculatedValueType, valueSrc, canFix, isEndValue),
      _validateValue7 = _slicedToArray(_validateValue6, 2),
      validateError = _validateValue7[0],
      fixedValue = _validateValue7[1];

  var isValid = !validateError;

  if (isValid && canFix && fixedValue !== value) {
    value = fixedValue;
  }

  if (isValid) {
    if (typeof value === "undefined") {
      state = state.setIn((0, _treeUtils.expandTreePath)(path, 'properties', 'value', delta + ''), undefined);
      state = state.setIn((0, _treeUtils.expandTreePath)(path, 'properties', 'valueType', delta + ''), null);
    } else {
      var lastValue = state.getIn((0, _treeUtils.expandTreePath)(path, 'properties', 'value', delta + ''));
      var isLastEmpty = lastValue == undefined;
      state = state.setIn((0, _treeUtils.expandTreePath)(path, 'properties', 'value', delta + ''), value);
      state = state.setIn((0, _treeUtils.expandTreePath)(path, 'properties', 'valueType', delta + ''), calculatedValueType);
      state.__isInternalValueChange = __isInternal && !isLastEmpty;
    }
  }

  return state;
};
/**
 * @param {Immutable.Map} state
 * @param {Immutable.List} path
 * @param {integer} delta
 * @param {*} srcKey
 */


var setValueSrc = function setValueSrc(state, path, delta, srcKey) {
  state = state.setIn((0, _treeUtils.expandTreePath)(path, 'properties', 'value', delta + ''), undefined);
  state = state.setIn((0, _treeUtils.expandTreePath)(path, 'properties', 'valueType', delta + ''), null);

  if (typeof srcKey === "undefined") {
    state = state.setIn((0, _treeUtils.expandTreePath)(path, 'properties', 'valueSrc', delta + ''), null);
  } else {
    state = state.setIn((0, _treeUtils.expandTreePath)(path, 'properties', 'valueSrc', delta + ''), srcKey);
  }

  return state;
};
/**
 * @param {Immutable.Map} state
 * @param {Immutable.List} path
 * @param {string} name
 * @param {*} value
 */


var setOperatorOption = function setOperatorOption(state, path, name, value) {
  return state.setIn((0, _treeUtils.expandTreePath)(path, 'properties', 'operatorOptions', name), value);
};
/**
 * 
 */


var _calculateValueType = function _calculateValueType(value, valueSrc, config) {
  var calculatedValueType = null;

  if (value) {
    if (valueSrc === 'field') {
      var fieldConfig = (0, _configUtils.getFieldConfig)(value, config);

      if (fieldConfig) {
        calculatedValueType = fieldConfig.type;
      }
    } else if (valueSrc === 'func') {
      var funcKey = value.get('func');

      if (funcKey) {
        var funcConfig = (0, _configUtils.getFuncConfig)(funcKey, config);

        if (funcConfig) {
          calculatedValueType = funcConfig.returnType;
        }
      }
    }
  }

  return calculatedValueType;
};

var emptyDrag = {
  dragging: {
    id: null,
    x: null,
    y: null,
    w: null,
    h: null
  },
  mousePos: {},
  dragStart: {
    id: null
  }
};
/**
 * @param {Immutable.Map} state
 * @param {object} action
 */

var _default = function _default(config) {
  var emptyTree = (0, _defaultUtils.defaultRoot)(config);
  var emptyState = Object.assign({}, {
    tree: emptyTree
  }, emptyDrag);
  var unset = {
    __isInternalValueChange: undefined
  };
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : emptyState;
    var action = arguments.length > 1 ? arguments[1] : undefined;

    switch (action.type) {
      case constants.SET_TREE:
        return Object.assign({}, state, _objectSpread({}, unset), {
          tree: action.tree
        });

      case constants.ADD_NEW_GROUP:
        return Object.assign({}, state, _objectSpread({}, unset), {
          tree: addNewGroup(state.tree, action.path, action.properties, action.config)
        });

      case constants.ADD_GROUP:
        return Object.assign({}, state, _objectSpread({}, unset), {
          tree: addItem(state.tree, action.path, 'group', action.id, action.properties)
        });

      case constants.REMOVE_GROUP:
        return Object.assign({}, state, _objectSpread({}, unset), {
          tree: removeGroup(state.tree, action.path, action.config)
        });

      case constants.ADD_RULE:
        return Object.assign({}, state, _objectSpread({}, unset), {
          tree: addItem(state.tree, action.path, 'rule', action.id, action.properties)
        });

      case constants.REMOVE_RULE:
        return Object.assign({}, state, _objectSpread({}, unset), {
          tree: removeRule(state.tree, action.path, action.config)
        });

      case constants.SET_CONJUNCTION:
        return Object.assign({}, state, _objectSpread({}, unset), {
          tree: setConjunction(state.tree, action.path, action.conjunction)
        });

      case constants.SET_NOT:
        return Object.assign({}, state, _objectSpread({}, unset), {
          tree: setNot(state.tree, action.path, action.not)
        });

      case constants.SET_FIELD:
        return Object.assign({}, state, _objectSpread({}, unset), {
          tree: setField(state.tree, action.path, action.field, action.config)
        });

      case constants.SET_OPERATOR:
        return Object.assign({}, state, _objectSpread({}, unset), {
          tree: setOperator(state.tree, action.path, action.operator, action.config)
        });

      case constants.SET_VALUE:
        var set = {};
        var tree = setValue(state.tree, action.path, action.delta, action.value, action.valueType, action.config, action.__isInternal);
        if (tree.__isInternalValueChange) set.__isInternalValueChange = true;
        return Object.assign({}, state, _objectSpread({}, unset, {}, set), {
          tree: tree
        });

      case constants.SET_VALUE_SRC:
        return Object.assign({}, state, _objectSpread({}, unset), {
          tree: setValueSrc(state.tree, action.path, action.delta, action.srcKey)
        });

      case constants.SET_OPERATOR_OPTION:
        return Object.assign({}, state, _objectSpread({}, unset), {
          tree: setOperatorOption(state.tree, action.path, action.name, action.value)
        });

      case constants.MOVE_ITEM:
        return Object.assign({}, state, _objectSpread({}, unset), {
          tree: moveItem(state.tree, action.fromPath, action.toPath, action.placement, action.config)
        });

      case constants.SET_DRAG_START:
        return Object.assign({}, state, _objectSpread({}, unset), {
          dragStart: action.dragStart,
          dragging: action.dragging,
          mousePos: action.mousePos
        });

      case constants.SET_DRAG_PROGRESS:
        return Object.assign({}, state, _objectSpread({}, unset), {
          mousePos: action.mousePos,
          dragging: action.dragging
        });

      case constants.SET_DRAG_END:
        return Object.assign({}, state, _objectSpread({}, unset), emptyDrag);

      default:
        return state;
    }
  };
};

exports["default"] = _default;