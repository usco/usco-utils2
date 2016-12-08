'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = boundingSphere;
exports.boundingSphereFromBoundingBox = boundingSphereFromBoundingBox;

var _glVec = require('gl-vec3');

/**
  * compute boundingSphere, given positions
  * @param {array} center the center to use (optional).
  * @param {array} positions the array/typed array of positions.
  * for now loosely based on three.js implementation
*/
function boundingSphere() {
  var center = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [0, 0, 0];
  var positions = arguments[1];

  if (positions.length === 0) {
    return null;
  }

  if (!center) {
    var box = boundingBox(positions);
    // min & max are the box's min & max
    var result = _glVec.vec3.create();
    center = _glVec.vec3.scale(result, _glVec.vec3.add(result, box.min, box.max), 0.5);
  }
  var nested = Array.isArray(positions) && Array.isArray(positions[0]);

  var maxRadiusSq = 0;
  var increment = nested ? 1 : 3;
  var max = positions.length;
  for (var i = 0; i < max; i += increment) {
    if (nested) {
      maxRadiusSq = Math.max(maxRadiusSq, (0, _glVec.squaredDistance)(center, positions[i]));
    } else {
      var position = [positions[i], positions[i + 1], positions[i + 2]];
      maxRadiusSq = Math.max(maxRadiusSq, (0, _glVec.squaredDistance)(center, position));
    }
  }
  return Math.sqrt(maxRadiusSq);
}

/* compute boundingSphere from boundingBox
  for now more or less based on three.js implementation
*/
function boundingSphereFromBoundingBox() {
  var center = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [0, 0, 0];
  var positions = arguments[1];
  var boundingBox = arguments[2];

  if (positions.length === 0) {
    return null;
  }

  if (!center) {
    // min & max are the box's min & max
    var result = _glVec.vec3.create();
    center = _glVec.vec3.scale(result, _glVec.vec3.add(result, boundingBox[0], boundingBox[1]), 0.5);
  }

  var maxRadiusSq = 0;
  for (var i = 0, il = positions.length; i < il; i++) {
    maxRadiusSq = Math.max(maxRadiusSq, (0, _glVec.squaredDistance)(center, positions[i]));
  }
  return Math.sqrt(maxRadiusSq);
}