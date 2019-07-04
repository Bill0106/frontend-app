import styled from '@/utils/styled';

export const Timeline = styled.div``;

export const Content = styled.div``;

export const Year = styled.p`
  text-align: center;
  font-size: 30px;
  font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
  font-weight: bolder;
`;

export const Item = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-column-gap: 30px;
  position: relative;
`;

export const Line = styled.span`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 50%;
  margin-left: -5px;
  width: 10px;
  background: #000;
`;

export const Spacer = styled.div``;
