import React, { ChangeEvent, createContext, FC , ReactNode, useEffect, useRef, useState, FocusEvent} from 'react';
import  ReactDOM from 'react-dom'
import Input from '../Input';
import classNames from 'classnames'
import { createPopper, Obj } from '@popperjs/core';
import Icon from '../Icon';
import { OptionProps } from './option';
export type DataSourceType<T = {}> = T;

export interface SelectProps {
    showSearch?: boolean,
    mode?: boolean,
    maxLength?: number,
    disabled?: boolean,
    clear?: boolean,
    onSelect?: (val: string | number, option: Object) => void
    onSearch?: (val: string)=> DataSourceType[]
    dropdownRender?:  (menus: React.ReactNode) => React.ReactNode
    style?: React.CSSProperties
    placeholder?: string
} 

interface ISelectContext {
    search: string | number,
    isSelected: string | number,
    onClick?: (value: string | number, option: OptionProps) => void
}

export const SelectContext = createContext<ISelectContext>({search:'', isSelected: ''})

const Select:FC<SelectProps> = (props) => {
    const [value, setValue] = useState<string|number>("");
    const valueRef = useRef<string | number>("");
    useEffect(()=>{
        let clickIndex = document.querySelector('body')?.addEventListener('click', function (e){
            if(downRef.current) {
                downRef.current.style.display = 'none';
            }
        })
        
        return () => {
            if(clickIndex) {
                document.removeEventListener("click", clickIndex)
            }
        }
    }, [])
    const {
        showSearch,
        mode,
        maxLength,
        disabled,
        clear,
        onSelect,
        onSearch,
        dropdownRender,
        children,
        style,
        placeholder
    } = props;

    const click = useRef(false);
    const createdDom = useRef(false); //是否创建过下拉框
    const inputRef = useRef<null | HTMLInputElement>(null);   
    const downRef = useRef<null | HTMLDivElement>(null);  //下拉框绑定ref
    const isSelect = useRef(false);
    const [selectVal, setSelectVal] = useState<string| number>('');
    const [selectChild, setSelectChild] = useState<string>('')
    const classes = classNames("wg-select", {
        "is-disabled": disabled,
        "wg-select-show-search": showSearch
    });
    const clickEvent2 = (val: string|number, option: OptionProps) => {
        setSelectVal(val);
        setSelectChild(option.children as string);
        valueRef.current = typeof(option.children) == 'string' ? option.children : "";
        setValue(valueRef.current);
        isSelect.current = true;
        if(onSelect) {
            onSelect(val, option);
        }
    }
    const passContex:ISelectContext = {
        search: valueRef.current,
        onClick: clickEvent2,
        isSelected: selectVal,
    }    
    const clickEvent = (e:  React.MouseEvent<HTMLInputElement, MouseEvent>) => {
        if(selectChild) {
            setValue('');
            valueRef.current = '';
            passContex.search = '';
        }
        triggerDown();
        e.stopPropagation();
    }
    const[timer, setTime] = useState<any>("");
    const inputChange = (e: ChangeEvent<HTMLInputElement>) =>{
        //定时器，防抖
        setValue(e.target.value);
        valueRef.current = e.target.value;
        isSelect.current = false;
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
    const changeEvent = (e: ChangeEvent<HTMLInputElement>) => {
        // options.current = copyOption.filter(item => item.name.indexOf(e.target.value) > -1);
        // downRef.current?.childNodes[0].remove();
        // createdDom.current = false;
        // let divDom = document.createElement("div")
        //     let down = dropdown() 
        //     ReactDOM.render(down, divDom);
        // downRef.current?.appendChild(divDom)
        // createdDom.current = true;
        if(downRef.current) {
            passContex.search = valueRef.current
            downRef.current.childNodes[0].remove();
            let b = 
            <SelectContext.Provider value={passContex}>
                { dropdown() }
            </SelectContext.Provider>
            let divDom = document.createElement("div")
            ReactDOM.render(b, divDom);
            downRef.current.appendChild(divDom);
        }
        e.stopPropagation();
    }
    const dropdown = () => {
        return (
            !click.current ? <></> :
            <ul className="wg-select-dropdown-list" >
                { children ? children : <li className="wg-select-dropdown-item no-data"><span>暂无数据</span></li>}
                {/* {options.current.length > 0 ? options.current.map(item => {
                    return (
                        <li key={item.id} className="wg-select-dropdown-item" onClick={()=>{getClickItem(item)}}><span>{item.name}</span></li>
                    )
                }) : <li className="wg-select-dropdown-item no-data"><span>暂无数据</span></li>} */}
            </ul>
        )   
    } 
    const triggerDown = ()=> {
        click.current = true;
        if(!createdDom.current) {
            let divDom = document.createElement("div");
            let down = <div className="wg-select-dropdown" ref={ downRef } style={{width: inputRef.current ? inputRef.current.offsetWidth +"px" : 'auto'}}>
               <div>
                   <SelectContext.Provider value={passContex}>
                        { dropdown() }
                   </SelectContext.Provider>
                </div> 
            </div>
            ReactDOM.render(down, divDom);
            document.body.appendChild(divDom);
            createdDom.current = true;
        } else {
            if(downRef.current) {
                downRef.current.childNodes[0].remove();
                let b = 
                <SelectContext.Provider value={passContex}>
                    { dropdown() }
                </SelectContext.Provider>
                let divDom = document.createElement("div")
                ReactDOM.render(b, divDom);
                downRef.current.appendChild(divDom)
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
        }, 0)
    }
    const blurEvent = (e: FocusEvent<HTMLInputElement>) => {
        setTimeout(()=>{
            if(downRef.current) {
                downRef.current.style.display = 'none';
            }
            if(!isSelect.current) {
                setValue('');
                valueRef.current = '';
            }
            if(selectChild && valueRef.current == "") {
                setValue(selectChild)
                valueRef.current = selectVal;
            }
        }, 100)
    }
    return(
        <div>
            <div className={classes}>
                <Input
                    ref={inputRef}
                    disabled = {disabled}
                    readOnly = {!showSearch}
                    value={value}
                    placeholder={selectChild || placeholder}
                    onInput = {inputChange}
                    prefix={<Icon icon="angle-down"/>}
                    onClick={clickEvent}
                    onBlur={blurEvent}
                    style={style}
                />
            </div>
        </div>
    )
}


export default Select
