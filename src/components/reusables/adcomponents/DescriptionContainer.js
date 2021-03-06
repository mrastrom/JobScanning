import React from 'react'
import styled from 'styled-components'
import images from '../../../images/'

const DescriptionContainer = ({ text, source }) => (
  <DescriptionBox>
    <h3 style={{ fontSize: '2.4rem' }}>Annons</h3>
    {text && <DescriptionText>{text.substring(0, 1200)}</DescriptionText>}
    {source.length > 1 ? (
      <MultipleLinks>
        <p>Vi hittade annonsen på {source.length} olika sajter</p>
        <p>Välj vilken du vill gå till!</p>
        <div>
          {source.map((item, i) => (
            <a
              key={i}
              href={item.source.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              {[item.source.site.name] in images ? (
                <SourceLogo sourceLogo={images[item.source.site.name]} />
              ) : (
                <p>{item.source.site.name}</p>
              )}
            </a>
          ))}
        </div>
      </MultipleLinks>
    ) : (
      <StyledLink
        href={source[0].source.url}
        target="_blank"
        rel="noopener noreferrer"
      >
        Gå till annonsen
      </StyledLink>
    )}
  </DescriptionBox>
)

export default DescriptionContainer

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
    #eee 75%,
    rgba(255, 255, 255, 0)
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: rgba(255, 255, 255, 0);
`

const StyledLink = styled.a`
  &:link,
  &:visited {
    color: #fff;
    font-size: 2rem;
    font-weight: 700;
    position: absolute;
    left: 50%;
    bottom: 15%;
    transform: translate(-50%, -15%);
    text-align: center;
    width: 60%;
    padding: 1.5rem;
    background: ${props => props.theme.secondary};
    /* box-shadow: 0 0.3rem 0.5rem rgba(0, 0, 0, 0.5); */
    box-shadow: 0 0.3rem 0.5rem rgba(0, 0, 0, 0.2);
    border-radius: 10rem;
  }

  &:hover,
  &:active {
    color: ${props => props.theme.secondary};
    background: #fff;
    border: 1px solid ${props => props.theme.secondary};
    box-shadow: 0 0.3rem 0.5rem rgba(0, 0, 0, 0.5);
  }
`

const MultipleLinks = styled.div`
  position: absolute;
  left: 50%;
  bottom: 5%;
  transform: translate(-50%, -5%);
  width: 90%;
  background: #fff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-shadow: 0 0.3rem 0.5rem rgba(0, 0, 0, 0.5);
  padding: 1rem;
`

const SourceLogo = styled.div`
  height: 5rem;
  width: 10rem;
  background: ${props => `url(${props.sourceLogo})`};
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
`
