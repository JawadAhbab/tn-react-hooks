import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import { useRef, useEffect, useState } from 'react';
import { uniqueGetter } from 'tn-uniqid';
var useClickOutside = function useClickOutside(callback, callbackAlways) {
  var ref = useRef(null);
  var listener = function listener(e) {
    callbackAlways && callbackAlways(e);
    if (!ref.current) return;
    if (ref.current.contains(e.target)) return;
    callback && callback(e);
  };
  useEffect(function () {
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
  var _useState = useState(false),
    _useState2 = _slicedToArray(_useState, 2),
    value = _useState2[0],
    setValue = _useState2[1];
  var ref = useRef(null);
  var handleMouseenter = function handleMouseenter() {
    return setValue(true);
  };
  var handleMouseleave = function handleMouseleave() {
    return setValue(false);
  };
  useEffect(function () {
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
  var mounted = useRef(false);
  useEffect(function () {
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
  var _useState3 = useState({}),
    _useState4 = _slicedToArray(_useState3, 2),
    update = _useState4[1];
  var forceUpdate = function forceUpdate(_) {
    return update({});
  };
  return forceUpdate;
};
var useAutoUpdate = function useAutoUpdate(ms) {
  var update = useForceUpdate();
  useEffect(function () {
    var interval = setInterval(function () {
      return update();
    }, ms);
    return function () {
      return clearInterval(interval);
    };
  }, []);
};
var uniqueID = uniqueGetter();
var useForceUpdateUID = function useForceUpdateUID() {
  var _useState5 = useState(uniqueID()),
    _useState6 = _slicedToArray(_useState5, 2),
    uid = _useState6[0],
    update = _useState6[1];
  var forceUpdate = function forceUpdate(_) {
    return update(uniqueID());
  };
  return [forceUpdate, uid];
};
export { useAutoUpdate, useClickOutside, useForceUpdate, useForceUpdateUID, useHover, useMounted };
