import {useEffect} from "react";
import Home from "./pages/home/home";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {connectToWS, selectConnection} from "./store/reducers/socket";
import Alerts from "./components/alerts/alerts.jsx";
import {setAlert} from "./store/reducers/alert.js";
import {userObj} from "./store/reducers/user.js";
import Chat from "./pages/chat/chat.jsx";

function App() {
    const dispatch = useDispatch();
    const user = useSelector(userObj);
    const socketConnection = useSelector(selectConnection);

    useEffect(() => {
        const socket = new WebSocket("ws://localhost:3000");

        // Nasłuchiwanie na zdarzenia
        socket.addEventListener("open", () => {
            dispatch(connectToWS(socket));
        });

        // handle error message
        socket.addEventListener('message', (event) => {
            const data = JSON.parse(event.data);
            if (data?.type === 'error') {
                console.error(data)
                dispatch(setAlert({type: 'error', message: data.content}))
            }
        });

        return () => {
            if (socketConnection) {
                socketConnection.close();
            }
        };
    }, []);

    console.log('user', user)

    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    {user?.login &&
                        <>
                            <Route path="/chat" element={<Chat/>}/>
                        </>
                    }
                </Routes>
            </BrowserRouter>

            <Alerts/>
        </>

    );
}

export default App;
