import styled from '@/utils/styled';

export const Navbar = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 50px;
  background: rgba(0, 0, 0, 0.3);
  z-index: 9999;
`;

export const Home = styled.div`
  float: left;
  margin: 15px 0 0 15px;
  font-size: 20px;
  font-family: Brush Script MT, cursive;
  color: rgba(255, 255, 255, 0.8);
  cursor: pointer;
  &:hover {
    color: rgba(255, 255, 255, 1);
  }
`;

export const Menu = styled.ul`
  margin: 0;
  padding: 15px 0;
  text-align: center;
  line-height: 20px;
  list-style: none;
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
`;
