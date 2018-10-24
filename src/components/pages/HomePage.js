import React from 'react'
import styled, { keyframes } from 'styled-components'
import CountUp from 'react-countup'
import theme from '../../styles/theme'

import { ButtonLink, DisplayNumber } from '../'

export default () => {
  return (
    <div style={{ height: '100%', position: 'relative', overflow: 'hidden' }}>
      <Background />
      <Header>
        <h1>Alla jobb på ett ställe</h1>
        <Logo alt="JT" src="/assets/images/jt.png" />
        <p>
          <DisplayNumber>
            <CountUp start={15000} end={294293} duration={8} separator=" " />
          </DisplayNumber>{' '}
          jobbannonser från
        </p>
        <p>
          <DisplayNumber>
            <CountUp start={0} end={254} duration={10} separator=" " />
          </DisplayNumber>{' '}
          rekryteringssajter
        </p>
        <ButtonLink
          path={'/search'}
          label={'Gå vidare'}
          bgcolor={theme.primary}
        />
      </Header>
    </div>
  )
}

const diagonalSlide = keyframes`
  0% {
    transform: translate3d(0, 0, 0)
  }

  100% {
    transform: translate3d(-1000px, 1000px, 0)
  }
`

const Background = styled.div`
  height: 3000px;
  width: 3000px;
  background: url('./assets/images/background.png') repeat;
  background-position: right bottom;
  animation: ${diagonalSlide} 20s linear infinite;
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: -1;
`

const Header = styled.header`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: 55vh;
  padding: 2.5rem 0 4rem;
  background: ${props => props.theme.secondary};
  border-bottom-left-radius: 90% 80%;
  border-bottom-right-radius: 90% 80%;
  box-shadow: 0 0.3rem 2rem 0.3rem rgba(0, 0, 0, 0.6);
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
`

const Logo = styled.img`
  width: 20%;
`
