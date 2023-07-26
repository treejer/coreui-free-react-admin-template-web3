import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  sidebarShow: true,
}

const initSlice = createSlice({
  name: 'init',
  initialState,
  reducers: {
    setSidebarShow: (state) => {
      state.sidebarShow = !state.sidebarShow
    },
  },
})

export const { setSidebarShow } = initSlice.actions
export default initSlice.reducer
