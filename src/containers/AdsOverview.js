import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import _ from 'lodash'
import { NoResultsBox } from '../components/'

class AdsOverview extends Component {
  renderOverview = () => {
    let scoreboard = this.props.ads.hits.reduce((acc, val) => {
      acc[val.source.site.name] = acc[val.source.site.name]
        ? acc[val.source.site.name] + 1
        : 1
      return acc
    }, {})

    let ordered = Object.keys(scoreboard).sort(
      (a, b) => scoreboard[b] - scoreboard[a]
    )

    return _.map(ordered, key => (
      <ListItem key={key}>
        <Brand>{key}</Brand>
        <Score>
          {scoreboard[key]}
          <p style={{ display: 'inline-block', fontSize: '1.375rem' }}>st</p>
        </Score>
      </ListItem>
    ))
  }

  render() {
    let { ads, term } = this.props

    if (Object.keys(ads).length === 0 && ads.constructor === Object) {
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
  grid-template-columns: 170px 1fr;
  grid-column-gap: 30px;
  align-items: center;
`

const Brand = styled.div`
  line-height: 2.3rem;
`

const Score = styled.span`
  height: 4rem;
  width: 4rem;
  color: ${props => props.theme.white};
  font-size: ${props => props.theme.fontSizeLarge};
  font-weight: 600;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  position: relative;
`

const OrderedList = styled.ol`
  list-style: none;

  & :nth-child(3n + 1) span {
    background: ${props => props.theme.primary};
  }

  & :nth-child(3n - 1) span {
    background: ${props => props.theme.secondary};
  }

  & :nth-child(3n) span {
    background: ${props => props.theme.brightSecondary};
  }

  & :nth-child(3n + 1) span:before {
    background: ${props => props.theme.primary};
  }

  & :nth-child(3n - 1) span:before {
    background: ${props => props.theme.secondary};
  }

  & :nth-child(3n) span:before {
    background: ${props => props.theme.brightSecondary};
  }
`
