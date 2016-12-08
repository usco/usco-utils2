'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = computeCameraToFitBounds;

var _glVec = require('gl-vec3');

var _glVec2 = _interopRequireDefault(_glVec);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

// import mat4 from 'gl-mat4'
// import project from 'camera-project'

/**
 * zooms in on an object trying to fit its bounds on the (2d) screen
 * assumes the bounds CENTER is not in world space for now, hence transforms needing to be passed
 * @param  {Object} camera the camera we are using
 * @param  {Object} bounds the current bounds of the entity
 */
function computeCameraToFitBounds(_ref) {
  var camera = _ref.camera,
      bounds = _ref.bounds,
      transforms = _ref.transforms;

  /*
  bounds: {
    dia: 40,
    center: [0,20,8],
    min: [9, 10, 0],
    max: [15, 10, 4]
  },*/
  if (!bounds || !camera) {
    throw new Error('No camera/bounds specified!');
  }

  // const {projection, view} = camera
  // const radius = bounds.dia / 2
  // we use radius so that we can be shape indenpdant : a sphere seen from any angle is a sphere...
  var radius = Math.max.apply(Math, _toConsumableArray(bounds.size)) * 0.5; // we find the biggest dimension, and use it as a basis
  // console.log('bounds', bounds.size, bounds.min, bounds.max, radius)

  var entityPosition = _glVec2.default.add([], bounds.center, transforms.pos); // TODO: apply transforms to center , here or elswhere ??

  var targetOffset = _glVec2.default.subtract([], entityPosition, camera.target); // offset between target position & camera's target

  // move camera to base position
  // compute new camera position
  var camNewPos = _glVec2.default.fromValues.apply(_glVec2.default, _toConsumableArray(camera.position));
  var camNewTgt = _glVec2.default.fromValues.apply(_glVec2.default, _toConsumableArray(camera.target));
  camNewPos = _glVec2.default.add(camNewPos, camNewPos, targetOffset);
  camNewTgt = _glVec2.default.fromValues.apply(_glVec2.default, _toConsumableArray(entityPosition));

  // and move it away from the boundingSphere of the object
  /*const width = 640
  const height = 480
  const combinedProjView = mat4.multiply([], projection, view)
  const viewport = [0, 0, width, height]
  // project entityPosition onto 2d plane
  const projectedEntityPosition = project([], entityPosition, viewport, combinedProjView)
  console.log('projectedEntityPosition', projectedEntityPosition)
  // project top, bottom, left & right onto 2d plane
  //console.log('camera can see width', 2 * vec3.distance(entityPosition, camNewPos) * Math.tan(camera.fov / 2))*/

  /*let halfMinFovRad = 0.5 * camera.fov
  if (camera.aspect > 1.0)// fov in x is smaller
  { //console.log('fov x smaller')
    halfMinFovRad = Math.atan(camera.aspect * Math.tan(halfMinFovRad))
  }*/

  var fovY = Math.atan(camera.aspect * Math.tan(camera.fov));
  var halfMinFovRad = Math.sin(Math.min(camera.fov, fovY) * 0.5);
  var dist = _glVec2.default.distance(entityPosition, camNewPos) - radius * 1.5 / halfMinFovRad; // Math.sin(halfMinFovRad)
  // console.log('dist', dist, 'aspect', camera.aspect, 'fov', camera.fov, 'halfMinFovRad', halfMinFovRad)
  // const dist = // vec3.distance(entityPosition, camNewPos) - radius * 4 // FIXME: this needs to use the projection info/perspective

  var vec = _glVec2.default.create();
  vec = _glVec2.default.subtract(vec, camNewPos, camNewTgt);
  vec = _glVec2.default.normalize(vec, vec);
  vec = _glVec2.default.scale(vec, vec, dist);

  camNewPos = _glVec2.default.subtract(camNewPos, camNewPos, vec);

  return {
    position: [].concat(_toConsumableArray(camNewPos)),
    target: [].concat(_toConsumableArray(camNewTgt))
  };
}