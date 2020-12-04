import React, {FC, useEffect, useState} from 'react'
import { Tabs, WhiteSpace } from 'antd-mobile';
import { StickyContainer, Sticky } from 'react-sticky';
import commonJS from '../../../src/util/commonJS';
import storage from '../../../src/util/storage';
import './index.scss';
import App from './test'

const TodoList:FC = (props:any) => {
    const renderTabBar = (props:any) => {
        return (<Sticky>
            {({ style }) => <div style={{ ...style, zIndex: 1 }}><Tabs.DefaultTabBar {...props} /></div>}
        </Sticky>);
    }
    const tabs = [
        { title: '待处理', key: 't1' },
        { title: '已处理', key: 't2' },
    ];
    const [list, setList] = useState([]);
    const TabExample = () => (
        <>
            <div className="navBox">
                <WhiteSpace />
                <StickyContainer>
                <Tabs tabs={tabs}
                    initialPage={'t1'}
                    renderTabBar={renderTabBar}
                >
                </Tabs>
                </StickyContainer>
            </div>
            <div style={{height: '53px'}}></div>
        </>
    );

    const getTypeName = (val:string) => {
        let key = val.split('_')[0];
        let name =  commonJS.getApplyTypeList().find(item => item.id === key)?.name
        return name;
    } 
    
    const getItem = (item:any, key:number) => (
        <div className="item" key={key}>
            <p className="itemTit">
                <span className="no">{item.srcNO}</span> 
                <span className="litTit">{getTypeName(item.key)}</span>
            </p>
            <p className="itemTit littleTit">
                <span className="no" >{item.departmentName}</span> 
                <span className="litTit">{item.startTime.substring(0, 10)}</span>
            </p>
            <div className="backIcon">
                <i className="iconfont icon-next" />
            </div>
        </div>
    ) 

    useEffect(()=>{
        let query = {
            organAuthorize: storage.getOrganAuthorize(), 
            departmentAuthorize: storage.getDepartmentAuthorize(), 
            organID: storage.getOrganId(), 
            companyID: storage.getCompanyId(),
            companyId: storage.getCompanyId(),
            byUserID: storage.getUserId(),
            byUserId: storage.getUserId(),
            isRun: 1,
            // isHistory: 1
            userID: storage.getUserId(),
        };
        commonJS.post('apply/v1/getActTaskList?pageNum=1&pageSize=20', query , function (res:any) {
            if(res.code == 200) {
                setList(res.data.list);
            }
        })
    }, [])

    return (
        <div>
            {/* { TabExample() }
            { list.map((item:any, index) => {
                    return (getItem(item, index));
                })
            } */}
            <App />
        </div>
    )
}

export default TodoList