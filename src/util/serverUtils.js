import storage from  './storage';
import commonJS from './commonJS';

let serverUtils = {

}

//获取合同 (otherSeach 过滤apply)
serverUtils.getContractListByOrganID = function (query, listName, callBack, replaceQuery) {
    var data = {organID: storage.getOrganId(), companyID: storage.getCompanyId(), byUserID: storage.getUserId(), organId: storage.getOrganId(), companyId: storage.getCompanyId(), byUserId: storage.getUserId(), 
                organAuthorize: storage.getOrganAuthorize(), departmentAuthorize: storage.getDepartmentAuthorize(), otherSeach: [{name: "apply", type: "brace", expression: "in", value: "1,9"}]}
    
                if(query!=null){data = commonJS.merge2Json(data, query);}
    if(replaceQuery == true) {
        data = Object.assign(data, query);
    }
    serverUtils.getListByOrganID('contract/v1/getOutcontractList', data, listName, callBack, 'records')
} 




serverUtils.getListByOrganID = function (url, data, listName, callBack, type) {
    commonJS.post (url+'?pageNum=1&pageSize=500', data, function (res) {
        if(callBack!=undefined){
			callBack(res);
		}else{
            // that[listName] = res.data[type ? type : 'list'];
		}
    })
}

