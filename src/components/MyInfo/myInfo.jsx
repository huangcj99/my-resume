import { Component } from 'react';
import { connect } from 'react-redux';
import AM from 'amazeui-react';

//组件
class MyInfo extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        console.log("渲染前");
    }

    componentDidMount() {
        console.log("渲染后");
    }

    render () {
        console.log('渲染时');
        return (
            <p>myInfo</p>
        )
    }
}

//映射store内的state
let myInfoStateToProps = function (state) {
    return {
        maskLayer:state.maskLayer
    }
};

//给组件添加dispatch方法
let myInfoDispatchToProps = (dispatch,ownProps) => {
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
    myInfoStateToProps,
    myInfoDispatchToProps
)(MyInfo)