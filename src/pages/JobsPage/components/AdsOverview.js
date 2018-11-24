import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import _ from 'lodash'
import { CustomLoader, NoResultsBox } from '../../../components'
import getLogo from '../../../utils/getLogo'

class AdsOverview extends Component {
  renderOverview = () => {
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
        <Score>
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
        </Score>
      </ListItem>
    ))
  }

  render() {
    let { ads, term } = this.props

    if (this.props.ads.isFetching) {
      return <CustomLoader size="massive" content="Laddar" />
    } else if (Object.keys(ads).length === 0 && ads.constructor === Object) {
      return <NoResultsBox />
    } else if (this.props.ads.error) {
      return <NoResultsBox />
    } else {
      return (
        <div style={{ padding: '1.5rem' }}>
          <p>
            Top{' '}
            {this.props.ads.uniqueSources ? this.props.ads.uniqueSources : 0}{' '}
            rekryteringssajter för dig som letar efter annonser för {term}
          </p>
          <OrderedList>{this.renderOverview()}</OrderedList>
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
  display: grid;
  grid-template-columns: 120px 1fr;

  grid-column-gap: 25px;
  align-items: center;
`

const Score = styled.span`
  height: 5rem;
  width: 5rem;
  color: ${props => props.theme.white};
  font-size: ${props => props.theme.fontSizeLarge};
  font-weight: 600;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  position: relative;
  z-index: 2;

  & .arrow {
    height: 18px;

    position: absolute;
    left: -10px;
    z-index: 1;

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
  }
`

const OrderedList = styled.ol`
  list-style: none;

  & li {
    margin-top: 1rem;
  }

  & :nth-child(3n + 1) span {
    background: ${props => props.theme.primary};
  }

  & :nth-child(3n + 1) span .arrow {
    background: ${props => props.theme.primary};

    :before {
      border-color: rgba(255, 255, 255, 0) rgba(255, 255, 255, 0)
        rgba(255, 255, 255, 0) ${props => props.theme.primary};
    }
  }

  & :nth-child(3n - 1) span {
    background: ${props => props.theme.secondary};
  }

  & :nth-child(3n - 1) span .arrow {
    background: ${props => props.theme.secondary};

    :before {
      border-color: rgba(255, 255, 255, 0) rgba(255, 255, 255, 0)
        rgba(255, 255, 255, 0) ${props => props.theme.secondary};
    }
  }

  & :nth-child(3n) span {
    background: ${props => props.theme.brightSecondary};
  }

  & :nth-child(3n) span .arrow {
    background: ${props => props.theme.brightSecondary};

    :before {
      border-color: rgba(255, 255, 255, 0) rgba(255, 255, 255, 0)
        rgba(255, 255, 255, 0) ${props => props.theme.brightSecondary};
    }
  }

  & :nth-child(1) span .arrow {
    width: 18rem;
  }

  & :nth-child(2) span .arrow {
    width: 17rem;
  }

  & :nth-child(3) span .arrow {
    width: 16rem;
  }

  & :nth-child(4) span .arrow {
    width: 15rem;
  }

  & :nth-child(5) span .arrow {
    width: 14rem;
  }

  & :nth-child(6) span .arrow {
    width: 13rem;
  }

  & :nth-child(7) span .arrow {
    width: 12rem;
  }

  & :nth-child(8) span .arrow {
    width: 11rem;
  }

  & :nth-child(9) span .arrow {
    width: 10rem;
  }

  & :nth-child(10) span .arrow {
    width: 9rem;
  }
`
