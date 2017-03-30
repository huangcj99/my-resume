import { applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

let middlewares = [
    thunk
];

export default applyMiddleware(...middlewares);