import { Component } from 'react';
import { connect } from 'react-redux';

class Beauty extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <p>beauty</p>
        )
    }
}

//映射store内的state
let beautyStateToProps = function (state) {
    return {
        maskLayer:state.maskLayer
    }
};

//给组件添加dispatch方法
let beautyDispatchToProps = (dispatch,ownProps) => {
    return {
        showMask:function (show) {
            dispatch({
                type:"MASK",
                maskLayer:!show
            });
        }
    }
};

export default connect(
    beautyStateToProps,
    beautyDispatchToProps
)(Beauty);