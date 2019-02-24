import styled, { css, keyframes } from '@/utils/styled';

const fullpage = css`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

const loading = keyframes`
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.3;
  }
  100% {
    opacity: 1;
  }
`;

export const HomePage = styled.div`
  ${fullpage};
`;

export const Loading = styled.div<{ show: boolean }>`
  display: grid;
  grid-template-columns: auto;
  align-items: center;
  position: relative;
  height: 100%;
  background: #000;
  transform: ${props => (props.show ? 0 : 'translateY(-100%)')};
  transition: transform 0.5s ease-in-out;
  z-index: 9999;
`;

export const Text = styled.div`
  text-align: center;
  font-size: 50px;
  font-family: Papyrus, fantasy;
  color: #fff;
  letter-spacing: 5px;
  animation: ${loading} 2s linear infinite;
`;

export const Container = styled.div<{ background: string; show: boolean }>`
  ${fullpage};
  background: url('${props => props.background}');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  opacity: ${props => (props.show ? 1 : 0)};
  transition: all 0.5s ease-in-out;
`;

export const Content = styled.div`
  position: relative;
  margin: 0 auto;
  padding-top: 100px;
  width: 1000px;
  text-align: center;
  color: #fff;
  z-index: 2;
`;

export const Title = styled.h1`
  margin: 100px 0 100px;
  font-size: 100px;
  font-family: Brush Script MT, cursive;
  font-weight: normal;
`;

export const Sections = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
`;

export const Section = styled.div`
  font-size: 45px;
  font-family: Copperplate, Copperplate Gothic Light, fantasy;
  > div {
    display: inline-block;
    cursor: pointer;
    transition: transform 0.3s ease-in-out;
    &:hover {
      transform: scale(1.25);
    }
  }
`;

export const Mask = styled.div`
  ${fullpage};
  background: rgba(0, 0, 0, 0.4);
  z-index: 1;
`;
