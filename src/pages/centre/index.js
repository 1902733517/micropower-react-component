import React, { useEffect } from 'react'
import "./index.scss"

class Centre extends React.Component{

    state = {
        navList: [],
        current: "", 
    }

    componentDidMount () {
        var that = this;
        React.$commonJS.get('userinfo/v1/getLeftMenuList?organId='+React.$storage.getOrganId()+'&userId='+React.$storage.getUserId()+"&phone=1", function (res) {
            if(res.code == 200) {
                that.setState({
                    navList: res.data,
                    current: 0,
                })
            }
        })
    }

    childrenItem () {
        if(this.state.current === '') {
            return ''
        } else {
            return(
                this.state.navList[this.state.current].children.map((item)=>{
                    return (
                        <div className="rightItem" key={item.id}>
                            <div className="icons">
                                
                                <svg className="icon" aria-hidden={true}>
                                    <use xlinkHref={`#${item.icon.trim()}`}></use>
                                </svg>
                            </div>
                            <p>{item.title}</p>
                        </div>
                    )
                })
            )
        }
    }

    render () {
        return (
            <div className="centre">
                <div className="contentLeft">
                    {
                        this.state.navList.map((item, index) => {
                            return (
                                <div className="leftItem"  key={index} onClick={()=>{this.setState({current:index})}}>
                                    {item.title}
                                </div>
                            )
                        })
                    }
                </div>
                <div className="contentRight">
                    {this.childrenItem()}
                </div>
            </div>
        )
    }
}

export default Centre