import { Component } from 'react';
import { connect } from 'react-redux';

class Treatment extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <p>treatment</p>
        )
    }
}

//映射store内的state
let treatmentStateToProps = function (state) {
    return {
        maskLayer:state.maskLayer
    }
};

//给组件添加dispatch方法
let treatmentDispatchToProps = (dispatch,ownProps) => {
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
    treatmentStateToProps,
    treatmentDispatchToProps
)(Treatment);