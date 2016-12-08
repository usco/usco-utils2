'use strict';

var _ava = require('ava');

var _ava2 = _interopRequireDefault(_ava);

var _computeNormalsFromUnindexedPositions = require('./computeNormalsFromUnindexedPositions');

var _computeNormalsFromUnindexedPositions2 = _interopRequireDefault(_computeNormalsFromUnindexedPositions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

(0, _ava2.default)('compute normals from unindexed positions', function (t) {
  var positions = [0.2, -1, 7, 6, 4, -2.3, -1, 7, 6];
  var normals = [].concat(_toConsumableArray((0, _computeNormalsFromUnindexedPositions2.default)(positions))); // convert from typed array to simple array
  var expNormals = [0.7833055853843689, 0.19142454862594604, 0.591429591178894, 0.7833055853843689, 0.19142454862594604, 0.591429591178894, 0.7833055853843689, 0.19142454862594604, 0.591429591178894];

  t.deepEqual(normals, expNormals);
});