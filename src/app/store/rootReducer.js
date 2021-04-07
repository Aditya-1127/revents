import {combineReducers} from 'redux';
import authReducer from '../../features/auth/authReducer';
import eventReducer from '../../features/events/eventReducer';
import TestReducer from '../../features/sandbox/TestReducer';
import modalReducer from '../common/modals/modalReducer';

const rootReducer = combineReducers({
    test: TestReducer,
    event: eventReducer,
    modals: modalReducer,
    auth: authReducer
})

export default rootReducer;