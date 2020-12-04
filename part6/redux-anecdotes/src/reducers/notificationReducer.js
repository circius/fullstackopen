const initialState = ""

const reducer = (state = initialState, action) => {
  const doNotify = state => {
    return action.data
  }
  switch (action.type) {
    case 'NOTIFY': return doNotify(state)
    default: return state
  }
}

export const notificationChange = notification => {
  return {
    type: 'NOTIFY',
    notification
  }
}

export default reducer