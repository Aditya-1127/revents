import {combineReducers} from 'redux';
import eventReducer from '../../features/events/eventReducer';
import TestReducer from '../../features/sandbox/TestReducer';

const rootReducer = combineReducers({
    test: TestReducer,
    event: eventReducer
})

export default rootReducer;