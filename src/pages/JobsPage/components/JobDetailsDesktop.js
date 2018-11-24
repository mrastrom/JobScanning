import React from 'react'
import styled from 'styled-components'
import images from '../../../images/'
import _ from 'lodash'
import { BoldText } from '../../../components'
import logo from '../../../images/hm.png'
import format from 'date-fns/format'
import sv from 'date-fns/locale/sv'

const JobDetailsDesktop = ({ selectedAd }) => {
  const {
    location,
    source: { firstSeenAt },
    application: { deadline }
  } = selectedAd
  console.log('HÄR', location, firstSeenAt, deadline)

  return (
    <Grid>
      <Header>
        <JobLogo style={{ height: '50px', width: 'auto' }} src={logo} />
        <JobHeader>Ekonomiassistent</JobHeader>
      </Header>
      <Content>
        <p>
          <BoldText>Kommun:</BoldText> {location.translations['sv-SE']}
        </p>
        <p>
          <BoldText>Publicerad:</BoldText>{' '}
          {format(firstSeenAt, 'YYYY-MM-DD HH:mm')}
        </p>
        <p>
          <BoldText>Sök jobbet senast:</BoldText>{' '}
          {deadline
            ? format(new Date(deadline), 'D MMMM', {
                locale: sv
              })
            : 'Se annonsen för datum'}
        </p>
      </Content>
    </Grid>
  )
}

export default JobDetailsDesktop

const Grid = styled.div`
  height: 100%;
  display: grid;
  grid-template-rows: 30% 1fr;
  grid-template-columns: 1fr;
  padding: 2rem 0 0 4rem;
`

const Header = styled.div`
  grid-row: 1/2;
  grid-column: 1/2;
  align-items: center;
  margin: 0;
  display: flex;
`

const Content = styled.div`
  grid-row: 2/3;
  grid-column: 1/2;
  font-size: 1.4rem !important;
  align-self: center;
`

const JobLogo = styled.img`
  grid-column: 1/2;
  width: 100%;
`

const JobHeader = styled.h2`
  display: inline-block;
  margin: 0;
  padding-left: 1rem;
  font-size: 16px;
  font-weight: normal;
`
