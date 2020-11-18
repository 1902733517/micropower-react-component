import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './util/commonJS'
import './util/storage'
import './util/request'
import './styles/index.scss'
import 'antd-mobile/dist/antd-mobile.css';
import Router from './router';


export { default as Select} from './components/Select'
// ReactDOM.render(
//   <React.StrictMode>
//     <Router />
//   </React.StrictMode>,
//   document.getElementById('root')
// );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
ReactDOM.render(<Router />, document.getElementById('root'))
