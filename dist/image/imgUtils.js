'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.contextToBuffer = contextToBuffer;
exports.writeBufferToFile = writeBufferToFile;
exports.writeContextToFile = writeContextToFile;

var _bufferToPng = require('./bufferToPng');

var _bufferToPng2 = _interopRequireDefault(_bufferToPng);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function contextToBuffer(gl, width, height) {
  var depth = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 4;

  var buffer = new Uint8Array(width * height * depth);
  gl.readPixels(0, 0, width, height, gl.RGBA, gl.UNSIGNED_BYTE, buffer);
  return buffer;
}

function writeBufferToFile(buffer, width, height, path) {
  (0, _bufferToPng2.default)(buffer, width, height, path);
}

function writeContextToFile(context, width, height, depth) {
  var path = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : './test.png';

  var buffer = contextToBuffer(context, width, height, depth);
  writeBufferToFile(buffer, width, height, path);
}