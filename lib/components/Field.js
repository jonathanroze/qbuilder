"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _configUtils = require("../utils/configUtils");

var _stuff = require("../utils/stuff");

var _last = _interopRequireDefault(require("lodash/last"));

var _keys = _interopRequireDefault(require("lodash/keys"));

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

var Field = /*#__PURE__*/function (_PureComponent) {
  _inherits(Field, _PureComponent);

  var _super = _createSuper(Field);

  function Field(props) {
    var _this;

    _classCallCheck(this, Field);

    _this = _super.call(this, props);

    _this.componentWillReceiveProps(props);

    return _this;
  }

  _createClass(Field, [{
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      var prevProps = this.props;
      var keysForMeta = ["selectedField", "config"];
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
      var selectedField = _ref.selectedField,
          config = _ref.config;
      var selectedKey = selectedField;
      var _config$settings = config.settings,
          maxLabelsLength = _config$settings.maxLabelsLength,
          fieldSeparatorDisplay = _config$settings.fieldSeparatorDisplay,
          fieldPlaceholder = _config$settings.fieldPlaceholder;
      var placeholder = !isFieldSelected ? (0, _stuff.truncateString)(fieldPlaceholder, maxLabelsLength) : null;
      var isFieldSelected = !!selectedField;
      var currField = isFieldSelected ? (0, _configUtils.getFieldConfig)(selectedKey, config) : null;
      var selectedOpts = currField || {};
      var selectedKeys = (0, _configUtils.getFieldPath)(selectedKey, config);
      var selectedPath = (0, _configUtils.getFieldPath)(selectedKey, config, true);
      var selectedLabel = this.getFieldLabel(currField, selectedKey, config);
      var partsLabels = (0, _configUtils.getFieldPathLabels)(selectedKey, config);
      var selectedFullLabel = partsLabels ? partsLabels.join(fieldSeparatorDisplay) : null;
      if (selectedFullLabel == selectedLabel) selectedFullLabel = null;
      var selectedAltLabel = selectedOpts.label2;
      var items = this.buildOptions(config, config.fields);
      return {
        placeholder: placeholder,
        items: items,
        selectedKey: selectedKey,
        selectedKeys: selectedKeys,
        selectedPath: selectedPath,
        selectedLabel: selectedLabel,
        selectedOpts: selectedOpts,
        selectedAltLabel: selectedAltLabel,
        selectedFullLabel: selectedFullLabel
      };
    }
  }, {
    key: "getFieldLabel",
    value: function getFieldLabel(fieldOpts, fieldKey, config) {
      if (!fieldKey) return null;
      var fieldSeparator = config.settings.fieldSeparator;
      var maxLabelsLength = config.settings.maxLabelsLength;
      var fieldParts = Array.isArray(fieldKey) ? fieldKey : fieldKey.split(fieldSeparator);
      var label = fieldOpts.label || (0, _last["default"])(fieldParts);
      label = (0, _stuff.truncateString)(label, maxLabelsLength);
      return label;
    }
  }, {
    key: "buildOptions",
    value: function buildOptions(config, fields) {
      var _this2 = this;

      var path = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      var optGroupLabel = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
      if (!fields) return null;
      var _config$settings2 = config.settings,
          fieldSeparator = _config$settings2.fieldSeparator,
          fieldSeparatorDisplay = _config$settings2.fieldSeparatorDisplay;
      var prefix = path ? path.join(fieldSeparator) + fieldSeparator : '';
      return (0, _keys["default"])(fields).map(function (fieldKey) {
        var field = fields[fieldKey];

        var label = _this2.getFieldLabel(field, fieldKey, config);

        var partsLabels = (0, _configUtils.getFieldPathLabels)(fieldKey, config);
        var fullLabel = partsLabels.join(fieldSeparatorDisplay);
        if (fullLabel == label) fullLabel = null;
        var altLabel = field.label2;
        var tooltip = field.tooltip;
        var subpath = (path ? path : []).concat(fieldKey);
        if (field.hideForSelect) return undefined;

        if (field.type == "!struct") {
          return {
            key: fieldKey,
            path: prefix + fieldKey,
            label: label,
            fullLabel: fullLabel,
            altLabel: altLabel,
            tooltip: tooltip,
            items: _this2.buildOptions(config, field.subfields, subpath, label)
          };
        } else {
          return {
            key: fieldKey,
            path: prefix + fieldKey,
            label: label,
            fullLabel: fullLabel,
            altLabel: altLabel,
            tooltip: tooltip,
            grouplabel: optGroupLabel
          };
        }
      }).filter(function (o) {
        return !!o;
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          config = _this$props.config,
          customProps = _this$props.customProps,
          setField = _this$props.setField;
      var renderField = config.settings.renderField;

      var renderProps = _objectSpread({
        config: config,
        customProps: customProps,
        setField: setField
      }, this.meta);

      return renderField(renderProps);
    }
  }]);

  return Field;
}(_react.PureComponent);

exports["default"] = Field;
Field.propTypes = {
  config: _propTypes["default"].object.isRequired,
  selectedField: _propTypes["default"].string,
  customProps: _propTypes["default"].object,
  //actions
  setField: _propTypes["default"].func.isRequired
};