import React, { Component } from 'react'
import { connect } from 'react-redux'
import { searchAds } from '../../actions/index'
import styled from 'styled-components'
import { Button, Form, Input } from 'semantic-ui-react'
import { BoldText, GridContainer, PageHeader } from '../'

class SearchPage extends Component {
  state = {
    term: '',
    location: ''
  }

  componentDidMount() {
    this.setState({ term: this.props.term, location: this.props.location })
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value })
  }

  handleSubmit = async event => {
    event.preventDefault()
    this.props.searchAds(this.state.term, this.state.location)
    this.props.history.push('/ads')
  }

  canBeSubmitted = () => {
    const { term, location } = this.state
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
          <BoldText>345 672</BoldText> jobb från <BoldText>254</BoldText>{' '}
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
          <Form.Field>
            <Input
              name="location"
              value={this.state.location}
              onChange={this.handleChange}
              size="big"
              icon="map marker alternate"
              iconPosition="left"
              placeholder="Ange plats"
            />
          </Form.Field>
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
  display: flex;
  flex-direction: column;
  height: 430px;
  width: 88%;
  padding: 3rem 2rem;
  background: ${props => props.theme.primary};
  box-shadow: 0 0.3rem 0.5rem rgba(0, 0, 0, 0.5);
  border-radius: 5px;

  &&& > div {
    margin-top: 1rem;
  }

  &&& i {
    font-size: 1.8em;
    left: -10px !important;
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
