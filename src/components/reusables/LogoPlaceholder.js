import React from 'react'
import styled from 'styled-components'

const LogoPlaceholder = ({ children }) => <StyledH3>{children}</StyledH3>

export default LogoPlaceholder

const StyledH3 = styled.h3`
  overflow: hidden;
  text-align: center;
  word-break: break-word;
  background: ${props => props.theme.brightestSecondary};
  margin: 0 !important;
  padding: 0.5rem;
`
