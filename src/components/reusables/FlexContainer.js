import React from 'react'
import styled from 'styled-components'

const FlexContainer = props => <FlexDiv>{props.children}</FlexDiv>

export default FlexContainer

const FlexDiv = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`
