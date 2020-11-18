import React,{ useState, useEffect, useCallback} from 'react'
import './scan.scss';
import Select from '../../components/Select/index'
import Option from '../../components/Select/option'
function Scan(props) {
    
    const [seach, setSeach] = useState('');
    const [list, setList] = useState([{id:'1', name: '语文书'},{id:'2', name: '数学'},{id:'3', name: '英语'}]);

    return (
        <div className="scan">
            <div className="selectGroup">
                <label>
                    财务组织
                </label>
                <Select
                    showSearch
                    onSelect={() =>{}}
                    style={{borderTop: '0px',borderLeft: '0px',borderRight: '0px', boxShadow: '0px 0px 0px #fff'}}
                >
                    {list.map(item => {
                        return <Option value={item.id} key={item.id}>{item.name}</Option>
                    })}
                </Select>
            </div>
            <div style={{height: '1500px'}}></div>
        </div>
    )
}

export default  Scan