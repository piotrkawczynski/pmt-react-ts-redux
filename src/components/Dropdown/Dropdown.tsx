import classnames from "classnames"
import React, { Component } from "react"
import Select from "react-select"

import styles from "./Dropdown.module.scss"
import { ValueType } from "react-select/src/types"
import { StylesConfig } from "react-select/src/styles"

export interface Option {
  value: string
  label: string
}

interface DropdownProps {
  options: Option[]
  label?: string
  placeholder?: string
  onSelect: (option: Option) => void
  name?: string
  defaultValue?: Option | null
  isDisabled?: boolean
  isClearable?: boolean
  hideSelectedOptions?: boolean
  customStyles?: StylesConfig
  value?: Option | null
  containerClassName?: string
}

class Dropdown extends Component<DropdownProps> {
  handleChange = (option: ValueType<Option>) => {
    this.props.onSelect(option as Option)
  }

  render() {
    const {
      label,
      placeholder,
      options,
      name,
      defaultValue,
      isDisabled,
      hideSelectedOptions = false,
      value,
      containerClassName,
    } = this.props

    return (
      <div className={classnames(styles.dropdownWrapper, containerClassName)}>
        {label && <div className={styles.label}>{label}</div>}
        <Select
          menuPortalTarget={document.body}
          isSearchable={false} // TODO: prop
          options={options}
          classNamePrefix="react-select"
          placeholder={placeholder}
          onChange={this.handleChange}
          hideSelectedOptions={hideSelectedOptions}
          name={name}
          defaultValue={defaultValue}
          isDisabled={isDisabled}
          styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }),   }}
          value={value}
        />
      </div>
    )
  }
}

export default Dropdown
