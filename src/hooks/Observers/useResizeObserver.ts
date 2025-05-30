import { useEffect, useRef } from 'react'
type El = HTMLElement
type Props<E extends El> = { entry: ResizeObserverEntry; elm: E }
type Observe<E extends El> = (props: Props<E>) => void
type ERef<E extends El> = React.RefObject<E | null>
type Args<E extends El> = [Observe<E>] | [ERef<E> | Observe<E>, Observe<E>]
type R<E extends El> = { $elm: ERef<E> }

export function useResizeObserver<E extends El = El>(observe: Observe<E>): R<E>
export function useResizeObserver<E extends El = El>($elm: ERef<E>, observe: Observe<E>): R<E>
export function useResizeObserver<E extends El = El>(...args: Args<E>): R<E> {
  const observe = args.length === 2 ? args[1] : args[0]
  const $givenelm = args.length === 2 ? (args[0] as ERef<E>) : undefined
  const $elm = $givenelm ? $givenelm : useRef<E>(null)

  useEffect(() => {
    const elm = $elm.current
    if (!elm) return
    const observer = new ResizeObserver(([entry]) => observe({ entry, elm }))
    observer.observe(elm)
    return () => observer.disconnect()
  }, [])

  return { $elm }
}
