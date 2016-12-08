'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = computeNormalsFromUnindexedPositions;

var _glVec = require('gl-vec3');

var _glVec2 = _interopRequireDefault(_glVec);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function computeNormalsFromUnindexedPositions(positions) {
  var normals = new Float32Array(positions.length);
  var pointA = void 0;
  var pointB = void 0;
  var pointC = void 0;
  var cb = void 0;
  var ab = void 0;

  for (var i = 0, il = positions.length; i < il; i += 9) {
    pointA = _glVec2.default.fromValues(positions[i], positions[i + 1], positions[i + 2]);
    pointB = _glVec2.default.fromValues(positions[i + 3], positions[i + 4], positions[i + 5]);
    pointC = _glVec2.default.fromValues(positions[i + 6], positions[i + 7], positions[i + 8]);

    cb = _glVec2.default.subtract([], pointC, pointB);
    ab = _glVec2.default.subtract([], pointA, pointB);
    cb = _glVec2.default.cross(cb, cb, ab);
    cb = _glVec2.default.normalize(cb, cb); // normalize

    normals[i] = cb[0];
    normals[i + 1] = cb[1];
    normals[i + 2] = cb[2];

    normals[i + 3] = cb[0];
    normals[i + 4] = cb[1];
    normals[i + 5] = cb[2];

    normals[i + 6] = cb[0];
    normals[i + 7] = cb[1];
    normals[i + 8] = cb[2];
  }

  return normals;
}