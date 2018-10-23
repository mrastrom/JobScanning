import React from 'react'
import styled from 'styled-components'

const LogoPlaceholder = ({ employer, padding }) => {
  if (employer.logoUrl) {
    return <StyledImg src={employer.logoUrl} padding={padding} />
  } else {
    return <StyledH3>{employer.name}</StyledH3>
  }
}

export default LogoPlaceholder

const StyledImg = styled.img`
  width: 100%;
  padding: ${props => (props.padding ? '0.5rem' : '0')};
`

const StyledH3 = styled.h3`
  overflow: hidden;
  text-align: center;
  word-break: break-word;
  background: ${props => props.theme.brightestSecondary};
  margin: 0 !important;
  padding: 1.5rem;
`
