import { useEffect } from 'react'
import { useForceUpdate } from './useForceUpdate'

export const useWinResize = () => {
  const force = useForceUpdate()
  useEffect(() => {
    window.addEventListener('resize', force)
    return () => window.removeEventListener('resize', force)
  }, [])

  return { width: window.innerWidth, height: window.innerHeight }
}
