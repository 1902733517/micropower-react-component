import Search from 'antd/lib/input/Search';
import React, { ChangeEvent, FC, forwardRef, LiHTMLAttributes, useContext, useEffect } from 'react'
import {SelectContext} from './select'
import classNames from 'classnames'

export interface OptionProps extends LiHTMLAttributes<HTMLLIElement> {
    value: string | number,
}

export const Option = forwardRef<HTMLLIElement, OptionProps>((props, ref) => {
    const {
        value,
        children,
    } = props;
    const context = useContext(SelectContext);
    const classes = classNames("wg-select-dropdown-item", {
        "is-selected" : (context.isSelected === value)
    })
   
    const clickEvent =  (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
        if(context.onClick) {
            context.onClick(value, {value,  children})
        }
    }
    return (
        (children && typeof(children) == 'string') ? (children.indexOf(context.search as string)>-1 ? <li className={classes} onClick={clickEvent}><span>{children}</span></li>  : <></>) : <></>
    )
})

export default Option