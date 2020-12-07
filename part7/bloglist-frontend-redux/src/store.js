import { createStore, combineReducers } from 'redux'
import { devToolsEnhancer } from 'redux-devtools-extension'
import tellReducer from './reducers/tellReducer'

const reducer = combineReducers({
  tell: tellReducer
})
export const store = createStore(reducer, devToolsEnhancer())