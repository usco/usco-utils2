'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = intersect;

var _glMat = require('gl-mat4');

var _glMat2 = _interopRequireDefault(_glMat);

var _glVec = require('gl-vec3');

var _glVec2 = _interopRequireDefault(_glVec);

var _rayAabbIntersection = require('ray-aabb-intersection');

var _rayAabbIntersection2 = _interopRequireDefault(_rayAabbIntersection);

var _rayTriangleIntersection = require('ray-triangle-intersection');

var _rayTriangleIntersection2 = _interopRequireDefault(_rayTriangleIntersection);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function intersect(ray, entity, index) {
  // first check aabb // sphere
  // then go into more precise stuff
  var modelMat = entity.modelMat;
  // convert min & max to world coordinates

  var min = _glVec2.default.transformMat4(_glMat2.default.identity([]), entity.bounds.min, modelMat); // out:vec3, a:vec3, m:mat4
  var max = _glVec2.default.transformMat4(_glMat2.default.identity([]), entity.bounds.max, modelMat); // out:vec3, a:vec3, m:mat4

  var bounds = [min, max]; // [entity.bounds.min, entity.bounds.max] // FIXME !!!! bounds are in local coordinates, not world coordinates !

  var hitAABB = (0, _rayAabbIntersection2.default)([], ray.ro, ray.rd, bounds);
  if (hitAABB) {
    console.log('boundingBox hit', hitAABB);
    // TODO: convert ray (world) coordinates to local coordinates

    var transformMat4 = _glVec2.default.transformMat4;

    var invModelMat = _glMat2.default.invert(_glMat2.default.identity([]), modelMat);
    var localRayRo = transformMat4(_glVec2.default.create(), ray.ro, invModelMat);
    var localRayRd = transformMat4(_glVec2.default.create(), ray.rd, invModelMat);

    //if we do not want to go any deeper into the object
    if (entity.meta.pickLimit && entity.meta.pickLimit === 'bounds') {
      var hitPoint = hitAABB;
      console.log('that is a match !! , for ' + entity.id);
      // distance between intersect point and ray origin, in world space
      var distance = _glVec2.default.length(_glVec2.default.subtract(_glVec2.default.create(), hitPoint, ray.ro));

      setSelection(entity);
      return { intersect: { pos: hitPoint, distance: distance }, entity: entity, index: index };
    }

    if (!entity.geometry.cells) {
      return null;
    }
    var hitTRI = entity.geometry.cells.map(function (cell, index) {
      var positions = entity.geometry.positions;

      // FIXME : UGH local => world conversion works, but this is terribly ineficient
      function conv(pos) {
        return _glVec2.default.transformMat4(_glMat2.default.identity([]), pos, modelMat);
      }
      //FIXME: we can only do it like this if the original data is nested arrays !
      var tri = [conv(positions[cell[0]]), conv(positions[cell[1]]), conv(positions[cell[2]])];

      var hitTRI = (0, _rayTriangleIntersection2.default)([], ray.ro, ray.rd, tri);
      if (hitTRI) {
        console.log('tri', hitTRI);
        return hitTRI;
      }
      return null;
    }).filter(function (h) {
      return h !== null;
    }).reduce(function (acc, cur) {
      acc.push(cur);
      return acc;
    }, []);

    if (hitTRI.length > 0) {
      var _hitPoint = hitTRI[0];
      console.log('that is a match !! , for ' + entity.id);
      // distance between intersect point and ray origin, in world space
      var _distance = _glVec2.default.length(_glVec2.default.subtract(_glVec2.default.create(), _hitPoint, ray.ro));
      //entity.visuals.visible = !entity.visuals.visible
      return { intersect: { pos: _hitPoint, distance: _distance }, entity: entity, index: index };
    }
    return null;
  }
  return null;
}