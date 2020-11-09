import React, { forwardRef, HtmlHTMLAttributes, MouseEvent, useCallback, useEffect, useImperativeHandle, useRef, useState } from 'react';
import './App.css';
import Input from './components/Input';
import Icon from './components/Icon'
import Select from './components/Select'
import { InputProps } from './components/Input/Input';

function App() {
  const [value, setValue] =useState("");
  const clickEvent = (e:MouseEvent<HTMLSpanElement>) => {
    console.log("图标点击事件");
    console.log(e)
    // e.target.value = '';
  }
  const aaa = useRef(null);
  return (
    <div className="App">
      <div style={{width: '300px', margin: '0 auto'}}>
        <Input 
          placeholder="size"
          disabled
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
        <Select />
        <br />
        <Select />
      </div>
      <div style={{height: '1100px'}}>

      </div>
    </div>
  );
}

export default App;



