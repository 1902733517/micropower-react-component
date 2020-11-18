import React from 'react'
import { Toast } from 'antd-mobile';
import { TabBar } from 'antd-mobile';
import '../../../src/styles/antDesign.scss'
import HomePage from './homePage'
import Centre from '../centre/index'
import './index.scss'

class TabBarExample  extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            selectedTab: '发票查验',
            fullScreen: true,
            iconList:[
              {path: '/homePage', icon: 'icon-shouye', clickIcon: 'icon-yemian-copy-copy', title: '发票查验'},
              {path: '/contentCenter', icon: 'icon-yun1', clickIcon: 'icon-cloud', title: '微工云'},
              {path: '/todoList', icon: 'icon-icon_db_nor', clickIcon: 'icon-daibandianji', title: '待办事项'},
              {path: '/personalCenter', icon: 'icon-ren1', clickIcon: 'icon-ren', title: '个人中心'}
          ],
        };
    }
    //组件初始化的时候加载一次
    componentWillMount () {
        if(React.$commonJS.checkIsNull(React.$storage.getToken())) {
            Toast.info('请先进行授权', 2);
            if(this.props.history) {
              this.props.history.push('/auth');
            } 
        }
    }

    renderContent(type) {
        let content = '';
        if(type == 1 || type == undefined) {
            content = <HomePage history={this.props.history} />
        } else if(type == 2) {
            content = <Centre history={this.props.history} />
        }
        return (
            <div className="homePage" style={{ backgroundColor: 'white', height: 'calc(100vh - 50px)', textAlign: 'center' }}>
              {content}
            </div> 
        );
    }

    render() {
      console.log(this.state.iconList)
        return (
            <div style={this.state.fullScreen ? { position: 'fixed', height: '100%', width: '100%', top: 0 } : { height: '100vh' }}>
              <TabBar
                unselectedTintColor="#949494"
                tintColor="#33A3F4"
                barTintColor="white"
                hidden={this.state.hidden}
              >
                {
                  this.state.iconList.map((item, index) => {
                    return (
                      <TabBar.Item
                        title={item.title}
                        key={item.title}
                        icon={<i className={`iconfont ${item.icon}`} />}
                        selectedIcon={<i className={`iconfont ${item.clickIcon}`} />}
                        onPress={() => {
                          this.setState({
                            selectedTab: item.title,
                          });
                        }}
                        selected={this.state.selectedTab === item.title}
                      >
                        {this.renderContent(index + 1)}
                      </TabBar.Item>
                    )
                  })
                }
              </TabBar>
            </div>
        )
    }
}

export default TabBarExample
