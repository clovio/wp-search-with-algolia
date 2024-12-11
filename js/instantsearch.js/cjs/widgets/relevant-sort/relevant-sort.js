"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _instantsearchUiComponents = require("instantsearch-ui-components");
var _preact = require("preact");
var _RelevantSort = _interopRequireDefault(require("../../components/RelevantSort/RelevantSort"));
var _connectRelevantSort = _interopRequireDefault(require("../../connectors/relevant-sort/connectRelevantSort"));
var _suit = require("../../lib/suit");
var _utils = require("../../lib/utils");
var _defaultTemplates = _interopRequireDefault(require("./defaultTemplates"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var withUsage = (0, _utils.createDocumentationMessageGenerator)({
  name: 'relevant-sort'
});
var suit = (0, _suit.component)('RelevantSort');
var renderer = function renderer(_ref) {
  var containerNode = _ref.containerNode,
    cssClasses = _ref.cssClasses,
    templates = _ref.templates;
  return function (_ref2) {
    var isRelevantSorted = _ref2.isRelevantSorted,
      isVirtualReplica = _ref2.isVirtualReplica,
      refine = _ref2.refine;
    (0, _preact.render)((0, _preact.h)(_RelevantSort.default, {
      cssClasses: cssClasses,
      templates: templates,
      isRelevantSorted: isRelevantSorted,
      isVirtualReplica: isVirtualReplica,
      refine: refine
    }), containerNode);
  };
};
var relevantSort = function relevantSort(widgetParams) {
  var container = widgetParams.container,
    _widgetParams$templat = widgetParams.templates,
    userTemplates = _widgetParams$templat === void 0 ? {} : _widgetParams$templat,
    _widgetParams$cssClas = widgetParams.cssClasses,
    userCssClasses = _widgetParams$cssClas === void 0 ? {} : _widgetParams$cssClas;
  if (!container) {
    throw new Error(withUsage('The `container` option is required.'));
  }
  var containerNode = (0, _utils.getContainerNode)(container);
  var cssClasses = {
    root: (0, _instantsearchUiComponents.cx)(suit(), userCssClasses.root),
    text: (0, _instantsearchUiComponents.cx)(suit({
      descendantName: 'text'
    }), userCssClasses.text),
    button: (0, _instantsearchUiComponents.cx)(suit({
      descendantName: 'button'
    }), userCssClasses.button)
  };
  var templates = _objectSpread(_objectSpread({}, _defaultTemplates.default), userTemplates);
  var specializedRenderer = renderer({
    containerNode: containerNode,
    cssClasses: cssClasses,
    renderState: {},
    templates: templates
  });
  var makeWidget = (0, _connectRelevantSort.default)(specializedRenderer, function () {
    (0, _preact.render)(null, containerNode);
  });
  return _objectSpread(_objectSpread({}, makeWidget({})), {}, {
    $$widgetType: 'ais.relevantSort'
  });
};
var _default = relevantSort;
exports.default = _default;