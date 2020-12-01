import  request from './request'
import React from 'react'
import { Toast } from 'antd-mobile';

let commonJS = {

}


//获取当前环境
commonJS.getENV = () => {
    return process.env.REACT_APP_ENV
};

//返回 BASE_API （接口地址） 值
commonJS.getBaseApi= () => process.env.REACT_APP_BASE_URL || '';

// 返回 FILE_URL （文件地址） 值  
commonJS.getFileApi = () => process.env.REACT_APP_FILE_URL;

// 图片地址值
commonJS.getPhotoApi = () => process.env.REACT_APP_FILE_URL.replace(':6024', '');

//获得所在环境相应参数
commonJS.getEnvironmental = () => {            
    //(identity：  企业微信 6  微信 4  钉钉 7 ) 
    //(scope:  企业微信 snsapi_base#wechat_redirect    微信  snsapi_userinfo#wechat_redirect) 
    //(postCodeUrl：  企业微信 qywxWerifyCode  微信verifyCode  钉钉 忽略 ) 
    //postUserInfoUrl：  企业微信 bindQyWxUser  微信 bindUser  钉钉 bindDingdingUser）
    switch (commonJS.getENV()) {
        case 'dev':
            return {identity: 4, isQyWX: 0, scope: 'snsapi_userinfo#wechat_redirect',postCodeUrl: 'verifyCode', postUserInfoUrl: 'bindUser'}
        case 'wgpro':
            return {identity: 4, isQyWX: 0, scope: 'snsapi_userinfo#wechat_redirect',postCodeUrl: 'verifyCode', postUserInfoUrl: 'bindUser'}
        case 'wgfat':
            return {identity: 4, isQyWX: 0, scope: 'snsapi_userinfo#wechat_redirect',postCodeUrl: 'verifyCode', postUserInfoUrl: 'bindUser'}
        case 'wgqywx':
            return {identity: 6, isQyWX: 1, scope: 'snsapi_base#wechat_redirect',postCodeUrl: 'qywxWerifyCode', postUserInfoUrl: 'bindQyWxUser'}
        case 'zhpro':
            return {identity: 6, isQyWX: 1, scope: 'snsapi_base#wechat_redirect',postCodeUrl: 'qywxWerifyCode', postUserInfoUrl: 'bindQyWxUser'}
        default:
            break;
    }
}


commonJS.post = function (url, query, callBack) {
    return request({
        method: 'post',
        url,
        data: query
    }).then(response => {
        callBack(response);
        return response;
    }).catch (err => {
        console.log(err);
        return [];
    })
}

commonJS.get = function (url, callBack) {
    request({
        method: 'get',
        url,
    }).then(response => {
        callBack(response)
    }).catch (err => {
        console.log(err)
    })
}


commonJS.checkIsNull = function (value) {
    if(value === undefined || value === ''|| value === null) {
        return true;
    }
    return false;
}

commonJS.getLocationQuery = function(name) {
	var url = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	var newUrl = window.location.search.substr(1).match(url);
	if(newUrl != null) {
		return unescape(newUrl[2]);
	} else {
		return '';
	}
}

commonJS.getLocationOrigin = () => {
    return commonJS.getENV() === 'wgfat' ? window.location.origin+'/micropower-app' : window.location.origin;
}



//获取当前时间
commonJS.dateFormat = function(){
    var date = new Date();
    var seperator1 = "-";
    var seperator2 = ":";
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    let h = date.getHours();
    h = h < 10 ? ('0' + h) : h;
    let m = date.getMinutes();
    m = m < 10 ? ('0' + m) : m;
    let s = date.getSeconds();
    s = s < 10 ? ('0' + s) : s;
    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
            + " " + h + seperator2 + m  + seperator2 + s;
    return currentdate;
}


//获取当前时间
commonJS.dateFormatSub =  () => {
    let time = commonJS.dateFormat();
    return time.substring(0, 10)
}


//合并两个json
commonJS.merge2Json = function (json1, json2) {
    return JSON.parse((JSON.stringify(json1)+JSON.stringify(json2)).replace(/}{/,','));
}


//消息弹窗
commonJS.toast = function (message) {
    Toast.info(message, 2)
}


React.$commonJS = commonJS;
export default commonJS;

