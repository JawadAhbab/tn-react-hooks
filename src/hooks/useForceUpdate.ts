import { useState } from 'react'

export const useForceUpdate = () => {
  const [, update] = useState({})
  const forceUpdate = (_?:any) => update({})
  return forceUpdate
}
