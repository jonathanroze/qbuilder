"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _immutable = _interopRequireWildcard(require("immutable"));

var _Item = _interopRequireDefault(require("../components/Item"));

var _SortableContainer = _interopRequireDefault(require("./containers/SortableContainer"));

var _treeUtils = require("../utils/treeUtils");

var _uuid = _interopRequireDefault(require("../utils/uuid"));

var _reactAddonsPureRenderMixin = _interopRequireDefault(require("react-addons-pure-render-mixin"));

var _class, _class2, _temp;

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

var Builder = (0, _SortableContainer["default"])(_class = (_temp = _class2 = /*#__PURE__*/function (_Component) {
  _inherits(Builder, _Component);

  var _super = _createSuper(Builder);

  _createClass(Builder, [{
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate(nextProps, nextState) {
      var prevProps = this.props;
      var should = this.pureShouldComponentUpdate(nextProps, nextState);

      if (should) {
        var chs = [];

        for (var k in nextProps) {
          var changed = nextProps[k] !== prevProps[k];

          if (changed && k != '__isInternalValueChange') {
            chs.push(k);
          }
        }

        if (!chs.length) should = false; //optimize render

        if (chs.length == 1 && chs[0] == 'tree' && nextProps.__isInternalValueChange) should = false;
      }

      return should;
    }
  }]);

  function Builder(props) {
    var _this;

    _classCallCheck(this, Builder);

    _this = _super.call(this, props);
    _this.pureShouldComponentUpdate = _reactAddonsPureRenderMixin["default"].shouldComponentUpdate.bind(_assertThisInitialized(_this));

    _this._updPath(props);

    return _this;
  }

  _createClass(Builder, [{
    key: "_updPath",
    value: function _updPath(props) {
      var id = props.tree.get('id');
      this.path = _immutable["default"].List.of(id);
    }
  }, {
    key: "render",
    value: function render() {
      var treeNodesCnt = (0, _treeUtils.getTotalNodesCountInTree)(this.props.tree);
      var id = this.props.tree.get('id');
      return /*#__PURE__*/_react["default"].createElement(_Item["default"], {
        key: id,
        id: id,
        path: this.path,
        type: this.props.tree.get('type'),
        properties: this.props.tree.get('properties') || new _immutable.Map(),
        config: this.props.config,
        actions: this.props.actions,
        children1: this.props.tree.get('children1') || new _immutable.Map() //tree={this.props.tree}
        ,
        treeNodesCnt: treeNodesCnt,
        onDragStart: this.props.onDragStart
      });
    }
  }]);

  return Builder;
}(_react.Component), _class2.propTypes = {
  tree: _propTypes["default"].any.isRequired,
  //instanceOf(Immutable.Map)
  config: _propTypes["default"].object.isRequired,
  actions: _propTypes["default"].object.isRequired,
  onDragStart: _propTypes["default"].func
}, _temp)) || _class;

exports["default"] = Builder;