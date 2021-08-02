import { createContext, useContext } from 'react'

export interface MessageContextValue {
  setMessage: (message: string) => void
}

export const MessageContext = createContext({} as MessageContextValue)

const useMessage = () => {
  const { setMessage } = useContext(MessageContext)

  return { setMessage }
}

export default useMessage
