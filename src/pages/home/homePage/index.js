import React from 'react'
import { Carousel, WingBlank } from 'antd-mobile';
import img1 from '../../../../src/assets/images/home/wx1.png'
import img2 from '../../../../src/assets/images/home/wx2.png'
import img3 from '../../../../src/assets/images/home/wx3.png'
import './index.scss'
class HomePage extends React.Component{
    state = {
        data: ['1', '2', '3'],
        imgHeight: 176,
    }

    componentDidMount() {
        // simulate img loading
        // setTimeout(() => {
            this.setState({
                data: [img2, img3, img1],
            });
        // }, 100);
    }

    render () {
        return (
            <div className="lunbo">
                <WingBlank>
                    <Carousel
                        autoplay={true}
                        infinite
                    >
                    {this.state.data.map((val, index) => (
                        <a key={index}>
                            <img
                                src={val}
                                style={{ width: '100%', verticalAlign: 'top' }}
                                onLoad={() => {
                                    window.dispatchEvent(new Event('resize'));
                                    this.setState({ imgHeight: 'auto' });
                                }}
                            />
                        </a>
                    ))}
                    </Carousel>
                </WingBlank>
                <div className="functionGroup">
                    <div className="function" onClick={()=>{this.props.history.push("/scan")}}>
                        <div className="yuan">  
                            <i className="iconfont icon-fapiaochayan" />
                        </div>
                        <p>发票查验</p>
                    </div>
                    <div className="function">
                        <div className="yuan">
                            <i className="iconfont icon-qianshou" />
                        </div>
                        <p>二维码签收</p>
                    </div>
                    <div className="function">
                        <div className="yuan">
                            <i className="iconfont icon-saomiao1" />
                        </div>
                        <p>二维码扫描</p>
                    </div>
                    <div className="function">
                        <div className="yuan">
                            <i className="iconfont icon-paizhao1" />
                        </div>
                        <p>拍照识别</p>
                    </div>
                </div>
            </div>
        )
    }
}

export default HomePage