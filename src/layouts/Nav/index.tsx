import pages from '@/constants/pages'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'
import useViewData from './useViewData'

const Nav = () => {
  const { menu, show, handleClick, handleClose, handleOpen, classname } = useViewData()

  return (
    <div {...classname('nav')}>
      <button {...classname('menu-btn')} onClick={handleOpen}>
        <FontAwesomeIcon icon={faBars} />
      </button>
      <ul ref={menu} {...classname('menu', { show })}>
        {pages.map(v => (
          <li key={v.title} {...classname('menu-item')}>
            <Link {...classname('link')} to={v.path} onClick={handleClick}>
              {v.title.toUpperCase()}
            </Link>
          </li>
        ))}
        <li {...classname('close')} onClick={handleClose}>&times;</li>
      </ul>
    </div>
  )
}

export default Nav
