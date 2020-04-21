"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _range = _interopRequireDefault(require("lodash/range"));

var _configUtils = require("../../utils/configUtils");

var _stuff = require("../../utils/stuff");

var _ValueSources = require("../ValueSources");

var _pick = _interopRequireDefault(require("lodash/pick"));

var _immutable = _interopRequireDefault(require("immutable"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { return function () { var Super = _getPrototypeOf(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var funcArgDummyOpDef = {
  cardinality: 1
};

var _default = function _default(Widget) {
  var _class, _temp;

  return _temp = _class = /*#__PURE__*/function (_PureComponent) {
    _inherits(WidgetContainer, _PureComponent);

    var _super = _createSuper(WidgetContainer);

    function WidgetContainer(props) {
      var _this;

      _classCallCheck(this, WidgetContainer);

      _this = _super.call(this, props);

      _this._setValue = function (isSpecialRange, delta, widgetType, value, __isInternal) {
        if (isSpecialRange && Array.isArray(value)) {
          var oldRange = [_this.props.value.get(0), _this.props.value.get(1)];
          if (oldRange[0] != value[0]) _this.props.setValue(0, value[0], widgetType, __isInternal);
          if (oldRange[1] != value[1]) _this.props.setValue(1, value[1], widgetType, __isInternal);
        } else {
          _this.props.setValue(delta, value, widgetType, __isInternal);
        }
      };

      _this._onChangeValueSrc = function (delta, e) {
        var srcKey = e.target.value;

        _this.props.setValueSrc(delta, srcKey);
      };

      _this.componentWillReceiveProps(props);

      return _this;
    }

    _createClass(WidgetContainer, [{
      key: "componentWillReceiveProps",
      value: function componentWillReceiveProps(nextProps) {
        var prevProps = this.props;
        var keysForMeta = ["config", "field", "fieldFunc", "fieldArg", "leftField", "operator", "valueSrc", "isFuncArg"];
        var needUpdateMeta = !this.meta || keysForMeta.map(function (k) {
          return nextProps[k] !== prevProps[k] //tip: for isFuncArg we need to wrap value in Imm list
          || k == 'isFuncArg' && nextProps['isFuncArg'] && nextProps['value'] !== prevProps['value'];
        }).filter(function (ch) {
          return ch;
        }).length > 0;

        if (needUpdateMeta) {
          this.meta = this.getMeta(nextProps);
        }
      }
    }, {
      key: "getMeta",
      value: function getMeta(_ref) {
        var _this2 = this;

        var config = _ref.config,
            simpleField = _ref.field,
            fieldFunc = _ref.fieldFunc,
            fieldArg = _ref.fieldArg,
            operator = _ref.operator,
            valueSrcs = _ref.valueSrc,
            values = _ref.value,
            isFuncArg = _ref.isFuncArg,
            leftField = _ref.leftField;
        var field = isFuncArg ? {
          func: fieldFunc,
          arg: fieldArg
        } : simpleField;
        var _valueSrcs = valueSrcs;
        var _values = values;

        if (isFuncArg) {
          _valueSrcs = _immutable["default"].List([valueSrcs]);
          _values = _immutable["default"].List([values]);
        }

        var fieldDefinition = (0, _configUtils.getFieldConfig)(field, config);
        var defaultWidget = (0, _configUtils.getWidgetForFieldOp)(config, field, operator);

        var _widgets = (0, _configUtils.getWidgetsForFieldOp)(config, field, operator);

        var operatorDefinition = isFuncArg ? funcArgDummyOpDef : (0, _configUtils.getOperatorConfig)(config, operator, field);

        if (fieldDefinition == null || operatorDefinition == null) {
          return null;
        }

        var isSpecialRange = operatorDefinition.isSpecialRange;
        var isSpecialRangeForSrcField = isSpecialRange && (_valueSrcs.get(0) == 'field' || _valueSrcs.get(1) == 'field');
        var isTrueSpecialRange = isSpecialRange && !isSpecialRangeForSrcField;
        var cardinality = isTrueSpecialRange ? 1 : (0, _stuff.defaultValue)(operatorDefinition.cardinality, 1);

        if (cardinality === 0) {
          return null;
        }

        var valueSources = (0, _configUtils.getValueSourcesForFieldOp)(config, field, operator, fieldDefinition, isFuncArg ? leftField : null);
        var widgets = (0, _range["default"])(0, cardinality).map(function (delta) {
          var valueSrc = _valueSrcs.get(delta) || null;
          var widget = (0, _configUtils.getWidgetForFieldOp)(config, field, operator, valueSrc);
          var widgetDefinition = (0, _configUtils.getFieldWidgetConfig)(config, field, operator, widget, valueSrc);

          if (isSpecialRangeForSrcField) {
            widget = widgetDefinition.singleWidget;
            widgetDefinition = (0, _configUtils.getFieldWidgetConfig)(config, field, operator, widget, valueSrc);
          }

          var widgetType = widgetDefinition.type;
          var valueLabel = (0, _configUtils.getValueLabel)(config, field, operator, delta, valueSrc, isTrueSpecialRange);
          var widgetValueLabel = (0, _configUtils.getValueLabel)(config, field, operator, delta, null, isTrueSpecialRange);
          var sepText = operatorDefinition.textSeparators ? operatorDefinition.textSeparators[delta] : null;

          var setValueSrcHandler = _this2._onChangeValueSrc.bind(_this2, delta);

          var valueLabels = null;
          var textSeparators = null;

          if (isSpecialRange) {
            valueLabels = [(0, _configUtils.getValueLabel)(config, field, operator, 0), (0, _configUtils.getValueLabel)(config, field, operator, 1)];
            valueLabels = {
              placeholder: [valueLabels[0].placeholder, valueLabels[1].placeholder],
              label: [valueLabels[0].label, valueLabels[1].label]
            };
            textSeparators = operatorDefinition.textSeparators;
          }

          var setValueHandler = _this2._setValue.bind(_this2, isSpecialRange, delta, widgetType);

          return {
            valueSrc: valueSrc,
            valueLabel: valueLabel,
            widget: widget,
            sepText: sepText,
            setValueSrcHandler: setValueSrcHandler,
            widgetDefinition: widgetDefinition,
            widgetValueLabel: widgetValueLabel,
            valueLabels: valueLabels,
            textSeparators: textSeparators,
            setValueHandler: setValueHandler
          };
        });
        return {
          defaultWidget: defaultWidget,
          fieldDefinition: fieldDefinition,
          operatorDefinition: operatorDefinition,
          isSpecialRange: isTrueSpecialRange,
          cardinality: cardinality,
          valueSources: valueSources,
          widgets: widgets,
          _values: _values,
          //correct for isFuncArg
          _field: field //correct for isFuncArg

        };
      }
    }, {
      key: "render",
      value: function render() {
        var _this$props = this.props,
            config = _this$props.config,
            isFuncArg = _this$props.isFuncArg,
            leftField = _this$props.leftField,
            operator = _this$props.operator,
            values = _this$props.value;
        var meta = this.meta;
        if (!meta) return null;
        var defaultWidget = meta.defaultWidget,
            cardinality = meta.cardinality,
            valueSources = meta.valueSources,
            widgets = meta.widgets,
            _values = meta._values,
            _field = meta._field;
        var value = isFuncArg ? _values : values;
        var field = isFuncArg ? leftField : _field;
        var settings = config.settings;
        return /*#__PURE__*/_react["default"].createElement(Widget, {
          name: defaultWidget,
          config: config
        }, (0, _range["default"])(0, cardinality).map(function (delta) {
          var _widgets$delta = widgets[delta],
              valueSrc = _widgets$delta.valueSrc,
              valueLabel = _widgets$delta.valueLabel,
              sepText = _widgets$delta.sepText,
              setValueSrcHandler = _widgets$delta.setValueSrcHandler; //if (!valueSrc && valueSources.length == 1) {
          //    this.props.setValueSrc(delta, valueSources[0]);
          //}

          var sepLabel = settings.showLabels ? /*#__PURE__*/_react["default"].createElement("label", null, "\xA0") : null;
          var sourceLabel = settings.showLabels ? /*#__PURE__*/_react["default"].createElement("label", null, "\xA0") : null;
          var widgetLabel = settings.showLabels ? /*#__PURE__*/_react["default"].createElement("label", null, valueLabel.label) : null;

          var sep = sepText && /*#__PURE__*/_react["default"].createElement("div", {
            key: "widget-separators-" + delta,
            className: "widget--sep"
          }, sepLabel, /*#__PURE__*/_react["default"].createElement("span", null, sepText));

          var sources = valueSources.length > 1 && /*#__PURE__*/_react["default"].createElement("div", {
            key: "valuesrc-" + field + "-" + delta,
            className: "widget--valuesrc"
          }, sourceLabel, /*#__PURE__*/_react["default"].createElement(_ValueSources.ValueSources, {
            key: 'valuesrc-' + delta,
            delta: delta,
            valueSources: valueSources,
            valueSrc: valueSrc,
            config: config,
            field: field,
            operator: operator,
            setValueSrcHandler: setValueSrcHandler
          }));

          var widgetCmp = /*#__PURE__*/_react["default"].createElement("div", {
            key: "widget-" + field + "-" + delta,
            className: "widget--widget"
          }, valueSrc == 'func' ? null : widgetLabel, /*#__PURE__*/_react["default"].createElement(WidgetFactory, _extends({
            valueSrc: valueSrc,
            delta: delta,
            value: value,
            isFuncArg: isFuncArg
          }, (0, _pick["default"])(meta, ['isSpecialRange', 'fieldDefinition']), (0, _pick["default"])(widgets[delta], ['widget', 'widgetDefinition', 'widgetValueLabel', 'valueLabels', 'textSeparators', 'setValueHandler']), {
            config: config,
            field: field,
            operator: operator
          })));

          return [sep, sources, widgetCmp];
        }));
      }
    }]);

    return WidgetContainer;
  }(_react.PureComponent), _class.propTypes = {
    config: _propTypes["default"].object.isRequired,
    value: _propTypes["default"].any,
    //instanceOf(Immutable.List)
    valueSrc: _propTypes["default"].any,
    //instanceOf(Immutable.List)
    field: _propTypes["default"].string,
    operator: _propTypes["default"].string,
    //actions
    setValue: _propTypes["default"].func,
    setValueSrc: _propTypes["default"].func,
    // for isFuncArg
    isFuncArg: _propTypes["default"].bool,
    fieldFunc: _propTypes["default"].string,
    fieldArg: _propTypes["default"].string,
    leftField: _propTypes["default"].string
  }, _temp;
};

exports["default"] = _default;

var WidgetFactory = function WidgetFactory(_ref2) {
  var delta = _ref2.delta,
      isFuncArg = _ref2.isFuncArg,
      valueSrc = _ref2.valueSrc,
      immValue = _ref2.value,
      isSpecialRange = _ref2.isSpecialRange,
      fieldDefinition = _ref2.fieldDefinition,
      widget = _ref2.widget,
      widgetDefinition = _ref2.widgetDefinition,
      widgetValueLabel = _ref2.widgetValueLabel,
      valueLabels = _ref2.valueLabels,
      textSeparators = _ref2.textSeparators,
      setValueHandler = _ref2.setValueHandler,
      config = _ref2.config,
      field = _ref2.field,
      operator = _ref2.operator;

  var widgetFactory = widgetDefinition.factory,
      fieldWidgetProps = _objectWithoutProperties(widgetDefinition, ["factory"]);

  var isConst = isFuncArg && fieldDefinition.valueSources && fieldDefinition.valueSources.length == 1 && fieldDefinition.valueSources[0] == 'const';
  var defaultValue = fieldDefinition.defaultValue;

  if (!widgetFactory) {
    return '?';
  }

  var value = isSpecialRange ? [immValue.get(0), immValue.get(1)] : immValue.get(delta);
  if (isSpecialRange && value[0] === undefined && value[1] === undefined) value = undefined;

  var _ref3 = fieldDefinition || {},
      fieldSettings = _ref3.fieldSettings;

  var widgetProps = Object.assign({}, fieldWidgetProps, fieldSettings, {
    config: config,
    field: field,
    fieldDefinition: fieldDefinition,
    operator: operator,
    delta: delta,
    isSpecialRange: isSpecialRange,
    isFuncArg: isFuncArg,
    value: value,
    label: widgetValueLabel.label,
    placeholder: widgetValueLabel.placeholder,
    placeholders: valueLabels ? valueLabels.placeholder : null,
    textSeparators: textSeparators,
    setValue: setValueHandler
  });

  if (widget == 'field') {//
  }

  if (isConst && defaultValue) {
    if (typeof defaultValue == "boolean") {
      return defaultValue ? widgetProps.labelYes || "YES" : widgetProps.labelNo || "NO";
    } else if (fieldSettings.listValues) {
      if (Array.isArray(defaultValue)) return defaultValue.map(function (v) {
        return fieldSettings.listValues[v] || v;
      }).join(', ');else return fieldSettings.listValues[defaultValue] || defaultValue;
    }

    return "" + defaultValue;
  }

  return widgetFactory(widgetProps);
};