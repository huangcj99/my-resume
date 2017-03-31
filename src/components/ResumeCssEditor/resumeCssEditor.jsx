import { connect } from 'react-redux';
import Prism from "prismjs";

import './resumeCssEditor.scss';

const styles = [`
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

/*调整一下编辑器的margin*/
.styleEditor {
  margin:10px 0 0 20px;
}
/*让我想想还需要些什么*/
`,
`
/*
 *对了!我的简历!
 */
.myResume {
  display: block;
  opacity:1
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
  -moz-perspective: 500px;
}
.styleEditor {
  transform: rotateY(10deg) translateX(20px) translateZ(-100px) ;
  -webkit-transform: rotateY(10deg) translateX(20px) translateZ(-80px) ;
  -moz-transform: rotateY(10deg) translateZ(-100px);
}
`
];

let styleHtml = '';

class ResumeCssEditor extends React.Component {
    constructor(props) {
        super(props);
    }

    showStylePart(part) {
        return new Promise((resolve, reject) => {
            console.log('1');
            setTimeout(() => {
                resolve();
            },2000)
        })
    }

    componentDidMount() {
        (async function () {
            let _ctx = this;
            await _ctx.showStylePart(0);
            await _ctx.showStylePart(1);
            await _ctx.showStylePart(2);
        }.bind(this))();
    }

    render() {
        let styleHtml = Prism.highlight(styles[0],Prism.languages.css);
        return (
            <div className="styleEditor" ref="editor">
                <style>
                    {

                    }
                </style>
                <div dangerouslySetInnerHTML={{__html: styleHtml}}/>
            </div>
        )
    }
}

let cssStateToProps = function (state) {
    return {
        currentStyleLen:state.currentStyleLen
    }
};

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
export default connect(
    cssStateToProps,
    cssDispatchToProps
)(ResumeCssEditor);