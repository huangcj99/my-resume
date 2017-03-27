import { applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';

let middlewares = [
    thunk
    // createLogger()
];

export default applyMiddleware(...middlewares);