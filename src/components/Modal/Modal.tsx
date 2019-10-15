import classNames from "classnames"
import React from "react"
import { createPortal } from "react-dom"
import Scrolllock from "react-scrolllock"

import styles from "./Modal.module.scss"

interface ModalProps {
  alignCenter?: boolean
}

class Modal extends React.Component<ModalProps> {
  private readonly element: HTMLDivElement
  private readonly modalRoot = document.getElementById("modal-root")

  constructor(props: ModalProps) {
    super(props)
    // We create an element div for this modal
    this.element = document.createElement("div")
  }

  componentDidMount() {
    if (this.modalRoot) {
      this.modalRoot.appendChild(this.element)
    }
  }

  componentWillUnmount() {
    if (this.modalRoot) {
      this.modalRoot.removeChild(this.element)
    }
  }

  render() {

    const { alignCenter = false } = this.props

    return createPortal(
      <Scrolllock>
        <div className={classNames(styles.modal, {[styles.centerContent]: alignCenter})}>{this.props.children}</div>
      </Scrolllock>,
      this.element
    )
  }
}

export default Modal
