import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import tellReducer from './reducers/tellReducer'
import blogsReducer from './reducers/blogsReducer'
import currentUserReducer from './reducers/currentUserReducer'
import usersReducer from './reducers/usersReducer'
import warnReducer from './reducers/warnReducer'

const reducer = combineReducers({
  tell: tellReducer,
  blogs: blogsReducer,
  currentUser: currentUserReducer,
  users: usersReducer,
  warn: warnReducer
})
export const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)))