// actionTypes.js
export const SET_TOKEN = 'SET_TOKEN'
export const SET_USER = 'SET_USER'
export const SET_SIDEBAR_SHOW = 'SET_SIDEBAR_SHOW'

export const setToken = (token) => ({
  type: SET_TOKEN,
  payload: token,
})

export const setUser = (user) => ({
  type: SET_USER,
  payload: user,
})

export const setSidebarShow = (show) => {
  return {
    type: SET_SIDEBAR_SHOW,
    payload: show,
  }
}
