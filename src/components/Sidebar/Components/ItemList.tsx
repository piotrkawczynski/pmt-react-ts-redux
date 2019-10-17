import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React from "react"
import { NavLink } from "react-router-dom"

import { SidebarItem } from "../Sidebar"

import styles from "./ItemList.module.scss"

interface ItemListProps {
  data: SidebarItem[]
}

const ItemList: React.FC<ItemListProps> = ({ data }) => {
  return (
    <>
      {data.map((item) => (
        <NavLink key={item.route} className={styles.navLink} to={item.route}>
          <div className={styles.iconWrapper}>
            <FontAwesomeIcon icon={item.icon} className={styles.icon} />
          </div>
          <div className={styles.title}>{item.name}</div>
        </NavLink>
      ))}
    </>
  )
}

export default ItemList
