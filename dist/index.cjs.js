'use strict';

var react = require('react');
var tnUniqid = require('tn-uniqid');
const useForceUpdate = () => {
  const [, update] = react.useState({});
  const forceUpdate = _ => update({});
  return forceUpdate;
};
const useAutoUpdate = ms => {
  const update = useForceUpdate();
  react.useEffect(() => {
    const interval = setInterval(() => update(), ms);
    return () => clearInterval(interval);
  }, []);
};
const useClickOutside = (callback, callbackAlways) => {
  const ref = react.useRef(null);
  const listener = e => {
    callbackAlways && callbackAlways(e);
    if (!ref.current) return;
    if (ref.current.contains(e.target)) return;
    callback && callback(e);
  };
  react.useEffect(() => {
    document.addEventListener('mousedown', listener);
    document.addEventListener('contextmenu', listener);
    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('contextmenu', listener);
    };
  }, []);
  return ref;
};
const uniqueID = tnUniqid.uniqueGetter();
const useForceUpdateUID = () => {
  const [uid, update] = react.useState(uniqueID());
  const forceUpdate = _ => update(uniqueID());
  return [forceUpdate, uid];
};
const useHover = () => {
  const [value, setValue] = react.useState(false);
  const ref = react.useRef(null);
  const handleMouseenter = () => setValue(true);
  const handleMouseleave = () => setValue(false);
  react.useEffect(() => {
    const node = ref.current;
    if (node) {
      node.addEventListener('mouseenter', handleMouseenter);
      node.addEventListener('mouseleave', handleMouseleave);
      return () => {
        node.removeEventListener('mouseenter', handleMouseenter);
        node.removeEventListener('mouseleave', handleMouseleave);
      };
    }
  }, [ref.current]);
  return [ref, value];
};
const useMounted = () => {
  const mounted = react.useRef(false);
  react.useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);
  return () => mounted.current;
};
const useWinResize = () => {
  const force = useForceUpdate();
  react.useEffect(() => {
    window.addEventListener('resize', force);
    return () => window.removeEventListener('resize', force);
  }, []);
  return {
    width: window.innerWidth,
    height: window.innerHeight
  };
};
exports.useAutoUpdate = useAutoUpdate;
exports.useClickOutside = useClickOutside;
exports.useForceUpdate = useForceUpdate;
exports.useForceUpdateUID = useForceUpdateUID;
exports.useHover = useHover;
exports.useMounted = useMounted;
exports.useWinResize = useWinResize;
