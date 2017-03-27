import { createStore } from 'redux';
import Reducers from '../reducers/reducer.jsx';
import Middlewares from '../middleware/middleware.jsx';

let store = createStore(
    Reducers,
    Middlewares
);

export default store;