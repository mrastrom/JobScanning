import React from 'react'
import styled from 'styled-components'

const DescriptionContainer = ({ text, url }) => (
  <StyledDiv>
    <DescriptionBox>
      <h3 style={{ fontSize: '2.4rem' }}>Annons</h3>
      <DescriptionText>{text.substring(0, 700)}</DescriptionText>
      <StyledLink href={url} target="_blank">
        Gå till annonsen
      </StyledLink>
    </DescriptionBox>
  </StyledDiv>
)

export default DescriptionContainer

const StyledDiv = styled.div`
  background: ${props => props.theme.primary};
  padding: 3rem 1rem;
  box-shadow: 0 -0.3rem 0.5rem rgba(0, 0, 0, 0.5);
`

const DescriptionBox = styled.div`
  grid-row: 4 / 5;
  position: relative;
  background: ${props => props.theme.white};
  padding: 1rem;
  }
`

const DescriptionText = styled.p`
  white-space: pre-line;
  background: -webkit-linear-gradient(#000 0%, #eee 50%, transparent);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`

const StyledLink = styled.a`
  position: absolute;
  left: 50%;
  bottom: 15%;
  transform: translate(-50%, -15%);
  text-align: center;
  width: 60%;
  padding: 1.5rem;
  background: ${props => props.theme.secondary};
  box-shadow: 0 0.3rem 0.5rem rgba(0, 0, 0, 0.5);
  border-radius: 10rem;
`
