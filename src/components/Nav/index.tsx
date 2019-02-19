import * as React from 'react';
import { navigate } from '@reach/router';
import navigations from '@/constants/navigations';
import { Navbar, Home, Menu, MenuItem } from './style';

const Nav: React.SFC = () => {
  const handleHome = () => navigate('/');

  const handleClick = (e: React.MouseEvent<HTMLLIElement>) =>
    navigate(`/${e.currentTarget.innerHTML.toLowerCase()}`);

  return (
    <Navbar>
      <Home onClick={handleHome}>Bill's Hobby</Home>
      <Menu>
        {navigations.slice(1).map(item => (
          <MenuItem key={item.title} onClick={handleClick}>
            {item.title.toLowerCase()}
          </MenuItem>
        ))}
      </Menu>
    </Navbar>
  );
};

export default Nav;
