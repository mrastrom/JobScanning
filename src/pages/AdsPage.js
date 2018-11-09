import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Menu } from 'semantic-ui-react'
import styled from 'styled-components'
import theme from '../styles/theme'
import {
  AdsList,
  AdsMap,
  AdsOverview,
  DisplayNumber,
  FlexContainer,
  GridContainer,
  PageHeaderAds
} from '../components'

// Refactor later
const DISPLAY_STATES = {
  list: <AdsList redirectToAdPage={this.redirectToAdPage} />,
  map: <AdsMap />,
  overview: <AdsOverview />
}

class AdsPage extends Component {
  state = { activeItem: 'list' }

  redirectToAdPage = id => {
    console.log(id)
    this.props.history.push(`/ads/${id}`)
  }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state

    const activeComponent = DISPLAY_STATES[activeItem]

    return (
      <FlexContainer>
        <GridContainer rows={'auto 1fr'}>
          <FixedDiv>
            <PageHeaderAds />

            <p
              style={{
                fontSize: theme.fontSizeMedium,
                margin: '0',
                alignSelf: 'center',
                textAlign: 'center',
                padding: '1rem 0'
              }}
            >
              <DisplayNumber>
                {this.props.ads.total ? this.props.ads.total : 0}
              </DisplayNumber>{' '}
              jobbannonser från{' '}
              <DisplayNumber>
                {this.props.ads.uniqueSources
                  ? this.props.ads.uniqueSources
                  : 0}
              </DisplayNumber>{' '}
              rekryteringssajter
            </p>

            <CustomMenu borderless fluid widths={3}>
              <CustomMenuItem
                name="list"
                active={activeItem === 'list'}
                content="Lista"
                onClick={this.handleItemClick}
              />

              <CustomMenuItem
                name="map"
                active={activeItem === 'map'}
                content="Karta"
                onClick={this.handleItemClick}
              />

              <CustomMenuItem
                name="overview"
                active={activeItem === 'overview'}
                content="Översikt"
                onClick={this.handleItemClick}
              />
            </CustomMenu>
          </FixedDiv>
          <MarginTopDiv>{activeComponent}</MarginTopDiv>
        </GridContainer>
      </FlexContainer>
    )
  }
}

function mapStateToProps(state) {
  return {
    ads: state.ads
  }
}

export default connect(
  mapStateToProps,
  null
)(AdsPage)

// Refactor later
const CustomMenu = styled(Menu)`
  &&& {
    border: none;
    box-shadow: none;
    margin: 0;

    & > * {
      background: ${theme.brightestSecondary};
      border-top: 2px solid ${theme.secondary};
      border-bottom: 2px solid ${theme.secondary};
      border-left: 1px solid ${theme.secondary};
      border-right: 1px solid ${theme.secondary};
      border-radius: 0;
      box-shadow: none;
    }

    & > :first-child {
      border-left: none;
      border-radius: 0;
    }

    & > :last-child {
      border-right: none;
      border-radius: 0;
    }
  }
`

const CustomMenuItem = styled(Menu.Item)`
  &&& {
    font-size: ${props => props.theme.fontSizeMedium};
    color: ${props => props.theme.grey};
    border-radius: 0;

    &::before {
      background: none;
    }

    &.active {
      background: none;
      border-bottom: none;
    }

    &&&:active,
    &&&:hover {
      background: none;
    }
  }
`

const FixedDiv = styled.div`
  display: grid;
  grid-template-rows: 13vh 6vh 7vh;
  position: fixed;
  left: 0;
  right: 0;
  z-index: 1000;
  background: #fff;
`

const MarginTopDiv = styled.div`
  margin-top: 26vh;
`
