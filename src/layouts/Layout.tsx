import styled from '@emotion/styled'
import Nav from './Nav'
import { Outlet } from 'react-router-dom'

const StyledLayout = styled.div`
  min-height: 100vh;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 14px;
  background: #303030;
`

const Content = styled.div`
  margin: 0 auto;
  padding: 68px 16px 16px;
  max-width: 1000px;
  box-sizing: border-box;
`

const Layout = () => (
  <StyledLayout>
    <Nav />
    <Content>
      <Outlet />
    </Content>
  </StyledLayout>
)

export default Layout
