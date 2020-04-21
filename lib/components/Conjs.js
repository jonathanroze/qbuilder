"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ConjsRadios = exports.ConjsButtons = void 0;

var _button = _interopRequireDefault(require("antd/lib/button"));

var _radio = _interopRequireDefault(require("antd/lib/radio"));

var _react = _interopRequireWildcard(require("react"));

var _map = _interopRequireDefault(require("lodash/map"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

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

var RadioButton = _radio["default"].Button;
var RadioGroup = _radio["default"].Group;
var ButtonGroup = _button["default"].Group;

var ConjsButton = /*#__PURE__*/function (_PureComponent) {
  _inherits(ConjsButton, _PureComponent);

  var _super = _createSuper(ConjsButton);

  function ConjsButton() {
    var _this;

    _classCallCheck(this, ConjsButton);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _this.onClick = function (e) {
      var item = _this.props.item;

      _this.props.setConjunction(e, item.key);
    };

    return _this;
  }

  _createClass(ConjsButton, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          disabled = _this$props.disabled,
          item = _this$props.item;
      return /*#__PURE__*/_react["default"].createElement(_button["default"], {
        disabled: disabled,
        type: item.checked ? "primary" : null,
        onClick: this.onClick
      }, item.label);
    }
  }]);

  return ConjsButton;
}(_react.PureComponent);

var ConjsButtons = /*#__PURE__*/function (_PureComponent2) {
  _inherits(ConjsButtons, _PureComponent2);

  var _super2 = _createSuper(ConjsButtons);

  function ConjsButtons() {
    _classCallCheck(this, ConjsButtons);

    return _super2.apply(this, arguments);
  }

  _createClass(ConjsButtons, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props2 = this.props,
          disabled = _this$props2.disabled,
          not = _this$props2.not,
          setNot = _this$props2.setNot,
          conjunctionOptions = _this$props2.conjunctionOptions,
          config = _this$props2.config,
          setConjunction = _this$props2.setConjunction;
      return /*#__PURE__*/_react["default"].createElement(ButtonGroup, {
        key: "group-conjs-buttons",
        size: config.settings.renderSize,
        disabled: disabled
      }, config.settings.showNot && /*#__PURE__*/_react["default"].createElement(_button["default"], {
        key: "group-not",
        onClick: function onClick(ev) {
          return setNot(ev, !_this2.props.not);
        },
        type: not ? "primary" : null
      }, config.settings.notLabel), (0, _map["default"])(conjunctionOptions, function (item, index) {
        return /*#__PURE__*/_react["default"].createElement(ConjsButton, {
          key: item.id,
          item: item,
          disabled: disabled,
          setConjunction: setConjunction
        });
      }));
    }
  }]);

  return ConjsButtons;
}(_react.PureComponent);

exports.ConjsButtons = ConjsButtons;

var ConjsRadios = /*#__PURE__*/function (_PureComponent3) {
  _inherits(ConjsRadios, _PureComponent3);

  var _super3 = _createSuper(ConjsRadios);

  function ConjsRadios() {
    _classCallCheck(this, ConjsRadios);

    return _super3.apply(this, arguments);
  }

  _createClass(ConjsRadios, [{
    key: "render",
    value: function render() {
      var _this$props3 = this.props,
          disabled = _this$props3.disabled,
          selectedConjunction = _this$props3.selectedConjunction,
          setConjunction = _this$props3.setConjunction,
          conjunctionOptions = _this$props3.conjunctionOptions,
          config = _this$props3.config;
      return /*#__PURE__*/_react["default"].createElement(RadioGroup, {
        key: "group-conjs-radios",
        disabled: disabled,
        value: selectedConjunction,
        size: config.settings.renderSize,
        onChange: setConjunction
      }, (0, _map["default"])(conjunctionOptions, function (item, index) {
        return /*#__PURE__*/_react["default"].createElement(RadioButton, {
          key: item.id,
          value: item.key //checked={item.checked}

        }, item.label);
      }));
    }
  }]);

  return ConjsRadios;
}(_react.PureComponent);

exports.ConjsRadios = ConjsRadios;