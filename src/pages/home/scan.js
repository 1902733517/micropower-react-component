import React,{ useState, useEffect, useCallback} from 'react'
import './scan.scss';
import Select from '../../components/Select/index.js'
import Option from '../../components/Select/option.js'
function Scan(props) {
    
    const [seach, setSeach] = useState('');
    const [list, setList] = useState([{id:'1', name: '语文书'},{id:'2', name: '数学'},{id:'3', name: '英语'}]);

    return (
        <div className="scan">
            <div>
                <Select
                    showSearch
                    onSelect={() =>{}}
                >
                    {list.map(item => {
                        return <Option value={item.id} key={item.id}>{item.name}</Option>
                    })}
                </Select>
            </div>
        </div>
    )
}

export default  Scan