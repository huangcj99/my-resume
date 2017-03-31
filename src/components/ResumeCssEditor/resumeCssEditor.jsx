import { connect } from 'react-redux';
import Prism from "prismjs";

import './resumeCssEditor.scss';

let cssDate = [
    `/*
* Inspired by
* https://github.com/Wscats/CV
* http://strml.net
* https://github.com/jirengu-inc/animating-resume
* 大家好，我是Wscats 
* 好多公司都在招聘，你是不是也在准备简历呀。
* 说做就做，我也来写一份简历！
*/

/* 首先给所有元素加上过渡效果 */
* {
  -webkit-transition: all .3s;
  transition: all .3s;
}
/* 白色背景太单调了，我们来点背景 */
html {
  color: rgb(222,222,222); background: rgb(0,43,54); 
}
/* 文字离边框太近了 */
.styleEditor {
  padding: .5em;
  border: 1px solid;
  margin: .5em;
  overflow: auto;
  width: 45vw; height: 90vh;
}
/* 代码高亮 */
.token.selector{ color: rgb(133,153,0); }
.token.property{ color: rgb(187,137,0); }
.token.punctuation{ color: yellow; }
.token.function{ color: rgb(42,161,152); }

/* 加点 3D 效果呗 */
html{
  -webkit-perspective: 1000px;
          perspective: 1000px;
}
.styleEditor {
  position: fixed; left: 0; top: 0; 
  -webkit-transition: none; 
  transition: none;
  -webkit-transform: rotateY(10deg) translateZ(-100px) ;
          transform: rotateY(10deg) translateZ(-100px) ;
}

/* 接下来我给自己准备一个编辑器 */
.resumeEditor{
  position: fixed; right: 0; top: 0;
  padding: .5em;  margin: .5em;
  width: 48vw; height: 90vh; 
  border: 1px solid;
  background: white; color: #222;
  overflow: auto;
}
/* 好了，我开始写简历了 */


`,
    `
/* 这个简历好像差点什么
 * 对了，这是 Markdown 格式的，我需要变成对 HR 更友好的格式
 * 简单，用开源工具翻译成 HTML 就行了
 */
`
    ,
    `
/* 再对 HTML 加点样式 */
.resumeEditor{
  padding: 2em;
}
.resumeEditor h2{
  display: inline-block;
  border-bottom: 1px solid;
  margin: 1em 0 .5em;
}
.resumeEditor ul,.resumeEditor ol{
  list-style: none;
}
.resumeEditor ul> li::before{
  content: '•';
  margin-right: .5em;
}
.resumeEditor ol {
  counter-reset: section;
}
.resumeEditor ol li::before {
  counter-increment: section;            
  content: counters(section, ".") " ";  
  margin-right: .5em;
}
.resumeEditor blockquote {
  margin: 1em;
  padding: .5em;
  background: #ddd;
}
`];

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
    background-color: #112b4f;
}

/*先写个编辑器容器吧*/
.styleEditor {
    border:1px solid white;
    width:45vw;
    height:85vh;
    overflow: auto;
}
`,

`
/*
 *让我想想还需要些什么
 *对了!得先把简历显示出来
 */
`
];

class ResumeCssEditor extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {

        setInterval(() => {
            this.props.changeCssLen.bind(this)();
        },30);
    }

    render() {
        let styleHtml = Prism.highlight(styles.substr(0,this.props.cssLen),Prism.languages.css);
        this.
        return (
            <div className="styleEditor" ref="editor">
                <style>
                    {
                        styles.substr(0,this.props.cssLen)
                    }
                </style>
                <div dangerouslySetInnerHTML={{__html: styleHtml}}/>
            </div>
        )
    }
}

let cssStateToProps = function (state) {
    return {
        cssLen:state.cssLen
    }
};

let cssDispatchToProps = function (dispatch) {
    return {
        changeCssLen:function () {
            let len = this.props.cssLen;
            dispatch({
                type:'INCREASE_LEN',
                len:++len
            });
        }
    }
};
export default connect(
    cssStateToProps,
    cssDispatchToProps
)(ResumeCssEditor);