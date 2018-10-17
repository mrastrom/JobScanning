import React from 'react'
import styled from 'styled-components'

const GridContainer = ({ rows, gap, center, children }) => (
  <Grid rows={rows} gap={gap} center={center}>
    {children}
  </Grid>
)

export default GridContainer

const Grid = styled.div`
  height: 100%;
  width: 100%;
  display: grid;
  grid-template-rows: ${props => props.rows};
  grid-gap: ${props => (props.gap ? '2rem' : '0')};
  justify-items: ${props => (props.center ? 'center' : 'stretch')};
`
