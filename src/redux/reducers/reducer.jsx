import { combineReducers } from 'redux';
import States from '../states/states.jsx';

let currentStylePart = function (state = States.currentStylePart, action) {
    switch (action.type) {
        case 'CHANGE_PART':
            return action.part;
        default:
            return state;
    }
};

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