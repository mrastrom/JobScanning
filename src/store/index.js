import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from '../reducers'

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore)

export let store = createStoreWithMiddleware(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

/* IMPORTANT NOTE!
The commented code is a setup of the store which utilites redux-persist.
Redux-persist isn't needed at the current version but possible in the future.  */

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
