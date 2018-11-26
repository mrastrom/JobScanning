import React from 'react'
import styled from 'styled-components'

const LogoPlaceholder = ({ employer, padding, desktop }) => {
  if (employer.logoUrl) {
    return (
      <StyledImg src={employer.logoUrl} padding={padding} desktop={desktop} />
    )
  } else {
    return <StyledH3>{employer.name}</StyledH3>
  }
}

export default LogoPlaceholder

const StyledImg = styled.img`
  height: ${props => (props.desktop ? '100%' : 'auto')};
  width: ${props => (props.desktop ? 'auto' : '100%')};
  padding: ${props => (props.padding ? '0.5rem' : '0')};
`

const StyledH3 = styled.h3`
  overflow: hidden;
  text-align: center;
  word-break: break-word;
  hyphens: auto;
  background: ${props => props.theme.brightestSecondary};
  margin: 0 !important;
  padding: 1rem;
`
