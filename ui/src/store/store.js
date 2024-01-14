import {configureStore} from '@reduxjs/toolkit'
import useReducer from './reducers/user'
import socketReducer from './reducers/socket';
import alertReducer from './reducers/alert';

export const store = configureStore({
    reducer: {
        user: useReducer,
        socket: socketReducer,
        alert: alertReducer,
    },

    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        immutableCheck: false,
        serializableCheck: false,
    }),
})