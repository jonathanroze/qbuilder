"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _select = _interopRequireDefault(require("antd/lib/select"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _map = _interopRequireDefault(require("lodash/map"));

var _stuff = require("../../../utils/stuff");

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

var Option = _select["default"].Option;

var MultiSelectWidget = /*#__PURE__*/function (_PureComponent) {
  _inherits(MultiSelectWidget, _PureComponent);

  var _super = _createSuper(MultiSelectWidget);

  function MultiSelectWidget(props) {
    var _this;

    _classCallCheck(this, MultiSelectWidget);

    _this = _super.call(this, props);

    _this.handleChange = function (val) {
      if (val && !val.length) val = undefined; //not allow []

      _this.props.setValue(val);
    };

    _this.filterOption = function (input, option) {
      return option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;
    };

    _this.onPropsChanged(props);

    return _this;
  }

  _createClass(MultiSelectWidget, [{
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(props) {
      this.onPropsChanged(props);
    }
  }, {
    key: "onPropsChanged",
    value: function onPropsChanged(props) {
      var listValues = props.listValues;
      var optionsMaxWidth = 0;
      (0, _map["default"])(listValues, function (label, value) {
        optionsMaxWidth = Math.max(optionsMaxWidth, (0, _stuff.calcTextWidth)(label));
      });
      this.optionsMaxWidth = optionsMaxWidth;
      this.options = (0, _map["default"])(listValues, function (label, value) {
        return /*#__PURE__*/_react["default"].createElement(Option, {
          key: value,
          value: value
        }, label);
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          config = _this$props.config,
          placeholder = _this$props.placeholder,
          allowCustomValues = _this$props.allowCustomValues,
          customProps = _this$props.customProps,
          value = _this$props.value;
      var renderSize = config.settings.renderSize;
      var placeholderWidth = (0, _stuff.calcTextWidth)(placeholder);

      var _value = value && value.length ? value : undefined;

      var width = _value ? null : placeholderWidth + _stuff.SELECT_WIDTH_OFFSET_RIGHT;
      var dropdownWidth = this.optionsMaxWidth + _stuff.SELECT_WIDTH_OFFSET_RIGHT;
      return /*#__PURE__*/_react["default"].createElement(_select["default"], _extends({
        mode: allowCustomValues ? "tags" : "multiple",
        style: {
          minWidth: width,
          width: width
        },
        dropdownStyle: {
          width: dropdownWidth
        },
        key: "widget-multiselect",
        dropdownMatchSelectWidth: false,
        ref: "val",
        placeholder: placeholder,
        size: renderSize,
        value: _value,
        onChange: this.handleChange,
        filterOption: this.filterOption
      }, customProps), this.options);
    }
  }]);

  return MultiSelectWidget;
}(_react.PureComponent);

exports["default"] = MultiSelectWidget;
MultiSelectWidget.propTypes = {
  setValue: _propTypes["default"].func.isRequired,
  config: _propTypes["default"].object.isRequired,
  value: _propTypes["default"].array,
  field: _propTypes["default"].string.isRequired,
  placeholder: _propTypes["default"].string,
  customProps: _propTypes["default"].object,
  fieldDefinition: _propTypes["default"].object,
  // from fieldSettings:
  listValues: _propTypes["default"].object,
  allowCustomValues: _propTypes["default"].bool
};