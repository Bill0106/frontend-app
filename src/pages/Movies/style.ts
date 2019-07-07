import styled from '@/utils/styled';
import MEDIA_QUERIES from '@/constants/mediaQueries';

export const Year = styled.p`
  font-size: 24px;
  font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
  font-weight: bolder;
  @media (min-width: ${MEDIA_QUERIES.TABLET}) {
    font-size: 30px;
    text-align: center;
  }
`;

export const Item = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-column-gap: 30px;
  position: relative;
  @media (max-width: ${MEDIA_QUERIES.MOBILE}) {
    display: block;
  }
`;

export const Line = styled.span`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 50%;
  margin-left: -5px;
  width: 10px;
  background: #000;
  @media (max-width: ${MEDIA_QUERIES.MOBILE}) {
    left: 24px;
  }
`;

export const Spacer = styled.div`
  @media (max-width: ${MEDIA_QUERIES.MOBILE}) {
    display: none;
  }
`;
