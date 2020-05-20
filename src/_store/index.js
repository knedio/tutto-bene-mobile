import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '_reducers';

const configureStore = () => createStore(
    rootReducer,
    applyMiddleware(thunk),
);

export default configureStore;

