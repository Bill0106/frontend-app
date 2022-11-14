import classnames from '@/utils/classnames'
import {
  clearAllBodyScrollLocks,
  disableBodyScroll,
  enableBodyScroll
} from 'body-scroll-lock'
import { useEffect, useRef, useState } from 'react'

const useViewData = () => {
  const menu = useRef<HTMLUListElement | null>(null)
  const [show, setShow] = useState(false)

  const classname = classnames('layout')

  const handleOpen = () => {
    setShow(true)
    if (menu.current) {
      disableBodyScroll(menu.current)
    }
  }

  const handleClose = () => {
    setShow(false)
    if (menu.current) {
      enableBodyScroll(menu.current)
    }
  }

  const handleClick = () => {
    show && handleClose()
  }

  useEffect(() => {
    return () => clearAllBodyScrollLocks()
  }, [])

  return { menu, show, handleOpen, handleClose, handleClick, classname }
}

export default useViewData
