
import React, { FC, memo, useEffect } from 'react'
import { renderRoutes } from 'react-router-config'
import { withRouter} from 'react-router-dom'
import store from '../../redux/store'
// import {add,reduce}  from '../../redux/reducer'
import {useSelector,useDispatch} from 'react-redux'
const White = (props:any)=>{
    const count = useSelector((state:any) => state.count.number);
    const dispatch = useDispatch();
  
    useEffect(() => {
        console.log('123',count)
    })
    
    return (
        <div>
             <span>{count}</span>
            {/* <button onClick={() => dispatch(reduce(count))}>-</button>
            <button onClick={() => dispatch(add(count))}>+</button> */}
            <div className="content">
                {
                    renderRoutes(props.route.routes)
                }
            </div>
           
        </div>
    )
}

// export default memo(withRouter(white));
export default White;