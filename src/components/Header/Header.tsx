import { faUserCircle } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React, { Component } from "react"
import { connect } from "react-redux"
import { NavLink } from "react-router-dom"
import {
  Collapse,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Nav,
  Navbar,
  NavbarToggler,
  UncontrolledDropdown,
} from "reactstrap"

import { logoutUser } from "../../store/user/userActions"
import history from "../../utilities/history"

import styles from "./Header.module.scss"

interface InnerProps {
  title?: string
}
interface PropsFromDispatch {
  logoutUser: typeof logoutUser
}

type HeaderProps = InnerProps & PropsFromDispatch

interface HeaderState {
  isOpen: boolean
}

class Header extends Component<HeaderProps, HeaderState> {
  constructor(props: HeaderProps) {
    super(props)
    this.state = {
      isOpen: false,
    }
  }

  toggle = () => {
    this.setState((prevState) => ({ isOpen: !prevState.isOpen }))
  }

  redirectProfile = () => {
    history.push("/profile")
  }

  onSignOut = () => {
    this.props.logoutUser()

    history.push("/login")
  }

  render() {
    const { title } = this.props

    return (
      <Navbar className={styles.navbar} expand="md">
        {title && (
          <NavLink className={"link"} to="/">
            {title}
          </NavLink>
        )}
        <NavbarToggler onClick={this.toggle} />
        <Collapse isOpen={this.state.isOpen} navbar>
          <Nav className="ml-auto nav" navbar>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle className={"dropdown__toggle"} nav>
                <FontAwesomeIcon
                  icon={faUserCircle}
                  className={"login__icon"}
                  size={"2x"}
                />
              </DropdownToggle>
              <DropdownMenu right className={"dropdown-menu"}>
                <DropdownItem onClick={this.redirectProfile}>
                  Profile
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem onClick={this.onSignOut}>Sign out</DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
        </Collapse>
      </Navbar>
    )
  }
}

const mapDispatchToProps = {
  logoutUser,
}

export default connect(
  null,
  mapDispatchToProps
)(Header)
