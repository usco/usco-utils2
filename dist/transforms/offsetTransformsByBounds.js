"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = offsetTransformsByBounds;
/**
 * puts the object 'on top' of the plane(s) given by the specified axes
 * warning !! to get the expected result, the geometry of the object should be centered on [0,0,0]
 * @param  {Object} transforms the initial transforms ie {pos:[x, x, x], rot:[x, x, x], sca:[x, x, x]}.
 * @param  {String} bounds the current bounds of the entity
 * @param  {String} axes on which axes to apply the transformation (default: [0, 0, 1])
 * @return {Object}      a new transforms object, with offset position
 */
function offsetTransformsByBounds(transforms, bounds) {
  var axes = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [0, 0, 1];
  var pos = transforms.pos;

  var offsetPos = [0.5 * (bounds.max[0] - bounds.min[0]) * axes[0] + pos[0], 0.5 * (bounds.max[1] - bounds.min[1]) * axes[1] + pos[1], 0.5 * (bounds.max[2] - bounds.min[2]) * axes[2] + pos[2]];
  return Object.assign({}, transforms, { pos: offsetPos });
}