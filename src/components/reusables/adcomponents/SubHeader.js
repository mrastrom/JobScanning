import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const SubHeader = ({ siteName }) => (
  <StyledHeader>
    <Link to="/ads">{`< tillbaka`}</Link>
    <div>
      <p>Publicerad hos</p>
      <p>{siteName}</p>
    </div>
  </StyledHeader>
)

export default SubHeader

const StyledHeader = styled.div`
  grid-row: 1 / 2;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  padding: 0 1rem;
`
