import * as React from "react"
import { connect } from "react-redux"
import { Redirect } from "react-router-dom"

import { Route } from "../../routes/routes"
import { ApplicationState } from "../../store/redux"
import { userSelector } from "../../store/user/userRedux"
import Header from "../Header/Header"
import Sidebar from "../Sidebar/Sidebar"

import styles from "./Layout.module.scss"

interface InnerProps {
  component: React.ReactNode
  route: Route
  renderProps: any
  withoutSidebar?: boolean
}

interface PropsFromState {
  token: string | null
}

type LayoutProps = InnerProps & PropsFromState

class Layout extends React.Component<LayoutProps> {
  render() {
    const { token } = this.props

    if (!token) {
      return <Redirect to="/login" />
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
  token: userSelector.token(state),
})

const mapDispatchToProps = {}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Layout)
