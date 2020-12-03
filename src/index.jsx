import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './util/commonJS'
import './util/storage'
import './util/request'
import './styles/index.scss'
import 'antd-mobile/dist/antd-mobile.css';
import Router from './router'

import {createStore} from 'redux'
import reducer from './redux/reducer'
const store =createStore(reducer,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
export default store

// ReactDOM.render(
//   <React.StrictMode>
//     <Router />
//   </React.StrictMode>,
//   document.getElementById('root')
// );

ReactDOM.render(<Router />,  document.getElementById('root'))
