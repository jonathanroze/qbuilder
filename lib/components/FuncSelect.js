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

var _clone = _interopRequireDefault(require("clone"));

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

//tip: this.props.value - right value, this.props.field - left value
var FuncSelect = /*#__PURE__*/function (_PureComponent) {
  _inherits(FuncSelect, _PureComponent);

  var _super = _createSuper(FuncSelect);

  function FuncSelect(props) {
    var _this;

    _classCallCheck(this, FuncSelect);

    _this = _super.call(this, props);

    _this.componentWillReceiveProps(props);

    return _this;
  }

  _createClass(FuncSelect, [{
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      var prevProps = this.props;
      var keysForItems = ["config", "field", "operator"];
      var keysForMeta = ["config", "field", "value"];
      var needUpdateItems = !this.items || keysForItems.map(function (k) {
        return nextProps[k] !== prevProps[k];
      }).filter(function (ch) {
        return ch;
      }).length > 0;
      var needUpdateMeta = !this.meta || keysForMeta.map(function (k) {
        return nextProps[k] !== prevProps[k];
      }).filter(function (ch) {
        return ch;
      }).length > 0;

      if (needUpdateItems) {
        this.items = this.getItems(nextProps);
      }

      if (needUpdateMeta) {
        this.meta = this.getMeta(nextProps);
      }
    }
  }, {
    key: "getItems",
    value: function getItems(_ref) {
      var config = _ref.config,
          field = _ref.field,
          operator = _ref.operator;
      var canUseFuncForField = config.settings.canUseFuncForField;
      var filteredFuncs = this.filterFuncs(config, config.funcs, field, operator, canUseFuncForField);
      var items = this.buildOptions(config, filteredFuncs);
      return items;
    }
  }, {
    key: "getMeta",
    value: function getMeta(_ref2) {
      var config = _ref2.config,
          field = _ref2.field,
          value = _ref2.value;
      var _config$settings = config.settings,
          funcPlaceholder = _config$settings.funcPlaceholder,
          fieldSeparatorDisplay = _config$settings.fieldSeparatorDisplay;
      var selectedFuncKey = value;
      var isFuncSelected = !!value;
      var leftFieldConfig = (0, _configUtils.getFieldConfig)(field, config);
      var leftFieldWidgetField = leftFieldConfig.widgets.field;
      var leftFieldWidgetFieldProps = leftFieldWidgetField && leftFieldWidgetField.widgetProps || {};
      var placeholder = !isFuncSelected ? funcPlaceholder : null;
      var currFunc = isFuncSelected ? (0, _configUtils.getFuncConfig)(selectedFuncKey, config) : null;
      var selectedOpts = currFunc || {};
      var selectedKeys = (0, _configUtils.getFieldPath)(selectedFuncKey, config);
      var selectedPath = (0, _configUtils.getFieldPath)(selectedFuncKey, config, true);
      var selectedLabel = this.getFuncLabel(currFunc, selectedFuncKey, config);
      var partsLabels = (0, _configUtils.getFuncPathLabels)(selectedFuncKey, config);
      var selectedFullLabel = partsLabels ? partsLabels.join(fieldSeparatorDisplay) : null;
      if (selectedFullLabel == selectedLabel) selectedFullLabel = null;
      return {
        placeholder: placeholder,
        selectedKey: selectedFuncKey,
        selectedKeys: selectedKeys,
        selectedPath: selectedPath,
        selectedLabel: selectedLabel,
        selectedOpts: selectedOpts,
        selectedFullLabel: selectedFullLabel
      };
    }
  }, {
    key: "filterFuncs",
    value: function filterFuncs(config, funcs, leftFieldFullkey, operator, canUseFuncForField) {
      funcs = (0, _clone["default"])(funcs);
      var fieldSeparator = config.settings.fieldSeparator;
      var leftFieldConfig = (0, _configUtils.getFieldConfig)(leftFieldFullkey, config);
      var expectedType;
      var widget = (0, _configUtils.getWidgetForFieldOp)(config, leftFieldFullkey, operator, 'value');

      if (widget) {
        var widgetConfig = config.widgets[widget];
        var widgetType = widgetConfig.type; //expectedType = leftFieldConfig.type;

        expectedType = widgetType;
      } else {
        expectedType = leftFieldConfig.type;
      }

      function _filter(list, path) {
        for (var funcKey in list) {
          var subfields = list[funcKey].subfields;
          var subpath = (path ? path : []).concat(funcKey);
          var funcFullkey = subpath.join(fieldSeparator);
          var funcConfig = (0, _configUtils.getFuncConfig)(funcFullkey, config);

          if (funcConfig.type == "!struct") {
            if (_filter(subfields, subpath) == 0) delete list[funcKey];
          } else {
            var canUse = funcConfig.returnType == expectedType;
            if (leftFieldConfig.funcs) canUse = canUse && leftFieldConfig.funcs.includes(funcFullkey);
            if (canUseFuncForField) canUse = canUse && canUseFuncForField(leftFieldFullkey, leftFieldConfig, funcFullkey, funcConfig, operator);
            if (!canUse) delete list[funcKey];
          }
        }

        return (0, _keys["default"])(list).length;
      }

      _filter(funcs, []);

      return funcs;
    }
  }, {
    key: "buildOptions",
    value: function buildOptions(config, funcs) {
      var _this2 = this;

      var path = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      var optGroupLabel = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
      if (!funcs) return null;
      var _config$settings2 = config.settings,
          fieldSeparator = _config$settings2.fieldSeparator,
          fieldSeparatorDisplay = _config$settings2.fieldSeparatorDisplay;
      var prefix = path ? path.join(fieldSeparator) + fieldSeparator : '';
      return (0, _keys["default"])(funcs).map(function (funcKey) {
        var func = funcs[funcKey];

        var label = _this2.getFuncLabel(func, funcKey, config);

        var partsLabels = (0, _configUtils.getFuncPathLabels)(funcKey, config);
        var fullLabel = partsLabels.join(fieldSeparatorDisplay);
        if (fullLabel == label) fullLabel = null;
        var tooltip = func.tooltip;
        var subpath = (path ? path : []).concat(funcKey);

        if (func.type == "!struct") {
          return {
            key: funcKey,
            path: prefix + funcKey,
            label: label,
            fullLabel: fullLabel,
            tooltip: tooltip,
            items: _this2.buildOptions(config, func.subfields, subpath, label)
          };
        } else {
          return {
            key: funcKey,
            path: prefix + funcKey,
            label: label,
            fullLabel: fullLabel,
            tooltip: tooltip,
            grouplabel: optGroupLabel
          };
        }
      });
    }
  }, {
    key: "getFuncLabel",
    value: function getFuncLabel(funcOpts, funcKey, config) {
      if (!funcKey) return null;
      var fieldSeparator = config.settings.fieldSeparator;
      var maxLabelsLength = config.settings.maxLabelsLength;
      var funcParts = Array.isArray(funcKey) ? funcKey : funcKey.split(fieldSeparator);
      var label = funcOpts.label || (0, _last["default"])(funcParts);
      label = (0, _stuff.truncateString)(label, maxLabelsLength);
      return label;
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          config = _this$props.config,
          customProps = _this$props.customProps,
          setValue = _this$props.setValue;
      var renderFunc = config.settings.renderFunc;

      var renderProps = _objectSpread({
        config: config,
        customProps: customProps,
        setField: setValue,
        items: this.items
      }, this.meta);

      return renderFunc(renderProps);
    }
  }]);

  return FuncSelect;
}(_react.PureComponent);

exports["default"] = FuncSelect;
FuncSelect.propTypes = {
  config: _propTypes["default"].object.isRequired,
  field: _propTypes["default"].string.isRequired,
  operator: _propTypes["default"].string.isRequired,
  customProps: _propTypes["default"].object,
  value: _propTypes["default"].string,
  setValue: _propTypes["default"].func.isRequired
};