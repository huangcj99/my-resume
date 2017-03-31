import { connect } from 'react-redux';

//引入组件
import ResumeCssEditor from './components/ResumeCssEditor/resumeCssEditor.jsx';
import ResumeHtml from './components/ResumeHtml/resumeHtml.jsx';

class App extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {

    }

    render() {
        return (
            <div>
                <ResumeCssEditor/>
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