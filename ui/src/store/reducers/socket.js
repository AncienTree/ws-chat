import {createSlice} from "@reduxjs/toolkit";

export const socketSlice = createSlice({
    name: "socket",
    initialState: {
        connection: null,
    },
    reducers: {
        setConnection: (state, action) => {
            state.connection = action.payload;
        },
    },
});

const {setConnection} = socketSlice.actions;

export const selectConnection = (state) => state.socket.connection;

export const connectToWS = (socket) => (dispatch, getState) => {
    if (!getState().socket.connection) {
        dispatch(setConnection(socket));
    }
};

export const sendMessage = (type, content) => (dispatch, getState) => {
    if (getState().socket.connection) {
        const handleData = {
            type,
            content
        }
        getState().socket.connection.send(JSON.stringify(handleData));
        // dispatch(setConnection(socket));
    }
};

export default socketSlice.reducer;
