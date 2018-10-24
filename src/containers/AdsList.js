import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import styled from 'styled-components'
import distanceInWordsStrict from 'date-fns/distance_in_words_strict'
import format from 'date-fns/format'
import sv from 'date-fns/locale/sv'
import _ from 'lodash'
import { CustomLoader, LogoPlaceholder, NoResultsBox } from '../components'

class AdsList extends Component {
  state = {
    items: []
  }

  redirectToAdPage = id => {
    this.props.history.push(`/ads/${id}`)
  }

  renderAdRow = () => {
    let { processedList } = this.props.ads
    console.log(processedList)

    return processedList.map((item, i) => (
      <ListItem key={i} onClick={() => this.redirectToAdPage(i)}>
        <LogoPlaceholder employer={item.employer} />
        <ItemInfo>
          <ItemTitle>{item.header}</ItemTitle>
          <p>
            {item.location ? item.location.translations['sv-SE'] : 'Finns inte'}
          </p>
          <p>Inlagd: {format(item.source.firstSeenAt, 'YYYY-MM-DD HH:mm')}</p>
          <ItemDeadline>
            {item.application.deadline
              ? distanceInWordsStrict(Date.now(), item.application.deadline, {
                  addSuffix: true,
                  locale: sv
                })
              : 'Se annonsen för datum'}
          </ItemDeadline>
        </ItemInfo>
      </ListItem>
    ))
  }

  render() {
    let { ads } = this.props

    if (this.props.ads.isFetching) {
      return <CustomLoader />
    } else if (Object.keys(ads).length === 0 && ads.constructor === Object) {
      return <NoResultsBox />
    } else if (this.props.ads.error) {
      return <NoResultsBox />
    } else {
      return <List>{this.renderAdRow()}</List>
    }
  }
}

function mapStateToProps(state) {
  return {
    ads: state.ads
  }
}

export default withRouter(
  connect(
    mapStateToProps,
    null
  )(AdsList)
)

const List = styled.ul`
  display: grid;
  width: 100%;
`

const ListItem = styled.li`
  display: grid;
  grid-template-columns: 30% 1fr;
  grid-gap: 2rem;
  align-items: start;
  border-bottom: 2px solid ${props => props.theme.secondary};
  padding: 1.5rem 1.5rem 0;
`

const ItemInfo = styled.div`
  grid-column: 2/3;
  display: grid;
`

const ItemTitle = styled.h2`
  font-size: ${props => props.theme.fontSizeMedium};
  text-decoration: underline;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`

const ItemDeadline = styled.p`
  justify-self: end;
  align-self: end;
  padding: 1rem;
`
