import React from 'react'
import styled from 'styled-components'
import format from 'date-fns/format'
import sv from 'date-fns/locale/sv'
import { BoldText } from '../../'

const InfoContainer = ({ location, firstSeenAt, deadline }) => (
  <StyledDiv>
    <p>
      <BoldText>Kommun:</BoldText> {location}
    </p>
    <p>
      <BoldText>Publicerad:</BoldText> {firstSeenAt}
    </p>
    <p>
      <BoldText>Sök jobbet senast:</BoldText>{' '}
      {deadline
        ? format(new Date(deadline), 'D MMMM', {
            locale: sv
          })
        : 'Se annonsen för datum'}
    </p>
  </StyledDiv>
)

export default InfoContainer

const StyledDiv = styled.div`
  grid-row: 4 / 5;
  padding: 1.5rem;
`
