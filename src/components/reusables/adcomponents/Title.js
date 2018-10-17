import React from 'react'
import styled from 'styled-components'
import { LogoPlaceholder } from '../../'

const Title = ({ employerName, adHeader }) => (
  <StyledDiv>
    <LogoPlaceholder>{employerName}</LogoPlaceholder>
    <h1
      style={{
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        marginLeft: '2rem'
      }}
    >
      {adHeader}
    </h1>
  </StyledDiv>
)

export default Title

const StyledDiv = styled.div`
  grid-row: 3 / 4;
  border-top: 2px solid ${props => props.theme.secondary};
  border-bottom: 2px solid ${props => props.theme.secondary};

  display: grid;
  grid-template-columns: 1fr 3fr;

  width: 100%;
`
