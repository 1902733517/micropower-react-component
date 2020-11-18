import React from 'react'
import { Toast } from 'antd-mobile';

class auth extends React.Component{
    constructor () {
        super();
        this.state = {
            code: '',
            appid: '',
            redirectUri: React.$commonJS.getLocationOrigin()+'/auth',
        }
    }
    

    getAppId () {
        let appId = React.$storage.getAppId(); 
        this.setState({
            appid: appId,
        })
        var environmental = React.$commonJS.getEnvironmental();
        console.log(environmental, '_________');
        var url='https://open.weixin.qq.com/connect/oauth2/authorize?appid='+appId+'&redirect_uri='+encodeURIComponent(this.state.redirectUri, "UTF-8")+'&response_type=code&scope='+environmental.scope;
        window.location.href = url;
    }

    componentWillMount () {
        let code = React.$commonJS.getLocationQuery('code');
        this.setState({
            code: code
        })
        if(React.$commonJS.getENV() == ' dingding') {

        } else {
            var environmental = React.$commonJS.getEnvironmental();
            Toast.loading("加载中");
            if(code == '') {
                var wxInfo = React.$storage.getLocalStorage('wxInfo');
                if(wxInfo != null){
                    this.getAppId();
                }
                else {
                    var that = this;
                    React.$commonJS.post('wechat/v1/findWechat?isQyWX='+ environmental.isQyWX, null, function (res) {
                        if(res.code == 200) {
                            localStorage.setItem('wxInfo',JSON.stringify(res.data))
                            that.getAppId();
                        }
                    })
                }
            } else {
                var postUrl = "user/v1/" + environmental.postCodeUrl;
                var that = this;
                React.$commonJS.post(postUrl+"?code="+ code, null, function (res) {
                    if(res.code == 512) {  //未绑定账号
                        React.$storage.setLocalStorage('wxUser', JSON.stringify(res.data))
                        Toast.info(res.message, 1.5);
                        setTimeout(() => {
                            that.$router.push({path: '/login'})
                        }, 500)
                    }
                    else {
                        if(res.code == 200) {
                            React.$storage.setLocalStorage("token",res.token);
                            React.$storage.setLocalStorage("user",JSON.stringify(res.data));
                            let defaultOrganList = res.data.organList.find(item => item.defaultd == '1');
                            if(defaultOrganList) {
                                React.$storage.setLocalStorage("organInfo", JSON.stringify(defaultOrganList));
                            } else {
                                React.$storage.setLocalStorage("organInfo", JSON.stringify(res.data.organList[0]));
                            }
                            Toast.info('登录成功，正在为您跳转', 1.5);
                            setTimeout(() => {
                                window.location.href=React.$commonJS.getLocationOrigin()+'/home'
                            }, 500)
                        }
                    }
                })
            }
        }
    }

    render () {
        return <div>
            
        </div>
    }
}


export default auth;