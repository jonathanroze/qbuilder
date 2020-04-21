"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _tooltip = _interopRequireDefault(require("antd/lib/tooltip"));

var _select = _interopRequireDefault(require("antd/lib/select"));

var _react = _interopRequireWildcard(require("react"));

var _stuff = require("../../../utils/stuff");

var _propTypes = _interopRequireDefault(require("prop-types"));

var _keys = _interopRequireDefault(require("lodash/keys"));

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

var Option = _select["default"].Option,
    OptGroup = _select["default"].OptGroup;

var FieldSelect = /*#__PURE__*/function (_PureComponent) {
  _inherits(FieldSelect, _PureComponent);

  var _super = _createSuper(FieldSelect);

  function FieldSelect() {
    var _this;

    _classCallCheck(this, FieldSelect);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _this.onChange = function (key) {
      _this.props.setField(key);
    };

    _this.filterOption = function (input, option) {
      var keysForFilter = ['title', 'value', 'grouplabel', 'children'];
      var valueForFilter = keysForFilter.map(function (k) {
        return typeof option.props[k] == 'string' ? option.props[k] : '';
      }).join("\0");
      return valueForFilter.toLowerCase().indexOf(input.toLowerCase()) >= 0;
    };

    return _this;
  }

  _createClass(FieldSelect, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          config = _this$props.config,
          customProps = _this$props.customProps,
          items = _this$props.items,
          placeholder = _this$props.placeholder,
          selectedKey = _this$props.selectedKey,
          selectedLabel = _this$props.selectedLabel,
          selectedOpts = _this$props.selectedOpts,
          selectedAltLabel = _this$props.selectedAltLabel,
          selectedFullLabel = _this$props.selectedFullLabel;

      var _ref = customProps || {},
          showSearch = _ref.showSearch;

      var selectText = selectedLabel || placeholder;
      var selectWidth = (0, _stuff.calcTextWidth)(selectText);
      var isFieldSelected = !!selectedKey;
      var dropdownPlacement = config.settings.dropdownPlacement;
      var dropdownAlign = dropdownPlacement ? _stuff.BUILT_IN_PLACEMENTS[dropdownPlacement] : undefined;
      var width = isFieldSelected && !showSearch ? null : selectWidth + _stuff.SELECT_WIDTH_OFFSET_RIGHT;
      var tooltipText = selectedAltLabel || selectedFullLabel;
      if (tooltipText == selectedLabel) tooltipText = null;
      var fieldSelectItems = this.renderSelectItems(items);

      var res = /*#__PURE__*/_react["default"].createElement(_select["default"], _extends({
        dropdownAlign: dropdownAlign,
        dropdownMatchSelectWidth: false,
        style: {
          width: width
        },
        ref: "field",
        placeholder: placeholder,
        size: config.settings.renderSize,
        onChange: this.onChange,
        value: selectedKey || undefined,
        filterOption: this.filterOption
      }, customProps), fieldSelectItems);

      if (tooltipText && !selectedOpts.tooltip) {
        res = /*#__PURE__*/_react["default"].createElement(_tooltip["default"], {
          title: tooltipText
        }, res);
      }

      return res;
    }
  }, {
    key: "renderSelectItems",
    value: function renderSelectItems(fields) {
      var _this2 = this;

      return (0, _keys["default"])(fields).map(function (fieldKey) {
        var field = fields[fieldKey];
        var items = field.items,
            key = field.key,
            path = field.path,
            label = field.label,
            fullLabel = field.fullLabel,
            altLabel = field.altLabel,
            tooltip = field.tooltip,
            grouplabel = field.grouplabel;

        var _path = path || key;

        if (items) {
          return /*#__PURE__*/_react["default"].createElement(OptGroup, {
            key: _path,
            label: label
          }, _this2.renderSelectItems(items));
        } else {
          var option = tooltip ? /*#__PURE__*/_react["default"].createElement(_tooltip["default"], {
            title: tooltip
          }, label) : label;
          return /*#__PURE__*/_react["default"].createElement(Option, {
            key: _path,
            value: _path,
            title: altLabel,
            grouplabel: grouplabel
          }, option);
        }
      });
    }
  }]);

  return FieldSelect;
}(_react.PureComponent);

exports["default"] = FieldSelect;
FieldSelect.propTypes = {
  config: _propTypes["default"].object.isRequired,
  customProps: _propTypes["default"].object,
  items: _propTypes["default"].array.isRequired,
  placeholder: _propTypes["default"].string,
  selectedKey: _propTypes["default"].string,
  selectedKeys: _propTypes["default"].array,
  selectedPath: _propTypes["default"].array,
  selectedLabel: _propTypes["default"].string,
  selectedAltLabel: _propTypes["default"].string,
  selectedFullLabel: _propTypes["default"].string,
  selectedOpts: _propTypes["default"].object,
  //actions
  setField: _propTypes["default"].func.isRequired
};