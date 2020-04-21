"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _default = function _default(_ref) {
  var items = _ref.items,
      setField = _ref.setField,
      selectedKey = _ref.selectedKey;

  var renderOptions = function renderOptions(fields) {
    return Object.keys(fields).map(function (fieldKey) {
      var field = fields[fieldKey];
      var items = field.items,
          path = field.path,
          label = field.label;

      if (items) {
        return /*#__PURE__*/React.createElement("optgroup", {
          label: label
        }, renderOptions(items));
      } else {
        return /*#__PURE__*/React.createElement("option", {
          value: path
        }, label);
      }
    });
  };

  var onChange = function onChange(e) {
    return setField(e.target.value);
  };

  return /*#__PURE__*/React.createElement("select", {
    onChange: onChange,
    value: selectedKey
  }, renderOptions(items));
};

exports["default"] = _default;