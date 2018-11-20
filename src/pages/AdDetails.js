import React, { Component } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import {
  AdDetailsAuranest,
  GridContainer,
  NoResultsBox,
  PageHeaderAds
} from '../components'

class AdDetails extends Component {
  componentDidMount() {
    window.scrollTo(0, 0)
  }

  getAdDetails = groupId => {
    console.log(groupId)
    let { hits, processedList } = this.props.ads

    let duplicatedGroupId = _.filter(hits, item => {
      return item.group.id === groupId
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
      } = duplicatedGroupId[0]
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
      <GridContainer rows={'85px 1fr'}>
        <PageHeaderAds />
        {this.getAdDetails(this.props.match.params.id)}
      </GridContainer>
    )
  }
}

function mapStateToProps({ ads }) {
  return {
    ads
  }
}

export default connect(
  mapStateToProps,
  null
)(AdDetails)
