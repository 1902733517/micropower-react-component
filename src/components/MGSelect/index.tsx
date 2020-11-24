import React, { ChangeEvent, Children, CSSProperties, FC, useEffect, useState } from 'react'
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
        showName = 'name',
        ...restProps
    } = props;
    
    const getChildren = () => {
        if(selectOptions && selectOptions.length > 0) {
            return selectOptions?.map(item => {
                return <Option value={item.id} key={item.id}>{item[showName]}</Option>
            })
        } else {
            return <li className="wg-select-dropdown-item no-data"><span>暂无数据</span></li> 
        }
    }
    
    return (
        <Select
            showSearch
            style = {{...{border: '0px', boxShadow: '0px 0px 0px #fff'}, ...style}}
            {...restProps}
        >
           {getChildren()}
        </Select>
    )
}   
export default MGSelect