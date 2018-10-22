import React, { Component } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
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
    let { hits, processedList } = this.props.ads
    let duplicatedGroupId = _.filter(hits, item => {
      return item.group.id == processedList[index].group.id
    })
    console.log('TCL: duplicatedGroupId', duplicatedGroupId)

    if (!processedList) {
      return <NoResultsBox adDetails />
    } else {
      let {
        application,
        employer,
        location,
        content,
        source,
        header
      } = processedList[index]

      return (
        <AdDetailsAuranest
          application={application}
          employer={employer}
          location={location}
          content={content}
          source={source}
          header={header}
          duplicatedGroupId={duplicatedGroupId}
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
