import { createContext, useContext } from 'react'

export interface ResizeContextValue {
  size: number
}

export const ResizeContext = createContext({} as ResizeContextValue)

const useResize = () => {
  const { size } = useContext(ResizeContext)

  return { size }
}

export default useResize
