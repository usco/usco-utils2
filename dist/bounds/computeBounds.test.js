'use strict';

var _ava = require('ava');

var _ava2 = _interopRequireDefault(_ava);

var _computeBounds = require('./computeBounds');

var _computeBounds2 = _interopRequireDefault(_computeBounds);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _ava2.default)('computeBounds', function (t) {
  var input = {
    geometry: {
      positions: [0, 2, 1, -10, 2, 1, -2.4, -2.8, 4]
    },
    transforms: {
      sca: [1, 1, 1]
    }
  };

  var expBounds = {
    dia: 5.745432971379113,
    center: [-5, -0.4000000059604645, 2.5],
    min: [-10, -2.8, 1],
    max: [0, 2, 4],
    size: [10, 4.8, 3]
  };

  var bounds = (0, _computeBounds2.default)(input);

  t.deepEqual(bounds, expBounds);
});

(0, _ava2.default)('computeBounds (non default scale)', function (t) {
  var input = {
    geometry: {
      positions: [0, 2, 1, -10, 2, 1, -2.4, -2.8, 4]
    },
    transforms: {
      sca: [1.2, 0.7, -1]
    }
  };

  var expBounds = {
    dia: 9.415252306303229,
    center: [-6, -0.2800000011920929, -2.5],
    min: [-12, -1.9599999999999997, -1],
    max: [0, 1.4, -4],
    size: [12, 3.3599999999999994, -3]
  };

  var bounds = (0, _computeBounds2.default)(input);

  t.deepEqual(bounds, expBounds);
});