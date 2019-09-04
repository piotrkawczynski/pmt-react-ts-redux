import React, { Component } from "react"
import { connect } from "react-redux"

import { projectListActions } from "../../store/project/projectActions"
import { ApplicationState } from "../../store/redux"
import { PromiseState } from "../../utilities/ReduxFunctions"
import { Project } from "../../types/project"
import ProjectList from "./ProjectList/ProjectList"

interface PropsFromDispatch {
  projectListRequest: typeof projectListActions.projectListRequest
}

interface PropsFromState {
  projectList: PromiseState<Project[], string>
}

type HomePageProps = PropsFromDispatch & PropsFromState

class HomePage extends Component<HomePageProps> {
  componentDidMount() {
    this.props.projectListRequest()
  }

  render() {
    const {
      projectList: { status, data: projectListData },
    } = this.props

    if (status === "init" || status === "loading") {
      return <p>LOADING!!!!!</p>
    }

    return <ProjectList data={projectListData || []} />
  }
}

const mapStateToProps = (state: ApplicationState) => ({
  projectList: state.project.projectList,
})

const mapDispatchToProps = {
  projectListRequest: projectListActions.projectListRequest,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomePage)
