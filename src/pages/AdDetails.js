import React, { Component } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import {
  NoResultsBox,
  PageHeaderAds,
  GridContainer,
  SubHeader,
  Title,
  InfoContainer,
  DescriptionContainer
} from '../components'

class AdDetails extends Component {
  componentDidMount() {
    window.scrollTo(0, 0)
  }

  getAdDetails = groupId => {
    let { hits, processedList } = this.props.ads

    let duplicatedGroupId = _.filter(hits, item => {
      return item.group.id === groupId
    })

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
        <GridContainer rows={'11vh auto auto auto'}>
          <SubHeader
            siteName={
              duplicatedGroupId.length > 1 ? 'Se nedan' : source.site.name
            }
          />

          <Title employer={employer} adHeader={header} />

          <InfoContainer
            location={location.translations['sv-SE']}
            firstSeenAt={source.firstSeenAt}
            deadline={application.deadline}
          />

          <DescriptionContainer
            text={content.text}
            source={duplicatedGroupId}
          />
        </GridContainer>
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
