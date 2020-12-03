import React, { FC } from 'react';
import Login from './pages/login/index';
import Home from './pages/home/index';
import auth from "./pages/auth/index";
import scan from './pages/home/scan/index';
import invoiceDetails from './pages/home/invoiceDetails'
import { BrowserRouter }  from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import asyncComponent from './asyncComponent'

export const routes = [
  { path: '/', component: Home, exact:true, routes: []},  //exact 严格匹配
  { path: '/login', component: asyncComponent(() => import('./pages/login/index')), routes: []},
  { path: '/auth', component:  auth, routes: [],},
  { path: '/scan', component: scan , routes: [],},
  { path: '/invoiceDetails', component: invoiceDetails},
  { path: '/home', component: Home, routes: []},
  // { path: '*', component: Home, routes: [] },
  {
    path: '/white', component: asyncComponent(()=> import('./pages/white/index')), routes: [
      {name: 'test', path: '/white/test',  component: asyncComponent(() => import('./pages/conbudget/conbudgetapplyList/index'))}
    ]
  }
]

const Router = () => (
  // basename 应用程序部署在服务器的子目录
  // <BrowserRouter basename='//micropower-app'></BrowserRouter>
  <BrowserRouter>{renderRoutes(routes)}</BrowserRouter>
)

export default Router

  