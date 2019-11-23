import styled from 'styled-components';
import MEDIA_QUERIES from '@/constants/mediaQueries';

export const List = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 20px;
  @media (max-width: ${MEDIA_QUERIES.MOBILE}) {
    grid-template-columns: 345px;
    justify-content: center;
  }
`;
