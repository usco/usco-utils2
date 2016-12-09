'use strict';

var _ava = require('ava');

var _ava2 = _interopRequireDefault(_ava);

var _computeTMatrixFromTransforms = require('./computeTMatrixFromTransforms');

var _computeTMatrixFromTransforms2 = _interopRequireDefault(_computeTMatrixFromTransforms);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _ava2.default)('computeTMatrixFromTransforms ', function (t) {

  var transforms = { pos: [10, 15, -7], rot: [0, 0, 1], sca: [1, 1, 1] };
  var tMatrix = (0, _computeTMatrixFromTransforms2.default)(transforms);
  var expTMatrix = [];

  t.deepEqual(tMatrix, expTMatrix);
});