
import React, { FC, memo, useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { renderRoutes } from 'react-router-config'
import { withRouter} from 'react-router-dom'
import store from '../../redux/store'
// import {add,reduce}  from '../../redux/action'


const White = (props:any)=>{
    return (
        <div>
            {/* <span>{count}</span>
            <button onClick={() => dispatch(reduce(count))}>-</button>
            <button onClick={() => dispatch(add(count))}>+</button> */}
            空白页面
            <div className="content">
                {
                    renderRoutes(props.route.routes)
                }
            </div>
        
        </div>
    )
}

export default memo(withRouter(White));