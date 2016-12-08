'use strict';

var _ava = require('ava');

var _ava2 = _interopRequireDefault(_ava);

var _isObjectOutsideBounds = require('./isObjectOutsideBounds');

var _isObjectOutsideBounds2 = _interopRequireDefault(_isObjectOutsideBounds);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _ava2.default)('isObjectOutsideBounds', function (t) {
  var entity = {
    transforms: {
      pos: [0, -2.3, 71]
    },
    bounds: {
      min: [-7, 0, -1.7],
      max: [32, 0.8, 8.2]
    }
  };

  var machineParams = {
    machine_volume: [100, 150, 220],
    printable_area: [180, 200]
  };

  var outOfBounds = (0, _isObjectOutsideBounds2.default)(machineParams, entity);

  t.deepEqual(outOfBounds, false);
});

(0, _ava2.default)('isObjectOutsideBounds( is out of bounds)', function (t) {
  var entity = {
    transforms: {
      pos: [20, -2.3, 71]
    },
    bounds: {
      min: [-7, 0, -1.7],
      max: [74, 0.8, 8.2]
    }
  };

  var machineParams = {
    machine_volume: [50, 50, 50],
    printable_area: [180, 200]
  };

  var outOfBounds = (0, _isObjectOutsideBounds2.default)(machineParams, entity);

  t.deepEqual(outOfBounds, true);
});

(0, _ava2.default)('isObjectOutsideBounds(tall object)', function (t) {
  var entity = {
    transforms: {
      pos: [0, 0.3, 0]
    },
    bounds: {
      min: [-20, -10, 0],
      max: [20, 10, 250]
    }
  };

  var machineParams = {
    machine_volume: [250, 250, 250],
    printable_area: [180, 200]
  };

  var outOfBounds = (0, _isObjectOutsideBounds2.default)(machineParams, entity);

  t.deepEqual(outOfBounds, true);
});