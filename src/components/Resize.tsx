import { FC, ReactNode, useCallback, useEffect, useState } from 'react'
import { ResizeContext } from '@/utils/useResize'

const Resize: FC<{ children?: ReactNode }> = ({ children }) => {
  const [size, setSize] = useState(0)

  const handleResize = useCallback(() => {
    setSize(window.innerWidth)
  }, [])

  useEffect(() => {
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [handleResize])

  return (
    <ResizeContext.Provider value={{ size }}>
      {children}
    </ResizeContext.Provider>
  )
}

export default Resize
