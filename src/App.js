import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import styled, { ThemeProvider } from 'styled-components'
import theme from './styles/theme'
import HomePage from './components/pages/HomePage'
import SearchPage from './components/pages/SearchPage'
import AdDetails from './components/pages/AdDetails'
import AdsPage from './components/pages/AdsPage'
require('dotenv').config()

class App extends Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <AppContainer>
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route path="/ads/:id" component={AdDetails} />
            <Route path="/ads" component={AdsPage} />
            <Route path="/search" component={SearchPage} />
          </Switch>
        </AppContainer>
      </ThemeProvider>
    )
  }
}

export default App

const AppContainer = styled.div`
  height: 100vh;
  position: relative;
`
