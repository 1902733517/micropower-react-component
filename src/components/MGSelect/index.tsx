import React, { CSSProperties, FC, useEffect } from 'react'
import Select from '../Select/index'
import Option from '../Select/option'
import {SelectProps} from '../Select/select'

export interface MGSelectProps extends SelectProps {
    selectOptions: Array<any>
    showName?: string
}   



const MGSelect:FC<MGSelectProps> = (props)=> {
    const {
        selectOptions,
        style,
        onSelect,
        placeholder,
        showName = 'name',
        ...restProps
    } = props;
    useEffect(()=>{
        console.log('&&&&')
        console.log(selectOptions)
    }, ['selectOptions'])
    return (
        <Select
            showSearch
            onSelect={onSelect}
            placeholder={placeholder}
            style = {{...{border: '0px', boxShadow: '0px 0px 0px #fff'}, ...style}}
            {...restProps}
        >
            {selectOptions.map(item => {
                return <Option value={item.id} key={item.id}>{item[showName]}</Option>
            })}
        </Select>
    )
}   
export default MGSelect