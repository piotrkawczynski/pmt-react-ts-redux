import { applyMiddleware, createStore, Reducer } from "redux"
import { composeWithDevTools } from "redux-devtools-extension"
import { persistReducer } from "redux-persist"
import storage from "redux-persist/lib/storage"
import createSagaMiddleware from "redux-saga"

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
    key: "24",
    storage,
    whitelist: ["user", "components"],
  }

  const store = createStore(
    persistReducer(persistConfig, rootReducer),
    composeWithDevTools(...enhancers)
  )

  // kick off root saga
  sagaMiddleware.run(rootSaga)

  return store
}
