import React, { forwardRef, HtmlHTMLAttributes, MouseEvent, useCallback, useEffect, useImperativeHandle, useRef, useState } from 'react';
import './App.css';
import Input from './components/Input';
import Icon from './components/Icon';
import Select from './components/Select';
// import {Select} from 'antd';
// import {Select} from './index'

function App() {
  const clickEvent = (e:MouseEvent<HTMLSpanElement>) => {

  }
  const { Option } = Select;
  const inputRef = useRef<null | HTMLInputElement>(null);
  const options = 
    [
      {id: 1001, name: '啦啦啦'},
      {id: 1002, name: '哈哈哈'},
      {id: 1003, name: '嘻嘻嘻'},
      {id: 1004, name: '滋滋滋'},
    ]
  const changeEvent = (val1:any, val2:any)=> {
    console.log(val1);
    console.log(val2)
  }
  const selectEvent = (val1:any, val2:any) => {
    console.log("*****");
    console.log(val1);
    console.log(val2);
  }
  return (
    <div className="App">
      <div style={{width: '300px', margin: '0 auto'}}>
        <Input 
          placeholder="size"
          disabled
          ref={inputRef}
        />
        <br />
        <Input 
            placeholder="small size"
            disabled
            size="sm"
            suffix="￥"
            prefix={<span onClick={(e) => clickEvent(e)}><Icon icon="times-circle" /></span>}
        />
        <br />
        <br />
        <Input 
          placeholder="middle size" 
          size="md"
          suffix="￥"
          prefix="RMB"
        />
        <br />
        <br />
        <Input 
          placeholder="large size" 
          disabled
          suffix="￥"
          prefix="RMB"
          size="lg"
        />
      </div>
      <div style={{width: '300px', margin: '0 auto', marginTop: '30px'}}>
        {/* <Select showSeach /> */}
      </div>
      <br />
      <br />
      <div style={{width: '500px', margin: '0 auto', marginTop: '30px'}}>
        {/* <Select showSearch>
          {options.map((item)=>{
            return <Select.Option value={item.id}>{item.name}</Select.Option>
          })}
        </Select> */}
        <Select
          showSearch
          // style={{ width: 200 }}
          // onChange={changeEvent}
          onSelect={selectEvent}
          // filterOption={(input, option) =>
          //   option?.children.indexOf(input) >= 0
          // }
        >
          {options.map((item)=>{
            return <Option value={item.id} key={item.id}>{item.name}</Option>
          })}
        </Select>
      </div>
      <div style={{height: '1100px'}}>

      </div>
    </div>
  );
}

export default App;



