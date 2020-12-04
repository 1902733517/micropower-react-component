import React, { FC, useEffect, useState } from 'react'
import "./index.scss"
import commonJS from '../../util/commonJS'
import storage from '../../util/storage'
import {routes} from '../../router'
import { useHistory } from 'react-router-dom';
import asyncComponent from '../../asyncComponent';
import {addRoute} from '../../redux/action'
import { connect } from 'react-redux';
function mapStateToProps(state:any) {
    return {
      list: state.routerList
    };
}
  
const Centre:FC = (props:any) => {
    const [navList, setNavList] = useState<Array<any>>([]);
    const [current, setcurrent] = useState<number|"">("");
    useEffect(()=>{
        commonJS.get('userinfo/v1/getLeftMenuList?organId='+storage.getOrganId()+'&userId='+storage.getUserId()+"&phone=1", function (res:any) {
            if(res.code === 200) {
                setNavList(res.data);
                setcurrent(0);
                let allRoute =  routes.concat(addRoutes(res.data));
                props.dispatch(addRoute(allRoute))
            }
        })
    }, [])
    const addRoutes = (list:Array<any>, parentPath?:string) => {
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
                parentPath: parentPath ? parentPath : '',
                path: parentPath ? parentPath + path : path,
                routes: children === undefined ? [] : addRoutes(children, path),
                component: component == 'Layout' ?  asyncComponent(()=> import('../../pages/white/index')): asyncComponent(()=> import('../../pages/'+component+'/index')),
                param,
            }
            addRouteList.push(oRouter);
        })
        return addRouteList;
    }
    let history = useHistory();
    const childrenItem = () => {
        if(current === '') {
            return ''
        } else {
            return(
                navList[current].children.map((item:any)=>{
                    return (
                        <div className="rightItem" key={item.id} onClick={() => { history.push(navList[current].path + item.path)} }>
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
                            <div className="leftItem"  key={index} onClick={()=>{setcurrent(index);}}>
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

export default connect(mapStateToProps)(Centre)