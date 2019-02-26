import MEDIA_QUERIES from '@/constants/mediaQueries';
import styled from '@/utils/styled';

export const Container = styled.div`
  display: grid;
  grid-template-columns: 270px 1fr;
  grid-column-gap: 20px;
  grid-row-gap: 10px;
  color: #fff;
  @media (max-width: ${MEDIA_QUERIES.MOBILE}) {
    display: block;
  }
`;

export const Side = styled.div`
  margin: 0 auto;
  max-width: 270px;
`;

export const Info = styled.div`
  margin-top: 15px;
  @media (max-width: ${MEDIA_QUERIES.MOBILE}) {
    display: none;
  }
`;

export const InfoTitle = styled.p`
  margin: 0 0 15px;
  padding-bottom: 15px;
  line-height: 20px;
  font-size: 20px;
  border-bottom: 1px solid #666;
`;

export const InfoList = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
`;

export const InfoItem = styled.li`
  & + li {
    margin-top: 20px;
  }
  > p {
    margin: 0 0 5px;
    font-size: 18px;
  }
  > span {
    font-size: 16px;
    color: #999;
  }
`;

export const Main = styled.div``;

export const Header = styled.div`
  display: grid;
  grid-template-columns: 1fr repeat(2, 100px);
  grid-column-gap: 15px;
  align-items: center;
  margin-bottom: 15px;
  @media (max-width: ${MEDIA_QUERIES.MOBILE}) {
    display: block;
    text-align: center;
  }
`;

export const Title = styled.h1`
  margin: 20px 0 15px;
  line-height: 60px;
  font-size: 40px;
  font-weight: normal;
  @media (max-width: ${MEDIA_QUERIES.MOBILE}) {
    font-size: 25px;
    line-height: 30px;
  }
`;

export const Subtitle = styled.h2`
  margin: 0 0 5px;
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
  > span {
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    width: 100px;
    line-height: 100px;
    text-align: center;
    font-size: 24px;
    font-weight: bold;
  }
  > p {
    margin: 0;
    line-height: 20px;
    font-size: 18px;
    text-align: center;
  }
`;

export const Description = styled.p`
  line-height: 24px;
  font-size: 16px;
`;

export const Trophies = styled.div`
  display: grid;
  grid-gap: 10px;
  grid-template-columns: repeat(3, 1fr);
  grid-column-start: 1;
  grid-column-end: span 2;
  @media (max-width: ${MEDIA_QUERIES.TABLET_MAX}) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: ${MEDIA_QUERIES.MOBILE}) {
    display: block;
  }
`;

export const Trophy = styled.div`
  padding: 10px;
  background: #262626;
  box-sizing: border-box;
  &:after {
    display: block;
    content: '';
    clear: both;
  }
  @media (max-width: ${MEDIA_QUERIES.MOBILE}) {
    margin-bottom: 10px;
  }
`;

export const TrophyImg = styled.div<{ earned: boolean }>`
  float: left;
  width: 66px;
  border: 5px solid #61bf19;
  opacity: ${props => (props.earned ? 1 : 0.5)};
  box-sizing: border-box;
`;

export const TrophyText = styled.div`
  margin-left: 80px;
  width: 225px;
  @media (max-width: ${MEDIA_QUERIES.LAPTOP_MAX}) {
    width: 200px;
  }
  @media (max-width: ${MEDIA_QUERIES.TABLET_MAX}) {
    width: 255px;
  }
  > p {
    margin: 0 0 5px;
    font-weight: bold;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
  > span {
    display: block;
    height: 40px;
    line-height: 20px;
    overflow: hidden;
  }
`;

export const TrophyEarned = styled.div`
  margin-top: 15px;
  font-weight: bold;
  color: #61bf19;
`;
