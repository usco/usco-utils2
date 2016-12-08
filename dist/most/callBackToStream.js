'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = callBackToStream;

var _create = require('@most/create');

var _create2 = _interopRequireDefault(_create);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function callBackToStream() {
  var addWrap = function addWrap() {};

  function callbackTest(externalData) {
    addWrap(externalData);
  }
  var callback = callbackTest;
  var stream = (0, _create2.default)(function (add, end, error) {
    addWrap = add;
  });
  return { stream: stream, callback: callback };
}