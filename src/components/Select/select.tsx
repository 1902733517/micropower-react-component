import React, { ChangeEvent, FC , ReactNode, useRef, useState} from 'react';
import  ReactDOM from 'react-dom'
import Input from '../Input';
import classNames from 'classnames'
import { createPopper } from '@popperjs/core';

export type DataSourceType<T = {}> = T;

export interface AutoCompleteProps {
    showSeach?: boolean,
    mode?: boolean,
    maxLength?: number,
    disabled?: boolean,
    clear?: boolean,
    onSearch?: (val: string)=> DataSourceType[]
    dropdownRender?:  (menus: React.ReactNode) => React.ReactNode;
}

const AutoComplete:FC<AutoCompleteProps> = (props) => {
    const {
        showSeach,
        mode,
        maxLength,
        disabled,
        clear,
        onSearch,
        dropdownRender
    } = props;
    const classes = classNames("wg-select", {
        "is-disabled": disabled,
        "wg-select-show-search": showSeach
    });
    const options = [
        {id: 1001, name: '啦啦啦'},
        {id: 1002, name: '哈哈哈'},
        {id: 1003, name: '嘻嘻嘻'},
        {id: 1004, name: '滋滋滋'},
    ];
    const click = useRef(false)
    const dropdown = () => {
        console.log(click.current)
        return (
            !click.current ? <></> :
            <ul className="wg-select-dropdown-list">
                {options.map(item => {
                    return (
                        <li key={item.id} className="wg-select-dropdown-item"><span>{item.name}</span></li>
                    )
                })}
            </ul>
        )   
        
    }         
    const clickEvent = (e:  React.MouseEvent<HTMLInputElement, MouseEvent>) => {
        click.current = true;
        if(document.querySelector('.wg-select-dropdown')) {
            let aa =  document.querySelector('.wg-select-dropdown') as HTMLElement;
            aa.style.display = '';
            return;
        }
        let div = document.createElement('div');
        div.className='wg-select-dropdown'
        // div.style.width = e.target.offsetWidth +"px"
        ReactDOM.render(dropdown(), div);
        document.body.appendChild(div);
        setTimeout(()=>{
            const a = document.querySelector('.wg-select') as Element;
            const b = document.querySelector('.wg-select-dropdown') as HTMLElement;
            createPopper(a, b, {
                placement: "bottom-start",
            });
        })
        
    }
    const blurEvent = () => {
        click.current = false; 
        if(document.querySelector('.wg-select-dropdown')) {
            let aa =  document.querySelector('.wg-select-dropdown') as HTMLElement; 
            aa.style.display = 'none';
        }
    }
    const aa = useRef<HTMLInputElement>(null);
    return(
        <div>
            <div className={classes}>
                <Input
                    disabled = {disabled}
                    readOnly = {!showSeach}
                    onClick={clickEvent}
                    onBlur={blurEvent}
                />
            </div>
        </div>
        
    )
}


export default AutoComplete
