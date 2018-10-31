import React from 'react'
import styled from 'styled-components'
import images from '../images'

const getLogo = name => {
  if ([name] in images) {
    return <StyledImage src={images[name]} alt={name} />
  } else {
    return <p>{name}</p>
  }
}

export default getLogo

const StyledImage = styled.img`
  width: 100%;
`
