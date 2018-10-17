import React from 'react'
import { SubHeader, Title, InfoContainer, DescriptionContainer } from '../'

const AdDetailsAuranest = ({
  application,
  employer,
  location,
  content,
  source,
  header
}) => (
  <div>
    <SubHeader siteName={source.site.name} />

    <Title employerName={employer.name} adHeader={header} />

    <InfoContainer
      location={location.translations['sv-SE']}
      firstSeenAt={source.firstSeenAt}
      deadline={application.deadline}
    />

    <DescriptionContainer
      text={content.text.substring(0, 700)}
      url={source.url}
    />
  </div>
)

export default AdDetailsAuranest
