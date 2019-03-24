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
  margin: 0 0 5px;
  width: 100%;
  font-size: 16px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  @media (max-width: ${MEDIA_QUERIES.MOBILE}) {
    line-height: 25px;
  }
`;

export const Info = styled.div`
  display: grid;
  grid-template-columns: auto auto;
  grid-column-gap: 5px;
  justify-content: space-between;
  align-items: center;
  > span {
    @media (max-width: ${MEDIA_QUERIES.MOBILE}) {
      display: none;
    }
  }
`;

export const Rate = styled.div`
  display: grid;
  grid-template-columns: repeat(5, auto);
  grid-column-gap: 3px;
`;
