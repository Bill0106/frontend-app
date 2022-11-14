import classnames from '@/utils/classnames'
import { MessageContext } from '@/utils/useMessage'
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { FC, ReactNode, useCallback, useRef, useState } from 'react'

const ErrorMessage: FC<{ children?: ReactNode }> = ({ children }) => {
  const classname = classnames('message')
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
      <div {...classname('', { show })}>
        <div {...classname('content')}>
          <FontAwesomeIcon icon={faExclamationCircle} color="red" />
          <p {...classname('text')}>{message}</p>
        </div>
      </div>
    </MessageContext.Provider>
  )
}

export default ErrorMessage
