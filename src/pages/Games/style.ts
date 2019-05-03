import MEDIA_QUERIES from '@/constants/mediaQueries';
import styled from '@/utils/styled';

export const List = styled.div`
  display: grid;
  grid-gap: 15px;
  grid-template-columns: repeat(4, 1fr);
  @media (max-width: ${MEDIA_QUERIES.TABLET_MAX}) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media (max-width: ${MEDIA_QUERIES.MOBILE}) {
    grid-template-columns: 270px;
    justify-content: center;
  }
  > img {
    width: 100%;
  }
`;

export const Container = styled.div`
  display: grid;
  grid-template-columns: 270px 1fr;
  grid-gap: 20px;
  color: #fff;
  @media (max-width: ${MEDIA_QUERIES.MOBILE}) {
    display: block;
  }
`;

export const Side = styled.div`
  @media (max-width: ${MEDIA_QUERIES.MOBILE}) {
    margin: 0 auto;
    max-width: 270px;
  }
`;
