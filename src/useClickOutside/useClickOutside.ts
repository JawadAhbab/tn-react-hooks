import { useEffect, useRef } from 'react'
type Callback = (e: MouseEvent) => void

export const useClickOutside = (callback?: Callback, callbackAlways?: Callback) => {
  const ref = useRef<HTMLDivElement>(null)

  const listener = (e: MouseEvent) => {
    callbackAlways && callbackAlways(e)
    if (!ref.current) return
    if (ref.current.contains(e.target as Node)) return
    callback && callback(e)
  }

  useEffect(() => {
    document.addEventListener('mousedown', listener)
    document.addEventListener('contextmenu', listener)
    return () => {
      document.removeEventListener('mousedown', listener)
      document.removeEventListener('contextmenu', listener)
    }
  }, [])

  return ref
}
