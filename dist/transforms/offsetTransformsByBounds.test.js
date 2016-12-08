'use strict';

var _ava = require('ava');

var _ava2 = _interopRequireDefault(_ava);

var _offsetTransformsByBounds = require('./offsetTransformsByBounds');

var _offsetTransformsByBounds2 = _interopRequireDefault(_offsetTransformsByBounds);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _ava2.default)('offsetTransformsByBounds (default params (z axis))', function (t) {

  var transforms = { pos: [10, 15, -7], rot: [0, 0, 1], sca: [1, 1, 1] };
  var bounds = { min: [-1, 0, 20], max: [7, 0, -10] };
  var updatedTransforms = (0, _offsetTransformsByBounds2.default)(transforms, bounds);
  var expUpdatedTransforms = { pos: [10, 15, -22], rot: [0, 0, 1], sca: [1, 1, 1] };

  t.deepEqual(updatedTransforms, expUpdatedTransforms);
});

(0, _ava2.default)('offsetTransformsByBounds (x axis)', function (t) {

  var transforms = { pos: [10, 15, -7], rot: [0, 0, 1], sca: [1, 1, 1] };
  var bounds = { min: [-1, 0, 20], max: [7, 0, -10] };
  var updatedTransforms = (0, _offsetTransformsByBounds2.default)(transforms, bounds, [1, 0, 0]);
  var expUpdatedTransforms = { pos: [14, 15, -7], rot: [0, 0, 1], sca: [1, 1, 1] };

  t.deepEqual(updatedTransforms, expUpdatedTransforms);
});

(0, _ava2.default)('offsetTransformsByBounds (y axis)', function (t) {

  var transforms = { pos: [10, 15, -7], rot: [0, 0, 1], sca: [1, 1, 1] };
  var bounds = { min: [-1, 6.21, 20], max: [7, -19, -10] };
  var updatedTransforms = (0, _offsetTransformsByBounds2.default)(transforms, bounds, [0, 1, 0]);
  var expUpdatedTransforms = { pos: [10, 2.3949999999999996, -7], rot: [0, 0, 1], sca: [1, 1, 1] };

  t.deepEqual(updatedTransforms, expUpdatedTransforms);
});