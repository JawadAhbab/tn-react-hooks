import { useRef, useEffect, useState } from 'react';
import { uniqueGetter } from 'tn-uniqid';
function useIntersectionObserver() {
  const observe = arguments.length === 2 ? arguments.length <= 1 ? undefined : arguments[1] : arguments.length <= 0 ? undefined : arguments[0];
  const $givenelm = arguments.length === 2 ? arguments.length <= 0 ? undefined : arguments[0] : undefined;
  const $elm = $givenelm ? $givenelm : useRef(null);
  useEffect(() => {
    const elm = $elm.current;
    if (!elm) return;
    const observer = new IntersectionObserver(_ref => {
      let [entry] = _ref;
      return observe({
        entry,
        elm
      });
    });
    observer.observe(elm);
    return () => observer.disconnect();
  }, []);
  return {
    $elm
  };
}
function useResizeObserver() {
  const observe = arguments.length === 2 ? arguments.length <= 1 ? undefined : arguments[1] : arguments.length <= 0 ? undefined : arguments[0];
  const $givenelm = arguments.length === 2 ? arguments.length <= 0 ? undefined : arguments[0] : undefined;
  const $elm = $givenelm ? $givenelm : useRef(null);
  useEffect(() => {
    const elm = $elm.current;
    if (!elm) return;
    const observer = new ResizeObserver(_ref2 => {
      let [entry] = _ref2;
      return observe({
        entry,
        elm
      });
    });
    observer.observe(elm);
    return () => observer.disconnect();
  }, []);
  return {
    $elm
  };
}
const useForceUpdate = () => {
  const [, update] = useState({});
  const forceUpdate = _ => update({});
  return forceUpdate;
};
const useAutoUpdate = ms => {
  const update = useForceUpdate();
  useEffect(() => {
    const interval = setInterval(() => update(), ms);
    return () => clearInterval(interval);
  }, []);
};
const useClickOutside = (callback, callbackAlways) => {
  const ref = useRef(null);
  const listener = e => {
    callbackAlways && callbackAlways(e);
    if (!ref.current) return;
    if (ref.current.contains(e.target)) return;
    callback && callback(e);
  };
  useEffect(() => {
    document.addEventListener('mousedown', listener);
    document.addEventListener('contextmenu', listener);
    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('contextmenu', listener);
    };
  }, []);
  return ref;
};
const uniqueID = uniqueGetter();
const useForceUpdateUID = () => {
  const [uid, update] = useState(uniqueID());
  const forceUpdate = _ => update(uniqueID());
  return [forceUpdate, uid];
};
const useHover = () => {
  const [value, setValue] = useState(false);
  const ref = useRef(null);
  const handleMouseenter = () => setValue(true);
  const handleMouseleave = () => setValue(false);
  useEffect(() => {
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
  const mounted = useRef(false);
  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);
  return () => mounted.current;
};
const useWinResize = () => {
  const force = useForceUpdate();
  useEffect(() => {
    window.addEventListener('resize', force);
    return () => window.removeEventListener('resize', force);
  }, []);
  return {
    width: window.innerWidth,
    height: window.innerHeight
  };
};
export { useAutoUpdate, useClickOutside, useForceUpdate, useForceUpdateUID, useHover, useIntersectionObserver, useMounted, useResizeObserver, useWinResize };
