'use strict';

var _ava = require('ava');

var _ava2 = _interopRequireDefault(_ava);

var _computeCameraToFitBounds = require('./computeCameraToFitBounds');

var _computeCameraToFitBounds2 = _interopRequireDefault(_computeCameraToFitBounds);

var _glVec = require('gl-vec3');

var _glVec2 = _interopRequireDefault(_glVec);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _ava2.default)('computeCameraToFitBounds', function (t) {
  var camera = {
    position: [0, 7, 2],
    target: [-5, 2.5, 7],
    fov: Math.PI / 4,
    aspect: 1
  };
  var bounds = {
    dia: 5,
    center: [5, 0, 2.5],
    size: [10, 4.8, 5]
  };
  var transforms = {
    pos: [12, 0, -7.1]
  };
  var idealCameraData = (0, _computeCameraToFitBounds2.default)({ camera: camera, bounds: bounds, transforms: transforms });
  var expIdealCameraData = {
    position: [28.691452026367188, 10.522306442260742, -16.291452407836914],
    target: [17, 0, -4.599999904632568]
  };

  t.deepEqual(idealCameraData, expIdealCameraData);
});