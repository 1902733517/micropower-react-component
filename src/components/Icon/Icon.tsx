import React, { FC } from 'react';
import { FontAwesomeIcon, FontAwesomeIconProps } from '@fortawesome/react-fontawesome'

import {fas} from '@fortawesome/free-solid-svg-icons'
import { library } from "@fortawesome/fontawesome-svg-core" 
library.add(fas)

export interface IconProps extends FontAwesomeIconProps{
    
}

const Icon:FC<IconProps> = (props) => {
    const {
        className,
        ...restProps
    } = props;
    return (
        <FontAwesomeIcon 
            className={className}
            {...restProps}
        />
    )
}

export default Icon;