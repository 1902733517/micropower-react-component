// const defaultState={
//     inputValue:'',
//     data:[
//         {
//             id:1,
//             content:'这是一个帅哥'
//         },
//         {
//             id:2,
//             content:'这是一个小哥哥'
//         },
//         {
//             id:3,
//             content:'这是一个小姐姐'
//         }
//     ]
// }
// export default (state=defaultState,action)=>{
//     // reducer只能接收state，不能改变state
//     if(action.type==='changeInput'){
//         let newState=JSON.parse(JSON.stringify(state)) //深度拷贝
//         newState.inputValue=action.value
        
//         return newState
//     }
//     if(action.type==='ADDITEM'){
//         let newState=JSON.parse(JSON.stringify(state))
//         let obj={
//             id:newState.data.length+1,
//             content: newState.inputValue
//         }
//         newState.data.push(obj)
//         newState.inputValue=''
//         return newState
//     }
//     if(action.type==='DELETEITEM'){
//         let newState=JSON.parse(JSON.stringify(state))
//         let index=newState.data.findIndex(item=>{
//             return item.id===action.id
//         })
//         newState.data.splice(index,1)
//         return newState
//     }
//     return state
// }


const init = {
    number: 0
}

export default (state = init, action) => {
    console.log('aqwe',action)
    switch (action.type) {
        case 'addCount':
            return {...state,number : action.count+1}
        case 'reduceCount':
            return {...state,number : action.count-1}
        default:
            return state
    }
}
