import * as React from "react"
import { connect } from "react-redux"
import { UserSelector } from "../../store/user/userRedux"
import { Redirect } from "react-router-dom"
import Sidebar from "../Sidebar/Sidebar"
import Header from "../Header/Header"
import { ApplicationState } from "../../store/redux"
import { IRoutes } from "../../routes/routes"

interface InnerProps {
  component: React.ReactNode
  route: IRoutes
  renderProps: any
  withoutSidebar: boolean
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
      <div className="wrapper">
        <Sidebar />
        <div className="main-panel" ref="mainPanel">
          <Header title={route.title} />
          <div className={"content"}>{children}</div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state: ApplicationState) => ({
  loggedIn: UserSelector.loggedIn(state),
})

const mapDispatchToProps = {}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Layout)
