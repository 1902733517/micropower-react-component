import {createStore, applyMiddleware} from 'redux'
//导入reduce.js文件
import reducer from './reducer'
import thunk from 'redux-thunk'

//可以查看此时store数据
//applyMiddleware(thunk) 添加异步
const store=createStore(reducer, applyMiddleware(thunk))

//导出store
export default store