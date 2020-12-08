/*! @name @videojs/vhs-utils @version 2.2.1 @license MIT */
'use strict';

var window = require('global/window');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var window__default = /*#__PURE__*/_interopDefaultLegacy(window);

var atob = function atob(s) {
  return window__default['default'].atob ? window__default['default'].atob(s) : Buffer.from(s, 'base64').toString('binary');
};

function decodeB64ToUint8Array(b64Text) {
  var decodedString = atob(b64Text);
  var array = new Uint8Array(decodedString.length);

  for (var i = 0; i < decodedString.length; i++) {
    array[i] = decodedString.charCodeAt(i);
  }

  return array;
}

module.exports = decodeB64ToUint8Array;
