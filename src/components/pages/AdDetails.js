import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  AdDetailsAf,
  AdDetailsAuranest,
  GridContainer,
  PageHeaderAds
} from '../'

class AdDetails extends Component {
  getAdDetails = index => {
    let { hits } = this.props.ads

    if (!this.props.ads.hits) {
      return <p>Välj en annons</p>
    }

    if (hits[index].hasOwnProperty('ansokningsdetaljer')) {
      let {
        arbetsgivare,
        arbetsplatsadress,
        beskrivning,
        publiceringsdatum,
        sista_ansokningsdatum,
        arbetstidstyp,
        antal_platser,
        id,
        rubrik
      } = this.props.ads.hits[index]

      return (
        <AdDetailsAf
          arbetsgivare={arbetsgivare}
          arbetsplatsadress={arbetsplatsadress}
          beskrivning={beskrivning}
          publiceringsdatum={publiceringsdatum}
          sista_ansokningsdatum={sista_ansokningsdatum}
          arbetstidstyp={arbetstidstyp}
          antal_platser={antal_platser}
          id={id}
          rubrik={rubrik}
        />
      )
    } else {
      let {
        application,
        employer,
        location,
        content,
        source,
        header
      } = this.props.ads.hits[index]

      return (
        <AdDetailsAuranest
          application={application}
          employer={employer}
          location={location}
          content={content}
          source={source}
          header={header}
        />
      )
    }
  }

  render() {
    return (
      <GridContainer rows={'13vh 11vh 9vh auto auto'}>
        <PageHeaderAds />
        {this.getAdDetails(this.props.match.params.id)}
      </GridContainer>
    )
  }
}

function mapStateToProps(state) {
  return {
    ads: state.ads
  }
}

export default connect(
  mapStateToProps,
  null
)(AdDetails)
