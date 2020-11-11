import React, { FC, ReactNode, InputHTMLAttributes, useState, useRef, ClassAttributes, forwardRef } from 'react';
import classNames  from 'classnames';
type size = 'lg' | "md" | 'sm'

export interface InputProps extends  Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'suffix' | 'prefix' >{
    clearable?: boolean,
    size?: size,
    suffix?: ReactNode,
    prefix?: ReactNode
}


export const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {  //forwardRef 转发 ref
    const {
        clearable,
        size,
        suffix,
        prefix,
        disabled,
        onFocus,
        onBlur,
        value,
        ...restProps
    } = props

    const [focus, setFocus] = useState(false);
    const classes = classNames('wg-input', {
        [`wg-input-${size}`] : true,
        'wg-input-affix-wrapper': suffix!==undefined || prefix!==undefined,
        "wg-input-suffix-focus": focus,
        "is-disabled": disabled
    })
    return (
        <div className={classes} ref={ref}>
            { suffix && <span className="wg-input-suffix"> {suffix}</span> }
            <input
                className="wg-input-inner"
                disabled = {disabled}
                {...restProps}
                value = { value }
                onFocus={(e)=>{setFocus(true); if(onFocus) {onFocus(e)}}}
                onBlur={(e)=>{setFocus(false); if(onBlur){onBlur(e)}}}
            />
            { prefix && <span className="wg-input-prefix">{prefix}</span> }
        </div>
    )
})

Input.defaultProps = {
    size: "md"
}
export default Input