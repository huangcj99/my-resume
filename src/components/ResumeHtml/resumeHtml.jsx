import { connect } from 'react-redux';

import './resumeHtml.scss';

//简历视图的数据
let uiData = {
    imgUrl:'',
    author:'smallcatcat',
    work:'兼职一下nodejs的前端工程师-.-',
    skill:{
        title:'技能',
        content:['前端开发','node开发']
    },
    links:{
        title:'联系方式',
        content:[
            {
                title:'Github',
                link:'https://github.com/smallcatcat-joe'
            },{
                title:'Email',
                link:'smallcatcat.joe@gmail.com'
            }
        ]
    }
};

class ResumeHtml extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="myResume">
                <header>
                    <img src="" alt=""/>
                    <h2>{uiData.author}</h2>
                    <p className="work">{uiData.work}</p>
                </header>
                <section>
                    <h3>{uiData.skill.title}</h3>
                    <ul className="content">
                        {
                            uiData.skill.content.map((skill, idx) => {
                                return (
                                    <li key={idx}>{skill}</li>
                                )
                            })
                        }
                    </ul>
                </section>
                <footer>
                    <h3>{uiData.links.title}</h3>
                    <ul className="content">
                        {
                            uiData.links.content.map((content, idx) => {
                                return (
                                    <li key={idx}>
                                        <h5>{content.title}</h5>
                                        <p>{content.link}</p>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </footer>
            </div>
        )
    }
}

// let htmlStateToProps = function (state) {
//     return {
//
//     }
// };
//
// let htmlDispatchToProps = function (dispatch) {
//     return {
//
//     }
// };

export default connect(
    // htmlStateToProps,
    // htmlDispatchToProps
)(ResumeHtml);