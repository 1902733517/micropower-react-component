import React, { Children, CSSProperties, FC, useEffect, useState } from 'react'
import Select from '../Select/index'
import Option from '../Select/option'
import {SelectProps} from '../Select/select'

export interface MGSelectProps extends SelectProps {
    selectOptions?: Array<any>
    showName?: string
}   



const MGSelect:FC<MGSelectProps> = (props)=> {
    const {
        selectOptions,
        style,
        onSelect,
        placeholder,
        showName = 'name',
        romote,
        romoteMethod,
        ...restProps
    } = props;
    const [list, setList] = useState<Array<any>>(selectOptions?selectOptions:[]);
    // useEffect(()=>{
    //     if(romote && romoteMethod) {
    //         const results = romoteMethod();
    //         if(results instanceof Promise) {
    //             results.then((res:any)=> {
    //                 console.log('Promise');
    //                 setList(res.data.records);
    //             })  
    //         }
    //     }
    // }, [romoteMethod])
    useEffect(() => {
        if(romoteMethod) {
            const results = romoteMethod();
            if(results instanceof Promise) { //判断返回结果是否为异步请求
                results.then(data => {
                    console.log("*************");
                    console.log(data);
                })
            }
        }
    }, [romoteMethod])

    const childrenDom = () => {
        if(romote) {
            {list?.map(item => {
                return <Option value={item.id} key={item.id}>{item[showName]}</Option>
            })}
        } else {
            {selectOptions?.map(item => {
                return <Option value={item.id} key={item.id}>{item[showName]}</Option>
            })}
        }
    }
    return (
        <Select
            showSearch
            onSelect={onSelect}
            placeholder={placeholder}
            style = {{...{border: '0px', boxShadow: '0px 0px 0px #fff'}, ...style}}
            {...restProps}
        >
            {selectOptions?.map(item => {
                return <Option value={item.id} key={item.id}>{item[showName]}</Option>
            })}
        </Select>
    )
}   
export default MGSelect