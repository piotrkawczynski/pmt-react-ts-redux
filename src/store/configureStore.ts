import { applyMiddleware, createStore, Reducer } from "redux"
import createSagaMiddleware from 'redux-saga'
import { composeWithDevTools } from 'redux-devtools-extension'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { ApplicationState } from "./redux"

export default (rootReducer: Reducer<ApplicationState>, rootSaga: any) => {
  /* ------------- Redux Configuration ------------- */

  const middleware = []
  const enhancers = []

  /* ------------- Saga Middleware ------------- */

  const sagaMiddleware = createSagaMiddleware()
  middleware.push(sagaMiddleware)

  /* ------------- Assemble Middleware ------------- */

  enhancers.push(applyMiddleware(...middleware))

  const persistConfig = {
    key: '22',
    storage,
    blacklist: ['project', 'issue', 'status', 'tag', 'createProject', 'component', 'form'],
  }

  const store = createStore(
    persistReducer(persistConfig, rootReducer),
    composeWithDevTools(...enhancers),
  )

  // kick off root saga
  sagaMiddleware.run(rootSaga)

  return store
}
