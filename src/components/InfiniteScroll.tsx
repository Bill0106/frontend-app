import * as React from 'react';
import Loading from '@/components/Loading';

const { useEffect } = React;

export interface Props {
  isBusy: boolean;
  hasMore: boolean;
  onLoadMore: () => void;
}

const InfiniteScroll: React.SFC<Props> = ({
  children,
  isBusy,
  hasMore,
  onLoadMore,
}) => {
  let container: HTMLElement | null;

  const handleScroll = () => {
    if (!container) {
      return false;
    }

    const { top } = container.getBoundingClientRect();
    if (top - window.innerHeight < 100 && !isBusy) {
      onLoadMore();
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div>
      {children}
      {hasMore && (
        <div ref={el => (container = el)}>
          <Loading />
        </div>
      )}
    </div>
  );
};

export default InfiniteScroll;
