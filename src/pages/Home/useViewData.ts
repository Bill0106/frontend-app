import { CDN_URI } from '@/constants/env'
import pages from '@/constants/pages'
import loadImage from '@/utils/loadImage'
import { MouseEvent, useCallback, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'

const useViewData = () => {
  const history = useHistory()
  const [background, setBackground] = useState(pages[0].image)
  const [show, setShow] = useState(false)

  const preload = useCallback(async () => {
    await Promise.all(pages.map(v => loadImage(`${CDN_URI}/${v.image}`)))

    setShow(true)
  }, [])

  const handleTitleMouseEnter = () => setBackground(pages[0].image)

  const handleEvent = (e: MouseEvent<HTMLDivElement>) => {
    const text = e.currentTarget.innerHTML
    const section = pages.find(v => v.title === text)
    if (!section) {
      return false
    }

    if (e.type === 'click') {
      history.push(section.path)
    } else if (e.type === 'mouseenter' && document.body.clientWidth >= 768) {
      setBackground(section.image)
    }
  }

  useEffect(() => {
    preload()
  }, [preload])

  return {
    show,
    background: `${CDN_URI}/${background}`,
    handleEvent,
    handleTitleMouseEnter
  }
}

export default useViewData
