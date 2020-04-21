"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _slider = _interopRequireDefault(require("antd/lib/slider"));

var _col = _interopRequireDefault(require("antd/lib/col"));

var _inputNumber = _interopRequireDefault(require("antd/lib/input-number"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

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

var __isInternal = true; //true to optimize render

var SliderWidget = /*#__PURE__*/function (_PureComponent) {
  _inherits(SliderWidget, _PureComponent);

  var _super = _createSuper(SliderWidget);

  function SliderWidget(props) {
    var _this;

    _classCallCheck(this, SliderWidget);

    _this = _super.call(this, props);
    _this.state = {};

    _this.handleChange = function (val) {
      if (val === '') val = undefined;
      if (__isInternal) _this.setState({
        internalValue: val
      });

      _this.props.setValue(val, __isInternal);
    };

    _this.tipFormatter = function (val) {
      return val != undefined ? val.toString() : undefined;
    };

    _this.state.internalValue = props.value;
    return _this;
  }

  _createClass(SliderWidget, [{
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      this.setState({
        internalValue: nextProps.value
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          config = _this$props.config,
          placeholder = _this$props.placeholder,
          customProps = _this$props.customProps,
          value = _this$props.value,
          min = _this$props.min,
          max = _this$props.max,
          step = _this$props.step,
          marks = _this$props.marks;
      var renderSize = config.settings.renderSize;

      var _customProps = customProps || {};

      var _value = __isInternal ? this.state.internalValue : value;

      if (_value == undefined) _value = null;
      var sliderValue = _value == null && min ? min : _value;
      return /*#__PURE__*/_react["default"].createElement(_col["default"], {
        style: {
          display: 'inline-flex'
        }
      }, /*#__PURE__*/_react["default"].createElement(_col["default"], {
        style: {
          "float": 'left',
          marginRight: '5px'
        }
      }, /*#__PURE__*/_react["default"].createElement(_inputNumber["default"], _extends({
        size: renderSize,
        ref: "num",
        value: _value,
        min: min,
        max: max,
        step: step,
        placeholder: placeholder,
        onChange: this.handleChange
      }, customProps))), /*#__PURE__*/_react["default"].createElement(_col["default"], {
        style: {
          "float": 'left',
          width: _customProps.width || '300px'
        }
      }, /*#__PURE__*/_react["default"].createElement(_slider["default"], _extends({
        ref: "slider",
        value: sliderValue,
        tipFormatter: this.tipFormatter,
        min: min,
        max: max,
        included: false,
        step: step,
        marks: marks,
        onChange: this.handleChange
      }, customProps))), /*#__PURE__*/_react["default"].createElement(_col["default"], {
        style: {
          clear: 'both'
        }
      }));
    }
  }]);

  return SliderWidget;
}(_react.PureComponent);

exports["default"] = SliderWidget;
SliderWidget.propTypes = {
  setValue: _propTypes["default"].func.isRequired,
  placeholder: _propTypes["default"].string,
  config: _propTypes["default"].object.isRequired,
  field: _propTypes["default"].string.isRequired,
  value: _propTypes["default"].number,
  customProps: _propTypes["default"].object,
  fieldDefinition: _propTypes["default"].object,
  // from fieldSettings:
  min: _propTypes["default"].number,
  max: _propTypes["default"].number,
  step: _propTypes["default"].number,
  marks: _propTypes["default"].object
};
SliderWidget.defaultProps = {
  min: 0,
  max: 100,
  step: 1,
  marks: undefined
};