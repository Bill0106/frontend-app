import MEDIA_QUERIES from '@/constants/mediaQueries'
import { keyframes } from '@emotion/css'
import styled from '@emotion/styled'

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
`

export const Page = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`

export const Loading = styled.div<{ show: boolean }>`
  display: grid;
  grid-template-columns: auto;
  align-items: center;
  position: relative;
  height: 100%;
  background: #000;
  transform: ${p => p.show ? 0 : 'translateY(-100%)'};
  transition: transform 0.5s ease-in-out;
  z-index: 9999;
`

export const Text = styled.div`
  text-align: center;
  font-size: 48px;
  font-family: monospace;
  color: #fff;
  letter-spacing: 4px;
  animation: ${loading} 2s linear infinite;
  @media (max-width: ${MEDIA_QUERIES.MOBILE}) {
    font-size: 32px;
  }
`

export const Container = styled(Page)<{ background: string; show: boolean }>`
  background: url('${p => p.background}');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  opacity: ${p => p.show ? 1 : 0};
  transition: all .5s ease-in-out;
`

export const Content = styled.div`
  position: relative;
  margin: 0 auto;
  padding-top: 100px;
  max-width: 1000px;
  text-align: center;
  color: #fff;
  z-index: 10;
  @media (max-width: ${MEDIA_QUERIES.MOBILE}) {
    padding-top: 0;
  }
`

export const Title = styled.h1`
  margin: 100px 0 100px;
  font-size: 100px;
  font-family: Brush Script MT, cursive;
  font-weight: normal;
  @media (max-width: ${MEDIA_QUERIES.MOBILE}) {
    margin: 52px 0 68px;
    font-size: 68px;
  }
`

export const Sections = styled.div`
  padding-top: 0 20px;
  text-align: center;
  box-sizing: border-box;
`

export const Item = styled.div`
  display: inline-block;
  width: ${100 / 3}%;
  font-size: 48px;
  font-family: Copperplate, Copperplate Gothic Light, fantasy;
  @media (max-width: ${MEDIA_QUERIES.TABLET_MAX}) {
    display: block;
    margin: 20px 0;
    width: 100%;
  }
  > div {
    display: inline-block;
    cursor: pointer;
    transition: transform 0.3s ease-in-out;
    -webkit-tap-highlight-color: rgba(0,0,0,0);
    &:hover {
      transform: scale(1.25);
    }
  }
`

export const Mask = styled(Page)`
  background: rgba(0, 0, 0, .4);
  z-index: 1;
`
