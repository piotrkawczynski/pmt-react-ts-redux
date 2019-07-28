import { NavLink } from "react-router-dom"
import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { SidebarItem } from "../Sidebar"

interface ItemListProps {
  data: SidebarItem[]
}

const ItemList: React.FC<ItemListProps> = ({ data }) => {
  return (
    <>
      {data.map((item) => (
        <NavLink key={item.route} className="navlink" to={item.route}>
          <FontAwesomeIcon icon={item.icon} className={"icon"} />
          <div className={"title"}>{item.name}</div>
        </NavLink>
      ))}
    </>
  )
}

export default ItemList
