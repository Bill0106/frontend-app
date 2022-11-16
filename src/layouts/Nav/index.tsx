import pages from '@/constants/pages'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'
import useViewData from './useViewData'

const Nav = () => {
  const { menu, show, classname: { element }, handleClick, handleClose, handleOpen } = useViewData()

  return (
    <div {...element('nav').class}>
      <button {...element('menu-btn').class} onClick={handleOpen}>
        <FontAwesomeIcon icon={faBars} />
      </button>
      <ul ref={menu} {...element('menu').modifiers({ show })}>
        {pages.map(v => (
          <li key={v.title} {...element('menu-item').class}>
            <Link {...element('link').class} to={v.path} onClick={handleClick}>
              {v.title.toUpperCase()}
            </Link>
          </li>
        ))}
        <li {...element('close').class} onClick={handleClose}>&times;</li>
      </ul>
    </div>
  )
}

export default Nav
