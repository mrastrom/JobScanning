import React from 'react'
import { withRouter } from 'react-router-dom'
import styled from 'styled-components'

const JobMapWindow = ({ marker }) => {
  return <MapWindow />
}

export default withRouter(JobMapWindow)

const MapWindow = styled.div`
  display: flex;

  background: #eee;
  height: 20vh;
  width: 90vw;
`
