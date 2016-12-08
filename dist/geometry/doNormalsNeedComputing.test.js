'use strict';

var _ava = require('ava');

var _ava2 = _interopRequireDefault(_ava);

var _doNormalsNeedComputing = require('./doNormalsNeedComputing');

var _doNormalsNeedComputing2 = _interopRequireDefault(_doNormalsNeedComputing);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _ava2.default)('doNormalsNeedComputing : no normals', function (t) {
  var geometry = { positions: [0, 1, 2, 3, 4, 5] };
  var result = (0, _doNormalsNeedComputing2.default)(geometry);
  var expResult = true;
  t.deepEqual(result, expResult);
});

(0, _ava2.default)('doNormalsNeedComputing : ok normals', function (t) {
  var geometry = { positions: [0, 1, 2, 3, 4, 5], normals: [1, 1, -1, 1, 1, 1] };
  var result = (0, _doNormalsNeedComputing2.default)(geometry);
  var expResult = false;
  t.deepEqual(result, expResult);
});

(0, _ava2.default)('doNormalsNeedComputing : wrong normals', function (t) {
  var geometry = { positions: [0, 1, 2, 3, 4, 5], normals: [0, 0, 0, 0, 0, 0, 0] };
  var result = (0, _doNormalsNeedComputing2.default)(geometry);
  var expResult = true;
  t.deepEqual(result, expResult);
});

(0, _ava2.default)('doNormalsNeedComputing : wrong normals, custom testLength', function (t) {
  var geometry = { positions: [0, 1, 2, 3, 4, 5], normals: [0, 0, 0, 1, 0, 0, 0] };
  var result = (0, _doNormalsNeedComputing2.default)(geometry, 4);
  var expResult = false;
  t.deepEqual(result, expResult);
});