import { createStore, combineReducers } from 'redux'
import { devToolsEnhancer } from 'redux-devtools-extension'
import tellReducer from './reducers/tellReducer'
import blogsReducer from './reducers/blogsReducer'

const reducer = combineReducers({
  tell: tellReducer,
  blogs: blogsReducer
})
export const store = createStore(reducer, devToolsEnhancer())