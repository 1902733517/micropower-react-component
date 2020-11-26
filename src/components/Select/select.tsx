import React, { ChangeEvent, createContext, FC , ReactNode, useEffect, useRef, useState, FocusEvent} from 'react';
import  ReactDOM from 'react-dom'
import Input from '../Input';
import classNames from 'classnames'
import { createPopper } from '@popperjs/core';
import Icon from '../Icon';
import { OptionProps } from './option';
import useDebounce from '../../hooks/useDebounce'

export type DataSourceType<T = {}> = T;
export interface SelectProps {
    showSearch?: boolean
    mode?: boolean
    maxLength?: number
    disabled?: boolean
    clear?: boolean
    onSelect?: (val: string | number, option: Object) => void
    onSearch?: (val: string) => void
    dropdownRender?:  (menus: React.ReactNode) => React.ReactNode
    style?: React.CSSProperties
    placeholder?: string
    romote?: boolean // 远程搜索
    value?: string|number
    listHeight?: number
    romoteMethod?: () => void
} 

export const SelectContext = createContext<ISelectContext>({search:'', isSelected: ''})

interface ISelectContext {
    search: string | number,
    isSelected: string | number,
    onClick?: (value: string | number, option: OptionProps) => void,
    romote?:boolean
}

const Select:FC<SelectProps> = (props) => {
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
        placeholder,
        romote,
        value,
        listHeight,
        ...restProps
    } = props;
    const [valText, setValText] = useState<string|number>("");  //iput框上展示的文本
    const valTextRef = useRef<string | number>("");   // input框上的文本
    const createdDom = useRef(false); //是否创建过下拉框
    const inputRef = useRef<null | HTMLInputElement>(null);   
    const downRef = useRef<null | HTMLDivElement>(null);  //下拉框绑定ref
    const isSelect = useRef(false);  //是否下拉选中数据
    const [selectVal, setSelectVal] = useState<string| number>(value?value: '');  // input框值
    const [placeholderVal, setPlaceholderVal] = useState<string>('');  
    const [isFocus, setIsFocus] = useState<Boolean>(false);
    const classes = classNames("wg-select", {
        "is-disabled": disabled,
        "wg-select-show-search": showSearch
    });
    const debounceVal =  useDebounce(valText);  //防抖
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
    useEffect(()=>{  //远程搜索
        if(value!==undefined && value!==null) {
            let a  = children as Array<any>
            if(!(a instanceof Array)) {
                
            } else {
                let row = a.find((item:any) => item.props.value === value )
                if(row && typeof(row.props.children) === 'string') {
                    valTextRef.current = typeof(row.props.children) == 'string' ? row.props.children : "";
                    setValText(valTextRef.current);
                    setPlaceholderVal(valTextRef.current.toString());
                    isSelect.current = true;
                }
            }
            
        }
        triggerDown();
    }, [children])

    useEffect(()=>{  //值切换时， 下拉数据不匹配
        let a  = children as Array<any>
        if(a instanceof Array) {
            let row = a.find((item:any) => item.props.value === value)
            if(!row) {
                setValText('');
                setPlaceholderVal('');
                isSelect.current = false;
            }
        } else {
            let setValue = (value === undefined || value === null) ? "" : (value=='0' ? "" : value.toString());
            setValText(setValue);
            setPlaceholderVal(setValue);
            isSelect.current = false;
            setSelectVal('');
        }
    }, [value])
    useEffect(()=>{
        if(!romote) {
            if(downRef.current) {
                passContex.search = valTextRef.current
                downRef.current.childNodes[0].remove();
                let b = 
                <SelectContext.Provider value={passContex}>
                    { dropdown() }
                </SelectContext.Provider>
                let divDom = document.createElement("div")
                ReactDOM.render(b, divDom);
                downRef.current.appendChild(divDom);
            }
        }
        if(onSearch && isFocus && valText) {
            onSearch(debounceVal);
        }  
    }, [debounceVal])
    
    const clickEventItem = (val: string|number, option: OptionProps) => {
        isSelect.current = true;
        setSelectVal(val);
        valTextRef.current = typeof(option.children) == 'string' ? option.children : "";
        setValText(valTextRef.current);
        setPlaceholderVal(valTextRef.current);
        if(onSelect) {
            onSelect(val, option);
        }
    }

    const passContex:ISelectContext = {
        search: valTextRef.current,
        onClick: clickEventItem,
        isSelected: selectVal,
        romote:romote
    }    
    const clickEvent = (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
        if(placeholderVal) {
            setValText('');
            valTextRef.current = '';
            passContex.search = '';
        }
        triggerDown();
        e.stopPropagation();
    }
    const inputChange = (e: ChangeEvent<HTMLInputElement>) =>{
        let val= e.target.value;
        setValText(val);
        valTextRef.current = val;
        isSelect.current = false;
    }
    
    const dropdown = () => {
        return (
            !createdDom.current ? <></> :
            <ul className="wg-select-dropdown-list" >
                { children ? children : <li className="wg-select-dropdown-item no-data"><span>暂无数据</span></li>}
            </ul>
        )   
    } 
    const triggerDown = ()=> {
        if(!isFocus) {
            return;
        }
        if(romote && valTextRef.current == '' && placeholderVal == '') {
            return;
        }
        if(!createdDom.current) {
            createdDom.current = true;
            let divDom = document.createElement("div");
            let down = <div className="wg-select-dropdown" ref={ downRef } style={{width: inputRef.current ? inputRef.current.offsetWidth +"px" : 'auto', maxHeight: listHeight ? listHeight : 256 +'px'}}>
               <div>
                   <SelectContext.Provider value={passContex}>
                        { dropdown() }
                   </SelectContext.Provider>
                </div> 
            </div>
            ReactDOM.render(down, divDom);
            document.body.appendChild(divDom);
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
        setIsFocus(false);
        setTimeout(()=>{
            if(downRef.current) {
                downRef.current.style.display = 'none';
            }
            if(!isSelect.current) {
                setValText('');
                valTextRef.current = '';
            }
            if(isSelect && placeholderVal && valTextRef.current == "") {
                setValText(placeholderVal)
                valTextRef.current = selectVal;
            }
        }, 100)
    }
    const focusEvent = (e: FocusEvent<HTMLInputElement>) => {
        setIsFocus(true)
    }
    return(
        <div>
            <div className={classes}>
                <Input
                    ref={inputRef}
                    disabled = {disabled}
                    readOnly = {!showSearch}
                    value={valText}
                    placeholder={placeholderVal || placeholder}
                    onInput = {inputChange}
                    prefix={<Icon icon="angle-down"/>}
                    onClick={clickEvent}
                    onBlur={blurEvent}
                    onFocus={focusEvent}
                    style={style}
                />
            </div>
        </div>
    )
}


export default Select
