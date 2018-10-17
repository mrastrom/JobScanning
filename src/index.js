import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { store } from './store/index'

import { BrowserRouter as Router, Route } from 'react-router-dom'
import 'semantic-ui-css/semantic.min.css'
import './styles/index.css'
import App from './App'
import registerServiceWorker from './registerServiceWorker'

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Route path="/" component={App} />
    </Router>
  </Provider>,
  document.getElementById('root')
)
registerServiceWorker()

/* In case redux-persist will be needed for more functionality */

// import { PersistGate } from 'redux-persist/integration/react'
// import { store, persistor } from './store/index'

// ReactDOM.render(
//   <Provider store={store}>
//     <PersistGate loading={null} persistor={persistor}>
//       <Router>
//         <Route path="/" component={App} />
//       </Router>
//     </PersistGate>
//   </Provider>,
//   document.getElementById('root')
// )
// registerServiceWorker()
