import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  userInfo: sessionStorage.getItem('userInfo')
    ? JSON.parse(sessionStorage.getItem('userInfo'))
    : null,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserInfo: (state, action) => {
      state.userInfo = action.payload
      sessionStorage.setItem('userInfo', JSON.stringify(action.payload))
    },
    logout: state => {
      state.userInfo = null
      sessionStorage.removeItem('userInfo')
    },
  },
})

export const { setUserInfo, logout } = userSlice.actions
export default userSlice.reducer
