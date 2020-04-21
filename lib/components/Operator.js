"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _configUtils = require("../utils/configUtils");

var _keys = _interopRequireDefault(require("lodash/keys"));

var _pickBy = _interopRequireDefault(require("lodash/pickBy"));

var _mapValues = _interopRequireDefault(require("lodash/mapValues"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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

var Operator = /*#__PURE__*/function (_PureComponent) {
  _inherits(Operator, _PureComponent);

  var _super = _createSuper(Operator);

  function Operator(props) {
    var _this;

    _classCallCheck(this, Operator);

    _this = _super.call(this, props);

    _this.componentWillReceiveProps(props);

    return _this;
  }

  _createClass(Operator, [{
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      var prevProps = this.props;
      var keysForMeta = ["config", "selectedField", "selectedOperator"];
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
    value: function getMeta(_ref) {
      var config = _ref.config,
          selectedField = _ref.selectedField,
          selectedOperator = _ref.selectedOperator;
      var fieldConfig = (0, _configUtils.getFieldConfig)(selectedField, config);
      var operatorOptions = (0, _mapValues["default"])((0, _pickBy["default"])(config.operators, function (item, key) {
        return fieldConfig && fieldConfig.operators && fieldConfig.operators.indexOf(key) !== -1;
      }));
      var items = this.buildOptions(config, operatorOptions);
      var isOpSelected = !!selectedOperator;
      var currOp = isOpSelected ? operatorOptions[selectedOperator] : null;
      var selectedOpts = currOp || {};
      var placeholder = this.props.config.settings.operatorPlaceholder;
      var selectedKey = selectedOperator;
      var selectedKeys = isOpSelected ? [selectedKey] : null;
      var selectedPath = selectedKeys;
      var selectedLabel = selectedOpts.label;
      return {
        placeholder: placeholder,
        items: items,
        selectedKey: selectedKey,
        selectedKeys: selectedKeys,
        selectedPath: selectedPath,
        selectedLabel: selectedLabel,
        selectedOpts: selectedOpts
      };
    }
  }, {
    key: "buildOptions",
    value: function buildOptions(config, fields) {
      if (!fields) return null;
      return (0, _keys["default"])(fields).map(function (fieldKey) {
        var field = fields[fieldKey];
        var label = field.label;
        return {
          key: fieldKey,
          path: fieldKey,
          label: label
        };
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          config = _this$props.config,
          customProps = _this$props.customProps,
          setOperator = _this$props.setOperator;
      var renderOperator = config.settings.renderOperator;

      var renderProps = _objectSpread({
        config: config,
        customProps: customProps,
        setField: setOperator
      }, this.meta);

      return renderOperator(renderProps);
    }
  }]);

  return Operator;
}(_react.PureComponent);

exports["default"] = Operator;
Operator.propTypes = {
  config: _propTypes["default"].object.isRequired,
  selectedField: _propTypes["default"].string,
  selectedOperator: _propTypes["default"].string,
  //actions
  setOperator: _propTypes["default"].func.isRequired
};