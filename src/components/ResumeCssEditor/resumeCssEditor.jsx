import { Component } from 'react';
import { connect } from 'react-redux';
import Prism from "prismjs";

//引入样式
import './resumeCssEditor.scss';

//editor与resume的动态样式(数组)
let styles = [`
/*
 * Inspired by
 * https://github.com/smallcatcat-joe/my-resume
 * 大家好，我是smallcatcat
 * 接下来我就写一份我的简历给你们吧
 */

/* 首先给所有元素加上过渡效果 */
* {
    -webkit-transition: all .5s;
    transition: all .5s;
}

/*我们先来点背景吧*/
html {
    color:white;
    background-color: #000000;
}

/*先写个编辑器容器吧*/
.styleEditor {
    float: left;
    border:1px solid white;
    width:40vw;
    height:90vh;
    overflow: auto;
}

/*调整一下编辑器的margin和padding*/
.styleEditor {
    margin:10px 0 0 20px;
    padding:10px 0 0 20px;
}
/*让我想想还需要些什么*/
`,
`
/*
 *对了!我的简历!
 */
.myResume {
    display: block;
    opacity:1;
    color:white;
    background-color:#112B4F;
}
/*还有a标签的字体颜色*/
.myResume a {
    color:white;
}
/*调整一下位置*/
.myResume {
    margin:10px 150px 0 0;
}
/*加点内边距,调整一下宽度吧*/
.myResume {
    width:30vw;
    padding-left: 20px;
}
/*不太喜欢ul的默认样式*/
ul {
    list-style-type:decimal;
    padding:0;
}
/*给title加条下划线如何*/
h2,h3 {
    display: inline-block;
    border-bottom: 1px solid white;
}
/*右移一下work和content*/
.work {
    margin-left:30px;
}
.content {
    margin-left:45px;
} 
`,
`
/*
 *给编辑器加点3D吧
 */
html{
    perspective: 500px;
    -webkit-perspective: 500px;
}
.styleEditor {
    transform: rotateY(10deg) translateX(20px) translateZ(-100px) ;
    -webkit-transform: rotateY(10deg) translateX(20px) translateZ(-80px) ;
}
`
];

let preStylePart = '';
let stylePart = '';
let currentStyle = '';
let currentStyleHtml = '';

class ResumeCssEditor extends Component {
    constructor(props) {
        super(props);
    }

    showStylePart(part) {
        return new Promise((resolve, reject) => {
            //每一次执行,均将前一次执行的样式和后面加入的样式进行累加
            stylePart = preStylePart + styles[part];
            //获取当前stylePart的长度,用于后面停止执行器
            let styleLen = stylePart.length;

            //循环接取stylePart
            let circleToSubstr = setInterval(() => {
                //获取当前截取了的长度
                let len = this.props.currentStyleLen;

                /**
                 * dispatch改变styleLen,
                 * 触发视图更新style标签内的样式,
                 * 还有显示在页面的经过高亮处理的styleHtml
                 */
                currentStyle = stylePart.substr(0,len);
                currentStyleHtml = Prism.highlight(currentStyle, Prism.languages.css);
                this.props.changeStyleLen.bind(this)();

                //始终保持滚动条在最底部
                this.refs.editor.scrollTop = 100000;

                //判断是否结束数组中当前的style
                if (styleLen === len) {
                    clearInterval(circleToSubstr);
                    preStylePart = stylePart;

                    setTimeout(() => {
                        resolve();
                    },2000)
                }
            },40)
        })
    }

    componentDidMount() {
        //初次渲染后开始执行style加载
        (async function () {
            let _ctx = this;
            await _ctx.showStylePart(0);
            await _ctx.showStylePart(1);
            await _ctx.showStylePart(2);
        }.bind(this))();
    }

    render() {
        return (
            <div className="styleEditor" ref="editor">
                <style>
                    {currentStyle}
                </style>
                <div dangerouslySetInnerHTML={{__html: currentStyleHtml}}/>
            </div>
        )
    }
}


//从store中获取数据
let cssStateToProps = function (state) {
    return {
        currentStyleLen:state.currentStyleLen
    }
};

//触发store的方法
let cssDispatchToProps = function (dispatch) {
    return {
        changeStyleLen:function () {
            let len = this.props.currentStyleLen;
            dispatch({
                type:'INCREASE_LEN',
                currentStyleLen:++len
            });
        }
    }
};

//连接组件
export default connect(
    cssStateToProps,
    cssDispatchToProps
)(ResumeCssEditor);