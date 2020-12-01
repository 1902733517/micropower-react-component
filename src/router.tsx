import React from 'react';
import Login from './pages/login/index';
import Home from './pages/home/index';
import auth from "./pages/auth/index";
import scan from './pages/home/scan/index';
import invoiceDetails from './pages/home/invoiceDetails'
import { BrowserRouter }  from 'react-router-dom';
import { renderRoutes } from 'react-router-config'

export const routes = [
  { path: '/login', component: Login , routes: [],},
  { path: '/auth', component:  auth, routes: [], },
  { path: '/scan', component: scan , routes: [],},
  { path: '/invoiceDetails', component: invoiceDetails },
  {
    path: '/',
    component: Home,
    routes: [
    ]
  },
]

const Router = () => (
  <BrowserRouter>{renderRoutes(routes)}</BrowserRouter>
)

export default Router

  