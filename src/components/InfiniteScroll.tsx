import * as React from 'react';
import Loading from '@/components/Loading';

interface Props {
  isBusy: boolean;
  hasMore: boolean;
  onLoadMore: () => void;
}

const { useEffect } = React;

const InfiniteScroll: React.SFC<Props> = ({
  children,
  isBusy,
  hasMore,
  onLoadMore,
}) => {
  let container: HTMLDivElement | null = null;

  useEffect(() => {
    const handleScroll = () => {
      if (!container) {
        return false;
      }

      const { top } = container.getBoundingClientRect();
      if (top - window.innerHeight < 100 && !isBusy) {
        onLoadMore();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [container, isBusy, onLoadMore]);

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
