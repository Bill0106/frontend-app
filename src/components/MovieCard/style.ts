import styled from '@/utils/styled';

export const Card = styled.div<{ days: number; isReverse: boolean }>`
  display: grid;
  grid-template-columns: ${props =>
    props.isReverse ? '1fr 100px' : '100px 1fr'};
  grid-column-gap: 16px;
  position: relative;
  padding: ${props => props.days * 3 + 16}px 16px 16px;
  text-align: ${props => (props.isReverse ? 'right' : 'left')};
`;

export const Poster = styled.div`
  position: relative;
  width: 100px;
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
`;

export const Date = styled.span`
  font-size: 40px;
  font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
`;

export const Title = styled.p`
  margin: 8px 0;
  font-size: 24px;
`;

export const Rate = styled.div`
  margin: 0 -5px;
  font-size: 30px;
  > svg {
    margin: 0 5px;
  }
`;

export const Text = styled.div``;
