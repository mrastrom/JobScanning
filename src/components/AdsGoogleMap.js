import React from 'react'
import { connect } from 'react-redux'
import { compose, withProps } from 'recompose'
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker
} from 'react-google-maps'

const MyMapComponent = compose(
  withProps({
    googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${
      process.env.REACT_APP_DEV_GOOGLE_MAPS_API_KEY
    }&v=3.exp&libraries=geometry,drawing,places`,
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `100%` }} />,
    mapElement: <div style={{ height: `100%` }} />
  }),
  withScriptjs,
  withGoogleMap
)(props => (
  <GoogleMap
    defaultZoom={4.8}
    defaultCenter={{ lat: 62.173276, lng: 14.942265 }}
  >
    {props.isMarkerShown && (
      <Marker
        position={{ lat: 62.173276, lng: 14.942265 }}
        onClick={props.onMarkerClick}
      />
    )}
  </GoogleMap>
))

class MyFancyComponent extends React.PureComponent {
  state = {
    isMarkerShown: true
  }

  componentDidMount() {
    // this.props.ads.hits.map(item => {
    //   console.log(item.location.googleMaps.id)
    // })
  }

  handleMarkerClick = () => {
    this.setState({ isMarkerShown: false })
  }

  render() {
    return (
      <MyMapComponent
        isMarkerShown={this.state.isMarkerShown}
        onMarkerClick={this.handleMarkerClick}
      />
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
)(MyFancyComponent)
