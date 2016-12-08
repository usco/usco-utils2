'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = pickStream;

var _glMat = require('gl-mat4');

var _glMat2 = _interopRequireDefault(_glMat);

var _cameraPickingRay = require('camera-picking-ray');

var _cameraPickingRay2 = _interopRequireDefault(_cameraPickingRay);

var _intersect = require('./intersect');

var _intersect2 = _interopRequireDefault(_intersect);

var _most = require('most');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function pickStream(interactions, data) {
  var gestures = interactions.gestures;

  var viewport = [0, 0, window.innerWidth, window.innerHeight];

  return (0, _most.merge)(gestures.taps.shortSingleTaps$
  //,gestures.pointerMoves
  ).map(function (event) {
    var pointer = {
      position: [event.offsetX, event.offsetY]
    };
    return tryToPick(pointer, viewport, data);
  }).tap(function (e) {
    return console.log('picking, single taps', e);
  });
}

function tryToPick(pointer, viewport, fullData) {
  // warning !!! posible issues with camera-unproject , itself used in other modules https://github.com/Jam3/camera-unproject/issues/1

  var viewportWidth = viewport[2];
  var viewportHeight = viewport[3];

  // your camera matrices
  var projection = _glMat2.default.perspective([], Math.PI / 4, viewportWidth / viewportHeight, 0.01, 1000);
  var view = fullData.camera.view;
  var projView = _glMat2.default.multiply([], projection, view);
  var invProjView = _glMat2.default.invert([], projView);

  var ray = { // this data will get mutated to contain data
    ro: [0, 0, 0],
    rd: [0, 0, 0]
  };

  // store result in ray (origin, direction)
  (0, _cameraPickingRay2.default)(ray.ro, ray.rd, pointer.position, viewport, invProjView);

  return fullData.entities.filter(function (e) {
    return e.meta.pickable;
  }).map(function (entity, index) {
    return (0, _intersect2.default)(ray, entity, index);
  }).filter(function (h) {
    return h !== null;
  }).concat([]);
}