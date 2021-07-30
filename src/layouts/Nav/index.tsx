import pages from '@/constants/pages'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button, Menu, MenuClose, MenuItem, Navbar } from './style'
import useViewData from './useViewData'

const Nav = () => {
  const { menu, show, handleClick, handleClose, handleOpen } = useViewData()

  return (
    <Navbar>
      <Button onClick={handleOpen}>
        <FontAwesomeIcon icon={faBars} />
      </Button>
      <Menu ref={menu} show={show}>
        {pages.map(v => (
          <MenuItem key={v.title} onClick={handleClick}>
            {v.title.toLowerCase()}
          </MenuItem>
        ))}
        <MenuClose onClick={handleClose}>&times;</MenuClose>
      </Menu>
    </Navbar>
  )
}

export default Nav
