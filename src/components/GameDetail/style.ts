import styled, { css } from 'styled-components';
import MEDIA_QUERIES from '@/constants/mediaQueries';

const circelText = css`
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  width: 100px;
  line-height: 100px;
  text-align: center;
  font-weight: bold;
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

export const Header = styled.div`
  display: grid;
  grid-template-columns: 1fr repeat(2, 100px);
  grid-column-gap: 15px;
  align-items: center;
  margin-bottom: 20px;
  @media (max-width: ${MEDIA_QUERIES.MOBILE}) {
    display: block;
    text-align: center;
  }
`;

export const Title = styled.h1`
  margin: 20px 0 15px;
  line-height: 55px;
  font-size: 40px;
  font-weight: normal;
  @media (max-width: ${MEDIA_QUERIES.MOBILE}) {
    font-size: 25px;
    line-height: 30px;
  }
`;

export const Subtitle = styled.h2`
  margin: 0;
  line-height: 30px;
  font-size: 20px;
  font-weight: normal;
  color: #999;
  @media (max-width: ${MEDIA_QUERIES.MOBILE}) {
    line-height: 20px;
  }
`;

export const Infos = styled.p`
  margin: 0;
  line-height: 30px;
  font-size: 18px;
  color: #999;
  @media (max-width: ${MEDIA_QUERIES.MOBILE}) {
    font-size: 16px;
    &:last-of-type {
      display: none;
    }
  }
  > * {
    display: inline-block;
    vertical-align: middle;
  }
  > i {
    margin: 0 8px;
    font-style: normal;
  }
`;

export const Circle = styled.div`
  position: relative;
  height: 120px;
  @media (max-width: ${MEDIA_QUERIES.MOBILE}) {
    display: inline-block;
    margin: 10px 15px 0;
  }
  > p {
    margin: 0;
    line-height: 20px;
    font-size: 18px;
    text-align: center;
  }
`;

export const Rate = styled.span`
  ${circelText};
  font-size: 30px;
  color: #e03800;
`;

export const Earned = styled.span`
  ${circelText};
  font-size: 24px;
  color: #075fff;
`;
