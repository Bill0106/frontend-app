import * as React from 'react';

const PAGE_TITLE = `Bill's Hoddy`;

const { useEffect } = React;

const useDocumentTitle = (title: string | Array<string>) => {
  useEffect(() => {
    const documentTitle = Array.isArray(title) ? title.join(' - ') : title;
    document.title = documentTitle + (documentTitle && ' | ') + PAGE_TITLE;
  }, [title]);
};

export default useDocumentTitle;
