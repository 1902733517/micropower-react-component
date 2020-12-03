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
        onSelect,
        showSearch = true,
        placeholder = '请选择',
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
    const selectEvent = (val:string|number, option:object) => {
        if(onSelect) {
            // onSelect(val, option)
            let row = selectOptions?.find(item => item.id === val);
            onSelect(val, row || option)
        }
    }
    
    return (
        <Select
            showSearch
            style = {{...{border: '0px', boxShadow: '0px 0px 0px #fff'}, ...style}}
            onSelect={selectEvent}
            {...restProps}
        >
            {getChildren()}
        </Select>
    )
}   
export default MGSelect