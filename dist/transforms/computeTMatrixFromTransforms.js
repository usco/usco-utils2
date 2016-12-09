'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = computeTMatrixFromTransforms;

var _glMat = require('gl-mat4');

var _glMat2 = _interopRequireDefault(_glMat);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*compute  object transformation matrix from transforms: costly : only do it when changes happened*/
function computeTMatrixFromTransforms(params) {
  var defaults = {
    pos: [0, 0, 0],
    rot: [0, 0, 0],
    sca: [1, 1, 1]
  };

  var _Object$assign = Object.assign({}, defaults, params),
      pos = _Object$assign.pos,
      rot = _Object$assign.rot,
      sca = _Object$assign.sca;
  // create transform matrix


  var transforms = _glMat2.default.identity([]);
  _glMat2.default.translate(transforms, transforms, pos); // [pos[0], pos[2], pos[1]]// z up
  _glMat2.default.rotateX(transforms, transforms, rot[0]);
  _glMat2.default.rotateY(transforms, transforms, rot[1]);
  _glMat2.default.rotateZ(transforms, transforms, rot[2]);
  _glMat2.default.scale(transforms, transforms, sca); // [sca[0], sca[2], sca[1]])

  return transforms;
}