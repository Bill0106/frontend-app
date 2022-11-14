import Nav from './Nav'
import { Outlet } from 'react-router-dom'

const Layout = () => (
  <div className="layout">
    <Nav />
    <div className="layout__content">
      <Outlet />
    </div>
  </div>
)

export default Layout
