import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import theme from '../../../styles/theme'
import { Icon } from 'semantic-ui-react'
import { Ellipse } from '../../../components'
import jt_logowhite from '../../../images/logo/1x/jt_logowhite.png'

class PageHeaderAds extends Component {
  render() {
    return (
      <Header>
        <Ellipse
          height="195px"
          width="165px"
          bottom="0"
          left="-50px"
          bgcolor={theme.secondary}
          boxshadow
          zIndex="1"
        />

        <Ellipse
          height="110px"
          width="85px"
          bottom="30px"
          left="71px"
          bgcolor={theme.brightSecondary}
        />
        <Link to="/">
          <Logo alt="JobTech" src={jt_logowhite} />
        </Link>

        <Children>
          <SearchTerm>
            {this.props.term.length > 0 ? `#${this.props.term}` : 'Inga sökord'}
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
  top: 10px;
  left: 10px;
  z-index: 1000;
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
  padding: 0.5rem;
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
