import bem from '@/utils/bem'
import { MessageContext } from '@/utils/useMessage'
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { FC, ReactNode, useCallback, useRef, useState } from 'react'

const ErrorMessage: FC<{ children?: ReactNode }> = ({ children }) => {
  const { block, element } = bem('message')
  const [message, setMessage] = useState('')
  const [show, setShow] = useState(false)
  const error = useRef('')

  const setError = useCallback((msg: string) => {
    if (msg && error.current !== msg) {
      setMessage(msg)
      setShow(true)
      error.current = msg

      setTimeout(() => {
        setShow(false)
      }, 1000 * 3)
    }
  }, [])

  return (
    <MessageContext.Provider value={{ setMessage: setError }}>
      {children}
      <div {...block().modifiers({ show })}>
        <div {...element('content').class}>
          <FontAwesomeIcon icon={faExclamationCircle} color="red" />
          <p {...element('text').class}>{message}</p>
        </div>
      </div>
    </MessageContext.Provider>
  )
}

export default ErrorMessage
