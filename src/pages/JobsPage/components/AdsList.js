import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchMoreAds } from '../../../redux/actions'
import { withRouter } from 'react-router-dom'
import styled from 'styled-components'
import distanceInWordsStrict from 'date-fns/distance_in_words_strict'
import format from 'date-fns/format'
import sv from 'date-fns/locale/sv'
import InfiniteScroll from 'react-infinite-scroll-component'
import {
  CustomLoader,
  LogoPlaceholder,
  NoResultsBox
} from '../../../components'

class AdsList extends Component {
  state = {
    items: [],
    offset: 0
  }

  redirectToAdPage = id => {
    this.props.history.push(`/ads/${id}`)
  }

  fetchMoreData = () => {
    this.setState(prevState => ({
      offset: prevState.offset + 10
    }))
    console.log(this.state.offset)

    this.props.fetchMoreAds(
      this.props.searchTerm,
      this.props.location,
      this.state.offset
    )
  }

  render() {
    if (this.props.ads.isFetching) {
      return <CustomLoader size="massive" content="Laddar" />
    } else if (this.props.ads.error) {
      return <NoResultsBox />
    } else {
      return (
        <List id="scrollableDiv">
          <InfiniteScroll
            dataLength={this.props.ads.processedList.length}
            next={this.fetchMoreData}
            hasMore={true}
            style={{ overflow: 'visible' }}
            scrollableTarget="scrollableDiv"
            scrollThreshold={0.9}
            loader={
              <div
                style={{
                  position: 'relative',
                  marginTop: '5rem'
                }}
              >
                <CustomLoader size="big" content="Hämtar fler" />
              </div>
            }
          >
            {this.props.ads.processedList.map((item, i) => (
              <ListItem
                key={i}
                onClick={
                  this.props.selectAd
                    ? () => this.props.selectAd(item)
                    : () => this.redirectToAdPage(item.group.id)
                }
              >
                <LogoPlaceholder employer={item.employer} />
                <ItemInfo>
                  <ItemTitle>{item.header}</ItemTitle>
                  <p>
                    {item.location
                      ? item.location.translations['sv-SE']
                      : 'Finns inte'}
                  </p>
                  <p>
                    Inlagd:{' '}
                    {format(item.source.firstSeenAt, 'YYYY-MM-DD HH:mm')}
                  </p>
                  {/* <ItemDeadline>
                    {item.application.deadline
                      ? distanceInWordsStrict(
                          Date.now(),
                          item.application.deadline,
                          {
                            addSuffix: true,
                            locale: sv
                          }
                        )
                      : 'Se annonsen för datum'}
                  </ItemDeadline> */}
                </ItemInfo>
              </ListItem>
            ))}
          </InfiniteScroll>
        </List>
      )
    }
  }
}

function mapStateToProps({ ads }) {
  const { searchTerm, location } = ads
  return {
    ads,
    searchTerm,
    location
  }
}

export default withRouter(
  connect(
    mapStateToProps,
    { fetchMoreAds }
  )(AdsList)
)

const List = styled.ul`
  height: 100%;
  width: 100%;
  overflow: auto;
  display: grid;
`

const ListItem = styled.li`
  display: grid;
  grid-template-columns: 30% 1fr;
  grid-gap: 2rem;
  align-items: start;
  border-bottom: 2px solid ${props => props.theme.secondary};
  padding: 1.5rem;
`

const ItemInfo = styled.div`
  grid-column: 2/3;
  display: grid;
`

const ItemTitle = styled.h2`
  font-size: ${props => props.theme.fontSizeMedium};
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`

// const ItemDeadline = styled.p`
//   justify-self: end;
//   align-self: end;
//   padding: 1rem;
// `
