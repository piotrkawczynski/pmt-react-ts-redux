import React from "react"
import { IRoutes } from "../../routes/routes"
import signBackground from "../../assets/signBackground.jpeg"

import styles from "./LayoutWithoutSidebar.module.scss"

interface InnerProps {
  route: IRoutes
}

class LayoutWithoutSidebar extends React.Component<InnerProps> {
  render() {
    const {
      route,
      route: { component },
    } = this.props

    const Tag = component

    return (
      <div className={styles.wrapper}>
        {signBackground && (
          <img
            className={styles.backgroundImage}
            src={signBackground}
            style={{

            }}
          />
        )}
        <Tag route={route} />
      </div>
    )
  }
}

export default LayoutWithoutSidebar
