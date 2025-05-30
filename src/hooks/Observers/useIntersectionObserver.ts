import { useEffect, useRef } from 'react'
type Elm = HTMLElement
type Props<E extends HTMLElement> = { entry: IntersectionObserverEntry; elm: E }
type Observe<E extends HTMLElement> = (props: Props<E>) => void

export const useIntersectionObserver = <E extends Elm = Elm>(observe: Observe<E>) => {
  const $elm = useRef<E>(null)

  useEffect(() => {
    const elm = $elm.current
    if (!elm) return
    const observer = new IntersectionObserver(([entry]) => observe({ entry, elm }))
    observer.observe(elm)
    return () => observer.disconnect()
  }, [])

  return { $elm }
}
