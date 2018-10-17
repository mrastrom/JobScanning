import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import format from 'date-fns/format'
import sv from 'date-fns/locale/sv'
import theme from '../../styles/theme'
import { BoldText, LogoPlaceholder } from '../'

const AdDetailsAf = ({
  arbetsgivare,
  arbetsplatsadress,
  beskrivning,
  publiceringsdatum,
  sista_ansokningsdatum,
  arbetstidstyp,
  antal_platser,
  id,
  rubrik
}) => (
  <div>
    <SubHeader>
      <Link to="/ads">{`< tillbaka`}</Link>
      <div>
        <p>Publicerad hos</p>
        <p>?</p>
      </div>
    </SubHeader>

    <Title>
      <LogoPlaceholder>{arbetsgivare.arbetsplats}</LogoPlaceholder>
      <h1
        style={{
          overflow: 'hidden',
          whiteSpace: 'nowrap',
          textOverflow: 'ellipsis',
          marginLeft: '2rem'
        }}
      >
        {rubrik}
      </h1>
    </Title>

    <InfoContainer>
      <p>
        <BoldText>Kommun:</BoldText> {arbetsplatsadress.kommun}
      </p>
      <p>
        <BoldText>Publicerad:</BoldText> {publiceringsdatum}
      </p>
      <p>
        <BoldText>Sök jobbet senast:</BoldText>{' '}
        {sista_ansokningsdatum
          ? sista_ansokningsdatum
          : 'Se annonsen för datum'}
      </p>
      <p>
        <BoldText>Anställningsform:</BoldText> {arbetstidstyp.term}
      </p>
      <p>
        <BoldText>Lön:</BoldText> N/A
      </p>
      <p>
        <BoldText>Antal platser:</BoldText> {antal_platser}
      </p>
      <p>
        <BoldText>Annons-ID:</BoldText> {id}
      </p>
    </InfoContainer>

    <div
      style={{
        backgroundColor: theme.primary,
        padding: '3rem 1rem',
        boxShadow: '0 -0.3rem 0.5rem rgba(0, 0, 0, 0.5)'
      }}
    >
      <DescriptionBox>
        <h3 style={{ fontSize: '2.4rem' }}>Annons</h3>
        <DescriptionText>
          {beskrivning.annonstext.substring(0, 700)}
        </DescriptionText>
      </DescriptionBox>
    </div>
  </div>
)

export default AdDetailsAf

const SubHeader = styled.div`
  grid-row: 2 / 3;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
`

const Title = styled.div`
  grid-row: 3 / 4;
  border-top: 2px solid ${props => props.theme.secondary};
  border-bottom: 2px solid ${props => props.theme.secondary};

  display: grid;
  grid-template-columns: 1fr 3fr;

  width: 100%;
`

const InfoContainer = styled.div`
  grid-row: 4 / 5;
  padding: 1.5rem;
`

const DescriptionBox = styled.div`
  grid-row: 5 / 6;
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
