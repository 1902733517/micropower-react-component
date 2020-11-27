import React,{ useState, ChangeEvent, useRef, useEffect, FC} from 'react'
import './scan.scss';
import MGSelect from '../../components/MGSelect';
import { Switch , Button, WhiteSpace, DatePicker, List} from 'antd-mobile';
import '../../util/commonJS'
import storage from '../../util/storage';
import commonJS from '../../util/commonJS';
import moment from 'moment'


const Scan:FC = (props) => {
    const [invoiceData, setInvoiceData] = useState({
        companyId: storage.getCompanyId(),
        organId: storage.getOrganId(),//财务(法人)组织名称
        taxName:  storage.invoiceName(), //所属组织
        operationId: storage.getUserId(),
        operationName: storage.getUserName(),
        financeTime: new Date(), //commonJS.dateFormatSub()
        taxNo: storage.getOrganTaxNo(),
        departmentId: '',
        departmentName: '',
        departmentNo: '',
        projectId: "",
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
    const [list, setList] = useState([{id:'1', name: '语文书'},{id:'2', name: '数学'},{id:'3', name: '英语'}, {id: '4', name: '语文'}]);
    const projectVal = useRef("");
    const [organList] = useState<Array<any>>(getOrganList());
    const [projectList, setProjectList] = useState<Array<any>>([]);
    const [contractList, setContractList] = useState<Array<any>>([]);
    const [departmentList, setDepartmentList] = useState<Array<any>>();
    const [purchaseList, setPurchaseList] = useState<Array<any>>([]);
    const searchEvent = (val: string) => {
        projectVal.current = val;
        romoteMethod();
    }
    useEffect(()=>{
        getDepartmentList();
    }, [])
    const romoteMethod = () => {
        let query = {
            search:  projectVal.current, 
            organAuthorize: storage.getOrganAuthorize(), 
            departmentAuthorize: storage.getDepartmentAuthorize(), 
            organID: invoiceData.organId, 
            organId: invoiceData.organId, 
            otherSearch: [{name: "apply", type: "brace", expression: "in", value: "1,9"}],
            companyID: storage.getCompanyId(),
            companyId: storage.getCompanyId(),
            byUserID: storage.getUserId(),
            byUserId: storage.getUserId()
        };
        commonJS.post("project/v1/getProjectList?pageNum=1&pageSize=6", query, function (res:any) {
            setProjectList(res.data.records);
        })
    }
    const selectOrgan = (val:string|number) =>  {
        setProjectList([]);
        setPurchaseList([]);
        setInvoiceData((obj)=>{return Object.assign({}, obj, {
            organId: val, 
            projectId: 0,
            projectNo: "",
            projectName: "",
            settlementSupplierId: 0,
            settlementSupplierName: '',
        }); });
        const row = organList.find(item => item.id == invoiceData.organId);
        if(row) {
            setInvoiceData((obj)=>{return Object.assign({}, obj, {
                organName: row.organName,
                taxName: row.invoiceName,
                taxNo: row.organTaxNo,
                projectId:'',
                projectNo: '',
                projectName: '',
                contractId: '',
                contractNo: "",
                contractName: "",
                projectPerformanceUserId: '',
                projectPerformanceUserName: '',
                projectManageType: "",
                projectLevied:'',
            }); });
            
            if(storage.getModuleType() == '1') {
                setInvoiceData((obj)=>{return Object.assign({}, obj, {
                    departmentId: '',
                    departmentName: '',
                    departmentNo: '',
                }); });
            }
            getDepartmentList();
            setContractList([])
        }
    }


    const selectProject = (val:string|number, row: any) => {
        setInvoiceData((obj)=>{return Object.assign({}, obj, {
            projectId: val,
            projectManageType: -1,
            projectLevied: -1,
            projectPerformanceUserName: "",
            projectPerformanceUserId: "",
            settlementSupplierId: "",
            settlementSupplierName: "",
        }); });
        setPurchaseList([]);
        getContractList(val);
        if(row!=null && row != undefined) {
            setInvoiceData((obj)=>{return Object.assign({}, obj, {
                projectName: row.name,
                projectNo: row.no,
                projectManageType: row.manageType,
                projectLevied: row.levied,
                contractId: 0,
                contractNo: "",
                contractName: "",
            }); });

            
            if(row.manageType=='1'){
                setInvoiceData((obj)=>{return Object.assign({}, obj, {
                    projectPerformanceUserName: row.performanceName,
                    projectPerformanceUserId: row.performanceId,
                }); });

            }else{
                setInvoiceData((obj)=>{return Object.assign({}, obj, {
                    projectPerformanceUserName: "",
                    projectPerformanceUserId: 0,
                }); });
            }
        }
    }
    const getContractList = (projectId:string | number) => {
        var data = {
            projectId: projectId,  
            companyID: invoiceData.companyId,
            companyId: invoiceData.companyId,
            organID: invoiceData.organId,
            organId: invoiceData.organId,
            byUserID: storage.getUserId(),
            byUserId: storage.getUserId(), 
            organAuthorize: storage.getOrganAuthorize(), 
            departmentAuthorize: storage.getDepartmentAuthorize(), 
            otherSearch: [{name: "apply", type: "brace", expression: "in", value: "1,9"}]
        }
        commonJS.post('contract/v1/getOutcontractList?pageNum=1&pageSize=500', data, function (res:any) {
            if(res.code == 200) {
                setContractList(res.data.records);
            }
        })
    }

    const selectContract = (contractId:string|number) => {
        setPurchaseList([]);
        setInvoiceData((obj)=>{return Object.assign({}, obj, {
            settlementSupplierId: 0,
            settlementSupplierName: "",
        }); });

        const row = contractList.find(item => item.id == contractId);
        if(row!==null && row !== undefined) { 
            setInvoiceData((obj)=>{return Object.assign({}, obj, {
                contractNo: row.no,
                contractName: row.name,
            }); });
            if(row.businessId) {
                setPurchaseList([{id: row.businessId, name: row.businessName}]);
            }
            setInvoiceData((obj)=>{return Object.assign({}, obj, {
                settlementSupplierId: row.businessId,
                settlementSupplierName: row.businessName,
            }); });
        }
    }

    const getDepartmentList = () => {
        setInvoiceData((obj)=>{return Object.assign({}, obj, {
            departmentId: 0,
            departmentName: '',
            departmentNo: ''
        }); });

        if(storage.getUser().dataDepartmentAuthority == '1') {
            let list = storage.getDepartmentList();
            if(list.length > 0) {
                setDepartmentList(list.filter((item:any) => item.organID == invoiceData.organId)) 
            }
        } else {
            let query = {
                byUserID: storage.getUserId(), 
                companyID: invoiceData.companyId,
                organID: invoiceData.organId
            }
            commonJS.post('department/v1/getDepartmentList?pageNum=1&pageSize=500', query, function (res:any) {
                if(res.code == 200) {
                    setDepartmentList(res.data.list);
                }
            })
        }
        checkDefault();
    }

    const checkDefault  = () => {
        let row = storage.getUser().organList.find((item:any) => item.defaultd == '1');
        let defaultOrganId = '';          //默认组织
        let defaultDepartmentId = storage.getDepartmentId();   //默认部门
        if(row) {
            defaultOrganId = row.id;
        }
        
        if(defaultOrganId != invoiceData.organId) {
            return;
        }
        if(departmentList?.findIndex(item => item.id == defaultDepartmentId) === -1) {
            departmentList.push({id: storage.getDepartmentId(), name:  storage.getDepartmentName(), code: ''})
        }
        invoiceData.departmentId = storage.getDepartmentId();
        invoiceData.departmentName = storage.getDepartmentName();
    }

    const dateFormat = (val:Date) => {
        return moment(val).format("YYYY-MM-DD");
    }
    return (
        <div className="scan">
            <div className="box">
                <div className="selectGroup">
                    <label>财务组织</label>
                    <MGSelect
                        showName="organName"
                        selectOptions={organList}
                        value={invoiceData.organId}
                        onSelect={selectOrgan}
                    >
                    </MGSelect>
                </div>
                <div className="selectGroup">
                    <label>项目名称</label>
                    <MGSelect
                        onSearch = {searchEvent}
                        romote
                        value={invoiceData.projectId}
                        romoteMethod= {romoteMethod}
                        selectOptions={projectList}
                        onSelect={selectProject}
                    >
                    </MGSelect>
                </div>
                <div className="selectGroup">
                    <label>合同名称</label>
                    <MGSelect
                        value={invoiceData.contractId}
                        selectOptions={contractList}
                        onSelect={selectContract}
                    >
                    </MGSelect>
                </div>
                <div className="selectGroup">
                    <label>部门名称</label>
                    <MGSelect
                        showSearch
                        selectOptions={departmentList}
                    >
                    </MGSelect>
                </div>
                <div className="selectGroup">
                    <label>财务日期</label>
                    <DatePicker
                        mode="date"
                        title="选择日期"
                        extra="Optional"
                        // value={invoiceData.financeTime}
                        format="YYYY-MM-DD"
                        onChange={date => {console.log(dateFormat(date)); setInvoiceData((obj)=>{return Object.assign({}, obj, {
                            financeTime: dateFormat(date),
                        }); });}}
                    >
                        <p style={{width: '100%', height: '40px'}}></p>
                    </DatePicker>
                </div>
                <div className="selectGroup">
                    <label>结算对象</label>
                    <MGSelect
                        showSearch
                        selectOptions={purchaseList}
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