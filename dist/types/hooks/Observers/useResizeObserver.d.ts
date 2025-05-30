type Elm = HTMLElement;
type Props<E extends HTMLElement> = {
    entry: ResizeObserverEntry;
    elm: E;
};
type Observe<E extends HTMLElement> = (props: Props<E>) => void;
export declare const useResizeObserver: <E extends Elm = Elm>(observe: Observe<E>) => {
    $elm: import("react").RefObject<E | null>;
};
export {};
