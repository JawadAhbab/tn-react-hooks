import { useEffect, useRef } from 'react'
type Elm = HTMLElement
type Props<E extends HTMLElement> = { entry: ResizeObserverEntry; elm: E }
type Observe<E extends HTMLElement> = (props: Props<E>) => void

export const useResizeObserver = <E extends Elm = Elm>(observe: Observe<E>) => {
  const $elm = useRef<E>(null)

  useEffect(() => {
    const elm = $elm.current
    if (!elm) return
    const observer = new ResizeObserver(([entry]) => observe({ entry, elm }))
    observer.observe(elm)
    return () => observer.disconnect()
  }, [])

  return { $elm }
}
