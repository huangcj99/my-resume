import { combineReducers } from 'redux';
import States from '../states/states.jsx';

let headerTitle = function (state = States.headerTitle, action) {
    switch (action.type) {
        case "HOME_TITLE":
            return action.title;
        default:
            return state;
    }
};

let maskLayer = function (state = States.maskLayer, action) {
    switch (action.type) {
        case "MASK":
            return action.maskLayer;
        default:
            return state;
    }
};

let reducers = {
    headerTitle,
    maskLayer
};

export default combineReducers(reducers);