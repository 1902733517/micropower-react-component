import { act } from "react-dom/test-utils"

// const init = {
//     number: 0
// }
// const reducer = (state = init, action) => {
//     switch (action.type) {
//         case 'INCREMENT':
//             return {...state, number: state.number+1}
//         case 'DECREMENT':
//             return {...state, number: state.number-1}
//         case 'RESET':
//             return({...state, number: 0})
//         default:
//             return state
//     }
// }

const init = {
    routerList: []
}

const reducer = (state = init, action) => {
    switch(action.type) {
        case 'ADD-ROUTERS':
            return {...state, routerList: action.value}
        default:
            return state
    }
}

export default reducer
