import React from 'react';
import { connect } from 'react-redux';
import { increment, decrement } from './action';
function mapStateToProps(state) {
  return {
    number: state.number
  };
}


class Counter extends React.Component {
    state = { number: 0 }; // 删除

    increment = () => {
       this.props.dispatch(increment(66));
    };

    decrement = () => {
       this.props.dispatch(decrement());
    };

    render() {
        return (
            <div className="counter">
                <h2>Counter</h2>
                <div>
                    <button style={{width: '50px'}} onClick={this.decrement}>-</button>
                    <span className="count">{ this.props.number }</span>
                    <button style={{width: '50px'}} onClick={this.increment}>+</button>
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps)(Counter);
