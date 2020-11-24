import React, {useState} from 'react'
import './index.scss'
import { Toast } from 'antd-mobile';

export default () => {
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const login = () => {
        let postUrl = 'user/v1/'+ React.$commonJS.getEnvironmental().postUserInfoUrl;
        React.$commonJS.post(postUrl, {phone, password}, function (res) {
            if(res.code === 200) {
                Toast.info('登录成功，正在为您跳转', 2);
                localStorage.setItem('token', res.token)
                localStorage.setItem('user', JSON.stringify(res.data))
                let defaultOrganList = res.data.organList.find(item => item.defaultd == '1');
                if(defaultOrganList) {
                    localStorage.setItem("organInfo", JSON.stringify(defaultOrganList));
                } else {
                    localStorage.setItem("organInfo", JSON.stringify(res.data.organList[0]));
                }
                var that = this;
                setTimeout(() => {
                    that.props.history.push("/homePage")
                }, 500)
            }
        })
    }
    return <div className="login">
        <h2>登录</h2>
        <div className="formData">
            <div className="filletInput">
                <i className="iconfont icon-user" />
                <input  type="text" placeholder="请输入账号" value={phone} onChange={(e) => {setPhone(e.target.value)}}/>
            </div>
            <div className="filletInput">
                <i className="iconfont icon-mima1" />
                <input  type="password" placeholder="请输入密码" value={password} onChange={(e) => {setPassword(e.target.value)}} />
            </div>
            <button className="loginBtn" onClick={ ()=>{login()}}>登录</button>
        </div>
        
    </div>
}