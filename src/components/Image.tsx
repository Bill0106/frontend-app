import loadImage from '@/utils/loadImage'
import { keyframes } from '@emotion/css'
import styled from '@emotion/styled'
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

const loading = keyframes`
  0% {
    color: #666;
  }
  50% {
    color: #ccc;
  }
  100% {
    color: #666;
  }
`

const Container = styled.div<{ height: number | undefined }>`
  position: relative;
  ${p => p.height && `height: ${p.height}px`};
  background: #e0e0e0;
`

const Placeholder = styled.img`
  display: block;
  width: 100%;
`

const Img = styled.img<{ show: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: ${p => p.show ? 1 : 0};
  transition: opacity 0.3s ease-in-out;
`

const Icon = styled.i<{ show: boolean; size: number }>`
  display: ${p => p.show ? 'inline-block' : 'none'};
  position: absolute;
  top: 50%;
  left: 50%;
  font-size: ${p => p.size}px;
  color: #666;
  transform: translate(-50%, -50%);
  animation: ${loading} 1.5s ease-in-out infinite;
`

const Image: FC<ImageProps> = ({ url, icon, iconSize, height }) => {
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
    <Container height={height}>
      <Placeholder src={placeholder} />
      <Img src={url} show={show} />
      <Icon show={!show} size={iconSize || 50}>
        <FontAwesomeIcon icon={icon} />
      </Icon>
    </Container>
  )
}

export default Image
