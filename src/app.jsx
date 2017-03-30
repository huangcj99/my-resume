import { connect } from 'react-redux';

//引入组件
import ResumeCss from './components/ResumeCss/resumeCss.jsx';
import ResumeHtml from './components/ResumeHtml/resumeHtml.jsx';

class App extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        setTimeout(() => {
            document.body.style.padding = '0';
            document.body.style.margin = '0';
        },1000)
    }

    render() {
        return (
            <div>
                <ResumeCss/>
                <ResumeHtml/>
            </div>
        )
    }
}

let appStateToProps = function (state) {
    return {

    }
};

let appDispatchToProps = function (dispatch) {
    return {

    }
};
export default connect(
    appStateToProps,
    appDispatchToProps
)(App);