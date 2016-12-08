'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getExtension = getExtension;
exports.getNameAndExtension = getNameAndExtension;
exports.isValidFile = isValidFile;
// file utils ??
function getExtension(fname) {
  return fname.substr((~-fname.lastIndexOf('.') >>> 0) + 2).toLowerCase();
}

function getNameAndExtension(uri) {
  var _uriElems = uri.split('?');
  var name = _uriElems.shift().split('/').pop();
  var ext = getExtension(uri);
  return { name: name, ext: ext };
}

function isValidFile(file) {
  return typeof file !== 'undefined' && file !== null && file instanceof File;
}