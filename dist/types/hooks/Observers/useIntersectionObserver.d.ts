type El = HTMLElement;
type Props<E extends El> = {
    entry: IntersectionObserverEntry;
    elm: E;
};
type Observe<E extends El> = (props: Props<E>) => void;
type ERef<E extends El> = React.RefObject<E | null>;
type R<E extends El> = {
    $elm: ERef<E>;
};
export declare function useIntersectionObserver<E extends El = El>(observe: Observe<E>): R<E>;
export declare function useIntersectionObserver<E extends El = El>($elm: ERef<E>, observe: Observe<E>): R<E>;
export {};
