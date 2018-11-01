import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import theme from '../../styles/theme'

const PageHeader = ({ children }) => (
  <Header>
    <DropShadow>
      <EllipseBig>
        <Link to="/">
          <Logo alt="JT" src="/assets/images/jt.png" />
        </Link>
      </EllipseBig>
    </DropShadow>
    <EllipseSmall />

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
  top: 5px;
  left: 3%;
  z-index: 1000;
`

/* These ellipses are made differently from each other and will be evaluating on mobile
to see which one works best. Since not all CSS is supported on mobiles */
const EllipseBig = styled.div`
  height: 100%;
  background: ${theme.secondary};
  clip-path: ellipse(25% 140% at 8% -40%);
`

const EllipseSmall = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  width: 100%;
  z-index: -1;
  background: ${theme.brightSecondary};
  clip-path: ellipse(12% 70% at 29% -1%);
`

const DropShadow = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  height: 100%;
  width: 100%;
  filter: drop-shadow(0 0 3px rgba(0, 0, 0, 0.8));
`

const Children = styled.div`
  z-index: 1000;
`
