import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import Router from './router/router.jsx';
import store from './redux/store/store.jsx';

//引入样式
import './common_style/reset.scss';

// //material事件插件
// import injectTapEventPlugin from 'react-tap-event-plugin';
// injectTapEventPlugin();

ReactDOM.render(
    (
        <Provider store={ store }>
            { Router }
        </Provider>
    ),
    document.getElementById('container')
);