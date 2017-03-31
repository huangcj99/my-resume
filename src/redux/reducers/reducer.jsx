import { combineReducers } from 'redux';
import States from '../states/states.jsx';

let cssLen = function (state = States.cssLen, action) {
    switch (action.type) {
        case 'INCREASE_LEN':
            return action.len;
        default:
            return state;
    }
};

let reducers = {
    cssLen
};

export default combineReducers(reducers);