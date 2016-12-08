"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = doNormalsNeedComputing;
/**
 *very simple heuristic to determine whether or not normals for a given geometry
 * need to be (re)computed or not
 * @param  {Object} geometry geometry data just a pojo, CAN contain normals data
 * @param {Int} testLength how many normals to check for zero normals
 * @return {Boolean} boolean signifying whether normals need computing or not ...
*/
function doNormalsNeedComputing(geometry) {
  var testLength = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1000;

  var needsRecompute = true;
  if (!geometry.normals) {
    needsRecompute = true;
  } else {
    // we check the fist 1000 normals to see if they are set to 0
    for (var i = 0; i < Math.min(geometry.normals.length, testLength); i++) {
      if (geometry.normals[i] !== 0) {
        needsRecompute = false;
        break;
      }
    }
  }
  return needsRecompute;
}