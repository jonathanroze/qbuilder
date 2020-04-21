"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _icon = _interopRequireDefault(require("antd/lib/icon"));

var _modal = _interopRequireDefault(require("antd/lib/modal"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _startsWith = _interopRequireDefault(require("lodash/startsWith"));

var _GroupContainer = _interopRequireDefault(require("./containers/GroupContainer"));

var _Draggable = _interopRequireDefault(require("./containers/Draggable"));

var _Item = _interopRequireDefault(require("./Item"));

var _Conjs = require("./Conjs");

var _Actions = require("./Actions");

var _dec, _class, _class2, _temp;

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

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

var confirm = _modal["default"].confirm;

var classNames = require('classnames');

var defaultPosition = 'topRight';
var Group = (_dec = (0, _Draggable["default"])("group"), (0, _GroupContainer["default"])(_class = _dec(_class = (_temp = _class2 = /*#__PURE__*/function (_PureComponent) {
  _inherits(Group, _PureComponent);

  var _super = _createSuper(Group);

  function Group() {
    var _this;

    _classCallCheck(this, Group);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _this.isGroupTopPosition = function () {
      return (0, _startsWith["default"])(_this.props.config.settings.groupActionsPosition || defaultPosition, 'top');
    };

    _this.removeSelf = function () {
      var confirmOptions = _this.props.config.settings.removeGroupConfirmOptions;

      var doRemove = function doRemove() {
        _this.props.removeSelf();
      };

      if (confirmOptions && !_this.isEmptyCurrentGroup()) {
        confirm(_objectSpread({}, confirmOptions, {
          onOk: doRemove,
          onCancel: null
        }));
      } else {
        doRemove();
      }
    };

    _this.isEmptyCurrentGroup = function () {
      var children = _this.props.children1;
      return children.size == 0 || children.size == 1 && _this.isEmpty(children.first());
    };

    _this.isEmpty = function (item) {
      return item.get("type") == "group" ? _this.isEmptyGroup(item) : _this.isEmptyRule(item);
    };

    _this.isEmptyGroup = function (group) {
      var children = group.get("children1");
      return children.size == 0 || children.size == 1 && _this.isEmpty(children.first());
    };

    _this.isEmptyRule = function (rule) {
      var properties = rule.get('properties');
      return !(properties.get("field") !== null && properties.get("operator") !== null && properties.get("value").filter(function (val) {
        return val !== undefined;
      }).size > 0);
    };

    _this.renderActions = function () {
      return /*#__PURE__*/_react["default"].createElement(_Actions.Actions, {
        config: _this.props.config,
        addRule: _this.props.addRule,
        addGroup: _this.props.addGroup,
        allowFurtherNesting: _this.props.allowFurtherNesting,
        isRoot: _this.props.isRoot,
        removeSelf: _this.removeSelf
      });
    };

    _this.renderChildren = function () {
      var props = _this.props;
      return props.children1 ? props.children1.map(function (item) {
        return /*#__PURE__*/_react["default"].createElement(_Item["default"], {
          key: item.get('id'),
          id: item.get('id') //path={props.path.push(item.get('id'))}
          ,
          path: item.get('path'),
          type: item.get('type'),
          properties: item.get('properties'),
          config: props.config,
          actions: props.actions,
          children1: item.get('children1') //tree={props.tree}
          ,
          treeNodesCnt: props.treeNodesCnt,
          onDragStart: props.onDragStart
        });
      }).toList() : null;
    };

    _this.renderHeader = function () {
      var Conjs = _this.props.config.settings.renderConjsAsRadios ? _Conjs.ConjsRadios : _Conjs.ConjsButtons;

      var conjs = /*#__PURE__*/_react["default"].createElement(Conjs, {
        disabled: _this.props.children1.size < 2,
        selectedConjunction: _this.props.selectedConjunction,
        setConjunction: _this.props.setConjunction,
        conjunctionOptions: _this.props.conjunctionOptions,
        config: _this.props.config,
        not: _this.props.not,
        setNot: _this.props.setNot
      });

      var showDragIcon = _this.props.config.settings.canReorder && _this.props.treeNodesCnt > 2 && !_this.props.isRoot;

      var drag = showDragIcon && /*#__PURE__*/_react["default"].createElement("span", {
        key: "group-drag-icon",
        className: "qb-drag-handler group--drag-handler",
        onMouseDown: _this.props.handleDraggerMouseDown
      }, /*#__PURE__*/_react["default"].createElement(_icon["default"], {
        type: "bars"
      }), " ");

      return /*#__PURE__*/_react["default"].createElement("div", {
        className: classNames("group--conjunctions" // this.props.children1.size < 2 && this.props.config.settings.hideConjForOne ? 'hide--conj' : ''
        )
      }, conjs, drag);
    };

    return _this;
  }

  _createClass(Group, [{
    key: "render",
    value: function render() {
      var isGroupTopPosition = this.isGroupTopPosition();
      return [/*#__PURE__*/_react["default"].createElement("div", {
        key: "group-header",
        className: "group--header"
      }, this.renderHeader(), isGroupTopPosition && this.renderActions()), this.props.children1 && /*#__PURE__*/_react["default"].createElement("div", {
        key: "group-children",
        className: classNames("group--children", this.props.children1.size < 2 && this.props.config.settings.hideConjForOne ? 'hide--line' : '')
      }, this.renderChildren()), !isGroupTopPosition && /*#__PURE__*/_react["default"].createElement("div", {
        key: "group-footer",
        className: "group--footer"
      }, this.renderActions())];
    }
  }]);

  return Group;
}(_react.PureComponent), _class2.propTypes = {
  //tree: PropTypes.instanceOf(Immutable.Map).isRequired,
  treeNodesCnt: _propTypes["default"].number,
  conjunctionOptions: _propTypes["default"].object.isRequired,
  allowFurtherNesting: _propTypes["default"].bool.isRequired,
  isRoot: _propTypes["default"].bool.isRequired,
  not: _propTypes["default"].bool,
  selectedConjunction: _propTypes["default"].string,
  config: _propTypes["default"].object.isRequired,
  id: _propTypes["default"].string.isRequired,
  path: _propTypes["default"].any,
  //instanceOf(Immutable.List)
  children1: _propTypes["default"].any,
  //instanceOf(Immutable.OrderedMap)
  isDraggingMe: _propTypes["default"].bool,
  isDraggingTempo: _propTypes["default"].bool,
  //actions
  handleDraggerMouseDown: _propTypes["default"].func,
  onDragStart: _propTypes["default"].func,
  addRule: _propTypes["default"].func.isRequired,
  addGroup: _propTypes["default"].func.isRequired,
  removeSelf: _propTypes["default"].func.isRequired,
  setConjunction: _propTypes["default"].func.isRequired,
  setNot: _propTypes["default"].func.isRequired,
  actions: _propTypes["default"].object.isRequired
}, _temp)) || _class) || _class);
var _default = Group;
exports["default"] = _default;