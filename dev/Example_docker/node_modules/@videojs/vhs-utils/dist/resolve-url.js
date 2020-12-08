/*! @name @videojs/vhs-utils @version 2.2.1 @license MIT */
'use strict';

var URLToolkit = require('url-toolkit');
var window = require('global/window');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var URLToolkit__default = /*#__PURE__*/_interopDefaultLegacy(URLToolkit);
var window__default = /*#__PURE__*/_interopDefaultLegacy(window);

var resolveUrl = function resolveUrl(baseUrl, relativeUrl) {
  // return early if we don't need to resolve
  if (/^[a-z]+:/i.test(relativeUrl)) {
    return relativeUrl;
  } // if the base URL is relative then combine with the current location


  if (!/\/\//i.test(baseUrl)) {
    baseUrl = URLToolkit__default['default'].buildAbsoluteURL(window__default['default'].location && window__default['default'].location.href || '', baseUrl);
  }

  return URLToolkit__default['default'].buildAbsoluteURL(baseUrl, relativeUrl);
};

module.exports = resolveUrl;
