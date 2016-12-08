'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = computeBounds;

var _glVec = require('gl-vec3');

var _glVec2 = _interopRequireDefault(_glVec);

var _boundingBox = require('./boundingBox');

var _boundingBox2 = _interopRequireDefault(_boundingBox);

var _boundingSphere = require('./boundingSphere');

var _boundingSphere2 = _interopRequireDefault(_boundingSphere);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

/**
 * compute all bounding data given geometry data + position
 * @param  {Object} transforms the initial transforms ie {pos:[x, x, x], rot:[x, x, x], sca:[x, x, x]}.
 * @param  {String} bounds the current bounds of the entity
 * @param  {String} axes on which axes to apply the transformation (default: [0, 0, 1])
 * @return {Object}      a new transforms object, with offset position
 * returns an object in this form:
 * bounds: {
 *  dia: 40,
 *   center: [0,20,8],
 *   min: [9, -10, 0],
 *   max: [15, 10, 4]
 *   size: [6,20,4]
 *}
 */
function computeBounds(object) {
  var scale = object.transforms.sca;
  var bbox = (0, _boundingBox2.default)(object.geometry.positions);
  bbox[0] = bbox[0].map(function (x, i) {
    return x * scale[i];
  });
  bbox[1] = bbox[1].map(function (x, i) {
    return x * scale[i];
  });

  var center = _glVec2.default.scale(_glVec2.default.create(), _glVec2.default.add(_glVec2.default.create(), bbox[0], bbox[1]), 0.5);
  var bsph = (0, _boundingSphere2.default)(center, object.geometry.positions) * Math.max.apply(Math, _toConsumableArray(scale));
  var size = [bbox[1][0] - bbox[0][0], bbox[1][1] - bbox[0][1], bbox[1][2] - bbox[0][2]];

  return {
    dia: bsph,
    center: [].concat(_toConsumableArray(center)),
    min: bbox[0],
    max: bbox[1],
    size: size
  };
}