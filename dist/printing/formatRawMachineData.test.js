'use strict';

var _ava = require('ava');

var _ava2 = _interopRequireDefault(_ava);

var _formatRawMachineData = require('./formatRawMachineData');

var _formatRawMachineData2 = _interopRequireDefault(_formatRawMachineData);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _ava2.default)('formatRawMachineData', function (t) {

  var input = {
    'name': 'foo',
    'machine_width': 215,
    'machine_depth': 150,
    'machine_height': 200,
    'printable_area': [180, 200],
    'machine_head_with_fans_polygon': { 'default_value': [[-40, 10], [-40, -30], [60, 10], [60, -30]] },
    'machine_disallowed_areas': { 'default_value': [[[-91.5, -115], [-115, -115], [-115, -104.6], [-91.5, -104.6]], [[-99.5, -104.6], [-115, -104.6], [-115, 104.6], [-99.5, 104.6]], [[-94.5, 104.6], [-115, 104.6], [-115, 105.5], [-94.5, 105.5]], [[-91.4, 105.5], [-115, 105.5], [-115, 115], [-91.4, 115]], [[77.3, -115], [77.3, -98.6], [115, -98.6], [115, -115]], [[97.2, -98.6], [97.2, -54.5], [113, -54.5], [113, -98.6]], [[100.5, -54.5], [100.5, 99.3], [115, 99.3], [115, -54.5]], [[77, 99.3], [77, 115], [115, 115], [115, 99.3]]] },
    'prime_tower_position_x': { 'default_value': 180 }
  };

  var expOutput = {
    name: 'foo',
    machine_volume: [215, 150, 200],
    printable_area: [180, 200],
    machine_head_with_fans_polygon: [
      /*[-40, 10],
      [-40, -30],
      [60, 10],
      [60, -30]*/
    ],
    machine_disallowed_areas: [
      /*[[-91.5, -115], [-115, -115], [-115, -104.6], [-91.5, -104.6]],
      [[-99.5, -104.6], [-115, -104.6], [-115, 104.6], [-99.5, 104.6]],
      [[-94.5, 104.6], [-115, 104.6], [-115, 105.5], [-94.5, 105.5]],
      [[-91.4, 105.5], [-115, 105.5], [-115, 115], [-91.4, 115]],
       [[77.3, -115], [77.3, -98.6], [115, -98.6], [115, -115]],
      [[97.2, -98.6], [97.2, -54.5], [113, -54.5], [113, -98.6]],
      [[100.5, -54.5], [100.5, 99.3], [115, 99.3], [115, -54.5]],
      [[77, 99.3], [77, 115], [115, 115], [115, 99.3]]*/
    ]
  };
  var output = (0, _formatRawMachineData2.default)(input);

  t.deepEqual(output, expOutput);
});