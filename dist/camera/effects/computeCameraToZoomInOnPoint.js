'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = zoomInOn;

var _glVec = require('gl-vec3');

var _glVec2 = _interopRequireDefault(_glVec);

var _assign2 = require('fast.js/object/assign');

var _assign3 = _interopRequireDefault(_assign2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// faster object.assign

function zoomInOn(options, camera, target) {
  var defaults = {
    position: undefined, // to force a given "point " vector to zoom in on
    distance: 3,
    zoomTime: 400,
    precision: 0.001
  };

  if (!target || !camera) return;

  var _assign = (0, _assign3.default)({}, defaults, options),
      position = _assign.position,
      distance = _assign.distance,
      zoomTime = _assign.zoomTime,
      precision = _assign.precision;
  // console.log("ZoomInOnObject", targetObject,options)

  if (!position) {
    distance = target.bounds.radius * distance;
    position = target.transforms.pos;
  } else {
    distance = _glVec2.default.length(_glVec2.default.subtract(_glVec2.default.create(), position, target.transforms.pos)) * distance * 2;
  }

  var camPos = camera.position;
  var camTgt = camera.target || _glVec2.default.create();

  var camTgtTarget = position;
  var camPosTarget = _glVec2.default.subtract(_glVec2.default.create(), camera.position, position); // camera.position.clone().sub(position)

  // determin camera "look-at" vector
  var camLookatVector = _glVec2.default.create(0, 0, 1);
  var camQuaternion = '';
  camLookatVector = _glVec2.default.transformQuat(camLookatVector, camLookatVector, camera.quaternion); // camLookatVector.applyQuaternion(camera.quaternion)
  camLookatVector = _glVec2.default.normalize(camLookatVector, camLookatVector);
  camLookatVector = _glVec2.default.scale(camLookatVector, distance);
  camLookatVector = _glVec2.default.add(camLookatVector, position, camLookatVector); // position.clone().add(camLookatVector)
  camPosTarget = camLookatVector;

  // Simply using vector.equals( otherVector) is not good enough
  if (Math.abs(camPos.x - camPosTarget.x) <= precision && Math.abs(camPos.y - camPosTarget.y) <= precision && Math.abs(camPos.z - camPosTarget.z) <= precision) {
    // already at target, do nothing
    return { position: camPos, target: camTgt };
  }

  // return data instead of mutating anything, making things more testable too
  // return a set of end /final points , both for the position...and target
  return { position: camPosTarget, target: camTgtTarget };
}

/*return {
starts:[camPos,camTgt]//order matters
,ends:[camTgt, camTgtTarget]
,attrs:["position","target"]
,easing:[TWEEN.Easing.Quadratic.In,TWEEN.Easing.Quadratic.In]
,duration:zoomTime}
  }*/

/*
let tween = new TWEEN.Tween(camPos)
  .to(camPosTarget , zoomTime)
  .easing(TWEEN.Easing.Quadratic.In)
  .onUpdate(function () {
    camera.position.copy(camPos)
  })
  .start()

let tween2 = new TWEEN.Tween(camTgt)
  .to(camTgtTarget , zoomTime)
  .easing(TWEEN.Easing.Quadratic.In)
  .onUpdate(function () {
    camera.target.copy(camTgt)
  })
  .start()
*/


//import TWEEN from 'tween.js'