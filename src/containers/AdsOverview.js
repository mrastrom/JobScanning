import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import _ from 'lodash'
import { CustomLoader, NoResultsBox } from '../components'
import getLogo from '../utils/getLogo'
import numberOfUniqueSources from '../utils/numberOfUniqueSources'

class AdsOverview extends Component {
  getRanks = () => {
    console.log(this.props.ads.hits)

    let scoreboard = this.props.ads.hits.reduce((acc, val) => {
      acc[val.source.site.name] = acc[val.source.site.name]
        ? acc[val.source.site.name] + 1
        : 1
      return acc
    }, {})

    let ordered = Object.keys(scoreboard).sort(
      (a, b) => scoreboard[b] - scoreboard[a]
    )

    ordered = ordered.length > 10 ? ordered.slice(0, 10) : ordered

    return _.map(ordered, key => (
      <ListItem key={key}>
        {getLogo(key)}
        <Arrow className="arrow">
          <Score className="score">
            {scoreboard[key]}
            <p
              style={{
                display: 'inline-block',
                fontSize: '1.375rem',
                margin: '6px 0 0 0'
              }}
            >
              st
            </p>
          </Score>
        </Arrow>

        {/* <Score>
          {scoreboard[key]}
          <p
            style={{
              display: 'inline-block',
              fontSize: '1.375rem',
              margin: '6px 0 0 0'
            }}
          >
            st
          </p>
          <span className="arrow" />
        </Score> */}
      </ListItem>
    ))
  }

  getNumberOfSources = () => {
    let { ads, term } = this.props

    const number = numberOfUniqueSources(ads.hits)

    return (
      <p>
        Top {number ? number : 0} rekryteringssajter för dig som letar efter
        annonser för {term}
      </p>
    )
  }

  render() {
    let { ads } = this.props

    if (ads.isFetching) {
      return <CustomLoader size="massive" content="Laddar" />
    } else if (Object.keys(ads).length === 0 && ads.constructor === Object) {
      return <NoResultsBox />
    } else if (ads.error) {
      return <NoResultsBox />
    } else {
      return (
        <div style={{ padding: '1.5rem' }}>
          {this.getNumberOfSources()}
          <OrderedList>{this.getRanks()}</OrderedList>
        </div>
      )
    }
  }
}

function mapStateToProps(state) {
  return {
    ads: state.ads,
    term: state.term
  }
}

export default connect(
  mapStateToProps,
  null
)(AdsOverview)

const ListItem = styled.li`
  height: 5rem;
  display: grid;
  grid-template-columns: 120px 1fr;
  grid-column-gap: 25px;
  align-items: center;
`

const Arrow = styled.div`
  height: 18px;
  position: relative;

  &:before {
    content: '';
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 9px 0 9px 35px;
    position: absolute;
    top: 0;
    left: 100%;
  }
`

const Score = styled.span`
  height: 5rem;
  width: 5rem;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${props => props.theme.white};
  font-size: ${props => props.theme.fontSizeLarge};
  font-weight: 600;
  position: absolute;
  top: 50%;
  left: 10px;
  transform: translateY(-50%);
  z-index: 2;
`

const OrderedList = styled.ol`
  list-style: none;

  & li {
    margin-top: 1rem;

    :nth-child(3n + 1) .arrow {
      background: ${props => props.theme.primary};
      .score {
        background: ${props => props.theme.primary};
      }
    }

    :nth-child(3n + 1) .arrow:before {
      border-color: rgba(255, 255, 255, 0) rgba(255, 255, 255, 0)
        rgba(255, 255, 255, 0) ${props => props.theme.primary};
    }

    :nth-child(3n - 1) .arrow {
      background: ${props => props.theme.secondary};
      .score {
        background: ${props => props.theme.secondary};
      }
    }

    :nth-child(3n - 1) .arrow:before {
      border-color: rgba(255, 255, 255, 0) rgba(255, 255, 255, 0)
        rgba(255, 255, 255, 0) ${props => props.theme.secondary};
    }

    :nth-child(3n) .arrow {
      background: ${props => props.theme.brightSecondary};
      .score {
        background: ${props => props.theme.brightSecondary};
      }
    }

    :nth-child(3n) .arrow:before {
      border-color: rgba(255, 255, 255, 0) rgba(255, 255, 255, 0)
        rgba(255, 255, 255, 0) ${props => props.theme.brightSecondary};
    }
  }

  & :nth-child(1) .arrow {
    width: calc(100% - 35px);
  }

  & :nth-child(2) .arrow {
    width: calc(95% - 35px);
  }

  & :nth-child(3) .arrow {
    width: calc(90% - 35px);
  }

  & :nth-child(4) .arrow {
    width: calc(85% - 35px);
  }

  & :nth-child(5) .arrow {
    width: calc(80% - 35px);
  }

  & :nth-child(6) .arrow {
    width: calc(75% - 35px);
  }

  & :nth-child(7) .arrow {
    width: calc(70% - 35px);
  }

  & :nth-child(8) .arrow {
    width: calc(65% - 35px);
  }

  & :nth-child(9) .arrow {
    width: calc(60% - 35px);
  }

  & :nth-child(10) .arrow {
    width: calc(55% - 35px);
  }
`
