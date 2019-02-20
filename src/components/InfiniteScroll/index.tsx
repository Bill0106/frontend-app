import * as React from 'react';
import { Loading } from './style';

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
  });

  return (
    <div>
      {children}
      {hasMore && (
        <Loading ref={el => (container = el)}>
          <i className="fas fa-circle-notch fa-spin" />
        </Loading>
      )}
    </div>
  );
};

export default InfiniteScroll;
