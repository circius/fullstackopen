export const getUserCookie = userTokenKey => window.localStorage.getItem(userTokenKey)
export const setUserCookie = (userTokenKey, userJSON) => window.localStorage.setItem(userTokenKey, userJSON)
export const unsetUserCookie = userTokenKey => window.localStorage.removeItem(userTokenKey)
