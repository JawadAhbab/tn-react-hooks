import { MutableRefObject, useEffect, useRef, useState } from 'react'

export const useHover = <T>(): [MutableRefObject<T>, boolean] => {
  const [value, setValue] = useState<boolean>(false)
  const ref: any = useRef<T | null>(null)
  const handleMouseenter = (): void => setValue(true)
  const handleMouseleave = (): void => setValue(false)

  useEffect(() => {
    const node: any = ref.current
    if (node) {
      node.addEventListener('mouseenter', handleMouseenter)
      node.addEventListener('mouseleave', handleMouseleave)
      return () => {
        node.removeEventListener('mouseenter', handleMouseenter)
        node.removeEventListener('mouseleave', handleMouseleave)
      }
    }
  }, [ref.current])

  return [ref, value]
}
