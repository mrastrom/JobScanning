import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import styled from 'styled-components'
import { LogoPlaceholder } from '../components'

class AdsList extends Component {
  redirectToAdPage = id => {
    this.props.history.push(`/ads/${id}`)
  }

  renderAdRow = () => {
    let { hits } = this.props.ads

    if (hits[0].hasOwnProperty('ansokningsdetaljer')) {
      return hits.slice(0, 10).map((item, i) => (
        <ListItem key={i} onClick={() => this.redirectToAdPage(i)}>
          <LogoPlaceholder>{item.arbetsgivare.arbetsplats}</LogoPlaceholder>
          <ItemInfo>
            <ItemTitle>{item.rubrik}</ItemTitle>
            <p>{item.arbetsplatsadress.kommun}</p>
            <p>Inlagd: {item.publiceringsdatum}</p>
            <ItemDeadline>{item.sista_ansokningsdatum}</ItemDeadline>
          </ItemInfo>
        </ListItem>
      ))
    } else {
      return hits.slice(0, 10).map((item, i) => (
        <ListItem key={i} onClick={() => this.redirectToAdPage(i)}>
          <LogoPlaceholder>{item.employer.name}</LogoPlaceholder>
          <ItemInfo>
            <ItemTitle>{item.header}</ItemTitle>
            <p>
              {item.location
                ? item.location.translations['sv-SE']
                : 'Finns inte'}
            </p>
            <p>Inlagd: {item.source.firstSeenAt}</p>
            <ItemDeadline>
              {item.application.deadline
                ? item.application.deadline
                : 'Se annonsen för datum'}
            </ItemDeadline>
          </ItemInfo>
        </ListItem>
      ))
    }
  }

  render() {
    let { ads } = this.props
    console.log(ads)

    if (Object.keys(ads).length === 0 && ads.constructor === Object) {
      return <p>Hittade inga annonser</p>
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
