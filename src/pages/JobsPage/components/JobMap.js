import React from 'react'
import { connect } from 'react-redux'
import { compose, withProps } from 'recompose'
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  OverlayView
} from 'react-google-maps'
import MarkerClusterer from 'react-google-maps/lib/components/addons/MarkerClusterer'
import { JobMapWindow } from '../../../components'

const getPixelPositionOffset = (width, height) => ({
  x: -(width / 2),
  y: -(height - 135)
})

const MyMapComponent = compose(
  withProps({
    googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${
      process.env.REACT_APP_DEV_GOOGLE_MAPS_API_KEY
    }&v=3.exp&libraries=geometry,drawing,places`,
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `74vh` }} />,
    mapElement: <div style={{ height: `100%` }} />
  }),
  withScriptjs,
  withGoogleMap
)(props => (
  <GoogleMap
    defaultZoom={4.8}
    defaultCenter={{ lat: 62.173276, lng: 14.942265 }}
  >
    {props.markers.length > 0 && (
      <MarkerClusterer
        onClick={props.onMarkerClustererClick}
        averageCenter
        enableRetinaIcons
        gridSize={60}
        maxZoom={14}
      >
        {console.log(props.markers)}
        {props.markers.map(marker => {
          const position = {
            lat: marker.geocode.geometry.location.lat,
            lng: marker.geocode.geometry.location.lng
          }
          return (
            <Marker
              key={marker.id}
              position={position}
              defaultAnimation={4}
              onClick={() => props.onMarkerClick(marker)}
            >
              {marker.isOpen && (
                <OverlayView
                  position={{ lat: position.lat, lng: position.lng }}
                  mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
                  getPixelPositionOffset={getPixelPositionOffset}
                >
                  <JobMapWindow
                    marker={marker}
                    allMarkers={props.markers}
                    closeMapWindow={() => props.onMarkerClick(marker)}
                  />
                </OverlayView>
              )}
            </Marker>
          )
        })}
      </MarkerClusterer>
    )}
  </GoogleMap>
))

class MyFancyComponent extends React.Component {
  state = {
    markers: this.props.ads.markers
  }

  static getDerivedStateFromProps(props, state) {
    if (props.ads.markers !== state.markers) {
      return {
        markers: props.ads.markers
      }
    }
    return null
  }

  handleMarkerClick = clickedMarker => {
    console.log(clickedMarker)

    const updatedMarkers = [...this.state.markers]
    for (let i = 0; i < updatedMarkers.length; i++) {
      if (updatedMarkers[i].id === clickedMarker.id) {
        updatedMarkers[i].isOpen = !updatedMarkers[i].isOpen
      }
    }
    this.setState({ markers: updatedMarkers })
  }

  render() {
    return (
      <MyMapComponent
        markers={this.state.markers}
        processedList={this.props.processedList}
        onMarkerClick={this.handleMarkerClick}
      />
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
)(MyFancyComponent)
