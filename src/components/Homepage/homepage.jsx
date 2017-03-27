import { Component } from 'react';
import { connect } from 'react-redux';
import AM from 'amazeui-react';
import fetch from 'isomorphic-fetch';

//样式
import styles from './homepage.scss';

//AM组件
const Header = AM.Header;
const Navbar = AM.Navbar;
const Modal = AM.Modal;

//组件参数
let headerIcon = {
    // right: [
    //     {
    //         link: '#left-link',
    //         icon: 'user'
    //     }
    // ]
};
let navbarData = [
    {
        title: '主页',
        link: '/#/recommond',
        icon: ''
    },
    {
        title: '护理',
        link: '/#/service',
        icon: ''
    },
    {
        title: '个人中心',
        link: '/#/my_info',
        icon: ''
    }
];

//主页组件
class Homepage extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        setInterval(() => {
            this.props.showMask(this.props.maskLayer);
        },2000);
    }

    componentWillUpdate() {
        console.log('更新前');
    }

    shouldComponentUpdate(nextProps) {
        if (this.props.maskLayer === nextProps.maskLayer) {
            console.log("一样就不渲染");
            return false;
        }
        return true;

    }

    componentDidUpdate() {
        console.log('更新后');
    }

    render () {
        console.log('更新时');
        return (
            <div>
                <div style={{display:this.props.maskLayer ? 'block' : 'none'}}>
                    <Modal type="loading" title="正在加载..." closeViaDimmer={true} />
                </div>
                <Header data={headerIcon} title={this.props.headerTitle} className={styles.header} />
                <div className={ styles.container }>
                    {this.props.children}
                </div>
                <Navbar onSelect={ this.props.changeTitle } data={ navbarData } />
            </div>
        )
    }
}

//映射store内的state
let homepageStateToProps = function (state) {
    return {
        headerTitle:state.headerTitle,
        maskLayer:state.maskLayer
    }
};

//给组件添加dispatch方法
let homepageDispatchToProps = (dispatch,ownProps) => {
    return {
        changeTitle:function (link,e) {
            // console.log(e.target.children[0]);
            if ( e.target.tagName.toLocaleUpperCase() === "SPAN" ) {
                dispatch({
                    type:"HOME_TITLE",
                    title:e.target.innerHTML

                });
            }
            else {
                dispatch({
                    type:"HOME_TITLE",
                    title:e.target.children[0].innerHTML
                });
            }
        },
        showMask:function (show) {
            dispatch({
                type:"MASK",
                maskLayer:!show
            });
        }
    }
};

export default connect(
    homepageStateToProps,
    homepageDispatchToProps
)(Homepage);