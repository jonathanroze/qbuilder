"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var Widgets = _interopRequireWildcard(require("../components/widgets/index.js"));

var Operators = _interopRequireWildcard(require("../components/operators"));

var _sqlFormat = require("../utils/sqlFormat.js");

var _stuff = require("../utils/stuff.js");

var _moment = _interopRequireDefault(require("moment"));

var _default2 = require("../config/default");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var TextWidget = Widgets.TextWidget,
    NumberWidget = Widgets.NumberWidget,
    SliderWidget = Widgets.SliderWidget,
    RangeWidget = Widgets.RangeWidget,
    SelectWidget = Widgets.SelectWidget,
    MultiSelectWidget = Widgets.MultiSelectWidget,
    DateWidget = Widgets.DateWidget,
    BooleanWidget = Widgets.BooleanWidget,
    TimeWidget = Widgets.TimeWidget,
    DateTimeWidget = Widgets.DateTimeWidget,
    ValueFieldWidget = Widgets.ValueFieldWidget,
    FuncWidget = Widgets.FuncWidget;
var ProximityOperator = Operators.ProximityOperator; //----------------------------  conjunctions

var conjunctions = {
  AND: {
    label: 'And',
    mongoConj: '$and',
    reversedConj: 'OR',
    formatConj: function formatConj(children, conj, not, isForDisplay) {
      return children.size > 1 ? (not ? "NOT " : "") + '(' + children.join(' ' + (isForDisplay ? "AND" : "&&") + ' ') + ')' : (not ? "NOT (" : "") + children.first() + (not ? ")" : "");
    },
    sqlFormatConj: function sqlFormatConj(children, conj, not) {
      return children.size > 1 ? (not ? "NOT " : "") + '(' + children.join(' ' + "AND" + ' ') + ')' : (not ? "NOT (" : "") + children.first() + (not ? ")" : "");
    }
  },
  OR: {
    label: 'Or',
    mongoConj: '$or',
    reversedConj: 'AND',
    formatConj: function formatConj(children, conj, not, isForDisplay) {
      return children.size > 1 ? (not ? "NOT " : "") + '(' + children.join(' ' + (isForDisplay ? "OR" : "||") + ' ') + ')' : (not ? "NOT (" : "") + children.first() + (not ? ")" : "");
    },
    sqlFormatConj: function sqlFormatConj(children, conj, not) {
      return children.size > 1 ? (not ? "NOT " : "") + '(' + children.join(' ' + "OR" + ' ') + ')' : (not ? "NOT (" : "") + children.first() + (not ? ")" : "");
    }
  }
}; //----------------------------  operators
// helpers for mongo format

var mongoFormatOp1 = function mongoFormatOp1(mop, mc, field, _op, value, useExpr) {
  return !useExpr ? _defineProperty({}, field, _defineProperty({}, mop, mc(value))) : _defineProperty({}, mop, ["$" + field, mc(value)]);
};

var mongoFormatOp2 = function mongoFormatOp2(mops, not, field, _op, values, useExpr) {
  if (not) {
    var _$not;

    return !useExpr ? _defineProperty({}, field, {
      '$not': (_$not = {}, _defineProperty(_$not, mops[0], values[0]), _defineProperty(_$not, mops[1], values[1]), _$not)
    }) : {
      '$not': {
        '$and': [_defineProperty({}, mops[0], ["$" + field, values[0]]), _defineProperty({}, mops[1], ["$" + field, values[1]])]
      }
    };
  } else {
    var _field2;

    return !useExpr ? _defineProperty({}, field, (_field2 = {}, _defineProperty(_field2, mops[0], values[0]), _defineProperty(_field2, mops[1], values[1]), _field2)) : {
      '$and': [_defineProperty({}, mops[0], ["$" + field, values[0]]), _defineProperty({}, mops[1], ["$" + field, values[1]])]
    };
  }
};

var operators = {
  equal: {
    label: '==',
    labelForFormat: '==',
    sqlOp: '=',
    reversedOp: 'not_equal',
    formatOp: function formatOp(field, op, value, valueSrcs, valueTypes, opDef, operatorOptions, isForDisplay, fieldDef) {
      if (valueTypes == 'boolean' && isForDisplay) return value == 'No' ? "NOT ".concat(field) : "".concat(field);else return "".concat(field, " ").concat(opDef.label, " ").concat(value);
    },
    mongoFormatOp: mongoFormatOp1.bind(null, '$eq', function (v) {
      return v;
    })
  },
  not_equal: {
    label: '!=',
    labelForFormat: '!=',
    sqlOp: '<>',
    reversedOp: 'equal',
    formatOp: function formatOp(field, op, value, valueSrcs, valueTypes, opDef, operatorOptions, isForDisplay, fieldDef) {
      if (valueTypes == 'boolean' && isForDisplay) return value == 'No' ? "".concat(field) : "NOT ".concat(field);else return "".concat(field, " ").concat(opDef.label, " ").concat(value);
    },
    mongoFormatOp: mongoFormatOp1.bind(null, '$ne', function (v) {
      return v;
    })
  },
  less: {
    label: '<',
    labelForFormat: '<',
    sqlOp: '<',
    reversedOp: 'greater_or_equal',
    mongoFormatOp: mongoFormatOp1.bind(null, '$lt', function (v) {
      return v;
    })
  },
  less_or_equal: {
    label: '<=',
    labelForFormat: '<=',
    sqlOp: '<=',
    reversedOp: 'greater',
    mongoFormatOp: mongoFormatOp1.bind(null, '$lte', function (v) {
      return v;
    })
  },
  greater: {
    label: '>',
    labelForFormat: '>',
    sqlOp: '>',
    reversedOp: 'less_or_equal',
    mongoFormatOp: mongoFormatOp1.bind(null, '$gt', function (v) {
      return v;
    })
  },
  greater_or_equal: {
    label: '>=',
    labelForFormat: '>=',
    sqlOp: '>=',
    reversedOp: 'less',
    mongoFormatOp: mongoFormatOp1.bind(null, '$gte', function (v) {
      return v;
    })
  },
  like: {
    label: 'Like',
    labelForFormat: 'Like',
    reversedOp: 'not_like',
    sqlOp: 'LIKE',
    sqlFormatOp: function sqlFormatOp(field, op, values, valueSrc, valueType, opDef, operatorOptions) {
      if (valueSrc == 'value') {
        return "".concat(field, " LIKE ").concat(values);
      } else return undefined; // not supported

    },
    mongoFormatOp: mongoFormatOp1.bind(null, '$eq', function (v) {
      return new RegExp((0, _stuff.escapeRegExp)(v));
    })
  },
  not_like: {
    label: 'Not like',
    reversedOp: 'like',
    labelForFormat: 'Not Like',
    sqlOp: 'NOT LIKE',
    sqlFormatOp: function sqlFormatOp(field, op, values, valueSrc, valueType, opDef, operatorOptions) {
      if (valueSrc == 'value') {
        return "".concat(field, " NOT LIKE ").concat(values);
      } else return undefined; // not supported

    },
    mongoFormatOp: mongoFormatOp1.bind(null, '$ne', function (v) {
      return new RegExp((0, _stuff.escapeRegExp)(v));
    })
  },
  between: {
    label: 'Between',
    labelForFormat: 'BETWEEN',
    sqlOp: 'BETWEEN',
    cardinality: 2,
    formatOp: function formatOp(field, op, values, valueSrcs, valueTypes, opDef, operatorOptions, isForDisplay) {
      var valFrom = values.first();
      var valTo = values.get(1);
      if (isForDisplay) return "".concat(field, " >= ").concat(valFrom, " AND ").concat(field, " <= ").concat(valTo);else return "".concat(field, " >= ").concat(valFrom, " && ").concat(field, " <= ").concat(valTo);
    },
    mongoFormatOp: mongoFormatOp2.bind(null, ['$gte', '$lte'], false),
    valueLabels: ['Value from', 'Value to'],
    textSeparators: [null, 'and'],
    reversedOp: 'not_between'
  },
  not_between: {
    label: 'Not between',
    labelForFormat: 'NOT BETWEEN',
    sqlOp: 'NOT BETWEEN',
    cardinality: 2,
    mongoFormatOp: mongoFormatOp2.bind(null, ['$gte', '$lte'], true),
    valueLabels: ['Value from', 'Value to'],
    textSeparators: [null, 'and'],
    reversedOp: 'between'
  },
  range_between: {
    label: 'Between',
    labelForFormat: 'BETWEEN',
    sqlOp: 'BETWEEN',
    cardinality: 2,
    isSpecialRange: true,
    // to show 1 range widget instead of 2
    formatOp: function formatOp(field, op, values, valueSrcs, valueTypes, opDef, operatorOptions, isForDisplay) {
      var valFrom = values.first();
      var valTo = values.get(1);
      if (isForDisplay) return "".concat(field, " >= ").concat(valFrom, " AND ").concat(field, " <= ").concat(valTo);else return "".concat(field, " >= ").concat(valFrom, " && ").concat(field, " <= ").concat(valTo);
    },
    mongoFormatOp: mongoFormatOp2.bind(null, ['$gte', '$lte'], false),
    valueLabels: ['Value from', 'Value to'],
    textSeparators: [null, 'and'],
    reversedOp: 'range_not_between'
  },
  range_not_between: {
    label: 'Not between',
    labelForFormat: 'NOT BETWEEN',
    sqlOp: 'NOT BETWEEN',
    cardinality: 2,
    isSpecialRange: true,
    // to show 1 range widget instead of 2
    mongoFormatOp: mongoFormatOp2.bind(null, ['$gte', '$lte'], true),
    valueLabels: ['Value from', 'Value to'],
    textSeparators: [null, 'and'],
    reversedOp: 'range_between'
  },
  is_empty: {
    isUnary: true,
    label: 'Is empty',
    labelForFormat: 'IS EMPTY',
    sqlOp: 'IS EMPTY',
    cardinality: 0,
    reversedOp: 'is_not_empty',
    formatOp: function formatOp(field, op, value, valueSrc, valueType, opDef, operatorOptions, isForDisplay) {
      return isForDisplay ? "".concat(field, " IS EMPTY") : "!".concat(field);
    },
    mongoFormatOp: mongoFormatOp1.bind(null, '$exists', function (v) {
      return false;
    })
  },
  is_not_empty: {
    isUnary: true,
    label: 'Is not empty',
    labelForFormat: 'IS NOT EMPTY',
    sqlOp: 'IS NOT EMPTY',
    cardinality: 0,
    reversedOp: 'is_empty',
    formatOp: function formatOp(field, op, value, valueSrc, valueType, opDef, operatorOptions, isForDisplay) {
      return isForDisplay ? "".concat(field, " IS NOT EMPTY") : "!!".concat(field);
    },
    mongoFormatOp: mongoFormatOp1.bind(null, '$exists', function (v) {
      return true;
    })
  },
  select_equals: {
    label: '==',
    labelForFormat: '==',
    sqlOp: '=',
    // enum/set
    formatOp: function formatOp(field, op, value, valueSrc, valueType, opDef, operatorOptions, isForDisplay) {
      return "".concat(field, " == ").concat(value);
    },
    mongoFormatOp: mongoFormatOp1.bind(null, '$eq', function (v) {
      return v;
    }),
    reversedOp: 'select_not_equals'
  },
  select_not_equals: {
    label: '!=',
    labelForFormat: '!=',
    sqlOp: '<>',
    // enum/set
    formatOp: function formatOp(field, op, value, valueSrc, valueType, opDef, operatorOptions, isForDisplay) {
      return "".concat(field, " != ").concat(value);
    },
    mongoFormatOp: mongoFormatOp1.bind(null, '$ne', function (v) {
      return v;
    }),
    reversedOp: 'select_equals'
  },
  select_any_in: {
    label: 'Any in',
    labelForFormat: 'IN',
    sqlOp: 'IN',
    formatOp: function formatOp(field, op, values, valueSrc, valueType, opDef, operatorOptions, isForDisplay) {
      if (valueSrc == 'value') return "".concat(field, " IN (").concat(values.join(', '), ")");else return "".concat(field, " IN (").concat(values, ")");
    },
    sqlFormatOp: function sqlFormatOp(field, op, values, valueSrc, valueType, opDef, operatorOptions) {
      return "".concat(field, " IN (").concat(values.join(', '), ")");
    },
    mongoFormatOp: mongoFormatOp1.bind(null, '$in', function (v) {
      return v;
    }),
    reversedOp: 'select_not_any_in'
  },
  select_not_any_in: {
    label: 'Not in',
    labelForFormat: 'NOT IN',
    sqlOp: 'NOT IN',
    formatOp: function formatOp(field, op, values, valueSrc, valueType, opDef, operatorOptions, isForDisplay) {
      if (valueSrc == 'value') return "".concat(field, " NOT IN (").concat(values.join(', '), ")");else return "".concat(field, " NOT IN (").concat(values, ")");
    },
    sqlFormatOp: function sqlFormatOp(field, op, values, valueSrc, valueType, opDef, operatorOptions) {
      return "".concat(field, " NOT IN (").concat(values.join(', '), ")");
    },
    mongoFormatOp: mongoFormatOp1.bind(null, '$nin', function (v) {
      return v;
    }),
    reversedOp: 'select_any_in'
  },
  multiselect_equals: {
    label: 'Equals',
    labelForFormat: '==',
    sqlOp: '=',
    formatOp: function formatOp(field, op, values, valueSrc, valueType, opDef, operatorOptions, isForDisplay) {
      if (valueSrc == 'value') return "".concat(field, " == [").concat(values.join(', '), "]");else return "".concat(field, " == ").concat(values);
    },
    sqlFormatOp: function sqlFormatOp(field, op, values, valueSrc, valueType, opDef, operatorOptions) {
      if (valueSrc == 'value') // set
        return "".concat(field, " = '").concat(values.map(function (v) {
          return _sqlFormat.SqlString.trim(v);
        }).join(','), "'");else return undefined; //not supported
    },
    mongoFormatOp: mongoFormatOp1.bind(null, '$eq', function (v) {
      return v;
    }),
    reversedOp: 'multiselect_not_equals'
  },
  multiselect_not_equals: {
    label: 'Not equals',
    labelForFormat: '!=',
    sqlOp: '<>',
    formatOp: function formatOp(field, op, values, valueSrc, valueType, opDef, operatorOptions, isForDisplay) {
      if (valueSrc == 'value') return "".concat(field, " != [").concat(values.join(', '), "]");else return "".concat(field, " != ").concat(values);
    },
    sqlFormatOp: function sqlFormatOp(field, op, values, valueSrc, valueType, opDef, operatorOptions) {
      if (valueSrc == 'value') // set
        return "".concat(field, " != '").concat(values.map(function (v) {
          return _sqlFormat.SqlString.trim(v);
        }).join(','), "'");else return undefined; //not supported
    },
    mongoFormatOp: mongoFormatOp1.bind(null, '$ne', function (v) {
      return v;
    }),
    reversedOp: 'multiselect_equals'
  },
  proximity: {
    label: 'Proximity search',
    cardinality: 2,
    valueLabels: [{
      label: 'Word 1',
      placeholder: 'Enter first word'
    }, {
      label: 'Word 2',
      placeholder: 'Enter second word'
    }],
    textSeparators: [//'Word 1',
      //'Word 2'
    ],
    formatOp: function formatOp(field, op, values, valueSrc, valueType, opDef, operatorOptions, isForDisplay) {
      var val1 = values.first();
      var val2 = values.get(1);
      var prox = operatorOptions.get('proximity');
      return "".concat(field, " ").concat(val1, " NEAR/").concat(prox, " ").concat(val2);
    },
    sqlFormatOp: function sqlFormatOp(field, op, values, valueSrc, valueType, opDef, operatorOptions) {
      var val1 = values.first();
      var val2 = values.get(1);

      var _val1 = _sqlFormat.SqlString.trim(val1);

      var _val2 = _sqlFormat.SqlString.trim(val2);

      var prox = operatorOptions.get('proximity');
      return "CONTAINS(".concat(field, ", 'NEAR((").concat(_val1, ", ").concat(_val2, "), ").concat(prox, ")')");
    },
    mongoFormatOp: function mongoFormatOp(field, op, values) {
      return undefined;
    },
    // not supported
    options: {
      optionLabel: "Near",
      // label on top of "near" selectbox (for config.settings.showLabels==true)
      optionTextBefore: "Near",
      // label before "near" selectbox (for config.settings.showLabels==false)
      optionPlaceholder: "Select words between",
      // placeholder for "near" selectbox
      factory: function factory(props) {
        return /*#__PURE__*/_react["default"].createElement(ProximityOperator, props);
      },
      minProximity: 2,
      maxProximity: 10,
      defaults: {
        proximity: 2
      }
    }
  }
}; //----------------------------  widgets

var widgets = {
  text: {
    type: "text",
    valueSrc: 'value',
    valueLabel: "String",
    valuePlaceholder: "Enter string",
    factory: function factory(props) {
      return /*#__PURE__*/_react["default"].createElement(TextWidget, props);
    },
    formatValue: function formatValue(val, fieldDef, wgtDef, isForDisplay) {
      return isForDisplay ? '"' + val + '"' : JSON.stringify(val);
    },
    sqlFormatValue: function sqlFormatValue(val, fieldDef, wgtDef, op, opDef) {
      return op == 'like' || op == 'not_like' ? _sqlFormat.SqlString.escapeLike(val) : _sqlFormat.SqlString.escape(val);
    }
  },
  number: {
    type: "number",
    valueSrc: 'value',
    factory: function factory(props) {
      return /*#__PURE__*/_react["default"].createElement(NumberWidget, props);
    },
    valueLabel: "Number",
    valuePlaceholder: "Enter number",
    valueLabels: [{
      label: 'Number from',
      placeholder: 'Enter number from'
    }, {
      label: 'Number to',
      placeholder: 'Enter number to'
    }],
    formatValue: function formatValue(val, fieldDef, wgtDef, isForDisplay) {
      return isForDisplay ? val : JSON.stringify(val);
    },
    sqlFormatValue: function sqlFormatValue(val, fieldDef, wgtDef, op, opDef) {
      return _sqlFormat.SqlString.escape(val);
    }
  },
  slider: {
    type: "number",
    valueSrc: 'value',
    factory: function factory(props) {
      return /*#__PURE__*/_react["default"].createElement(SliderWidget, props);
    },
    valueLabel: "Number",
    valuePlaceholder: "Enter number or move slider",
    formatValue: function formatValue(val, fieldDef, wgtDef, isForDisplay) {
      return isForDisplay ? val : JSON.stringify(val);
    },
    sqlFormatValue: function sqlFormatValue(val, fieldDef, wgtDef, op, opDef) {
      return _sqlFormat.SqlString.escape(val);
    }
  },
  rangeslider: {
    type: "number",
    valueSrc: 'value',
    factory: function factory(props) {
      return /*#__PURE__*/_react["default"].createElement(RangeWidget, props);
    },
    valueLabel: "Range",
    valuePlaceholder: "Select range",
    valueLabels: [{
      label: 'Number from',
      placeholder: 'Enter number from'
    }, {
      label: 'Number to',
      placeholder: 'Enter number to'
    }],
    formatValue: function formatValue(val, fieldDef, wgtDef, isForDisplay) {
      return isForDisplay ? val : JSON.stringify(val);
    },
    sqlFormatValue: function sqlFormatValue(val, fieldDef, wgtDef, op, opDef) {
      return _sqlFormat.SqlString.escape(val);
    },
    singleWidget: 'slider'
  },
  select: {
    type: "select",
    valueSrc: 'value',
    factory: function factory(props) {
      return /*#__PURE__*/_react["default"].createElement(SelectWidget, props);
    },
    valueLabel: "Value",
    valuePlaceholder: "Select value",
    formatValue: function formatValue(val, fieldDef, wgtDef, isForDisplay) {
      var valLabel = fieldDef.fieldSettings.listValues[val];
      return isForDisplay ? '"' + valLabel + '"' : JSON.stringify(val);
    },
    sqlFormatValue: function sqlFormatValue(val, fieldDef, wgtDef, op, opDef) {
      return _sqlFormat.SqlString.escape(val);
    }
  },
  multiselect: {
    type: "multiselect",
    valueSrc: 'value',
    factory: function factory(props) {
      return /*#__PURE__*/_react["default"].createElement(MultiSelectWidget, props);
    },
    valueLabel: "Values",
    valuePlaceholder: "Select values",
    formatValue: function formatValue(vals, fieldDef, wgtDef, isForDisplay) {
      var valsLabels = vals.map(function (v) {
        return fieldDef.fieldSettings.listValues[v];
      });
      return isForDisplay ? valsLabels.map(function (v) {
        return '"' + v + '"';
      }) : vals.map(function (v) {
        return JSON.stringify(v);
      });
    },
    sqlFormatValue: function sqlFormatValue(vals, fieldDef, wgtDef, op, opDef) {
      return vals.map(function (v) {
        return _sqlFormat.SqlString.escape(v);
      });
    }
  },
  date: {
    type: "date",
    valueSrc: 'value',
    factory: function factory(props) {
      return /*#__PURE__*/_react["default"].createElement(DateWidget, props);
    },
    dateFormat: 'DD.MM.YYYY',
    valueFormat: 'YYYY-MM-DD',
    valueLabel: "Date",
    valuePlaceholder: "Enter date",
    valueLabels: [{
      label: 'Date from',
      placeholder: 'Enter date from'
    }, {
      label: 'Date to',
      placeholder: 'Enter date to'
    }],
    formatValue: function formatValue(val, fieldDef, wgtDef, isForDisplay) {
      var dateVal = (0, _moment["default"])(val, wgtDef.valueFormat);
      return isForDisplay ? '"' + dateVal.format(wgtDef.dateFormat) + '"' : JSON.stringify(val);
    },
    sqlFormatValue: function sqlFormatValue(val, fieldDef, wgtDef, op, opDef) {
      var dateVal = (0, _moment["default"])(val, wgtDef.valueFormat);
      return _sqlFormat.SqlString.escape(dateVal.format('YYYY-MM-DD'));
    }
  },
  time: {
    type: "time",
    valueSrc: 'value',
    factory: function factory(props) {
      return /*#__PURE__*/_react["default"].createElement(TimeWidget, props);
    },
    timeFormat: 'HH:mm',
    valueFormat: 'HH:mm:ss',
    valueLabel: "Time",
    valuePlaceholder: "Enter time",
    valueLabels: [{
      label: 'Time from',
      placeholder: 'Enter time from'
    }, {
      label: 'Time to',
      placeholder: 'Enter time to'
    }],
    formatValue: function formatValue(val, fieldDef, wgtDef, isForDisplay) {
      var dateVal = (0, _moment["default"])(val, wgtDef.valueFormat);
      return isForDisplay ? '"' + dateVal.format(wgtDef.timeFormat) + '"' : JSON.stringify(val);
    },
    sqlFormatValue: function sqlFormatValue(val, fieldDef, wgtDef, op, opDef) {
      var dateVal = (0, _moment["default"])(val, wgtDef.valueFormat);
      return _sqlFormat.SqlString.escape(dateVal.format('HH:mm:ss'));
    }
  },
  datetime: {
    type: "datetime",
    valueSrc: 'value',
    factory: function factory(props) {
      return /*#__PURE__*/_react["default"].createElement(DateTimeWidget, props);
    },
    timeFormat: 'HH:mm',
    dateFormat: 'DD.MM.YYYY',
    valueFormat: 'YYYY-MM-DD HH:mm:ss',
    valueLabel: "Datetime",
    valuePlaceholder: "Enter datetime",
    valueLabels: [{
      label: 'Datetime from',
      placeholder: 'Enter datetime from'
    }, {
      label: 'Datetime to',
      placeholder: 'Enter datetime to'
    }],
    formatValue: function formatValue(val, fieldDef, wgtDef, isForDisplay) {
      var dateVal = (0, _moment["default"])(val, wgtDef.valueFormat);
      return isForDisplay ? '"' + dateVal.format(wgtDef.dateFormat + ' ' + wgtDef.timeFormat) + '"' : JSON.stringify(val);
    },
    sqlFormatValue: function sqlFormatValue(val, fieldDef, wgtDef, op, opDef) {
      var dateVal = (0, _moment["default"])(val, wgtDef.valueFormat);
      return _sqlFormat.SqlString.escape(dateVal.toDate());
    }
  },
  "boolean": {
    type: "boolean",
    valueSrc: 'value',
    factory: function factory(props) {
      return /*#__PURE__*/_react["default"].createElement(BooleanWidget, props);
    },
    labelYes: "Yes",
    labelNo: "No",
    formatValue: function formatValue(val, fieldDef, wgtDef, isForDisplay) {
      return isForDisplay ? val ? "Yes" : "No" : JSON.stringify(!!val);
    },
    sqlFormatValue: function sqlFormatValue(val, fieldDef, wgtDef, op, opDef) {
      return _sqlFormat.SqlString.escape(val);
    },
    defaultValue: false
  },
  field: {
    valueSrc: 'field',
    factory: function factory(props) {
      return /*#__PURE__*/_react["default"].createElement(ValueFieldWidget, props);
    },
    formatValue: function formatValue(val, fieldDef, wgtDef, isForDisplay, op, opDef, rightFieldDef) {
      return isForDisplay ? rightFieldDef.label || val : val;
    },
    sqlFormatValue: function sqlFormatValue(val, fieldDef, wgtDef, op, opDef, rightFieldDef) {
      return val;
    },
    valueLabel: "Field to compare",
    valuePlaceholder: "Select field to compare",
    customProps: {
      showSearch: true
    }
  },
  func: {
    valueSrc: 'func',
    factory: function factory(props) {
      return /*#__PURE__*/_react["default"].createElement(FuncWidget, props);
    },
    valueLabel: "Function",
    valuePlaceholder: "Select function",
    customProps: {//showSearch: true
    }
  }
}; //----------------------------  types

var types = {
  text: {
    defaultOperator: 'equal',
    widgets: {
      text: {
        operators: ['equal', 'not_equal', 'is_empty', 'is_not_empty', 'like', 'not_like', 'proximity'],
        widgetProps: {},
        opProps: {}
      },
      field: {
        operators: [//unary ops (like `is_empty`) will be excluded anyway, see getWidgetsForFieldOp()
        'equal', 'not_equal', 'proximity' //can exclude if you want
        ]
      }
    }
  },
  number: {
    defaultOperator: 'equal',
    mainWidget: 'number',
    widgets: {
      number: {
        operators: ["equal", "not_equal", "less", "less_or_equal", "greater", "greater_or_equal", "between", "not_between", "is_empty", "is_not_empty"]
      },
      slider: {
        operators: ["equal", "not_equal", "less", "less_or_equal", "greater", "greater_or_equal", "is_empty", "is_not_empty"]
      },
      rangeslider: {
        operators: ["range_between", "range_not_between", "is_empty", "is_not_empty"]
      }
    }
  },
  date: {
    defaultOperator: 'equal',
    widgets: {
      date: {
        operators: ["equal", "not_equal", "less", "less_or_equal", "greater", "greater_or_equal", "between", "not_between", "is_empty", "is_not_empty"]
      }
    }
  },
  time: {
    defaultOperator: 'equal',
    widgets: {
      time: {
        operators: ["equal", "not_equal", "less", "less_or_equal", "greater", "greater_or_equal", "between", "not_between", "is_empty", "is_not_empty"]
      }
    }
  },
  datetime: {
    defaultOperator: 'equal',
    widgets: {
      datetime: {
        operators: ["equal", "not_equal", "less", "less_or_equal", "greater", "greater_or_equal", "between", "not_between", "is_empty", "is_not_empty"]
      }
    }
  },
  select: {
    mainWidget: "select",
    defaultOperator: 'select_equals',
    widgets: {
      select: {
        operators: ['select_equals', 'select_not_equals'],
        widgetProps: {
          customProps: {
            showSearch: true
          }
        }
      },
      multiselect: {
        operators: ['select_any_in', 'select_not_any_in']
      }
    }
  },
  multiselect: {
    defaultOperator: 'multiselect_equals',
    widgets: {
      multiselect: {
        operators: ['multiselect_equals', 'multiselect_not_equals']
      }
    }
  },
  "boolean": {
    defaultOperator: 'equal',
    widgets: {
      "boolean": {
        operators: ["equal", "not_equal"],
        widgetProps: {//you can enable this if you don't use fields as value sources
          // hideOperator: true,
          // operatorInlineLabel: "is",
        }
      },
      field: {
        operators: ["equal", "not_equal"]
      }
    }
  }
}; //----------------------------  settings

var settings = _objectSpread({}, _default2.settings, {
  formatField: function formatField(field, parts, label2, fieldDefinition, config, isForDisplay) {
    if (isForDisplay) return label2;else return field;
  },
  sqlFormatReverse: function sqlFormatReverse(q, operator, reversedOp, operatorDefinition, revOperatorDefinition) {
    if (q == undefined) return undefined;
    return "NOT(" + q + ")";
  },
  formatReverse: function formatReverse(q, operator, reversedOp, operatorDefinition, revOperatorDefinition, isForDisplay) {
    if (q == undefined) return undefined;
    if (isForDisplay) return "NOT(" + q + ")";else return "!(" + q + ")";
  },
  canCompareFieldWithField: function canCompareFieldWithField(leftField, leftFieldConfig, rightField, rightFieldConfig) {
    //for type == 'select'/'multiselect' you can check listValues
    return true;
  },
  // enable compare fields
  valueSourcesInfo: {
    value: {
      label: "Value"
    },
    field: {
      label: "Field",
      widget: "field"
    },
    func: {
      label: "Function",
      widget: "func"
    }
  },
  customFieldSelectProps: {
    showSearch: true
  }
}); //----------------------------


var _default = {
  conjunctions: conjunctions,
  operators: operators,
  widgets: widgets,
  types: types,
  settings: settings
};
exports["default"] = _default;