import React from "react"
import classnames from "classnames"

import styles from "./CloseButton.module.scss"

interface InnerProps {
  onClick: () => void
  containerClassName: string
  armClassName: string
}

export const CloseButton = (props: InnerProps) => {
  const { onClick, containerClassName, armClassName } = props

  return (
    <div
      className={classnames(styles.closeContainer, containerClassName)}
      onClick={onClick}
    >
      <div className={classnames(styles.leftRight, armClassName)} />
      <div className={classnames(styles.rightLeft, armClassName)} />
    </div>
  )
}
