import React from "react"
import { createPortal } from "react-dom"
import Scrolllock from "react-scrolllock"

import styles from "./Modal.module.scss"

interface ModalProps {}

class Modal extends React.Component<ModalProps> {
  private readonly element: HTMLDivElement
  private readonly modalRoot = document.getElementById("modal-root")

  constructor(props: ModalProps) {
    super(props)
    // We create an element div for this modal
    this.element = document.createElement("div")
  }
  // We append the created div to the div#modal
  componentDidMount() {
    if (this.modalRoot) {
      this.modalRoot.appendChild(this.element)
    }
  }
  /**
   * We remove the created div when this Modal Component is unmounted
   * Used to clean up the memory to avoid memory leak
   */
  componentWillUnmount() {
    if (this.modalRoot) {
      this.modalRoot.removeChild(this.element)
    }
  }
  render() {
    return createPortal(
      <Scrolllock>
        <div className={styles.modal}>{this.props.children}</div>
      </Scrolllock>,
      this.element
    )
  }
}

export default Modal
