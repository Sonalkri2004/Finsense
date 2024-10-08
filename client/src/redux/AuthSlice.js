import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user: null
}
const AuthSlice = createSlice({
    name: "Auth",
    initialState: initialState,
    reducers: {
        SetUser: (state, action) => {
            state.user = action.payload
        },
        Logout: (state) => {
            state.user = null
        }
    },
})

export const { SetUser, Logout } = AuthSlice.actions
export default AuthSlice.reducer