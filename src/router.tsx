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
  { path: '/login', component: asyncComponent(() => import('../src/pages/login/index')), routes: []},
  { path: '/auth', component:  auth, routes: [],},
  { path: '/scan', component: scan , routes: [],},
  { path: '/invoiceDetails', component: invoiceDetails},
  { path: '/home', component: Home, routes: []},
  {
    path: '/white', component: asyncComponent(()=> import('../src/pages/white/index')), routes: [
      {path: '/white/test',  component: asyncComponent(() => import('../src/pages/conbudget/conbudgetapplyList/index'))}
    ]
  }
]

const Router = () => (
  <BrowserRouter>{renderRoutes(routes)}</BrowserRouter>
)

export default Router

  