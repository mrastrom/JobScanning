import React from 'react'
import styled from 'styled-components'
import images from '../../../images/'
import _ from 'lodash'
import { BoldText } from '../../../components'
import logo from '../../../images/hm.png'

const JobDetailsDesktop = ({ selectedAd }) => {
  return (
    <Grid>
      <HeaderLayout>
        <JobLogo style={{ height: '50px', width: 'auto' }} src={logo} />
        <JobHeader>Ekonomiassistent</JobHeader>
      </HeaderLayout>
      <ContentLayout>
        <p>
          <BoldText>Kommun:</BoldText> Huddinge
        </p>
        <p>
          <BoldText>Publicerad:</BoldText> Idag kl 10:00
        </p>
        <p>
          <BoldText>Sök jobbet senast:</BoldText> 28 september
        </p>
      </ContentLayout>
    </Grid>
  )
}

export default JobDetailsDesktop

const Grid = styled.div`
  height: 100%;
  display: grid;
  grid-template-rows: 30% 1fr;
  grid-template-columns: 1fr;
  padding: 2rem 0 0 4rem;
`

const HeaderLayout = styled.div`
  grid-row: 1/2;
  grid-column: 1/2;
  align-items: center;
  margin: 0;
  display: flex;
`

const ContentLayout = styled.div`
  grid-row: 2/3;
  grid-column: 1/2;
  font-size: 1.4rem !important;
  align-self: center;
`

const JobLogo = styled.img`
  grid-column: 1/2;
  width: 100%;
`

const JobHeader = styled.h2`
  display: inline-block;
  margin: 0;
  padding-left: 1rem;
  font-size: 16px;
  font-weight: normal;
`

const SourcesLayout = styled.div`
  grid-row: 1/3;
  grid-column: 2/3;
  padding: 1rem;
`

const Sources = styled.div`
  height: 100%;
  padding: 0.5rem;
  font-size: 1.4rem !important;
  box-shadow: 0px 1px 1px 1px rgba(0, 0, 0, 0.5);
`

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
`

const DescriptionText = styled.p`
  white-space: pre-line;
  background: -webkit-linear-gradient(
    #000 0%,
    #eee 50%,
    rgba(255, 255, 255, 0)
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: rgba(255, 255, 255, 0);
`

const StyledLink = styled.a`
  &:link,
  &:visited,
  &:hover,
  &:active {
    color: #fff;
    font-size: 1.8rem;
    font-weight: 700;
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
  }
`

const MultipleLinks = styled.div`
  position: absolute;
  left: 50%;
  bottom: 5%;
  transform: translate(-50%, -5%);
  height: 50%;
  width: 80%;
  background: #fff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-shadow: 0 0.3rem 0.5rem rgba(0, 0, 0, 0.5);
`

const SourceLogo = styled.div`
  height: 5rem;
  width: 10rem;
  background: ${props => `url(${props.sourceLogo})`};
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
`

/* <SourcesLayout>
        <Sources>
          <p>Vi hittade annonsen på 3 olika sajter</p>
          <p>Välj vilken du vill gå till!</p>
          <Flex>
            <JobLogo style={{ height: '2rem', width: 'auto' }} src={logo} />
            <JobLogo style={{ height: '2rem', width: 'auto' }} src={logo} />
            <JobLogo style={{ height: '2rem', width: 'auto' }} src={logo} />
          </Flex>
        </Sources>
      </SourcesLayout> */
