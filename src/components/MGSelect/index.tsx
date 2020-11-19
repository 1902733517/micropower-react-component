import React, { CSSProperties, FC } from 'react'
import Select from '../Select/index'
import Option from '../Select/option'

export interface MGSelectProps {
    showSearch?: boolean | string
    selectOptions: Array<any>
    style?: CSSProperties
    onSelect?: (val: string | number, option: Object) => void
    placeholder?: string
    showName?: string
}   

const MGSelect:FC<MGSelectProps> = (props)=> {
    const {
        selectOptions,
        style,
        onSelect,
        placeholder,
        showName = 'name'
    } = props;
    return (
        <Select
            showSearch
            onSelect={onSelect}
            placeholder={placeholder}
            style = {{...{border: '0px', boxShadow: '0px 0px 0px #fff'}, ...style}}
        >
            {selectOptions.map(item => {
                return <Option value={item.id} key={item.id}>{item[showName]}</Option>
            })}
        </Select>
    )
}   
export default MGSelect