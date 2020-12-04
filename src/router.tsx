import React, { FC, useEffect, useState } from 'react';
import Login from './pages/login/index';
import Home from './pages/home/index';
import auth from "./pages/auth/index";
import scan from './pages/home/scan/index';
import invoiceDetails from './pages/home/invoiceDetails'
import { BrowserRouter }  from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import asyncComponent from './asyncComponent'
import { connect } from 'react-redux';
import { constants } from 'buffer';

export const routes = [
  { path: '/', component: Home, exact:true, routes: []},  //exact 严格匹配
  { path: '/login', component: asyncComponent(() => import('./pages/login/index')), routes: []},
  { path: '/auth', component:  auth, routes: [],},
  { path: '/scan', component: scan , routes: [],},
  { path: '/invoiceDetails', component: invoiceDetails},
  { path: '/home', component: Home, routes: []},
]
interface stateProps{
  routerList: Array<any>
}

const mapStateToProps = (state:stateProps) => ({
  routerList: state.routerList
})


const Router:FC = (props:any) => {
  // basename 应用程序部署在服务器的子目录
  // <BrowserRouter basename='//micropower-app'></BrowserRouter>

  let [list] = useState(routes);
  let resList = props.routerList.length > 0 ? props.routerList : list;
  return (
    <BrowserRouter>{renderRoutes(resList)}</BrowserRouter>
  )
}

export default connect(mapStateToProps)(Router)

  