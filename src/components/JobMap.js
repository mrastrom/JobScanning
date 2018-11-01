import React from 'react'
import axios from 'axios'
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
import { JobMapWindow } from './index'

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
    <MarkerClusterer
      onClick={props.onMarkerClustererClick}
      averageCenter
      enableRetinaIcons
      gridSize={60}
      maxZoom={14}
    >
      {props.markers.map(marker => {
        const position = {
          lat: marker.geocode.geometry.location.lat,
          lng: marker.geocode.geometry.location.lng
        }
        return (
          <Marker
            key={marker.id}
            position={position}
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
  </GoogleMap>
))

class MyFancyComponent extends React.Component {
  state = {
    markers: []
  }

  componentDidMount() {
    if (this.props.ads.processedList) {
      this.setupMarkers()
    }
  }

  setupMarkers = async () => {
    const markers = await Promise.all(
      this.props.ads.processedList.map(async item => {
        if (item.location.googleMaps.id) {
          let geocode = await this.fetchLocation(item.location.googleMaps.id)
          return { ...item, geocode }
        }
      })
    )
    this.setState({ markers })
    console.log('markers', this.state.markers)
  }

  fetchLocation = async googleMapsId => {
    try {
      let geocode = await axios
        .get(
          `https://maps.googleapis.com/maps/api/geocode/json?place_id=${googleMapsId}&key=${
            process.env.REACT_APP_DEV_GOOGLE_MAPS_API_KEY
          }`
        )
        .then(response => response.data.results[0])
      return geocode
    } catch (error) {
      console.log('MyFancyComponent -> }catch -> error', error)
    }
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
