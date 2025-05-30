import { useEffect, useRef } from 'react'
type OnObserve = (entry: IntersectionObserverEntry) => void

export const useIntersectionObserver = (onObserve: OnObserve) => {
  const $elm = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!$elm.current) return
    const observer = new IntersectionObserver(([entry]) => onObserve(entry))
    observer.observe($elm.current)
    return () => observer.disconnect()
  }, [])

  return { $elm }
}
