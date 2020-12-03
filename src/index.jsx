import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './util/commonJS'
import './util/storage'
import './util/request'
import './styles/index.scss'
import 'antd-mobile/dist/antd-mobile.css';
import Router from './router'
import { Provider } from 'react-redux';
import store from './redux/store'

// ReactDOM.render(
//   <React.StrictMode>
//     <Router />
//   </React.StrictMode>,
//   document.getElementById('root')
// );

const Index = () => (
    <Provider store={store}>
       <Router />
    </Provider>
)

ReactDOM.render(<Index />,  document.getElementById('root'))