import { createStore } from 'redux'
import { devToolsEnhancer } from 'redux-devtools-extension'
import tellReducer from './reducers/tellReducer'

export const store = createStore(tellReducer, devToolsEnhancer())