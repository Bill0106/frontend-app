import MEDIA_QUERIES from '@/constants/mediaQueries';
import styled from 'styled-components';

export const Poster = styled.div`
  position: relative;
  width: 100px;
`;

export const Text = styled.div`
  color: #14a76c;
`;

export const Date = styled.span`
  font-size: 40px;
  font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
  color: #ffe400;
`;

export const Title = styled.p`
  margin: 8px 0;
  font-size: 24px;
  @media (max-width: ${MEDIA_QUERIES.LAPTOP}) {
    font-size: 20px;
  }
`;

export const Rate = styled.div`
  display: flex;
  margin: 0 -5px;
  font-size: 30px;
  @media (max-width: ${MEDIA_QUERIES.LAPTOP}) {
    margin: 0 -3px;
    font-size: 24px;
  }
`;

export const Ticket = styled.span<{ active: boolean }>`
  margin: 0 5px;
  opacity: ${props => (props.active ? 1 : 0.3)};
  @media (max-width: ${MEDIA_QUERIES.LAPTOP}) {
    margin: 0 3px;
  }
`;

export const Line = styled.span`
  position: absolute;
  top: 50%;
  left: -26px;
  right: 0;
  margin-top: -1px;
  width: 26px;
  height: 2px;
  background: #ffe400;
`;

export const Card = styled.div<{ days: number; isLeft: boolean }>`
  display: grid;
  grid-template-columns: 100px 1fr;
  grid-column-gap: 16px;
  position: relative;
  padding: ${props => props.days * 3 + 16}px 16px 16px;
  @media (min-width: ${MEDIA_QUERIES.TABLET}) {
    grid-template-columns: ${props => props.isLeft && '1fr 100px'};
    text-align: ${props => (props.isLeft ? 'right' : 'left')};
    ${Poster} {
      grid-column-start: ${props => props.isLeft && 2};
      grid-column-end: ${props => props.isLeft && 3};
      grid-row-start: 1;
    }
    ${Text} {
      grid-column-start: ${props => props.isLeft && 1};
      grid-column-end: ${props => props.isLeft && 2};
      grid-row-start: 1;
    }
    ${Rate} {
      flex-direction: ${props => props.isLeft && 'row-reverse'};
    }
    ${Line} {
      left: ${props => (props.isLeft ? '100%' : '-26px')};
    }
  }
  @media (max-width: ${MEDIA_QUERIES.MOBILE}) {
    grid-column-gap: 8px;
    padding-left: 55px;
  }
`;
