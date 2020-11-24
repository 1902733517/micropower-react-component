import React,{ useState, ChangeEvent, useRef} from 'react'
import './scan.scss';
import MGSelect from '../../components/MGSelect';
import Select from '../../components/Select';
import { Switch , Button, WhiteSpace} from 'antd-mobile';
import '../../util/commonJS'
import storage from '../../util/storage';
import commonJS from '../../util/commonJS';

function Scan(props:any) {
    const [list, setList] = useState([{id:'1', name: '语文书'},{id:'2', name: '数学'},{id:'3', name: '英语'}, {id: '4', name: '语文'}]);
    const projectVal = useRef("")
    // const [projectVal, setProjectVal] = useState<string | number>("");
    const [projectList, setProjectList] = useState([])
    const [invoiceData, setInvoiceData] = useState({
        companyId: storage.getCompanyId(),
        organId: storage.getOrganId(),//财务(法人)组织名称
        taxName:  storage.invoiceName(), //所属组织
        operationId: storage.getUserId(),
        operationName: storage.getUserName(),
        financeTime: commonJS.dateFormatSub(),
        taxNo: storage.getOrganTaxNo(),
        departmentId: '',
        departmentName: '',
        departmentNo: '',
        projectId: 0,
        projectNo: "",
        projectName: "",
        projectManageType: "",
        projectLevied: "",  //计征方式
        projectPerformanceUserId: 0,   //项目下的绩效考核人
        projectPerformanceUserName: "",
        settlementSupplierId: 0,  //合同下的供应商
        settlementSupplierName: "",
        contractId: 0,
        contractNo: "",
        contractName: "",
        invoiceNum: "",
        invoiceCode: "",
        invoiceDate: "",
        taget: "",   //校验码/不含税金额 
        special: 0,  //是否专票
        pay: 0,
        status: "1",
        tagetTit: '校验码(后6位)'
    })
    const getOrganList = () => {
        var user =  storage.getLocalStorage('user');
        if(!commonJS.checkIsNull(user)) {
            return user.organList;
        } else {
            return []
        }
    }
    const [organList, setOrganList] = useState(getOrganList());
    const searchEvent = (e: ChangeEvent<HTMLInputElement>) => {
        projectVal.current = e.target.value
        romoteMethod();
    }
    const romoteMethod = () => {
        let query = {
            search:  projectVal.current, 
            organAuthorize: storage.getOrganAuthorize(), 
            departmentAuthorize: storage.getDepartmentAuthorize(), 
            // organID: invoiceData.organId, 
            // organId: invoiceData.organId, 
            otherSearch: [{name: "apply", type: "brace", expression: "in", value: "1,9"}],
            organID: storage.getOrganId(), 
            companyID: storage.getCompanyId(),
            organId: storage.getOrganId(),
            companyId: storage.getCompanyId(),
            byUserID: storage.getUserId(),
            byUserId: storage.getUserId()
        };
        commonJS.post("project/v1/getProjectList?pageNum=1&pageSize=10", query, function (res:any) {
            setProjectList(res.data.records);
        })
    }
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
                        value={storage.getOrganId()}
                    >
                    </MGSelect>
                </div>
                <div className="selectGroup">
                    <label>项目名称</label>
                    <MGSelect
                        showSearch
                        onSearch = {searchEvent}
                        romote
                        romoteMethod= {romoteMethod}
                        selectOptions={projectList}
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