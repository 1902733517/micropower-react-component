import React,{ useState, ChangeEvent, useRef, useEffect, FC} from 'react'
import './index.scss';
import MGSelect from '../../../components/MGSelect';
import { Switch , Button, WhiteSpace, DatePicker, List} from 'antd-mobile';
import storage from '../../../util/storage';
import commonJS from '../../../util/commonJS';
import moment from 'moment';
import { useHistory }  from "react-router-dom";

const Scan:FC = (props) => {
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
    const projectVal = useRef("");
    const [organList] = useState<Array<any>>(getOrganList());
    const [projectList, setProjectList] = useState<Array<any>>([]);
    const [contractList, setContractList] = useState<Array<any>>([]);
    const [departmentList, setDepartmentList] = useState<Array<any>>();
    const [purchaseList, setPurchaseList] = useState<Array<any>>([]);
    const [continuous, setContinuous] = useState<boolean>(true); //连续扫描
    const [pay, setPay] = useState<boolean>(); //现金垫付
    let wx = require('weixin-js-sdk');
    let history = useHistory();
    const searchEvent = (val: string) => {
        projectVal.current = val;
        romoteMethod();
    }
    useEffect(()=>{
        commonJS.get("user/v1/getJsapiTicket?url=" + encodeURIComponent(window.location.href.split('#')[0]), function(res:any) {
            wx.config({
                //debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                appId: res.data.appId, // 必填，公众号的唯一标识
                timestamp: res.data.timestamp, // 必填，生成签名的时间戳
                nonceStr: res.data.nonceStr, // 必填，生成签名的随机串
                signature: res.data.signature, // 必填，签名
                jsApiList: ['scanQRCode'] // 必填，需要使用的JS接口列表
            })
            wx.error(function(res:any){
                // that.$toast.message("初始化微信信息失败，当前二维码扫描无法使用,请尽快联系管理员！");
                commonJS.toast("初始化微信信息失败，当前二维码扫描无法使用,请刷新重试")
            })   
            wx.ready(function(){

            })
        })
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
        setInvoiceData((obj)=>{return Object.assign({}, obj, {
            departmentId: storage.getDepartmentId(),
            departmentName: storage.getDepartmentName(),
        }); });
    }

    const changeTime = (date:any) => {
        setInvoiceData((obj)=>{return Object.assign({}, obj, {
            financeTime: dateFormat(date)
        }); });
    }

    const dateFormat = (val:Date) => {
        return moment(val).format("YYYY-MM-DD");
    }

    const scanClick = () => {
            wx.scanQRCode({
            needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
            scanType: ["qrCode", "barCode"], // 可以指定扫二维码还是一维码，默认二者都有
            success: function(res:any) {
                var arr = res.resultStr.split(','); 
                if(arr.length <= 1) {
                    commonJS.toast("虚拟机");
                    return;
                }
                setInvoiceData((obj:any)=>{
                    return Object.assign({}, obj, {
                        invoiceCode: arr[2],
                        invoiceNum: arr[3],
                        invoiceDate: arr[5].slice(0,8),
                        taget: arr[6].length > 6 ? arr[6].slice(-6) : arr[4],
                        special: arr[6].length > 6 ? 0 : 1,
                    })
                })  
                
                let queryData = JSON.parse(JSON.stringify(invoiceData));
                if(queryData.departmentId == '') {
                    queryData.departmentId = 0;
                }
                if(!(invoiceData.taxName[0] == '[' && invoiceData.taxName[invoiceData.taxName.length - 1] == (']'))) {
                    commonJS.toast('当前组织税号信息不完整，请前往PC端补全税号');
                    return;
                }
                // that.$Loading('正在查验');
                commonJS.post("/invoice/v1/qrInvoiceIn?userName="+storage.getUserName(), queryData,function(res:any){
                    // that.data = queryData;
                    if(res.code == 200) {
                        commonJS.toast(res.message);
                    }
                    //操作日志
                    // that.$commonJS.saveUserlog(that, '二维码识别', "发票代码："+queryData.invoiceCode+"   发票号码："+queryData.invoiceNum+"   查询结果："+res.message, '发票查验');
                        /**  否连续扫描的情况将进行详情也展示 */
                    if(!continuous){
                        history.push('/invoiceDetails')
                        // that.$router.push({path: '/invoiceDetails', query: {fpdm: arr[2], fphm: arr[3]}})
                    }
                })
            },
            fail: function (res:any){
                alert(JSON.stringify(res))
            },
            error:function(res:any){
                alert(JSON.stringify(res))
            }
        });
    }

    const upload = () => {
        document.getElementById('file')?.click();
    }
    const changeFile = (e: ChangeEvent<HTMLInputElement>) => {
        let that = this; 
        if(e.target.files) {
            let file = e.target.files[0];
        }
        e.target.value = '';
    }
    return (
        <div className="scan">
            <input  type="file"  id="file" accept="image/*"  style={{display: 'none'}} onChange={changeFile} />
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
                        value={invoiceData.departmentId}
                        selectOptions={departmentList}
                    >
                    </MGSelect>
                </div>
                <div className="selectGroup">
                    <label>财务日期</label>
                    <DatePicker
                        mode="date"
                        title="选择日期"
                        extra="请选择"
                        value={new Date(invoiceData.financeTime)}
                        format="YYYY-MM-DD"
                        onChange={changeTime}
                    >
                        <p style={{width: '100%', height: '40px', lineHeight: '40px', paddingLeft: '10px'}}>{invoiceData.financeTime}</p>
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
                    <span>
                        <Switch
                            checked={continuous ? true: false}
                            color="#108EE9"
                            onChange={(val) => {
                            setContinuous(val); 
                            }}
                        />
                    </span>
                    
                    <span style={{paddingRight: '10px', paddingLeft: '50px' }}>现金垫付</span>
                    <span>
                        <Switch
                            checked={invoiceData.pay ? true : false}
                            color="#108EE9"
                            onChange={(val) => {
                                setInvoiceData((obj:any)=>{
                                    return Object.assign({}, obj, {pay: val ? 1 : 0})
                                })
                            }}
                        />
                    </span>
                </div>
            </div>
            <div style={{padding: '0px 10px'}}>
                <WhiteSpace size="lg"/>
                <WhiteSpace size="lg"/>
                <Button type="primary" size="small" onClick={scanClick} >二维码扫描</Button>
                <WhiteSpace />
                <Button style={{backgroundColor: '#3CB371', color: '#fff'}} size="small" onClick={upload}>拍照识别</Button>
            </div>
            
        </div>
    )
}

export default  Scan