import { useEffect } from 'react'
import { useForceUpdate } from './useForceUpdate'

export const useAutoUpdate = (ms: number) => {
  const update = useForceUpdate()
  useEffect(() => {
    const interval = setInterval(() => update(), ms)
    return () => clearInterval(interval)
  }, [])
}
