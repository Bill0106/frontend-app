import { MessageContext } from '@/utils/useMessage'
import styled from '@emotion/styled'
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { FC, useCallback, useRef, useState } from 'react'

const Message = styled.div<{ show: boolean }>`
  position: fixed;
  top: ${p => p.show ? '20px' : '-100%'};
  left: 0;
  right: 0;
  padding: 8px;
  text-align: center;
  transition: all 1s ease-in-out;
  z-index: 9999;
`

const Content = styled.div`
  display: inline-block;
  padding: 8px 16px;
  border-radius: 4px;
  background: #fff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
`

const Text = styled.p`
  display: inline-block;
  margin: 0 0 0 4px;
  line-height: 20px;
`

const ErrorMessage: FC = ({ children }) => {
  const [message, setMessage] = useState('')
  const [visible, setVisible] = useState(false)
  const error = useRef('')

  const setError = useCallback((msg: string) => {
    if (msg && error.current !== msg) {
      setMessage(msg)
      setVisible(true)
      error.current = msg

      setTimeout(() => {
        setVisible(false)
      }, 1000 * 3)
    }
  }, [])

  return (
    <MessageContext.Provider value={{ setMessage: setError }}>
      {children}
      <Message show={visible}>
        <Content>
          <FontAwesomeIcon icon={faExclamationCircle} color="red" />
          <Text>{message}</Text>
        </Content>
      </Message>
    </MessageContext.Provider>
  )
}

export default ErrorMessage
