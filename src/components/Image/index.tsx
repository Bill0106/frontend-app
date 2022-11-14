import bem from '@/utils/bem'
import loadImage from '@/utils/loadImage'
import { IconDefinition } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { FC, useCallback, useEffect, useRef, useState } from 'react'

export interface ImageProps {
  url: string
  icon: IconDefinition
  iconSize?: number
  height?: number
}

const placeholder = `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAA
AC1HAwCAAAAC0lEQVR4nGP6zwAAAgcBApocMXEAAAAASUVORK5CYII=`

const Image: FC<ImageProps> = ({ url, icon, iconSize, height }) => {
  const { block, element } = bem('image')
  const [show, setShow] = useState(false)
  const isMounted = useRef(true)

  const load = useCallback(async () => {
    await loadImage(url)
    if (isMounted.current) {
      setShow(true)
    }
  }, [url])

  useEffect(() => {
    isMounted.current = true
    if (!show) {
      load()
    }

    return () => {
      isMounted.current = false
    }
  }, [show, load])

  return (
    <div {...block().class} style={{ height: height ? `${height}px` : 'auto' }}>
      <img {...element('placeholder').class} src={placeholder} alt="placeholder" />
      <img {...element('img').modifiers({ show })} src={url} />
      <i {...element('icon').modifiers({ show: !show })} style={{ fontSize: `${iconSize || 50}px` }}>
        <FontAwesomeIcon icon={icon} />
      </i>
    </div>
  )
}

export default Image
