import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    id: null,
    login: null,
    color: null,
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.id = action.payload.id;
            state.login = action.payload.username;
            state.color = action.payload.color;
        },
    },
})

export const {setUser} = userSlice.actions
export const userObj = state => state.user;

export default userSlice.reducer