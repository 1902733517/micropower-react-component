import axios from 'axios'
import  {getToken, getEnvironmental} from './storage'
import { Toast } from 'antd-mobile';

const instance = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
    timeout: 60000,
})


//请求拦截器 （添加头部信息）
instance.interceptors.request.use(
    config => {
        config.headers['Content-Type'] = 'application/json';
        config.headers['auth-identity'] = getEnvironmental().identity;
        config.headers['auth-token'] = getToken();

        return config;
    },
    error => {
        console.log("请求错误");
        Promise.resolve(error);
    }
)


instance.interceptors.response.use(
    response => {
        const data = response.data;
        const code = data.code;
        switch (code) {
            case 200:
                return response.data;
   
            case 500:
                Toast.info(data.message, 2)
                return response.data;
       
            case 510:
                Toast.info(data.message, 2)
                return response.data;
       
            default:
                break;
        }
    },
    error => {
        console.log("响应失败")
    }
)


export default instance