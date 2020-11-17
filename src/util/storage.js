import commonJS from './commonJS'
import  React from 'react'

let storage = {

}

storage.getToken = function () {
    return localStorage.getItem('token') || ''
}

//设置缓存
storage.setLocalStorage = function (key, value) {
    localStorage.setItem(key, value)
}

storage.getLocalStorage = function (key) {
    if(key) {
        return JSON.parse(localStorage.getItem(key)) || null
    } else {
        return ''
    }
}

storage.getAppId = function () {
    var wxInfo =  storage.getLocalStorage('wxInfo');
    if(wxInfo == null) {
        return ''
    }
    else {
        return wxInfo.appID;
    }
}

//获取组织
storage.getOrgan = function () {
    var organInfo = storage.getLocalStorage('organInfo');
    return organInfo;
}

storage.getOrganId = function () {
    var organ = storage.getOrgan();
    if(organ == null) {
        return ''
    }
    return organ.id;
}


//获得用户信息User
storage.getUser = function () {
    var user = storage.getLocalStorage('user');
    return user;
}

//获得用户信息userId
storage.getUserId = function () {
    var user = storage.getUser();
    if(user == null){
        return ''
    }
    return user.id;
}
//获得用户信息userName
storage.getUserName = function () {
    var user = storage.getUser();
    if(user == null){
        return ''
    }
    return user.name
}



export function getToken () {
    return  localStorage.getItem("token") || ''
}

export function getEnvironmental () {
    return  commonJS.getEnvironmental();
}

React.$storage = storage;
export  default storage;