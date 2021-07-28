import { useEffect } from 'react'

const PAGE_TITLE = 'Bill\'s Hobby'

const useDocumentTitle = (title: string | string[]) => {
  useEffect(() => {
    const documentTitle = Array.isArray(title) ? title.join(' - ') : title

    document.title = [
      documentTitle,
      documentTitle && ' | ',
      PAGE_TITLE
    ].join('')
  }, [title])
}

export default useDocumentTitle
