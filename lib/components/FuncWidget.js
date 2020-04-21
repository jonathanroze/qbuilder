"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _col = _interopRequireDefault(require("antd/lib/col"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _immutable = _interopRequireDefault(require("immutable"));

var _FuncSelect = _interopRequireDefault(require("./FuncSelect"));

var _configUtils = require("../utils/configUtils");

var _Widget = _interopRequireDefault(require("./Widget"));

var _funcUtils = require("../utils/funcUtils");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

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

var FuncWidget = /*#__PURE__*/function (_PureComponent) {
  _inherits(FuncWidget, _PureComponent);

  var _super = _createSuper(FuncWidget);

  function FuncWidget(props) {
    var _this;

    _classCallCheck(this, FuncWidget);

    _this = _super.call(this, props);

    _this.setFunc = function (funcKey) {
      _this.props.setValue((0, _funcUtils.setFunc)(_this.props.value, funcKey, _this.props.config));
    };

    _this.setArgValue = function (argKey, argVal) {
      _this.props.setValue((0, _funcUtils.setArgValue)(_this.props.value, argKey, argVal));
    };

    _this.setArgValueSrc = function (argKey, argValSrc) {
      _this.props.setValue((0, _funcUtils.setArgValueSrc)(_this.props.value, argKey, argValSrc));
    };

    _this.renderFuncSelect = function () {
      var _this$props = _this.props,
          config = _this$props.config,
          field = _this$props.field,
          operator = _this$props.operator,
          customProps = _this$props.customProps,
          value = _this$props.value;
      var funcKey = value ? value.get('func') : null;
      var selectProps = {
        value: funcKey,
        setValue: _this.setFunc,
        config: config,
        field: field,
        operator: operator,
        customProps: customProps
      };
      var _config$settings = config.settings,
          showLabels = _config$settings.showLabels,
          funcLabel = _config$settings.funcLabel;
      var widgetLabel = showLabels ? /*#__PURE__*/_react["default"].createElement("label", null, funcLabel) : null;
      return /*#__PURE__*/_react["default"].createElement(_col["default"], {
        key: "func",
        className: "rule--func"
      }, widgetLabel, /*#__PURE__*/_react["default"].createElement(_FuncSelect["default"], selectProps));
    };

    _this.renderArgLabel = function (argKey, argDefinition) {
      var config = _this.props.config;
      var isConst = argDefinition.valueSources && argDefinition.valueSources.length == 1 && argDefinition.valueSources[0] == 'const';
      var forceShow = !config.settings.showLabels && (argDefinition.type == 'boolean' || isConst);
      if (!forceShow) return null;
      return /*#__PURE__*/_react["default"].createElement(_col["default"], {
        className: "rule--func--arg-label"
      }, argDefinition.label || argKey);
    };

    _this.renderArgLabelSep = function (argKey, argDefinition) {
      var config = _this.props.config;
      var isConst = argDefinition.valueSources && argDefinition.valueSources.length == 1 && argDefinition.valueSources[0] == 'const';
      var forceShow = !config.settings.showLabels && (argDefinition.type == 'boolean' || isConst);
      if (!forceShow) return null;
      return /*#__PURE__*/_react["default"].createElement(_col["default"], {
        className: "rule--func--arg-label-sep"
      }, ":");
    };

    _this.renderArgVal = function (funcKey, argKey, argDefinition) {
      var _this$props2 = _this.props,
          config = _this$props2.config,
          field = _this$props2.field,
          operator = _this$props2.operator,
          value = _this$props2.value;
      var arg = value ? value.getIn(['args', argKey]) : null;
      var argVal = arg ? arg.get('value') : undefined;
      var argValSrc = arg ? arg.get('valueSrc') || 'value' : undefined;
      var widgetProps = {
        config: config,
        fieldFunc: funcKey,
        fieldArg: argKey,
        leftField: field,
        operator: null,
        value: argVal,
        valueSrc: argValSrc,
        setValue: _this.setArgValue,
        setValueSrc: _this.setArgValueSrc,
        funcKey: funcKey,
        argKey: argKey,
        argDefinition: argDefinition
      }; //tip: value & valueSrc will be converted to Immutable.List at WidgetContainer

      return /*#__PURE__*/_react["default"].createElement(_col["default"], {
        className: "rule--func--arg-value"
      }, /*#__PURE__*/_react["default"].createElement(ArgWidget, widgetProps));
    };

    _this.renderArgSep = function (argKey, argDefinition, argIndex, _ref) {
      var renderSeps = _ref.renderSeps;
      if (!argIndex) return null;
      return /*#__PURE__*/_react["default"].createElement(_col["default"], {
        className: "rule--func--arg-sep"
      }, renderSeps ? renderSeps[argIndex - 1] : ", ");
    };

    _this.renderBracketBefore = function (_ref2) {
      var renderBrackets = _ref2.renderBrackets;
      return /*#__PURE__*/_react["default"].createElement(_col["default"], {
        key: "before_args",
        className: "rule--func--bracket-before"
      }, renderBrackets ? renderBrackets[0] : "(");
    };

    _this.renderBracketAfter = function (_ref3) {
      var renderBrackets = _ref3.renderBrackets;
      return /*#__PURE__*/_react["default"].createElement(_col["default"], {
        key: "after_args",
        className: "rule--func--bracket-after"
      }, renderBrackets ? renderBrackets[1] : ")");
    };

    _this.renderFuncArgs = function () {
      var _this$meta = _this.meta,
          funcDefinition = _this$meta.funcDefinition,
          funcKey = _this$meta.funcKey;
      if (!funcKey) return null;
      var args = funcDefinition.args;
      if (!args) return null;
      return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, _this.renderBracketBefore(funcDefinition), /*#__PURE__*/_react["default"].createElement(_col["default"], {
        key: "args",
        className: "rule--func--args"
      }, Object.keys(args).map(function (argKey, argIndex) {
        return /*#__PURE__*/_react["default"].createElement(_col["default"], {
          key: "arg-".concat(argKey, "-").concat(argIndex),
          className: "rule--func--arg"
        }, _this.renderArgSep(argKey, args[argKey], argIndex, funcDefinition), _this.renderArgLabel(argKey, args[argKey]), _this.renderArgLabelSep(argKey, args[argKey]), _this.renderArgVal(funcKey, argKey, args[argKey]));
      })), _this.renderBracketAfter(funcDefinition));
    };

    _this.componentWillReceiveProps(props);

    return _this;
  }

  _createClass(FuncWidget, [{
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      var prevProps = this.props;
      var keysForMeta = ["config", "field", "operator", "value"];
      var needUpdateMeta = !this.meta || keysForMeta.map(function (k) {
        return nextProps[k] !== prevProps[k];
      }).filter(function (ch) {
        return ch;
      }).length > 0;

      if (needUpdateMeta) {
        this.meta = this.getMeta(nextProps);
      }
    }
  }, {
    key: "getMeta",
    value: function getMeta(_ref4) {
      var config = _ref4.config,
          field = _ref4.field,
          operator = _ref4.operator,
          value = _ref4.value;
      var funcKey = value ? value.get('func') : null;
      var funcDefinition = funcKey ? (0, _configUtils.getFuncConfig)(funcKey, config) : null;
      return {
        funcDefinition: funcDefinition,
        funcKey: funcKey
      };
    }
  }, {
    key: "render",
    value: function render() {
      return /*#__PURE__*/_react["default"].createElement(_col["default"], {
        className: "rule--func--wrapper"
      }, this.renderFuncSelect(), this.renderFuncArgs());
    }
  }]);

  return FuncWidget;
}(_react.PureComponent);

exports["default"] = FuncWidget;
FuncWidget.propTypes = {
  config: _propTypes["default"].object.isRequired,
  field: _propTypes["default"].string.isRequired,
  operator: _propTypes["default"].string.isRequired,
  customProps: _propTypes["default"].object,
  value: _propTypes["default"].object,
  //instanceOf(Immutable.Map) //with keys 'func' and `args`
  setValue: _propTypes["default"].func.isRequired
};

var ArgWidget = /*#__PURE__*/function (_PureComponent2) {
  _inherits(ArgWidget, _PureComponent2);

  var _super2 = _createSuper(ArgWidget);

  function ArgWidget() {
    var _this2;

    _classCallCheck(this, ArgWidget);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this2 = _super2.call.apply(_super2, [this].concat(args));

    _this2.setValue = function (_delta, value, _widgetType) {
      var _this2$props = _this2.props,
          setValue = _this2$props.setValue,
          argKey = _this2$props.argKey;
      setValue(argKey, value);
    };

    _this2.setValueSrc = function (_delta, valueSrc, _widgetType) {
      var _this2$props2 = _this2.props,
          setValueSrc = _this2$props2.setValueSrc,
          argKey = _this2$props2.argKey;
      setValueSrc(argKey, valueSrc);
    };

    return _this2;
  }

  _createClass(ArgWidget, [{
    key: "render",
    value: function render() {
      return /*#__PURE__*/_react["default"].createElement(_Widget["default"], _extends({}, this.props, {
        setValue: this.setValue,
        setValueSrc: this.setValueSrc,
        isFuncArg: true
      }));
    }
  }]);

  return ArgWidget;
}(_react.PureComponent);

ArgWidget.propTypes = {
  funcKey: _propTypes["default"].string.isRequired,
  argKey: _propTypes["default"].string.isRequired,
  setValue: _propTypes["default"].func.isRequired,
  setValueSrc: _propTypes["default"].func.isRequired
};