"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.liteShouldComponentUpdate = void 0;

var _immutable = _interopRequireWildcard(require("immutable"));

var _stuff = require("./stuff");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var liteShouldComponentUpdate = function liteShouldComponentUpdate(self, config) {
  return function (nextProps, nextState) {
    var prevProps = self.props;
    var prevState = self.state;
    var should = nextProps != prevProps || nextState != prevState;

    if (should) {
      if (prevState == nextState && prevProps != nextProps) {
        var chs = [];

        for (var k in nextProps) {
          var changed = nextProps[k] != prevProps[k];

          if (changed) {
            if (config[k] == 'ignore') changed = false;else if (config[k] == 'shallow_deep') changed = !(0, _stuff.shallowEqual)(nextProps[k], prevProps[k], true);else if (config[k] == 'shallow') changed = !(0, _stuff.shallowEqual)(nextProps[k], prevProps[k]);else if (typeof config[k] == 'function') changed = config[k](nextProps[k], prevProps[k], nextState);
          }

          if (changed) chs.push(k);
        }

        if (!chs.length) should = false;
      }
    }

    return should;
  };
};

exports.liteShouldComponentUpdate = liteShouldComponentUpdate;