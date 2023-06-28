'use strict';

var _slicedToArray = require("@babel/runtime/helpers/slicedToArray");
var react = require('react');
var tnUniqid = require('tn-uniqid');
var useClickOutside = function useClickOutside(callback, callbackAlways) {
  var ref = react.useRef(null);
  var listener = function listener(e) {
    callbackAlways && callbackAlways(e);
    if (!ref.current) return;
    if (ref.current.contains(e.target)) return;
    callback && callback(e);
  };
  react.useEffect(function () {
    document.addEventListener('mousedown', listener);
    document.addEventListener('contextmenu', listener);
    return function () {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('contextmenu', listener);
    };
  }, []);
  return ref;
};
var useHover = function useHover() {
  var _react$useState = react.useState(false),
    _react$useState2 = _slicedToArray(_react$useState, 2),
    value = _react$useState2[0],
    setValue = _react$useState2[1];
  var ref = react.useRef(null);
  var handleMouseenter = function handleMouseenter() {
    return setValue(true);
  };
  var handleMouseleave = function handleMouseleave() {
    return setValue(false);
  };
  react.useEffect(function () {
    var node = ref.current;
    if (node) {
      node.addEventListener('mouseenter', handleMouseenter);
      node.addEventListener('mouseleave', handleMouseleave);
      return function () {
        node.removeEventListener('mouseenter', handleMouseenter);
        node.removeEventListener('mouseleave', handleMouseleave);
      };
    }
  }, [ref.current]);
  return [ref, value];
};
var useMounted = function useMounted() {
  var mounted = react.useRef(false);
  react.useEffect(function () {
    mounted.current = true;
    return function () {
      mounted.current = false;
    };
  }, []);
  return function () {
    return mounted.current;
  };
};
var useForceUpdate = function useForceUpdate() {
  var _react$useState3 = react.useState({}),
    _react$useState4 = _slicedToArray(_react$useState3, 2),
    update = _react$useState4[1];
  var forceUpdate = function forceUpdate(_) {
    return update({});
  };
  return forceUpdate;
};
var useAutoUpdate = function useAutoUpdate(ms) {
  var update = useForceUpdate();
  react.useEffect(function () {
    var interval = setInterval(function () {
      return update();
    }, ms);
    return function () {
      return clearInterval(interval);
    };
  }, []);
};
var uniqueID = tnUniqid.uniqueGetter();
var useForceUpdateUID = function useForceUpdateUID() {
  var _react$useState5 = react.useState(uniqueID()),
    _react$useState6 = _slicedToArray(_react$useState5, 2),
    uid = _react$useState6[0],
    update = _react$useState6[1];
  var forceUpdate = function forceUpdate(_) {
    return update(uniqueID());
  };
  return [forceUpdate, uid];
};
exports.useAutoUpdate = useAutoUpdate;
exports.useClickOutside = useClickOutside;
exports.useForceUpdate = useForceUpdate;
exports.useForceUpdateUID = useForceUpdateUID;
exports.useHover = useHover;
exports.useMounted = useMounted;
