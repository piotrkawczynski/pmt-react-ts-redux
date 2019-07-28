import React, { Component } from "react"
import { Provider } from "react-redux"
import { Router, Route, Switch } from "react-router-dom"
import { persistStore } from "redux-persist"
import history from "./utilities/history"
import NotFound from "./components/NotFound/NotFound"
import configureStore from "./store/configureStore"
import rootReducer from "./store/redux"
import rootSaga from "./store/sagas"
import { updateApiHeader } from "./store/user/userActions"
import { Store } from "redux"
import { PersistorOptions } from "redux-persist/es/types"
import { authRoutes, withoutSidebarRoutes } from "./routes/routes"
import Layout from "./components/Layout/Layout"
import LayoutWithoutSidebar from "./components/LayoutWithoutSidebar/LayoutWithoutSidebar"

interface AppState {
  rehydrated: boolean
}
interface AppProps {}

class App extends Component<AppProps, AppState> {
  private readonly store: Store
  constructor(props: AppProps) {
    super(props)
    this.state = {
      rehydrated: false,
    }
    this.store = configureStore(rootReducer, rootSaga)
  }

  componentDidMount() {
    persistStore(this.store, { timeout: 10000 } as PersistorOptions, () => {
      this.store.dispatch(updateApiHeader())
      this.setState({ rehydrated: true })
    })
  }
  render() {
    const { rehydrated } = this.state

    if (!rehydrated) {
      return null
    }

    return (
      <Provider store={this.store}>
        <Router history={history}>
          <>
            <Switch>
              {authRoutes.map((route, index) => (
                <Route
                  key={route.path}
                  path={route.path}
                  render={() => <LayoutWithoutSidebar route={route} />}
                />
              ))}
              {/*{Routes.map((route, index) => (*/}
              {/*  <Route*/}
              {/*    key={route.path}*/}
              {/*    path={route.path}*/}
              {/*    exact={route.exact}*/}
              {/*    render={(props) => (*/}
              {/*      <Layout*/}
              {/*        component={route.component}*/}
              {/*        route={route}*/}
              {/*        renderProps={props}*/}
              {/*      />*/}
              {/*    )}*/}
              {/*  />*/}
              {/*))}*/}
              <Route path="*" component={NotFound} />
            </Switch>
            {withoutSidebarRoutes.map((route, index) => (
              <Route
                key={route.path}
                path={route.path}
                exact={route.exact}
                render={(props) => (
                  <Layout
                    component={route.component}
                    route={route}
                    withoutSidebar={true}
                    renderProps={props}
                  >
                    <route.component route={route} router={props} />
                  </Layout>
                )}
              />
            ))}
          </>
        </Router>
      </Provider>
    )
  }
}

export default App
