const initialState = null

const reducer = (state = initialState, action) => {
  const doNotify = state => {
    console.log('doNotify!')
    console.log(action)
    return action.data
  }

  switch (action.type) {
    case 'NOTIFY': return doNotify(state)
    case 'DENOTIFY': return null
    default: return state
  }
}

export const notificationSet = notification => {
  return {
    type: 'NOTIFY',
    data: notification
  }
}

export const notificationRemove = () => {
  return {
    type: 'DENOTIFY'
  }
}

export default reducer