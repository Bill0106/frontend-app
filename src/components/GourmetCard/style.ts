import styled from 'styled-components';

export const Card = styled.div`
  background: #fff;
  box-shadow: 0 2px 1px -1px rgba(0, 0, 0, 0.2), 0 1px 1px 0 rgba(0, 0, 0, 0.14),
    0 1px 3px 0 rgba(0, 0, 0, 0.12);
`;

export const Header = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  grid-column-gap: 5px;
  align-items: center;
  padding: 16px;
`;

export const Dot = styled.i`
  display: inline-block;
  margin: 0 5px;
  width: 3px;
  height: 3px;
  vertical-align: middle;
  font-style: normal;
  border-radius: 100%;
  background: #000;
`;

export const Content = styled.div`
  padding: 16px;
`;

export const Title = styled.p`
  margin: 0 0 5px;
  font-size: 16px;
  font-weight: bold;
`;

export const EatAt = styled.span`
  color: #999;
  font-size: 12px;
`;
