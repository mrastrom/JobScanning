import React, { Component } from 'react'
import { connect } from 'react-redux'
import { searchAds } from '../actions/index'
import styled from 'styled-components'
import { Button, Checkbox, Dropdown, Form, Input } from 'semantic-ui-react'
import { BoldText, GridContainer, PageHeader } from '../components'
import { countiesAndMunicipalities } from '../utils/searchOptions'
import axios from 'axios'

class SearchPage extends Component {
  state = {
    term: '',
    location: ''
  }

  componentDidMount() {
    this.setState({ term: this.props.term, location: this.props.location })
  }

  handleChange = (event, data) => {
    this.setState({ [data.name]: data.value })
  }

  handleSubmit = async event => {
    event.preventDefault()
    this.props.searchAds(this.state.term, this.state.location)
    this.props.history.push('/ads')
  }

  getCurrentPosition = () => {
    const success = async position => {
      const {
        coords: { latitude, longitude }
      } = position

      let { data } = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${
          process.env.REACT_APP_DEV_GOOGLE_MAPS_API_KEY
        }&result_type=locality`
      )

      if (data.status === 'OK') {
        for (let i = 0; i < data.results[0].address_components.length; i++) {
          let component = data.results[0].address_components[i]

          if (
            component.types.includes('sublocality') ||
            component.types.includes('locality')
          ) {
            for (let i = 0; i < countiesAndMunicipalities.length; i++) {
              if (countiesAndMunicipalities[i].text === component.long_name) {
                this.setState({
                  location: countiesAndMunicipalities[i].value
                })
              }
            }
          }
        }
        console.log(this.state)
      }
    }

    const error = error => {
      console.log(error)
      alert('ERROR(' + error.code + '): ' + error.message)
    }

    navigator.geolocation.getCurrentPosition(success, error, {
      enableHighAccuracy: true,
      maximumAge: 30000,
      timeout: 27000
    })
  }

  canBeSubmitted = () => {
    const { term } = this.state
    return term.length > 0
  }

  render() {
    const isEnabled = this.canBeSubmitted()

    return (
      <GridContainer rows={'13% 6% 1fr'} gap={true} center={true}>
        <PageHeader>
          <h1>Alla jobb på ett ställe</h1>
        </PageHeader>

        <p>
          <BoldText>294 293</BoldText> jobb från <BoldText>1009</BoldText>{' '}
          jobbsajter
        </p>

        <CustomForm onSubmit={this.handleSubmit}>
          <Form.Field required={true}>
            <Input
              name="term"
              value={this.state.term}
              onChange={this.handleChange}
              size="big"
              icon="search"
              iconPosition="left"
              placeholder="Skriv sökord"
              required
            />
          </Form.Field>

          <Form.Field required={true}>
            <Dropdown
              name="location"
              value={this.state.location}
              onChange={this.handleChange}
              placeholder="Skriv sökord"
              search
              selection
              options={countiesAndMunicipalities}
            />
          </Form.Field>

          <CustomCheckbox
            onChange={this.getCurrentPosition}
            label="Använd min nuvarande position"
          />

          <CustomButton type="submit" disabled={!isEnabled}>
            Sök
          </CustomButton>
        </CustomForm>
      </GridContainer>
    )
  }
}

function mapStateToProps(state) {
  return {
    term: state.term,
    location: state.location
  }
}

export default connect(
  mapStateToProps,
  { searchAds }
)(SearchPage)

const CustomForm = styled(Form)`
  &&& {
    display: flex;
    flex-direction: column;
    height: 430px;
    width: 88%;
    padding: 3rem 2rem;
    background: ${props => props.theme.primary};
    box-shadow: 0 0.3rem 0.5rem rgba(0, 0, 0, 0.5);
    border-radius: 5px;

    &&& * {
      font-size: 16px;
      /* font-family: 'Open Sans', sans-serif; */
    }

    &&& > div {
      margin-top: 1rem;
    }

    @media only screen and (min-width: 500px) {
      max-width: 50%;
    }
  }
`

const CustomButton = styled(Button)`
  &&& {
    align-self: center;
    margin-top: 10rem;
    font-family: 'Open Sans', sans-serif;
    font-size: 2rem;
    font-weight: 500;
    text-align: center;
    padding: 1.4rem 9rem;
    color: black;
    background: ${props => props.theme.secondary};
    box-shadow: 0 0.3rem 0.5rem rgba(0, 0, 0, 0.2);
    border-radius: 10rem;

    &:hover {
      box-shadow: 0 0.3rem 0.5rem rgba(0, 0, 0, 0.5);
    }

    &:active,
    &:focus {
      box-shadow: 0 0.15rem 0.25rem rgba(0, 0, 0, 0.5);
    }

    &&&:disabled {
      color: ${props => props.theme.lightGrey};
      background: ${props => props.theme.brightestSecondary};
      box-shadow: 0 0.3rem 0.5rem rgba(0, 0, 0, 0.2) !important;
      opacity: 1 !important;
    }
  }
`

const CustomCheckbox = styled(Checkbox)`
  &&& {
    & label {
      padding-left: 0;
    }

    & label:before {
      left: auto;
      right: 0;
      height: 30px;
      width: 30px;
    }

    & label:after {
      left: auto;
      right: 13px;
      top: 6px;
      font-size: 30px;
    }

    &.ui.checkbox input:checked ~ label:after {
      color: ${props => props.theme.secondary};
    }
  }
`
