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

var RangeWidget = /*#__PURE__*/function (_PureComponent) {
  _inherits(RangeWidget, _PureComponent);

  var _super = _createSuper(RangeWidget);

  function RangeWidget() {
    var _this;

    _classCallCheck(this, RangeWidget);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));
    _this.state = {};

    _this.handleChange = function (value) {
      _this.props.setValue(value);
    };

    _this.handleChangeFrom = function (valueFrom) {
      var value = _this.props.value || [undefined, undefined];
      if (valueFrom == '' || valueFrom == null) valueFrom = value[0];
      value = _toConsumableArray(value);
      value[0] = valueFrom;
      if (value[1] == undefined) value[1] = valueFrom;

      _this.props.setValue(value);
    };

    _this.handleChangeTo = function (valueTo) {
      var value = _this.props.value || [undefined, undefined];
      if (valueTo == '' || valueTo == null) valueTo = value[1];
      value = _toConsumableArray(value);
      value[1] = valueTo;
      if (value[0] == undefined) value[0] = valueTo;

      _this.props.setValue(value);
    };

    _this.tipFormatter = function (val) {
      return val != undefined ? val.toString() : '';
    };

    return _this;
  }

  _createClass(RangeWidget, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          config = _this$props.config,
          placeholder = _this$props.placeholder,
          placeholders = _this$props.placeholders,
          customProps = _this$props.customProps,
          value = _this$props.value,
          min = _this$props.min,
          max = _this$props.max,
          step = _this$props.step,
          marks = _this$props.marks,
          textSeparators = _this$props.textSeparators;
      var renderSize = config.settings.renderSize;

      var _customProps = customProps || {};

      var _value = value != undefined ? value : undefined;

      var _ref = _value || [null, null],
          _ref2 = _slicedToArray(_ref, 2),
          valueFrom = _ref2[0],
          valueTo = _ref2[1];

      if (_value && (valueFrom == undefined || valueTo == undefined)) {
        // happens if we change value source - this leads to incomplete slider value, fix it:
        if (valueFrom == undefined) this.handleChangeTo(valueTo);
        if (valueTo == undefined) this.handleChangeFrom(valueFrom);
        return null;
      }

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
        ref: "numFrom",
        key: "numFrom",
        value: valueFrom,
        min: min,
        max: max,
        step: step,
        placeholder: placeholders[0],
        onChange: this.handleChangeFrom
      }, customProps))), /*#__PURE__*/_react["default"].createElement(_col["default"], {
        style: {
          "float": 'left',
          marginRight: '5px',
          lineHeight: '20px'
        }
      }, /*#__PURE__*/_react["default"].createElement("span", null, textSeparators[1])), /*#__PURE__*/_react["default"].createElement(_col["default"], {
        style: {
          "float": 'left',
          marginRight: '5px'
        }
      }, /*#__PURE__*/_react["default"].createElement(_inputNumber["default"], _extends({
        size: renderSize,
        ref: "numTo",
        key: "numTo",
        value: valueTo,
        min: min,
        max: max,
        step: step,
        placeholder: placeholders[1],
        onChange: this.handleChangeTo
      }, customProps))), /*#__PURE__*/_react["default"].createElement(_col["default"], {
        style: {
          "float": 'left',
          width: _customProps.width || '300px'
        }
      }, /*#__PURE__*/_react["default"].createElement(_slider["default"], _extends({
        ref: "slider",
        value: _value,
        tipFormatter: this.tipFormatter,
        min: min,
        max: max,
        step: step,
        marks: marks,
        included: false,
        range: true //placeholder={placeholder}
        ,
        onChange: this.handleChange
      }, customProps))), /*#__PURE__*/_react["default"].createElement(_col["default"], {
        style: {
          clear: 'both'
        }
      }));
    }
  }]);

  return RangeWidget;
}(_react.PureComponent);

exports["default"] = RangeWidget;
RangeWidget.propTypes = {
  setValue: _propTypes["default"].func.isRequired,
  placeholder: _propTypes["default"].string,
  placeholders: _propTypes["default"].array,
  textSeparators: _propTypes["default"].array,
  config: _propTypes["default"].object.isRequired,
  field: _propTypes["default"].string.isRequired,
  value: _propTypes["default"].array,
  customProps: _propTypes["default"].object,
  fieldDefinition: _propTypes["default"].object,
  // from fieldSettings:
  min: _propTypes["default"].number,
  max: _propTypes["default"].number,
  step: _propTypes["default"].number,
  marks: _propTypes["default"].object
};
RangeWidget.defaultProps = {
  min: 0,
  max: 100,
  step: 1,
  marks: undefined
};