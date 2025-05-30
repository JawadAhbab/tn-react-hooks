import { useEffect, useRef } from 'react'
type Props<E extends HTMLElement> = { entry: ResizeObserverEntry; elm: E }
type OnObserve<E extends HTMLElement> = (props: Props<E>) => void

export const useResizeObserver = <E extends HTMLElement = HTMLElement>(onObserve: OnObserve<E>) => {
  const $elm = useRef<E>(null)

  useEffect(() => {
    const elm = $elm.current
    if (!elm) return
    const observer = new ResizeObserver(([entry]) => onObserve({ entry, elm }))
    observer.observe(elm)
    return () => observer.disconnect()
  }, [])

  return { $elm }
}
