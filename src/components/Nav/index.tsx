import * as React from 'react';
import { navigate } from '@reach/router';
import navigations from '@/constants/navigations';
import { Navbar, Button, Menu, MenuItem, MenuClose } from './style';

const { useState } = React;

const Nav: React.SFC = () => {
  const [showNav, setShowNav] = useState(false);

  const handleOpen = () => {
    setShowNav(true);
    document.body.classList.add('nav-open');
  };

  const handleClose = () => {
    setShowNav(false);
    document.body.classList.remove('nav-open');
  };

  const handleClick = (e: React.MouseEvent<HTMLLIElement>) => {
    const title = e.currentTarget.innerHTML.toLowerCase();
    const page = navigations.find(item => item.title.toLowerCase() === title);
    if (!page) {
      return false;
    }

    navigate(page.path);
    showNav && handleClose();
  };

  return (
    <Navbar>
      <Button onClick={handleOpen}>
        <i className="fas fa-bars" />
      </Button>
      <Menu show={showNav}>
        {navigations.map(item => (
          <MenuItem key={item.title} onClick={handleClick}>
            {item.title.toLowerCase()}
          </MenuItem>
        ))}
        <MenuClose onClick={handleClose}>&times;</MenuClose>
      </Menu>
    </Navbar>
  );
};

export default Nav;
