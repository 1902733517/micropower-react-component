import React, { FC } from 'react'

export interface OptionProps  {
   
}

export const Option:FC<OptionProps> = (props) => {
    const {
        children,
    } = props
    return (
        <li className="wg-select-dropdown-item" onClick={()=>{}}><span>{children}</span></li>
    )
}
export default Option
