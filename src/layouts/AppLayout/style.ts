import styled from 'styled-components';

export const Layout = styled.div<{ background: string }>`
  min-height: 100vh;
  font-family: arial, sans-serif;
  font-size: 14px;
  background: ${props => props.background};
  transition: background 0.5s ease-in-out;
`;

export const Content = styled.div`
  margin: 0 auto;
  padding: 65px 15px 15px;
  max-width: 1000px;
  box-sizing: border-box;
`;
