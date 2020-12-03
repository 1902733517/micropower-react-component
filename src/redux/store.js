import {createStore} from 'redux'
//导入reduce.js文件
import reducer from './reducer'
import thunk from 'redux-thunk'

const store=createStore(reducer)
//可以查看此时store数据
//导出store
export default store