import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Login from './pages/login/index'
import Home from './pages/home/index'
import auth from "./pages/auth/index";
import scan from './pages/home/scan'

const Router =  () => {
    
    return <BrowserRouter>
        <Switch>
            <Route exact path="/" component={Home}></Route>
            <Route path="/home" component={Home}></Route>
            <Route path="/login" component={Login} ></Route>
            <Route path="/auth" component={auth} ></Route>
            <Route path="/scan" component={scan}></Route>
        </Switch>
    </BrowserRouter>
}
export default Router