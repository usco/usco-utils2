'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = centerGeometry;

var _glMat = require('gl-mat4');

var _glMat2 = _interopRequireDefault(_glMat);

var _glVec = require('gl-vec3');

var _glVec2 = _interopRequireDefault(_glVec);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * center the geometry of an object around the zero of the given axes
 * WARNING ! this mutates the original geometric data !
 * @param  {Object} geometry object containing positions data (flat array, flat typed array)
 * @param  {String} bounds the current bounds of the entity
 * @param  {String} axes on which axes to apply the transformation (default: [0, 0, 1])
 * @return {Object}      the modified geometry, centered
 */
function centerGeometry(geometry, bounds, transforms) {
  var axes = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [1, 1, 1];

  var translation = [-0.5 * (bounds.min[0] / transforms.sca[0] + bounds.max[0] / transforms.sca[0]) * axes[0], -0.5 * (bounds.min[1] / transforms.sca[1] + bounds.max[1] / transforms.sca[1]) * axes[1], -0.5 * (bounds.min[2] / transforms.sca[2] + bounds.max[2] / transforms.sca[2]) * axes[2]];
  var translateMat = _glMat2.default.create();
  translateMat = _glMat2.default.translate(translateMat, translateMat, translation);

  // taken almost verbatim from https://github.com/wwwtyro/geo-3d-transform-mat4/blob/master/index.js
  function transform(positions, translateMat) {
    for (var i = 0; i < positions.length; i += 3) {
      var newPos = _glVec2.default.fromValues(positions[i], positions[i + 1], positions[i + 2]);
      _glVec2.default.transformMat4(newPos, newPos, translateMat);
      positions[i] = newPos[0];
      positions[i + 1] = newPos[1];
      positions[i + 2] = newPos[2];
    }
    /*var oldfmt = geoid.identify(positions)
     var newpos = geoconv.convert(positions, geoid.ARRAY_OF_ARRAYS, 3)
     for (var i = 0; i < newpos.length; i++) {
         vec3.transformMat4(newpos[i], newpos[i], m)
     }
     newpos = geoconv.convert(newpos, oldfmt, 3)
     return newpos*/
  }

  transform(geometry.positions, translateMat);
  return geometry;
}