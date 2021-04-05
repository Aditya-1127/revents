import {createStore} from 'redux'
import {devToolsEnhancer} from 'redux-devtools-extension';
import rootReducer from './rootReducer';

export function ConfigureStore() {
    return createStore(rootReducer, devToolsEnhancer())
}