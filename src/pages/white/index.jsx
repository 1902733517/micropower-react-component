
import React, { memo ,useEffect} from 'react'
import { renderRoutes } from 'react-router-config'
import { withRouter} from 'react-router-dom'

export default memo(withRouter(function AllComponent(props) {
    return (
        <div>
            white
            <div className="content">
                {
                renderRoutes(props.route.routes)
                }
            </div>
           
        </div>
    )
}))
