import { useEffect, useRef } from 'react'
type OnChange = (entry: IntersectionObserverEntry) => void

export const useIntersectionObserver = (onChange: OnChange) => {
  const $elm = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!$elm.current) return
    const observer = new IntersectionObserver(([entry]) => onChange(entry))
    observer.observe($elm.current)
    return () => observer.disconnect()
  }, [])

  return { $elm }
}
