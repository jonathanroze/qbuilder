"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.settings = void 0;

var _en_US = _interopRequireDefault(require("antd/lib/locale-provider/en_US"));

var Widgets = _interopRequireWildcard(require("../components/widgets/index.js"));

var _react = _interopRequireDefault(require("react"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var FieldSelect = Widgets.FieldSelect,
    FieldDropdown = Widgets.FieldDropdown,
    FieldCascader = Widgets.FieldCascader,
    VanillaFieldSelect = Widgets.VanillaFieldSelect;
var settings = {
  formatField: function formatField(field, parts, label2, fieldDefinition, config, isForDisplay) {
    if (isForDisplay) return label2;else return field;
  },
  renderField: function renderField(props) {
    return /*#__PURE__*/_react["default"].createElement(FieldSelect, props);
  },
  // renderField: (props) => <FieldDropdown {...props} />,
  // renderField: (props) => <FieldCascader {...props} />,
  // renderField: (props) => <VanillaFieldSelect {...props} />,
  renderOperator: function renderOperator(props) {
    return /*#__PURE__*/_react["default"].createElement(FieldSelect, props);
  },
  // renderOperator: (props) => <FieldDropdown {...props} />,
  // renderOperator: (props) => <VanillaFieldSelect {...props} />,
  renderFunc: function renderFunc(props) {
    return /*#__PURE__*/_react["default"].createElement(FieldSelect, props);
  },
  valueSourcesInfo: {
    value: {}
  },
  fieldSeparator: '.',
  fieldSeparatorDisplay: '.',
  renderSize: "small",
  maxLabelsLength: 100,
  hideConjForOne: true,
  canReorder: true,
  canRegroup: true,
  showNot: true,
  groupActionsPosition: 'topRight',
  // oneOf [topLeft, topCenter, topRight, bottomLeft, bottomCenter, bottomRight]
  setOpOnChangeField: ['keep', 'default'],
  // 'default' (default if present), 'keep' (keep prev from last field), 'first', 'none'
  // localization
  locale: {
    "short": 'en',
    full: 'en-US',
    antd: _en_US["default"]
  },
  valueLabel: "Value",
  valuePlaceholder: "Value",
  fieldLabel: "Field",
  operatorLabel: "Operator",
  funcLabel: "Function",
  fieldPlaceholder: "Select field",
  funcPlaceholder: "Select function",
  operatorPlaceholder: "Select operator",
  deleteLabel: null,
  addGroupLabel: "Add group",
  addRuleLabel: "Add rule",
  delGroupLabel: null,
  notLabel: "Not",
  valueSourcesPopupTitle: "Select value source",
  removeRuleConfirmOptions: null,
  removeGroupConfirmOptions: null
};
exports.settings = settings;