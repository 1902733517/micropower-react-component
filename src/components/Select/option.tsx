import Search from 'antd/lib/input/Search';
import React, { ChangeEvent, FC, forwardRef, LiHTMLAttributes, useContext, useEffect } from 'react'
import {SelectContext} from './select'
export interface OptionProps extends LiHTMLAttributes<HTMLLIElement> {
    value: string | number,
}

export const Option = forwardRef<HTMLLIElement, OptionProps>((props, ref) => {
    const {
        value,
        children,
    } = props;
    const context = useContext(SelectContext)
    const clickEvent =  (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
        if(context.onClick) {
            context.onClick(value, {value,  children})
        }
    }
    return (
        (children && typeof(children) == 'string') ? (children.indexOf(context.search)>-1 ? <li className="wg-select-dropdown-item" onClick={clickEvent}><span>{children}</span></li>  : <></>) : <></>
    )
})

export default Option