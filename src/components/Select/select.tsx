import React, { ChangeEvent, FC , ReactNode, useEffect, useRef, useState} from 'react';
import  ReactDOM from 'react-dom'
import Input from '../Input';
import classNames from 'classnames'
import { createPopper } from '@popperjs/core';
import Icon from '../Icon';

export type DataSourceType<T = {}> = T;

export interface AutoCompleteProps {
    showSeach?: boolean,
    mode?: boolean,
    maxLength?: number,
    disabled?: boolean,
    clear?: boolean,
    onSelect?: (val: Object) => void
    onSearch?: (val: string)=> DataSourceType[]
    dropdownRender?:  (menus: React.ReactNode) => React.ReactNode;
} 

const AutoComplete:FC<AutoCompleteProps> = (props) => {
    const options = useRef(
        [
            {id: 1001, name: '啦啦啦'},
            {id: 1002, name: '哈哈哈'},
            {id: 1003, name: '嘻嘻嘻'},
            {id: 1004, name: '滋滋滋'},
        ]
    )
    const [copyOption, setCopyOption] = useState<Array<any>>([]);
    useEffect(()=>{
        document.querySelector('body')?.addEventListener('click', function (e){
            if(downRef.current) {
                downRef.current.style.display = 'none';
            }
        })
        setCopyOption(options.current)
    }, [])
    const {
        showSeach,
        mode,
        maxLength,
        disabled,
        clear,
        onSelect,
        onSearch,
        dropdownRender
    } = props;

    const click = useRef(false);
    const createdDom = useRef(false); //是否创建过下拉框
    const inputRef = useRef<null | HTMLInputElement>(null);   
    const downRef = useRef<null | HTMLDivElement>(null);  //下拉框绑定ref
    const [isSelect, setIsSelect]  = useState(false);
    const classes = classNames("wg-select", {
        "is-disabled": disabled,
        "wg-select-show-search": showSeach
    });
    const [value, setValue] = useState('')
    const dropdown = () => {
        return (
            !click.current ? <></> :
            <ul className="wg-select-dropdown-list">
                {options.current.length > 0 ? options.current.map(item => {
                    return (
                        <li key={item.id} className="wg-select-dropdown-item" onClick={()=>{getClickItem(item)}}><span>{item.name}</span></li>
                    )
                }) : <li className="wg-select-dropdown-item no-data"><span>暂无数据</span></li>}
            </ul>
        )   
        
    } 
    const getClickItem = (item:any) => {
        if(downRef.current) {
            downRef.current.style.display = 'none';
        }
        setValue(item.name);
        setIsSelect(true);
        if(onSelect) {
            onSelect(item);
        }
    }
    const clickEvent = (e:  React.MouseEvent<HTMLInputElement, MouseEvent>) => {
        triggerDown();
        e.stopPropagation();
    }
    const[timer, setTime] = useState<any>("");
    const inputChange = (e: ChangeEvent<HTMLInputElement>) =>{
        //定时器，防抖
        setValue(e.target.value);
        setIsSelect(false);
        if(timer!==''){
          clearTimeout(timer)
          setTime('')
        }
        let a = setTimeout(()=>{
            changeEvent(e);
           setTime("")
        },300)
        setTime(a)
      }
    const triggerDown = ()=> {
        click.current = true;
        if(!createdDom.current) {
            let divDom = document.createElement("div")
            let down = <div className="wg-select-dropdown" ref={ downRef } style={{width: inputRef.current ? inputRef.current.offsetWidth +"px" : 'auto'}}>
               <div>{ dropdown() }</div> 
            </div>
            ReactDOM.render(down, divDom);
            document.body.appendChild(divDom);
            createdDom.current = true;
        } else {
            if(downRef.current) {
                downRef.current.style.display = '';
            }
        }
        
        setTimeout(()=>{
            const a = inputRef.current as Element;
            const b = downRef.current as HTMLElement;
            createPopper(a, b, {
                placement: "bottom-start",
                modifiers: [
                    {
                        name: 'offset',
                        options: {
                          offset: [0, 10],
                        },
                    },
                ]
            });
        }, 200)
    }
    const changeEvent = (e: ChangeEvent<HTMLInputElement>) => {
        options.current = copyOption.filter(item => item.name.indexOf(e.target.value) > -1);
        downRef.current?.childNodes[0].remove();
        createdDom.current = false;
        let divDom = document.createElement("div")
            let down = dropdown() 
            ReactDOM.render(down, divDom);
        downRef.current?.appendChild(divDom)
        e.stopPropagation();
    }
    return(
        <div>
            <div className={classes}>
                <Input
                    ref={inputRef}
                    disabled = {disabled}
                    readOnly = {!showSeach}
                    value={value}
                    onInput = {inputChange}
                    prefix={<Icon icon="angle-down"/>}
                    onClick={clickEvent}
                    onBlur={(e) => {if(isSelect === false){setValue(''); e.target.value = ""; inputChange(e); }}}
                />
            </div>
        </div>
        
    )
}


export default AutoComplete
