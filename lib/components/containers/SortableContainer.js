"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactRedux = require("react-redux");

var _treeUtils = require("../../utils/treeUtils");

var constants = _interopRequireWildcard(require("../../constants"));

var _clone = _interopRequireDefault(require("clone"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var actions = _interopRequireWildcard(require("../../actions"));

var _reactAddonsPureRenderMixin = _interopRequireDefault(require("react-addons-pure-render-mixin"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(n); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

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

var _default = function _default(Builder) {
  var CanMoveFn = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

  var SortableContainer = /*#__PURE__*/function (_Component) {
    _inherits(SortableContainer, _Component);

    var _super = _createSuper(SortableContainer);

    function SortableContainer(props) {
      var _this;

      _classCallCheck(this, SortableContainer);

      _this = _super.call(this, props);
      _this.pureShouldComponentUpdate = _reactAddonsPureRenderMixin["default"].shouldComponentUpdate.bind(_assertThisInitialized(_this));

      _this.onDragStart = function (id, dom, e) {
        var treeEl = dom.closest('.query-builder');
        document.body.classList.add("qb-dragging");
        treeEl.classList.add("qb-dragging");
        var treeElContainer = treeEl.closest('.query-builder-container') || treeEl;
        treeElContainer = _this._getScrollParent(treeElContainer) || document.body;
        var scrollTop = treeElContainer.scrollTop;

        var _dragEl = _this._getDraggableNodeEl(treeEl);

        var _plhEl = _this._getPlaceholderNodeEl(treeEl);

        var tmpAllGroups = treeEl.querySelectorAll('.group--children');
        var anyGroup = tmpAllGroups.length ? tmpAllGroups[0] : null;
        var groupPadding;

        if (anyGroup) {
          groupPadding = window.getComputedStyle(anyGroup, null).getPropertyValue('padding-left');
          groupPadding = parseInt(groupPadding);
        }

        var dragging = {
          id: id,
          x: dom.offsetLeft,
          y: dom.offsetTop,
          w: dom.offsetWidth,
          h: dom.offsetHeight,
          itemInfo: _this.tree.items[id],
          paddingLeft: groupPadding
        };
        var dragStart = {
          id: id,
          x: dom.offsetLeft,
          y: dom.offsetTop,
          scrollTop: scrollTop,
          clientX: e.clientX,
          clientY: e.clientY,
          itemInfo: (0, _clone["default"])(_this.tree.items[id]),
          treeEl: treeEl,
          treeElContainer: treeElContainer
        };
        var mousePos = {
          clientX: e.clientX,
          clientY: e.clientY
        };
        window.addEventListener('mousemove', _this.onDrag);
        window.addEventListener('mouseup', _this.onDragEnd);

        _this.props.setDragStart(dragStart, dragging, mousePos);
      };

      _this.onDrag = function (e) {
        var doHandleDrag = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
        var dragging = Object.assign({}, _this.props.dragging);
        var startDragging = _this.props.dragStart;
        var paddingLeft = dragging.paddingLeft; //this.props.paddingLeft;

        var treeElContainer = startDragging.treeElContainer;
        var scrollTop = treeElContainer.scrollTop;
        dragging.itemInfo = _this.tree.items[dragging.id];

        if (!dragging.itemInfo) {
          return;
        }

        var mousePos = {
          clientX: e.clientX,
          clientY: e.clientY
        }; //first init plX/plY

        if (!startDragging.plX) {
          var treeEl = startDragging.treeEl;

          var plhEl = _this._getPlaceholderNodeEl(treeEl);

          if (plhEl) {
            startDragging.plX = plhEl.getBoundingClientRect().left + window.scrollX;
            startDragging.plY = plhEl.getBoundingClientRect().top + window.scrollY;
          }
        }

        var startX = startDragging.x;
        var startY = startDragging.y;
        var startClientX = startDragging.clientX;
        var startClientY = startDragging.clientY;
        var startScrollTop = startDragging.scrollTop;
        var pos = {
          x: startX + (e.clientX - startClientX),
          y: startY + (e.clientY - startClientY) + (scrollTop - startScrollTop)
        };
        dragging.x = pos.x;
        dragging.y = pos.y;
        dragging.paddingLeft = paddingLeft;

        _this.props.setDragProgress(mousePos, dragging);

        var moved = doHandleDrag ? _this.handleDrag(dragging, e, CanMoveFn) : false;

        if (moved) {} else {
          if (e.preventDefault) e.preventDefault();
        }
      };

      _this.onDragEnd = function () {
        var treeEl = _this.props.dragStart.treeEl;

        _this.props.setDragEnd();

        treeEl.classList.remove("qb-dragging");
        document.body.classList.remove("qb-dragging");
        _this._cacheEls = {};
        window.removeEventListener('mousemove', _this.onDrag);
        window.removeEventListener('mouseup', _this.onDragEnd);
      };

      _this.componentWillReceiveProps(props);

      return _this;
    }

    _createClass(SortableContainer, [{
      key: "shouldComponentUpdate",
      value: function shouldComponentUpdate(nextProps, nextState) {
        var prevProps = this.props;
        var prevState = this.state;
        var should = this.pureShouldComponentUpdate(nextProps, nextState);

        if (should) {
          if (prevState == nextState && prevProps != nextProps) {
            var chs = [];

            for (var k in nextProps) {
              var changed = nextProps[k] != prevProps[k];

              if (changed) {
                //don't render <Builder> on dragging - appropriate redux-connected components will do it
                if (k != 'dragging' && k != 'mousePos') chs.push(k);
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
        this.tree = (0, _treeUtils.getFlatTree)(nextProps.tree);
      }
    }, {
      key: "componentDidUpdate",
      value: function componentDidUpdate(_prevProps, _prevState) {
        var dragging = this.props.dragging;
        var startDragging = this.props.dragStart;

        if (startDragging && startDragging.id) {
          dragging.itemInfo = this.tree.items[dragging.id];

          if (dragging.itemInfo) {
            if (dragging.itemInfo.index != startDragging.itemInfo.index || dragging.itemInfo.parent != startDragging.itemInfo.parent) {
              var treeEl = startDragging.treeEl;
              var treeElContainer = startDragging.treeElContainer;

              var plhEl = this._getPlaceholderNodeEl(treeEl, true);

              if (plhEl) {
                var plX = plhEl.getBoundingClientRect().left + window.scrollX;
                var plY = plhEl.getBoundingClientRect().top + window.scrollY;
                var oldPlX = startDragging.plX;
                var oldPlY = startDragging.plY;
                var scrollTop = treeElContainer.scrollTop;
                startDragging.plX = plX;
                startDragging.plY = plY;
                startDragging.itemInfo = (0, _clone["default"])(dragging.itemInfo);
                startDragging.y = plhEl.offsetTop;
                startDragging.x = plhEl.offsetLeft;
                startDragging.clientY += plY - oldPlY;
                startDragging.clientX += plX - oldPlX;
                if (treeElContainer != document.body) startDragging.scrollTop = scrollTop;
                this.onDrag(this.props.mousePos, false);
              }
            }
          }
        }
      }
    }, {
      key: "_getNodeElById",
      value: function _getNodeElById(treeEl, indexId) {
        var ignoreCache = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
        if (indexId == null) return null;
        if (!this._cacheEls) this._cacheEls = {};
        var el = this._cacheEls[indexId];
        if (el && document.contains(el) && !ignoreCache) return el;
        el = treeEl.querySelector('.group-or-rule-container[data-id="' + indexId + '"]');
        this._cacheEls[indexId] = el;
        return el;
      }
    }, {
      key: "_getDraggableNodeEl",
      value: function _getDraggableNodeEl(treeEl) {
        var ignoreCache = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
        if (!this._cacheEls) this._cacheEls = {};
        var el = this._cacheEls['draggable'];
        if (el && document.contains(el) && !ignoreCache) return el;
        var els = treeEl.getElementsByClassName('qb-draggable');
        el = els.length ? els[0] : null;
        this._cacheEls['draggable'] = el;
        return el;
      }
    }, {
      key: "_getPlaceholderNodeEl",
      value: function _getPlaceholderNodeEl(treeEl) {
        var ignoreCache = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
        if (!this._cacheEls) this._cacheEls = {};
        var el = this._cacheEls['placeholder'];
        if (el && document.contains(el) && !ignoreCache) return el;
        var els = treeEl.getElementsByClassName('qb-placeholder');
        el = els.length ? els[0] : null;
        this._cacheEls['placeholder'] = el;
        return el;
      }
    }, {
      key: "_isScrollable",
      value: function _isScrollable(node) {
        var overflowY = window.getComputedStyle(node)['overflow-y'];
        return (overflowY === 'scroll' || overflowY === 'auto') && node.scrollHeight > node.offsetHeight;
      }
    }, {
      key: "_getScrollParent",
      value: function _getScrollParent(node) {
        if (node == null) return null;

        if (node === document.body || this._isScrollable(node)) {
          return node;
        } else {
          return this._getScrollParent(node.parentNode);
        }
      }
    }, {
      key: "handleDrag",
      value: function handleDrag(dragInfo, e, canMoveFn) {
        var _this2 = this;

        var canMoveBeforeAfterGroup = true;
        var itemInfo = dragInfo.itemInfo;
        var paddingLeft = dragInfo.paddingLeft;
        var moveInfo = null;
        var treeEl = this.props.dragStart.treeEl;
        var dragId = dragInfo.id;

        var dragEl = this._getDraggableNodeEl(treeEl);

        var plhEl = this._getPlaceholderNodeEl(treeEl);

        if (dragEl && plhEl) {
          var dragRect = dragEl.getBoundingClientRect();
          var plhRect = plhEl.getBoundingClientRect();

          if (!plhRect.width) {
            return;
          }

          var dragDirs = {
            hrz: 0,
            vrt: 0
          };
          if (dragRect.top < plhRect.top) dragDirs.vrt = -1; //up
          else if (dragRect.bottom > plhRect.bottom) dragDirs.vrt = +1; //down

          if (dragRect.left > plhRect.left) dragDirs.hrz = +1; //right
          else if (dragRect.left < plhRect.left) dragDirs.hrz = -1; //left

          var treeRect = treeEl.getBoundingClientRect();
          var trgCoord = {
            x: treeRect.left + (treeRect.right - treeRect.left) / 2,
            y: dragDirs.vrt >= 0 ? dragRect.bottom : dragRect.top
          };
          var hovNodeEl = document.elementFromPoint(trgCoord.x, trgCoord.y - 1);
          var hovCNodeEl = hovNodeEl ? hovNodeEl.closest('.group-or-rule-container') : null;

          if (!hovCNodeEl) {
            console.log('out of tree bounds!');
          } else {
            var isGroup = hovCNodeEl.classList.contains('group-container');
            var hovNodeId = hovCNodeEl.getAttribute('data-id');
            var hovEl = hovCNodeEl;
            var doAppend = false;
            var doPrepend = false;

            if (hovEl) {
              var hovRect = hovEl.getBoundingClientRect();
              var hovHeight = hovRect.bottom - hovRect.top;
              var hovII = this.tree.items[hovNodeId];
              var trgRect = null,
                  trgEl = null,
                  trgII = null,
                  altII = null; //for canMoveBeforeAfterGroup

              if (dragDirs.vrt == 0) {
                trgII = itemInfo;
                trgEl = plhEl;
                if (trgEl) trgRect = trgEl.getBoundingClientRect();
              } else {
                if (isGroup) {
                  if (dragDirs.vrt > 0) {
                    //down
                    //take group header (for prepend only)
                    var hovInnerEl = hovCNodeEl.getElementsByClassName('group--header');
                    var hovEl2 = hovInnerEl.length ? hovInnerEl[0] : null;
                    var hovRect2 = hovEl2.getBoundingClientRect();
                    var hovHeight2 = hovRect2.bottom - hovRect2.top;
                    var isOverHover = dragRect.bottom - hovRect2.top > hovHeight2 * 3 / 4;

                    if (isOverHover && hovII.top > dragInfo.itemInfo.top) {
                      trgII = hovII;
                      trgRect = hovRect2;
                      trgEl = hovEl2;
                      doPrepend = true;
                    }
                  } else if (dragDirs.vrt < 0) {
                    //up
                    if (hovII.lev >= itemInfo.lev) {
                      //take whole group
                      //todo: 5 is magic for now (bottom margin), configure it!
                      var isClimbToHover = hovRect.bottom - dragRect.top >= 2;

                      if (isClimbToHover && hovII.top < dragInfo.itemInfo.top) {
                        trgII = hovII;
                        trgRect = hovRect;
                        trgEl = hovEl;
                        doAppend = true;
                      }
                    }
                  }

                  if (!doPrepend && !doAppend || canMoveBeforeAfterGroup) {
                    //take whole group and check if we can move before/after group
                    var _isOverHover = dragDirs.vrt < 0 //up
                    ? hovRect.bottom - dragRect.top > hovHeight - 5 : dragRect.bottom - hovRect.top > hovHeight - 5;

                    if (_isOverHover) {
                      if (!doPrepend && !doAppend) {
                        trgII = hovII;
                        trgRect = hovRect;
                        trgEl = hovEl;
                      }

                      if (canMoveBeforeAfterGroup) {
                        altII = hovII;
                      }
                    }
                  }
                } else {
                  //check if we can move before/after group
                  var _isOverHover2 = dragDirs.vrt < 0 //up
                  ? hovRect.bottom - dragRect.top > hovHeight / 2 : dragRect.bottom - hovRect.top > hovHeight / 2;

                  if (_isOverHover2) {
                    trgII = hovII;
                    trgRect = hovRect;
                    trgEl = hovEl;
                  }
                }
              }

              var isSamePos = trgII && trgII.id == dragId;

              if (trgRect) {
                var dragLeftOffset = dragRect.left - treeRect.left;
                var trgLeftOffset = trgRect.left - treeRect.left;

                var _trgLev = trgLeftOffset / paddingLeft;

                var dragLev = Math.max(0, Math.round(dragLeftOffset / paddingLeft)); //find all possible moves

                var availMoves = [];
                var altMoves = []; //alternatively can move after/before group, if can't move into it

                if (isSamePos) {//do nothing
                } else {
                  if (isGroup) {
                    if (doAppend) {
                      availMoves.push([constants.PLACEMENT_APPEND, trgII, trgII.lev + 1]);
                    } else if (doPrepend) {
                      availMoves.push([constants.PLACEMENT_PREPEND, trgII, trgII.lev + 1]);
                    } //alt


                    if (canMoveBeforeAfterGroup && altII) {
                      if (dragDirs.vrt > 0) {
                        //down
                        altMoves.push([constants.PLACEMENT_AFTER, altII, altII.lev]);
                      } else if (dragDirs.vrt < 0) {
                        //up
                        altMoves.push([constants.PLACEMENT_BEFORE, altII, altII.lev]);
                      }
                    }
                  }

                  if (!doAppend && !doPrepend) {
                    if (dragDirs.vrt < 0) {
                      //up
                      availMoves.push([constants.PLACEMENT_BEFORE, trgII, trgII.lev]);
                    } else if (dragDirs.vrt > 0) {
                      //down
                      availMoves.push([constants.PLACEMENT_AFTER, trgII, trgII.lev]);
                    }
                  }
                } //sanitize


                availMoves = availMoves.filter(function (am) {
                  var placement = am[0];
                  var trg = am[1];
                  if ((placement == constants.PLACEMENT_BEFORE || placement == constants.PLACEMENT_AFTER) && trg.parent == null) return false;
                  if (trg.collapsed && (placement == constants.PLACEMENT_APPEND || placement == constants.PLACEMENT_PREPEND)) return false;
                  var isInside = trg.id == itemInfo.id;

                  if (!isInside) {
                    var tmp = trg;

                    while (tmp.parent) {
                      tmp = _this2.tree.items[tmp.parent];

                      if (tmp.id == itemInfo.id) {
                        isInside = true;
                        break;
                      }
                    }
                  }

                  return !isInside;
                }).map(function (am) {
                  var placement = am[0],
                      toII = am[1];
                  var toParentII = null;
                  if (placement == constants.PLACEMENT_APPEND || placement == constants.PLACEMENT_PREPEND) toParentII = toII;else toParentII = _this2.tree.items[toII.parent];
                  if (toParentII && toParentII.parent == null) toParentII = null;
                  am[3] = toParentII;
                  return am;
                });
                var bestMode = null;
                var filteredMoves = availMoves.filter(function (am) {
                  return _this2.canMove(itemInfo, am[1], am[0], am[3], canMoveFn);
                });

                if (canMoveBeforeAfterGroup && filteredMoves.length == 0 && altMoves.length > 0) {
                  filteredMoves = altMoves.filter(function (am) {
                    return _this2.canMove(itemInfo, am[1], am[0], am[3], canMoveFn);
                  });
                }

                var levs = filteredMoves.map(function (am) {
                  return am[2];
                });
                var curLev = itemInfo.lev;
                var allLevs = levs.concat(curLev);
                var closestDragLev = null;
                if (allLevs.indexOf(dragLev) != -1) closestDragLev = dragLev;else if (dragLev > Math.max.apply(Math, _toConsumableArray(allLevs))) closestDragLev = Math.max.apply(Math, _toConsumableArray(allLevs));else if (dragLev < Math.min.apply(Math, _toConsumableArray(allLevs))) closestDragLev = Math.min.apply(Math, _toConsumableArray(allLevs));
                bestMode = filteredMoves.find(function (am) {
                  return am[2] == closestDragLev;
                });
                if (!isSamePos && !bestMode && filteredMoves.length) bestMode = filteredMoves[0];
                moveInfo = bestMode;
              }
            }
          }
        }

        if (moveInfo) {
          //console.log('moveInfo', moveInfo);
          this.move(itemInfo, moveInfo[1], moveInfo[0], moveInfo[3]);
          return true;
        }

        return false;
      }
    }, {
      key: "canMove",
      value: function canMove(fromII, toII, placement, toParentII, canMoveFn) {
        if (!fromII || !toII) return false;
        if (fromII.id === toII.id) return false;
        var canRegroup = this.props.config.settings.canRegroup;
        var isStructChange = placement == constants.PLACEMENT_PREPEND || placement == constants.PLACEMENT_APPEND || fromII.parent != toII.parent;
        if (!canRegroup && isStructChange) return false;
        var res = true;
        if (canMoveFn) res = canMoveFn(fromII.node.toJS(), toII.node.toJS(), placement, toParentII ? toParentII.node.toJS() : null);
        return res;
      }
    }, {
      key: "move",
      value: function move(fromII, toII, placement, toParentII) {
        //console.log('move', fromII, toII, placement, toParentII);
        this.props.actions.moveItem(fromII.path, toII.path, placement);
      }
    }, {
      key: "render",
      value: function render() {
        return /*#__PURE__*/_react["default"].createElement(Builder, _extends({}, this.props, {
          onDragStart: this.onDragStart
        }));
      }
    }]);

    return SortableContainer;
  }(_react.Component);

  SortableContainer.propTypes = {
    tree: _propTypes["default"].any.isRequired,
    //instanceOf(Immutable.Map)
    actions: _propTypes["default"].object.isRequired // {moveItem: Function, ..}
    //... see Builder

  };
  var ConnectedSortableContainer = (0, _reactRedux.connect)(function (state) {
    return {
      dragging: state.dragging,
      dragStart: state.dragStart,
      mousePos: state.mousePos
    };
  }, {
    setDragStart: actions.drag.setDragStart,
    setDragProgress: actions.drag.setDragProgress,
    setDragEnd: actions.drag.setDragEnd
  })(SortableContainer);
  ConnectedSortableContainer.displayName = "ConnectedSortableContainer";
  return ConnectedSortableContainer;
};

exports["default"] = _default;