'use strict';

var _ava = require('ava');

var _ava2 = _interopRequireDefault(_ava);

var _centerGeometry = require('./centerGeometry');

var _centerGeometry2 = _interopRequireDefault(_centerGeometry);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _ava2.default)('centerGeometry (default params)', function (t) {
  var geometry = { positions: [1, -1, 6, -1, 6, 28], normals: [0, 2, 1] };
  var bounds = { min: [-5, 3, -1], max: [7, 5, 9] };
  var transforms = { sca: [1, 1, 1] };

  var updatedGeometry = (0, _centerGeometry2.default)(geometry, bounds, transforms);
  var expUpdatedGeometry = { positions: [0, -5, 2, -2, 2, 24], normals: [0, 2, 1] };

  t.deepEqual(updatedGeometry, expUpdatedGeometry);
});

(0, _ava2.default)('centerGeometry (x axis)', function (t) {
  var geometry = { positions: [1, -1, 6, -1, 6, 28], normals: [0, 2, 1] };
  var bounds = { min: [-5, 3, -1], max: [7, 5, 9] };
  var transforms = { sca: [1, 1, 1] };

  var updatedGeometry = (0, _centerGeometry2.default)(geometry, bounds, transforms, [1, 0, 0]);
  var expUpdatedGeometry = { positions: [0, -1, 6, -2, 6, 28], normals: [0, 2, 1] };

  t.deepEqual(updatedGeometry, expUpdatedGeometry);
});

(0, _ava2.default)('centerGeometry (x & z axis)', function (t) {
  var geometry = { positions: [1, -1, 6, -1, 6, 28], normals: [0, 2, 1] };
  var bounds = { min: [-5, 3, -1], max: [7, 5, 9] };
  var transforms = { sca: [1, 1, 1] };

  var updatedGeometry = (0, _centerGeometry2.default)(geometry, bounds, transforms, [1, 0, 1]);
  var expUpdatedGeometry = { positions: [0, -1, 2, -2, 6, 24], normals: [0, 2, 1] };

  t.deepEqual(updatedGeometry, expUpdatedGeometry);
});

(0, _ava2.default)('centerGeometry (x & z axis, non default scale)', function (t) {
  var geometry = { positions: [1, -1, 6, -1, 6, 28], normals: [0, 2, 1] };
  var bounds = { min: [-5, 3, -1], max: [7, 5, 9] };
  var transforms = { sca: [1, 0.5, -0.1] };

  var updatedGeometry = (0, _centerGeometry2.default)(geometry, bounds, transforms, [1, 0, 1]);
  var expUpdatedGeometry = { positions: [0, -1, 46, -2, 6, 68], normals: [0, 2, 1] };

  t.deepEqual(updatedGeometry, expUpdatedGeometry);
});