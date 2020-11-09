import React, { FC, ReactNode, InputHTMLAttributes, useState, useRef, ClassAttributes } from 'react';
import classNames  from 'classnames';
type size = 'lg' | "md" | 'sm'

export interface InputProps extends  Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'suffix' | 'prefix' >{
    clearable?: boolean,
    size?: size,
    suffix?: ReactNode,
    prefix?: ReactNode
}


export const Input:FC<InputProps>  = (props) => {
    const {
        clearable,
        size,
        suffix,
        prefix,
        disabled,
        onFocus,
        onBlur,
        ...restProps
    } = props

    const [focus, setFocus] = useState(false);
    const classes = classNames('wg-input', {
        [`wg-input-${size}`] : true,
        'wg-input-affix-wrapper': suffix!==undefined || prefix!==undefined,
        "wg-input-suffix-focus": focus,
        "is-disabled": disabled
    })
    let inputRef:HTMLInputElement;
    const saveInput = (input:HTMLInputElement) => {
        inputRef = input;
    }
    return (
        <div className={classes}>
            { suffix && <span className="wg-input-suffix"> {suffix}</span> }
            <input
                className="wg-input-inner"
                disabled = {disabled}
                {...restProps}
                onFocus={(e)=>{setFocus(true); if(onFocus) {onFocus(e)}}}
                onBlur={(e)=>{setFocus(false); if(onBlur){onBlur(e)}}}
                ref={saveInput}
            />
            { prefix && <span className="wg-input-prefix">{prefix}</span> }
        </div>
        
    )
}

Input.defaultProps = {
    size: "md"
}
export default Input