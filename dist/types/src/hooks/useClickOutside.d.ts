/// <reference types="react" />
type Callback = (e: MouseEvent) => void;
export declare const useClickOutside: (callback?: Callback, callbackAlways?: Callback) => import("react").RefObject<HTMLDivElement>;
export {};
