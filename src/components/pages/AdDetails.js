import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  AdDetailsAuranest,
  GridContainer,
  NoResultsBox,
  PageHeaderAds
} from '../'

class AdDetails extends Component {
  componentDidMount() {
    window.scrollTo(0, 0)
  }

  getAdDetails = index => {
    if (!this.props.ads.hits) {
      return <NoResultsBox adDetails />
    } else {
      let {
        application,
        employer,
        location,
        content,
        source,
        header
      } = this.props.ads.hits[index]

      return (
        <AdDetailsAuranest
          application={application}
          employer={employer}
          location={location}
          content={content}
          source={source}
          header={header}
        />
      )
    }
  }

  render() {
    return (
      <GridContainer rows={'13vh 1fr'}>
        <PageHeaderAds />
        {this.getAdDetails(this.props.match.params.id)}
      </GridContainer>
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
)(AdDetails)
