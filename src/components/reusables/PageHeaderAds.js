import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { Icon } from 'semantic-ui-react'
import theme from '../../styles/theme'

class PageHeaderAds extends Component {
  render() {
    return (
      <Header>
        <DropShadow>
          <EllipseBig>
            <Link to="/">
              <Logo alt="JT" src="/assets/images/jt2.png" />
            </Link>
          </EllipseBig>
        </DropShadow>
        <EllipseSmall />

        <Children>
          <SearchTerm>
            {this.props.term.length > 0 ? this.props.term : 'Inga sökord'}
          </SearchTerm>
          <CustomLink to="/search">
            <CustomIcon name="search" size="large" />
          </CustomLink>
        </Children>
      </Header>
    )
  }
}

function mapStateToProps(state) {
  return {
    term: state.term
  }
}

export default connect(
  mapStateToProps,
  null
)(PageHeaderAds)

const Header = styled.header`
  height: 100%;
  width: 100%;
  background: ${theme.primary};
  box-shadow: 0 0.3rem 0.5rem rgba(0, 0, 0, 0.3);
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
  height: 3rem;
  display: flex;
  position: absolute;
  right: 1.5rem;
  bottom: 1.5rem;
  z-index: 1000;
`

const CustomLink = styled(Link)`
  height: 100%;

  &:link,
  &:visited,
  &:hover,
  &:active {
    color: ${theme.black};
  }
`

const SearchTerm = styled.div`
  width: 10rem;
  padding: 0.5rem;
  text-transform: capitalize;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  background: ${theme.brightSecondary};
  border-radius: 1.5rem;
  box-shadow: 0 2px 3px 0px rgba(0, 0, 0, 0.4);
`

const CustomIcon = styled(Icon)`
  &&& {
    padding: 1.5rem 2.3rem;
    margin-left: 2rem;
    background: ${theme.secondary};
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 1.5rem;
    box-shadow: 0 2px 3px 0px rgba(0, 0, 0, 0.4);
  }
`
