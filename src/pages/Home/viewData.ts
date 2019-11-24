import { useState, useCallback, useEffect } from 'react';
import { navigate } from '@reach/router';
import navigation from '@/configs/navigation';
import CDN_URL from '@/configs/cdn';
import loadImage from '@/utils/loadImage';
import useDocumentTitle from '@/hooks/useDocumentTitle';
import useMessage from '@/hooks/useMessage';

interface ViewData {
  background: string;
  show: boolean;
}

interface ViewDataAction {
  handleTitleMouseEnter: () => void;
  handleEvent: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

const defaultImage = navigation[0].image;

const useViewData = (): [ViewData, ViewDataAction] => {
  const [background, setBackground] = useState(defaultImage);
  const [show, setShow] = useState(false);
  const { setError } = useMessage();

  useDocumentTitle('');

  const handlePreload = useCallback(async () => {
    try {
      await Promise.all(
        navigation.map(item => loadImage(CDN_URL + item.image))
      );
      setShow(true);
    } catch (error) {
      setError(error.message);
    }
  }, [setError]);

  const handleTitleMouseEnter = () => setBackground(defaultImage);

  const handleEvent = (e: React.MouseEvent<HTMLDivElement>) => {
    const text = e.currentTarget.innerHTML;
    const section = navigation.find(item => item.title === text);
    if (!section) {
      return false;
    }

    if (e.type === 'click') {
      navigate(section.path);
    } else if (e.type === 'mouseenter' && document.body.clientWidth >= 768) {
      setBackground(section.image);
    }
  };

  useEffect(() => {
    handlePreload();
  }, [handlePreload]);

  return [
    { background: CDN_URL + background, show },
    { handleEvent, handleTitleMouseEnter },
  ];
};

export default useViewData;
