import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import _ from 'lodash'
import theme from '../../styles/theme'
import {
  AdsList,
  AdsMap,
  AdsOverview,
  GridContainer,
  PageHeaderAds,
  DescriptionContainer
} from '../../components'
import JobDetailsDesktop from './components/JobDetailsDesktop'

class AdsPage extends Component {
  state = {
    selected: false,
    selectedAd: {}
  }

  selectAd = selectedAd => {
    console.log(selectedAd)

    const duplicatedGroupId = _.filter(this.props.ads.hits, item => {
      return item.group.id === selectedAd.group.id
    })

    this.setState({
      selected: true,
      selectedAd: { ...selectedAd, duplicatedGroupId }
    })

    console.log('STATE', this.state.selectedAd)
  }

  render() {
    const { selected, selectedAd } = this.state
    return (
      <GridContainer rows={'100px calc(100vh - 100px)'} center>
        <PageHeaderAds />
        <Content>
          <List>
            <AdsList selectAd={this.selectAd} />
          </List>
          <Details>
            {selected ? <JobDetailsDesktop selectedAd={selectedAd} /> : null}
          </Details>
          <Text>
            {selected ? (
              <DescriptionContainer
                text={selectedAd.content.text}
                source={selectedAd.duplicatedGroupId}
              />
            ) : null}
          </Text>
          <Ranks>
            <AdsOverview />
          </Ranks>
          <Map>
            <AdsMap markers={this.props.markers} />
          </Map>
        </Content>
      </GridContainer>
    )
  }
}

function mapStateToProps({ ads }) {
  return {
    ads
  }
}

export default connect(
  mapStateToProps,
  null
)(AdsPage)

const Content = styled.div`
  width: 75%;
  display: grid;
  grid-template-rows: 40% 60% 1fr;
  grid-template-columns: 2fr 3fr;
  grid-template-areas: 'list details' 'list text' 'ranks map';
  grid-gap: 7px;

  & > div {
    background: #fff;
    box-shadow: 0px 1px 1px 1px rgba(0, 0, 0, 0.5);
  }
`

const List = styled.div`
  grid-area: list;
  overflow: auto;
`

const Details = styled.div`
  grid-area: details;
`

const Text = styled.div`
  grid-area: text;
`

const Ranks = styled.div`
  grid-area: ranks;
`

const Map = styled.div`
  grid-area: map;
`
