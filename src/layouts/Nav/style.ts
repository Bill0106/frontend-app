import MEDIA_QUERIES from '@/constants/mediaQueries';
import styled from 'styled-components';

export const Navbar = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 50px;
  background: rgba(0, 0, 0, 0.3);
  z-index: 9999;
  @media (max-width: ${MEDIA_QUERIES.MOBILE}) {
    background: rgba(0, 0, 0, 0.7);
  }
`;

export const Button = styled.span`
  display: inline-block;
  position: relative;
  margin: 9px 0 0 15px;
  padding: 5px 10px;
  font-size: 18px;
  color: rgba(255, 255, 255, 0.4);
  border: 1px solid rgba(255, 255, 255, 0.4);
  border-radius: 4px;
  cursor: pointer;
  @media (min-width: ${MEDIA_QUERIES.TABLET}) {
    display: none;
  }
`;

export const Menu = styled.ul<{ show: boolean }>`
  margin: 0;
  padding: 15px 0;
  text-align: center;
  line-height: 20px;
  list-style: none;
  @media (max-width: ${MEDIA_QUERIES.MOBILE}) {
    position: fixed;
    top: ${props => (props.show ? '0' : '-100%')};
    bottom: ${props => (props.show ? 0 : '100%')};
    left: 0;
    right: 0;
    padding-top: 100px;
    background: rgba(0, 0, 0, 0.7);
    transition: all 0.3s ease-in-out;
    z-index: 9999;
  }
`;

export const MenuItem = styled.li`
  display: inline-block;
  margin: 0 15px;
  font-size: 20px;
  font-family: Copperplate, Copperplate Gothic Light, fantasy;
  color: rgba(255, 255, 255, 0.8);
  cursor: pointer;
  &:hover {
    color: rgba(255, 255, 255, 1);
  }
  @media (max-width: ${MEDIA_QUERIES.MOBILE}) {
    display: block;
    margin: 20px 0;
    font-size: 30px;
  }
`;

export const MenuClose = styled.li`
  display: inline-block;
  margin-top: 50px;
  width: 40px;
  height: 40px;
  line-height: 40px;
  font-size: 40px;
  color: rgba(255, 255, 255, 0.8);
  border: 1px solid rgba(255, 255, 255, 0.8);
  border-radius: 100%;
  cursor: pointer;
  @media (min-width: ${MEDIA_QUERIES.TABLET}) {
    display: none;
  }
`;
