import { CDN_URI } from '@/constants/env'
import pages from '@/constants/pages'
import loadImage from '@/utils/loadImage'
import useDocumentTitle from '@/utils/useDocumentTitle'
import { MouseEvent, useCallback, useEffect, useState } from 'react'
import bem from '@/utils/bem'

const useViewData = () => {
  const classname = bem('home')
  const { setTitle } = useDocumentTitle()
  const [background, setBackground] = useState(pages[0].image)
  const [show, setShow] = useState(false)

  const preload = useCallback(async () => {
    await Promise.all(pages.map(v => loadImage(`${CDN_URI}/images/${v.image}`)))

    setShow(true)
  }, [])

  const handleTitleMouseEnter = () => setBackground(pages[0].image)

  const handleEvent = (e: MouseEvent<HTMLAnchorElement>) => {
    const text = e.currentTarget.innerHTML
    const section = pages.find(v => v.title === text)
    if (!section) {
      return false
    }

    if (document.body.clientWidth >= 768) {
      setBackground(section.image)
    }
  }

  useEffect(() => {
    setTitle('')
  }, [setTitle])

  useEffect(() => {
    preload()
  }, [preload])

  return {
    show,
    classname,
    background: `${CDN_URI}/images/${background}`,
    handleEvent,
    handleTitleMouseEnter
  }
}

export default useViewData
