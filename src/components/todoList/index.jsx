import React ,{Component} from 'react'
import { InputItem ,Button } from 'antd-mobile';
import './todolist.less'
import store from '../../redux/store';
class TodoList extends Component{
   constructor(props){
       super(props)
        store.subscribe(this.storeChange)
   }
   state={
       inputValue:'',
       data:[]
   }
   componentDidMount(){
    const {inputValue,data}=store.getState()
    this.setState({
        inputValue,
        data
    })
    
   }
   storeChange=()=>{
       this.setState(store.getState())
   }
    renderItem=()=>{
     return   this.state.data.map(item=>{
        return <h4 onClick={()=>this.deleteItem(item.id)}>{item.content}</h4>
        })
        
      
    }
    changeInput=(e)=>{
        const action={
            type:'changeInput',
            value:e
        }
        store.dispatch(action)
    }
    addItem=()=>{
        const action={
            type:'ADDITEM'
        }
        store.dispatch(action)
    }
    deleteItem=(id)=>{
        const action={
            type:'DELETEITEM',
            id:id
        }
        store.dispatch(action)
    }
    render(){
        return(
            <div>
                <div style={{display:'flex',marginTop:'10px'}}>
                    <InputItem  placeholder="Write Someting"
                    onChange={this.changeInput}
                    value={this.state.inputValue}
                    />
                    <Button type="primary" style={{width:"50px",marginLeft:'10px'}} onClick={this.addItem}>增加</Button>
                </div>
                {this.renderItem()}
            </div>
        )
    }
}
export default TodoList