import React, { FC, useEffect, useState } from 'react'
import "./index.scss"
import commonJS from '../../util/commonJS'
import storage from '../../util/storage'
import {routes} from '../../router'
import { useHistory } from 'react-router-dom';
import asyncComponent from '../../asyncComponent';

const Centre:FC = (props) => {
    const [navList, setNavList] = useState<Array<any>>([]);
    const [current, setcurrent] = useState<number|"">("");
    useEffect(()=>{
        commonJS.get('userinfo/v1/getLeftMenuList?organId='+storage.getOrganId()+'&userId='+storage.getUserId()+"&phone=1", function (res:any) {
            if(res.code === 200) {
                setNavList(res.data);
                setcurrent(0);
                routes.concat(addRoutes(res.data));
                console.log(routes.concat(addRoutes(res.data)))
                // { path: '/login', component: Login , routes: [],}
                // routes.concat()
            }
        })
    }, [])
    const addRoutes = (list:Array<any>) => {
        const addRouteList:Array<any> = [];
        list.forEach(item => {
            let {
                id,
                path,
                component,
                children,
                param
            } = item
            const oRouter = {
                id,
                path:  component == 'Layout' ? '/white' : '/white'+ path,
                routes: children === undefined ? [] : addRoutes(children),
                component: component == 'Layout' ?  asyncComponent(()=> import('../../pages/white/index')): asyncComponent(()=> import('../../pages/'+component+'/index')),
                param,
            }
            addRouteList.push(oRouter);
        })
        return addRouteList;
    }
    let history = useHistory();
    const childrenItem = () => {
        if(current == '') {
            return ''
        } else {
            return(
                navList[current].children.map((item:any)=>{
                    return (
                        <div className="rightItem" key={item.id} onClick={() => {console.log("((((", item.path); history.push(item.path)} }>
                            <div className="icons">
                                <svg className="icon" aria-hidden={true}>
                                    <use xlinkHref={`#${item.icon.trim()}`}></use>
                                </svg>
                            </div>
                            <p>{item.title}</p>
                        </div>
                    )
                })
            )
        }
    }
    return (
        <div className="centre">
            <div className="contentLeft">
                {
                    navList.map((item, index) => {
                        return (
                            <div className="leftItem"  key={index} onClick={()=>{setcurrent(index)}}>
                                {item.title}
                            </div>
                        )
                    })
                }
            </div>
            <div className="contentRight">
                {childrenItem()}
            </div>
        </div>
    )
}

// class Centre extends React.Component{

//     state = {
//         navList: [],
//         current: "", 
//     }

//     componentDidMount () {
//         var that = this;
//         React.$commonJS.get('userinfo/v1/getLeftMenuList?organId='+React.$storage.getOrganId()+'&userId='+React.$storage.getUserId()+"&phone=1", function (res) {
//             if(res.code === 200) {
//                 that.setState({
//                     navList: res.data,
//                     current: 0,
//                 })
//             }
//         })
//     }

//     childrenItem () {
//         if(this.state.current === '') {
//             return ''
//         } else {
//             return(
//                 this.state.navList[this.state.current].children.map((item)=>{
//                     return (
//                         <div className="rightItem" key={item.id}>
//                             <div className="icons">
                                
//                                 <svg className="icon" aria-hidden={true}>
//                                     <use xlinkHref={`#${item.icon.trim()}`}></use>
//                                 </svg>
//                             </div>
//                             <p>{item.title}</p>
//                         </div>
//                     )
//                 })
//             )
//         }
//     }

//     render () {
//         return (
//             <div className="centre">
//                 <div className="contentLeft">
//                     {
//                         this.state.navList.map((item, index) => {
//                             return (
//                                 <div className="leftItem"  key={index} onClick={()=>{this.setState({current:index})}}>
//                                     {item.title}
//                                 </div>
//                             )
//                         })
//                     }
//                 </div>
//                 <div className="contentRight">
//                     {this.childrenItem()}
//                 </div>
//             </div>
//         )
//     }
// }

export default Centre