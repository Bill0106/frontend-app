import { useCallback } from 'react'

const PAGE_TITLE = 'Bill\'s Hobby'

const useDocumentTitle = () => {
  const setTitle = useCallback((title: string | string[]) => {
    const documentTitle = Array.isArray(title) ? title.join(' - ') : title

    document.title = [
      documentTitle,
      documentTitle && ' | ',
      PAGE_TITLE
    ].join('')
  }, [])

  return { setTitle }
}

export default useDocumentTitle
