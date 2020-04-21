"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _mapValues = _interopRequireDefault(require("lodash/mapValues"));

var _reactAddonsPureRenderMixin = _interopRequireDefault(require("react-addons-pure-render-mixin"));

var _reactRedux = require("react-redux");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

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

var _default = function _default(Group) {
  var GroupContainer = /*#__PURE__*/function (_Component) {
    _inherits(GroupContainer, _Component);

    var _super = _createSuper(GroupContainer);

    function GroupContainer(props) {
      var _this;

      _classCallCheck(this, GroupContainer);

      _this = _super.call(this, props);
      _this.pureShouldComponentUpdate = _reactAddonsPureRenderMixin["default"].shouldComponentUpdate.bind(_assertThisInitialized(_this));

      _this.setConjunction = function () {
        var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
        var conj = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

        if (!conj && e) {
          //for RadioGroup
          conj = e.target.value;
        }

        _this.props.actions.setConjunction(_this.props.path, conj);
      };

      _this.setNot = function () {
        var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
        var not = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

        _this.props.actions.setNot(_this.props.path, not);
      };

      _this.dummyFn = function () {};

      _this.removeSelf = function () {
        _this.props.actions.removeGroup(_this.props.path);
      };

      _this.addGroup = function () {
        _this.props.actions.addGroup(_this.props.path);
      };

      _this.addRule = function () {
        _this.props.actions.addRule(_this.props.path);
      };

      _this.conjunctionOptions = _this._getConjunctionOptions(props);
      return _this;
    }

    _createClass(GroupContainer, [{
      key: "shouldComponentUpdate",
      value: function shouldComponentUpdate(nextProps, nextState) {
        var prevProps = this.props;
        var prevState = this.state;
        var should = this.pureShouldComponentUpdate(nextProps, nextState);

        if (should) {
          if (prevState == nextState && prevProps != nextProps) {
            var draggingId = nextProps.dragging.id || prevProps.dragging.id;
            var isDraggingMe = draggingId == nextProps.id;
            var chs = [];

            for (var k in nextProps) {
              var changed = nextProps[k] != prevProps[k];

              if (k == 'dragging' && !isDraggingMe) {
                changed = false; //dragging another item -> ignore
              }

              if (changed) {
                chs.push(k);
              }
            }

            if (!chs.length) should = false;
          }
        }

        return should;
      }
    }, {
      key: "componentWillReceiveProps",
      value: function componentWillReceiveProps(nextProps) {
        var config = nextProps.config,
            id = nextProps.id,
            conjunction = nextProps.conjunction;
        var oldConfig = this.props.config;
        var oldConjunction = this.props.conjunction;

        if (oldConfig != config || oldConjunction != conjunction) {
          this.conjunctionOptions = this._getConjunctionOptions(nextProps);
        }
      }
    }, {
      key: "_getConjunctionOptions",
      value: function _getConjunctionOptions(props) {
        return (0, _mapValues["default"])(props.config.conjunctions, function (item, index) {
          return {
            id: "conjunction-".concat(props.id, "-").concat(index),
            name: "conjunction[".concat(props.id, "]"),
            key: index,
            label: item.label,
            checked: index === props.conjunction
          };
        });
      }
    }, {
      key: "render",
      value: function render() {
        var isDraggingMe = this.props.dragging.id == this.props.id;
        var currentNesting = this.props.path.size;
        var maxNesting = this.props.config.settings.maxNesting; // Don't allow nesting further than the maximum configured depth and don't
        // allow removal of the root group.

        var allowFurtherNesting = typeof maxNesting === 'undefined' || currentNesting < maxNesting;
        var isRoot = currentNesting == 1;
        return /*#__PURE__*/_react["default"].createElement("div", {
          className: 'group-or-rule-container group-container',
          "data-id": this.props.id
        }, [isDraggingMe ? /*#__PURE__*/_react["default"].createElement(Group, {
          key: "dragging",
          id: this.props.id,
          isDraggingMe: isDraggingMe,
          isDraggingTempo: true,
          dragging: this.props.dragging,
          isRoot: isRoot,
          allowFurtherNesting: allowFurtherNesting,
          conjunctionOptions: this.conjunctionOptions,
          not: this.props.not,
          selectedConjunction: this.props.conjunction,
          setConjunction: this.dummyFn,
          setNot: this.dummyFn,
          removeSelf: this.dummyFn,
          addGroup: this.dummyFn,
          addRule: this.dummyFn,
          config: this.props.config,
          children1: this.props.children1,
          actions: this.props.actions //tree={this.props.tree}
          ,
          treeNodesCnt: this.props.treeNodesCnt
        }) : null, /*#__PURE__*/_react["default"].createElement(Group, {
          key: this.props.id,
          id: this.props.id,
          isDraggingMe: isDraggingMe,
          onDragStart: this.props.onDragStart,
          isRoot: isRoot,
          allowFurtherNesting: allowFurtherNesting,
          conjunctionOptions: this.conjunctionOptions,
          not: this.props.not,
          selectedConjunction: this.props.conjunction,
          setConjunction: this.setConjunction,
          setNot: this.setNot,
          removeSelf: this.removeSelf,
          addGroup: this.addGroup,
          addRule: this.addRule,
          config: this.props.config,
          children1: this.props.children1,
          actions: this.props.actions //tree={this.props.tree}
          ,
          treeNodesCnt: this.props.treeNodesCnt
        })]);
      }
    }]);

    return GroupContainer;
  }(_react.Component);

  GroupContainer.propTypes = {
    //tree: PropTypes.instanceOf(Immutable.Map).isRequired,
    config: _propTypes["default"].object.isRequired,
    actions: _propTypes["default"].object.isRequired,
    //{setConjunction: Funciton, removeGroup, addGroup, addRule, ...}
    path: _propTypes["default"].any.isRequired,
    //instanceOf(Immutable.List)
    id: _propTypes["default"].string.isRequired,
    not: _propTypes["default"].bool,
    conjunction: _propTypes["default"].string,
    children1: _propTypes["default"].any,
    //instanceOf(Immutable.OrderedMap)
    onDragStart: _propTypes["default"].func,
    treeNodesCnt: _propTypes["default"].number,
    //connected:
    dragging: _propTypes["default"].object //{id, x, y, w, h}

  };
  ;
  var ConnectedGroupContainer = (0, _reactRedux.connect)(function (state) {
    return {
      dragging: state.dragging
    };
  })(GroupContainer);
  ConnectedGroupContainer.displayName = "ConnectedGroupContainer";
  return ConnectedGroupContainer;
};

exports["default"] = _default;