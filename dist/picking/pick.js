'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createPickRay;
var unproject = require('camera-unproject');
var set = require('gl-vec3/set');
var sub = require('gl-vec3/subtract');
var normalize = require('gl-vec3/normalize');

function createPickRay(point, viewport, invProjView) {
  var origin = [0, 0, 0];
  var direction = [0, 0, 0];
  set(origin, point[0], point[1], 0);
  set(direction, point[0], point[1], 1);
  unproject(origin, origin, viewport, invProjView);
  unproject(direction, direction, viewport, invProjView);
  sub(direction, direction, origin);
  normalize(direction, direction);

  return {
    origin: origin,
    direction: direction
  };
}