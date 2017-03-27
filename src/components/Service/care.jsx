import { Component } from 'react';
import { connect } from 'react-redux';

class Care extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <p>case</p>
        )
    }
}

//映射store内的state
let careStateToProps = function (state) {
    return {
        headerTitle:state.headerTitle,
    }
};

//给组件添加dispatch方法
let careDispatchToProps = (dispatch,ownProps) => {
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
    careStateToProps,
    careDispatchToProps
)(Care);