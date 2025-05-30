import { useEffect, useRef } from 'react'
type OnObserve = (entry: ResizeObserverEntry) => void

export const useResizeObserver = (onObserve: OnObserve) => {
  const $elm = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!$elm.current) return
    const observer = new ResizeObserver(([entry]) => onObserve(entry))
    observer.observe($elm.current)
    return () => observer.disconnect()
  }, [])

  return { $elm }
}
