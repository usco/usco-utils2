"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = boundingBox;
// modified version of https://github.com/thibauts/vertices-bounding-box that also works with non nested positions
function boundingBox(positions) {
  if (positions.length === 0) {
    return null;
  }

  var nested = Array.isArray(positions) && Array.isArray(positions[0]);

  var dimensions = nested ? positions[0].length : 3;
  var min = new Array(dimensions);
  var max = new Array(dimensions);

  for (var i = 0; i < dimensions; i += 1) {
    min[i] = Infinity;
    max[i] = -Infinity;
  }

  if (nested) {
    positions.forEach(function (position) {
      for (var i = 0; i < dimensions; i += 1) {
        var _position = nested ? position[i] : position;
        max[i] = _position > max[i] ? _position : max[i]; // position[i] > max[i] ? position[i] : max[i]
        min[i] = _position < min[i] ? _position : min[i]; // min[i] = position[i] < min[i] ? position[i] : min[i]
      }
    });
  } else {
    for (var j = 0; j < positions.length; j += dimensions) {
      for (var i = 0; i < dimensions; i += 1) {
        var _position = positions[i + j]; // nested ? positions[i] : position
        max[i] = _position > max[i] ? _position : max[i]; // position[i] > max[i] ? position[i] : max[i]
        min[i] = _position < min[i] ? _position : min[i]; // min[i] = position[i] < min[i] ? position[i] : min[i]
      }
    }
  }

  return [min, max];
}