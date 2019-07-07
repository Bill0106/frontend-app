import MEDIA_QUERIES from '@/constants/mediaQueries';
import styled from '@/utils/styled';

export const Poster = styled.div`
  position: relative;
  width: 100px;
`;

export const Text = styled.div``;

export const Card = styled.div<{ days: number; isLeft: boolean }>`
  display: grid;
  grid-template-columns: ${props => (props.isLeft ? '1fr 100px' : '100px 1fr')};
  grid-column-gap: 16px;
  position: relative;
  padding: ${props => props.days * 3 + 16}px 16px 16px;
  @media (min-width: ${MEDIA_QUERIES.TABLET}) {
    text-align: ${props => (props.isLeft ? 'right' : 'left')};
  }
  @media (max-width: ${MEDIA_QUERIES.MOBILE}) {
    ${props => props.isLeft && 'grid-template-columns: 100px 1fr'};
    padding-left: 55px;
    ${Poster} {
      grid-column-start: 1;
      grid-column-end: 2;
      grid-row-start: 1;
    }
    ${Text} {
      grid-column-start: 2;
    }
  }
`;

export const Line = styled.span<{ isLeft: boolean }>`
  position: absolute;
  top: 50%;
  left: ${props => (props.isLeft ? '100%' : '-26px')};
  right: 0;
  margin-top: -1px;
  width: 26px;
  height: 2px;
  background: #000;
  @media (max-width: ${MEDIA_QUERIES.MOBILE}) {
    left: -26px;
  }
`;

export const Date = styled.span`
  font-size: 40px;
  font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
  @media (max-width: ${MEDIA_QUERIES.LAPTOP}) {
    font-size: 30px;
  }
`;

export const Title = styled.p`
  margin: 8px 0;
  font-size: 24px;
  @media (max-width: ${MEDIA_QUERIES.LAPTOP}) {
    font-size: 18px;
  }
`;

export const Rate = styled.div`
  margin: 0 -5px;
  font-size: 30px;
  @media (max-width: ${MEDIA_QUERIES.LAPTOP}) {
    font-size: 20px;
  }
  > svg {
    margin: 0 5px;
  }
`;
