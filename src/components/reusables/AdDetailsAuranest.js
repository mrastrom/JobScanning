import React from 'react'
import {
  GridContainer,
  SubHeader,
  Title,
  InfoContainer,
  DescriptionContainer
} from '../'

const AdDetailsAuranest = ({
  application,
  employer,
  location,
  content,
  source,
  header
}) => (
  <GridContainer rows={'11vh auto auto auto'}>
    <SubHeader siteName={source.site.name} />

    <Title employer={employer} adHeader={header} />

    <InfoContainer
      location={location.translations['sv-SE']}
      firstSeenAt={source.firstSeenAt}
      deadline={application.deadline}
    />

    <DescriptionContainer
      text={content.text.substring(0, 700)}
      url={source.url}
    />
  </GridContainer>
)

export default AdDetailsAuranest
