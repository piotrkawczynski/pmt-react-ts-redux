import React, { Component } from "react"
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
import { NavLink } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUserCircle } from "@fortawesome/free-solid-svg-icons"
import history from "../../utilities/history"
import { connect } from "react-redux"
// import { signOut, updateProfile, UserSelector } from "../../store/redux/user"

interface InnerProps {
  title?: string
}
interface PropsFromState {}

type HeaderProps = InnerProps & PropsFromState

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

  redirectChangePassword = () => {
    history.push("/change_password")
  }

  onSignOut = () => {
    // const { signOut } = this.props

    // signOut()

    history.push("/sign-in")
  }

  render() {
    const { title } = this.props
    return (
      <Navbar className={"navbar"} expand="md">
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
                <DropdownItem onClick={this.redirectChangePassword}>
                  Change password
                </DropdownItem>
                <DropdownItem divider />
                {/*<DropdownItem onClick={this.onSignOut}>Sign out</DropdownItem>*/}
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
        </Collapse>
      </Navbar>
    )
  }
}

const mapDispatchToProps = {
  // signOut,
}

export default connect(
  null,
  mapDispatchToProps
)(Header)
