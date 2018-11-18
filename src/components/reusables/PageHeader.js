import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import theme from '../../styles/theme'
import { Ellipse } from '../index'

const PageHeader = ({ children }) => (
  <Header>
    <Ellipse
      height="195px"
      width="165px"
      top="auto"
      left="-50px"
      bgcolor={theme.secondary}
      boxshadow
      zIndex="1"
    >
      <Link to="/">
        <Logo alt="JT" src="/assets/images/jt.png" />
      </Link>
    </Ellipse>
    <Ellipse
      height="110px"
      width="82px"
      top="-50px"
      left="71px"
      bgcolor={theme.brightSecondary}
    />

    <Children>{children}</Children>
  </Header>
)

export default PageHeader

const Header = styled.header`
  display: flex;
  justify-content: center;
  align-items: flex-end;
  height: 100%;
  width: 100%;
  background: ${theme.white};
  position: relative;
  z-index: 1;
`

const Logo = styled.img`
  width: 50px;
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1000;
`

const Children = styled.div`
  z-index: 1000;
`
