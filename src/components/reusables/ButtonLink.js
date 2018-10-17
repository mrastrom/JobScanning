import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const ButtonLink = ({ path, label, bgcolor, padding }) => (
  <StyledLink to={path} bgcolor={bgcolor} padding={padding}>
    {label}
  </StyledLink>
)

export default ButtonLink

const StyledLink = styled(Link)`
  color: black;
  font-size: 1.8rem;
  font-weight: 500;
  text-decoration: none;
  text-align: center;
  padding: 1.3rem 7rem;
  background: ${props => props.bgcolor};
  box-shadow: 0 0.3rem 0.5rem rgba(0, 0, 0, 0.5);
  border-radius: 10rem;
`
