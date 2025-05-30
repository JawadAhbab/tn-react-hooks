type Elm = HTMLElement;
type Props<E extends HTMLElement> = {
    entry: ResizeObserverEntry;
    elm: E;
};
type OnObserve<E extends HTMLElement> = (props: Props<E>) => void;
export declare const useResizeObserver: <E extends Elm = Elm>(onObserve: OnObserve<E>) => {
    $elm: import("react").RefObject<E | null>;
};
export {};
