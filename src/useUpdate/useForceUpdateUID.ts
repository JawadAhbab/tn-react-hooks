import { useState } from 'react'
import { uniqueID } from '../utils/uniqueID'

export const useForceUpdateUID = () => {
  const [uid, update] = useState(uniqueID())
  const forceUpdate = (_?:any) => update(uniqueID())
  return [forceUpdate, uid] as const
}
