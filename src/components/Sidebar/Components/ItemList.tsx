import { NavLink } from "react-router-dom"
import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

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
          <FontAwesomeIcon icon={item.icon} className={styles.icon} />
          <div className={styles.title}>{item.name}</div>
        </NavLink>
      ))}
    </>
  )
}

export default ItemList
