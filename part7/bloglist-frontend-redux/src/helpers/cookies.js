import { userTokenKey } from '../config'

export const getUserCookie = () => window.localStorage.getItem(userTokenKey)
export const setUserCookie = (userJSON) => window.localStorage.setItem(userTokenKey, userJSON)
export const unsetUserCookie = () => window.localStorage.removeItem(userTokenKey)
