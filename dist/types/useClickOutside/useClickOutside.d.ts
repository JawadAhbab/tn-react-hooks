/// <reference types="react" />
declare type Callback = (e: MouseEvent) => void;
export declare const useClickOutside: (callback?: Callback, callbackAlways?: Callback) => import("react").RefObject<HTMLDivElement>;
export {};
