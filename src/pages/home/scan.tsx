import React,{ useState, useEffect, useCallback} from 'react'
import './scan.scss';
import MGSelect from '../../components/MGSelect';
import { Switch , Button, WhiteSpace} from 'antd-mobile';
import '../../util/commonJS'
import storage from '../../util/storage';
import commonJS from '../../util/commonJS';

function Scan(props:any) {
    const [list, setList] = useState([{id:'1', name: '语文书'},{id:'2', name: '数学'},{id:'3', name: '英语'}, {id: '4', name: '语文'}]);
    const [organList, setOrganList] = useState([]);
    const [project, setProject] = useState([])
    const getOrganList = () => {
        var user =  storage.getLocalStorage('user');
        if(!commonJS.checkIsNull(user)) {
            return user.organList;
        } else {
            return []
        }
    }
    useEffect(()=>{
        setOrganList(getOrganList());
    }, [])
    return (
        <div className="scan">
            <div className="box">
                <div className="selectGroup">
                    <label>财务组织</label>
                    <MGSelect
                        showSearch
                        showName="organName"
                        selectOptions={organList}
                        placeholder="请选择"
                    >
                    </MGSelect>
                </div>
                <div className="selectGroup">
                    <label>项目名称</label>
                    <MGSelect
                        showSearch
                        selectOptions={list}
                    >
                    </MGSelect>
                </div>
                <div className="selectGroup">
                    <label>合同名称</label>
                    <MGSelect
                        showSearch
                        selectOptions={list}
                    >
                    </MGSelect>
                </div>
                <div className="selectGroup">
                    <label>部门名称</label>
                    <MGSelect
                        showSearch
                        selectOptions={list}
                    >
                    </MGSelect>
                </div>
                <div className="selectGroup">
                    <label>财务日期</label>
                    <MGSelect
                        showSearch
                        selectOptions={list}
                    >
                    </MGSelect>
                </div>
                <div className="selectGroup">
                    <label>结算对象</label>
                    <MGSelect
                        showSearch
                        selectOptions={list}
                    >
                    </MGSelect>
                </div> 
                <div className="selectGroup" style={{border: '0px'}}>
                    <span style={{paddingRight: '10px', }}>连续扫描</span>
                    <Switch
                        checked={true}
                        color="#108EE9"
                        onChange={() => {
                            
                        }}
                    />
                    <span style={{paddingRight: '10px', }}>现金垫付</span>
                    <Switch
                        checked={true}
                        color="#108EE9"
                        onChange={() => {
                            
                        }}
                    />
                </div>
            </div>
            <div style={{padding: '0px 10px'}}>
                <WhiteSpace size="lg"/>
                <WhiteSpace size="lg"/>
                <Button type="primary" size="small" onClick={()=>{console.log(organList)}} >二维码扫描</Button>
                <WhiteSpace />
                <Button style={{backgroundColor: '#3CB371', color: '#fff'}} size="small">拍照识别</Button>
            </div>
            
        </div>
    )
}

export default  Scan