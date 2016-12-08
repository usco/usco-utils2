'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = cameraOffsetToEntityBoundsCenter;

var _glVec = require('gl-vec3');

var _glVec2 = _interopRequireDefault(_glVec);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

/**
 * offsets camera & camera target to align to objects's 'center of gravity' (center of bounds)
 * on the Z axis only !!
 * @param  {Object} camera the camera we are using
 * @param  {Object} bounds the current bounds of the entity
 */
function cameraOffsetToEntityBoundsCenter(_ref) {
  var camera = _ref.camera,
      bounds = _ref.bounds,
      transforms = _ref.transforms,
      axis = _ref.axis;

  if (!bounds || !camera) {
    throw new Error('No camera/bounds specified!');
  }
  var target = camera.target,
      position = camera.position;


  var boundsCenter = bounds.max.map(function (pos, idx) {
    return pos - bounds.min[idx];
  });
  //FIXME : do we need to offset things by transforms here or not ?
  var focusPoint = _glVec2.default.add([], _glVec2.default.fromValues.apply(_glVec2.default, _toConsumableArray(transforms.pos)), _glVec2.default.fromValues.apply(_glVec2.default, _toConsumableArray(boundsCenter)));

  var diff = _glVec2.default.subtract([], focusPoint, target);
  var zOffset = [0, 0, diff[axis] * 0.5];
  target = _glVec2.default.add([], target, zOffset);
  position = _glVec2.default.add([], position, zOffset);

  return {
    position: position,
    target: target
  };
}