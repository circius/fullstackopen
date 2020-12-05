const initialState = null

const reducer = (state = initialState, action) => {
  const doNotify = state => {
    return action.data
  }

  switch (action.type) {
    case 'NOTIFY': return doNotify(state)
    case 'DENOTIFY': return null
    default: return state
  }
}

export const notificationSet = (notification, timeout) => dispatch => {
  dispatch({
    type: 'NOTIFY',
    data: notification
  })
  setTimeout(() => dispatch(notificationRemove()), timeout)
}

export const notificationRemove = () => {
  return {
    type: 'DENOTIFY'
  }
}

export default reducer