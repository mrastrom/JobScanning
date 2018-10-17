// import { createStore, applyMiddleware } from 'redux'
// import thunk from 'redux-thunk'
// import rootReducer from '../reducers'
// import { persistStore, persistReducer } from 'redux-persist'
// import storage from 'redux-persist/lib/storage'

// const persistConfig = {
//   key: 'root',
//   storage: storage
// }

// const middlewares = [thunk]

// const persistedReducer = persistReducer(persistConfig, rootReducer)

// export let store = createStore(
//   persistedReducer,
//   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
//   applyMiddleware(...middlewares)
// )

// export let persistor = persistStore(store)

import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from '../reducers'

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore)

export let store = createStoreWithMiddleware(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)
