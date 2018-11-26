import React, { Component } from 'react'
import { BoldText, GridContainer, PageHeader } from '../components'
import SearchForm from '../components/reusables/SearchForm'

class SearchPage extends Component {
  render() {
    return (
      <GridContainer rows={'85px 6% 1fr'} gap={true} center={true}>
        <PageHeader>
          <h1>Alla jobb på ett ställe</h1>
        </PageHeader>

        <p>
          <BoldText>294 293</BoldText> jobb från <BoldText>1009</BoldText>{' '}
          jobbsajter
        </p>

        <SearchForm />
      </GridContainer>
    )
  }
}

export default SearchPage
