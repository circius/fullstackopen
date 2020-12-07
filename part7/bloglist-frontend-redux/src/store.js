import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import tellReducer from './reducers/tellReducer'
import blogsReducer from './reducers/blogsReducer'

const reducer = combineReducers({
  tell: tellReducer,
  blogs: blogsReducer
})
export const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)))