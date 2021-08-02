import pages from '@/constants/pages'
import {
  clearAllBodyScrollLocks,
  disableBodyScroll,
  enableBodyScroll
} from 'body-scroll-lock'
import { MouseEvent, useEffect, useRef, useState } from 'react'
import { useHistory } from 'react-router-dom'

const useViewData = () => {
  const history = useHistory()
  const menu = useRef<HTMLUListElement | null>(null)
  const [show, setShow] = useState(false)

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

  const handleClick = (e: MouseEvent<HTMLLIElement>) => {
    const title = e.currentTarget.innerHTML.toLowerCase()
    const page = pages.find(v => v.title.toLowerCase() === title)
    if (!page) {
      return false
    }

    history.push(page.path)
    show && handleClose()
  }

  useEffect(() => {
    return () => clearAllBodyScrollLocks()
  }, [])

  return { menu, show, handleOpen, handleClose, handleClick }
}

export default useViewData
