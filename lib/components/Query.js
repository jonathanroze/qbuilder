"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _configProvider = _interopRequireDefault(require("antd/lib/config-provider"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _tree = _interopRequireDefault(require("../stores/tree"));

var _redux = require("redux");

var _reactRedux = require("react-redux");

var actions = _interopRequireWildcard(require("../actions"));

var _configUtils = require("../utils/configUtils");

var _treeUtils = require("../utils/treeUtils");

var _stuff = require("../utils/stuff");

var _validation = require("../utils/validation");

var _defaultUtils = require("../utils/defaultUtils");

var _renderUtils = require("../utils/renderUtils");

var _pick = _interopRequireDefault(require("lodash/pick"));

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

var configKeys = ["conjunctions", "fields", "types", "operators", "widgets", "settings", "funcs"];

var validateAndFixTree = function validateAndFixTree(newTree, _oldTree, newConfig, oldConfig) {
  var tree = (0, _validation.validateTree)(newTree, _oldTree, newConfig, oldConfig, true, true);
  tree = (0, _treeUtils.fixPathsInTree)(tree);
  return tree;
};

var Query = /*#__PURE__*/function (_PureComponent) {
  _inherits(Query, _PureComponent);

  var _super = _createSuper(Query);

  function Query(props) {
    var _this;

    _classCallCheck(this, Query);

    _this = _super.call(this, props);

    _this._updateActions(props);

    _this.validatedTree = _this.validateTree(props, props);
    props.onChange && props.onChange(_this.validatedTree, props.config);
    return _this;
  }

  _createClass(Query, [{
    key: "validateTree",
    value: function validateTree(props, oldProps) {
      return validateAndFixTree(props.tree, oldProps.tree, props.config, oldProps.config);
    }
  }, {
    key: "_updateActions",
    value: function _updateActions(props) {
      var config = props.config,
          dispatch = props.dispatch;
      this.actions = (0, _stuff.bindActionCreators)(_objectSpread({}, actions.tree, {}, actions.group, {}, actions.rule), config, dispatch);
    }
  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      var onChange = nextProps.onChange;
      var oldConfig = this.props.config;
      var newTree = nextProps.tree;
      var newConfig = nextProps.config;
      var oldValidatedTree = this.validatedTree;
      this.validatedTree = newTree;

      if (oldConfig !== newConfig) {
        this._updateActions(nextProps);

        this.validatedTree = this.validateTree(nextProps, this.props);
      }

      var validatedTreeChanged = !(0, _stuff.immutableEqual)(this.validatedTree, oldValidatedTree);

      if (validatedTreeChanged) {
        onChange && onChange(this.validatedTree, newConfig);
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          config = _this$props.config,
          renderBuilder = _this$props.renderBuilder,
          dispatch = _this$props.dispatch,
          __isInternalValueChange = _this$props.__isInternalValueChange;
      var builderProps = {
        tree: this.validatedTree,
        actions: this.actions,
        config: config,
        dispatch: dispatch,
        __isInternalValueChange: __isInternalValueChange
      };
      return renderBuilder(builderProps);
    }
  }]);

  return Query;
}(_react.PureComponent);

Query.propTypes = {
  config: _propTypes["default"].object.isRequired,
  onChange: _propTypes["default"].func,
  renderBuilder: _propTypes["default"].func,
  tree: _propTypes["default"].any //instanceOf(Immutable.Map)
  //dispatch: PropTypes.func.isRequired,

};
var ConnectedQuery = (0, _reactRedux.connect)(function (state) {
  return {
    tree: state.tree,
    __isInternalValueChange: state.__isInternalValueChange
  };
})(Query);
ConnectedQuery.displayName = "ConnectedQuery";

var QueryContainer = /*#__PURE__*/function (_Component) {
  _inherits(QueryContainer, _Component);

  var _super2 = _createSuper(QueryContainer);

  function QueryContainer(props, context) {
    var _this2;

    _classCallCheck(this, QueryContainer);

    _this2 = _super2.call(this, props, context);
    _this2.shouldComponentUpdate = (0, _renderUtils.liteShouldComponentUpdate)(_assertThisInitialized(_this2), {
      value: function value(nextValue, prevValue, state) {
        var storeValue = state.store.getState().tree;
        return !(0, _stuff.immutableEqual)(storeValue, nextValue) && !(0, _stuff.immutableEqual)(prevValue, nextValue);
      }
    });
    var config = (0, _pick["default"])(props, configKeys);
    var extendedConfig = (0, _configUtils.extendConfig)(config);
    var tree = props.value;
    var validatedTree = tree ? validateAndFixTree(tree, null, config, config) : null;
    var store = (0, _tree["default"])(_objectSpread({}, config, {
      tree: validatedTree
    }));
    _this2.state = {
      store: (0, _redux.createStore)(store),
      config: extendedConfig
    };
    return _this2;
  }

  _createClass(QueryContainer, [{
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      if (this.props.dontDispatchOnNewProps) return; // compare configs

      var oldConfig = (0, _pick["default"])(this.props, configKeys);
      var nextConfig = (0, _pick["default"])(nextProps, configKeys);
      var isConfigChanged = !(0, _stuff.shallowEqual)(oldConfig, nextConfig, false);

      if (isConfigChanged) {
        nextConfig = (0, _configUtils.extendConfig)(nextConfig);
        this.setState({
          config: nextConfig
        });
      } // compare trees


      var storeValue = this.state.store.getState().tree;
      var isTreeChnaged = !(0, _stuff.immutableEqual)(nextProps.value, this.props.value) && !(0, _stuff.immutableEqual)(nextProps.value, storeValue);

      if (isTreeChnaged) {
        var nextTree = nextProps.value || (0, _defaultUtils.defaultRoot)(_objectSpread({}, nextProps, {
          tree: null
        }));
        var validatedTree = validateAndFixTree(nextTree, null, nextConfig, oldConfig);
        this.state.store.dispatch(actions.tree.setTree(nextProps, validatedTree));
      }
    }
  }, {
    key: "render",
    value: function render() {
      // `get_children` is deprecated!
      var _this$props2 = this.props,
          renderBuilder = _this$props2.renderBuilder,
          get_children = _this$props2.get_children,
          onChange = _this$props2.onChange;
      var _this$state = this.state,
          config = _this$state.config,
          store = _this$state.store;
      return /*#__PURE__*/_react["default"].createElement(_configProvider["default"], {
        locale: config.settings.locale.antd
      }, /*#__PURE__*/_react["default"].createElement(_reactRedux.Provider, {
        store: store
      }, /*#__PURE__*/_react["default"].createElement(ConnectedQuery, {
        store: store,
        config: config,
        onChange: onChange,
        renderBuilder: renderBuilder || get_children
      })));
    }
  }]);

  return QueryContainer;
}(_react.Component);

exports["default"] = QueryContainer;
QueryContainer.propTypes = {
  //config
  conjunctions: _propTypes["default"].object.isRequired,
  fields: _propTypes["default"].object.isRequired,
  types: _propTypes["default"].object.isRequired,
  operators: _propTypes["default"].object.isRequired,
  widgets: _propTypes["default"].object.isRequired,
  settings: _propTypes["default"].object.isRequired,
  onChange: _propTypes["default"].func,
  renderBuilder: _propTypes["default"].func,
  value: _propTypes["default"].any //instanceOf(Immutable.Map)

};