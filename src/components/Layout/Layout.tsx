import * as React from "react"
import { connect } from "react-redux"
import { Redirect } from "react-router-dom"

import Sidebar from "../Sidebar/Sidebar"
import Header from "../Header/Header"
import { ApplicationState } from "../../store/redux"
import { Route } from "../../routes/routes"
import { userSelector } from "../../store/user/userRedux"

import styles from "./Layout.module.scss"

interface InnerProps {
  component: React.ReactNode
  route: Route
  renderProps: any
  withoutSidebar?: boolean
}

interface PropsFromState {
  loggedIn: boolean
}

type LayoutProps = InnerProps & PropsFromState

class Layout extends React.Component<LayoutProps> {
  render() {
    const { loggedIn } = this.props

    if (!loggedIn) {
      return <Redirect to="/sign-in" />
    }

    const { children, route, withoutSidebar } = this.props

    if (withoutSidebar) {
      return { children }
    }

    return (
      <div className={styles.wrapper}>
        <Sidebar />
        <div className={styles.mainPanel} ref="mainPanel">
          <Header title={route.title} />
          <div className={styles.content}>{children}</div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state: ApplicationState) => ({
  loggedIn: userSelector.loggedIn(state),
})

const mapDispatchToProps = {}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Layout)
