import { connect } from 'react-redux';

class ResumeHtml extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                ResumeHtml
            </div>
        )
    }
}

let htmlStateToProps = function (state) {
    return {

    }
};

let htmlDispatchToProps = function (dispatch) {
    return {

    }
};
export default connect(
    htmlStateToProps,
    htmlDispatchToProps
)(ResumeHtml);