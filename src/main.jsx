import ReactDOM from 'react-dom';
import { Provider }from 'react-redux';
import Store from './redux/store/store.jsx';

//引入样式
import './common_style/reset.scss';
import 'prismjs/themes/prism-okaidia.css'

//引入组建
import App from './app.jsx';

ReactDOM.render(
    (
        <Provider store={Store}>
            <App />
        </Provider>
    ),
    document.getElementById('container')
);