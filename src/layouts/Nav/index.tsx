import * as React from 'react';
import { navigate } from '@reach/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  disableBodyScroll,
  enableBodyScroll,
  clearAllBodyScrollLocks,
} from 'body-scroll-lock';
import navigations from '@/configs/navigation';
import { Navbar, Button, Menu, MenuItem, MenuClose } from './style';

const { useState, useEffect } = React;

const Nav: React.SFC = () => {
  let menu: HTMLUListElement | null;
  const [showNav, setShowNav] = useState(false);

  const handleOpen = () => {
    setShowNav(true);
    if (menu) {
      disableBodyScroll(menu);
    }
  };

  const handleClose = () => {
    setShowNav(false);
    if (menu) {
      enableBodyScroll(menu);
    }
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

  useEffect(() => {
    return () => clearAllBodyScrollLocks();
  }, []);

  return (
    <Navbar>
      <Button onClick={handleOpen}>
        <FontAwesomeIcon icon={['fas', 'bars']} />
      </Button>
      <Menu ref={el => (menu = el)} show={showNav}>
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
