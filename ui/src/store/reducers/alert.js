import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    alert: undefined
}

export const alertSlice = createSlice({
    name: 'alert',
    initialState,
    reducers: {
        setAlert: (state, action) => {
            state.alert = {
                type: action.payload.type,
                message: action.payload.message,
            }
        },
        clearAlert: (state) => {
            state.alert = undefined
        },
    },
})

export const {setAlert, clearAlert} = alertSlice.actions
export const alert = state => state.alert.alert;

export default alertSlice.reducer