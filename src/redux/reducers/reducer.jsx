import { combineReducers } from 'redux';
import States from '../states/states.jsx';

//改变截取字符串长度的reducer
let currentStyleLen = function (state = States.currentStyleLen, action) {
    switch (action.type) {
        case 'INCREASE_LEN':
            return action.currentStyleLen;
        default:
            return state;
    }
};

let reducers = {
    currentStyleLen
};

export default combineReducers(reducers);