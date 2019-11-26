import styled from 'styled-components';
import MEDIA_QUERIES from '@/constants/mediaQueries';

export const Card = styled.div`
  position: relative;
  padding-bottom: 75px;
  cursor: pointer;
  @media (max-width: ${MEDIA_QUERIES.MOBILE}) {
    padding-bottom: 74px;
  }
`;

export const Text = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  padding: 15px;
  width: 100%;
  line-height: 20px;
  color: #fff;
  background: #161616;
  box-sizing: border-box;
  z-index: 1;
`;

export const Title = styled.p`
  margin: 0 0 12px;
  width: 100%;
  font-size: 18px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  @media (max-width: ${MEDIA_QUERIES.MOBILE}) {
    line-height: 25px;
  }
`;

export const Rate = styled.div`
  display: grid;
  grid-template-columns: repeat(5, auto);
  grid-column-gap: 8px;
  justify-content: left;
  font-size: 16px;
`;
