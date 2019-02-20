import * as React from 'react';
import { navigate } from '@reach/router';
import navigations from '@/constants/navigations';
import { Navbar, Menu, MenuItem } from './style';

const Nav: React.SFC = () => {
  const handleClick = (e: React.MouseEvent<HTMLLIElement>) => {
    const title = e.currentTarget.innerHTML.toLowerCase();
    const page = navigations.find(item => item.title.toLowerCase() === title);
    if (!page) {
      return false;
    }

    navigate(page.path);
  };

  return (
    <Navbar>
      <Menu>
        {navigations.map(item => (
          <MenuItem key={item.title} onClick={handleClick}>
            {item.title.toLowerCase()}
          </MenuItem>
        ))}
      </Menu>
    </Navbar>
  );
};

export default Nav;
