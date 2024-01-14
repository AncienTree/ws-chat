import {useEffect, useState} from "react";
import './../../tailwind.css'
import {useDispatch, useSelector} from "react-redux";
import {selectConnection, sendMessage} from "../../store/reducers/socket.js";
import {setAlert} from "../../store/reducers/alert.js";
import {setUser, userObj} from "../../store/reducers/user.js";
import {useNavigate} from "react-router-dom";

const Home = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate()

    // Selectors
    const socketConnection = useSelector(selectConnection);
    const user = useSelector(userObj);

    const [login, setLogin] = useState("");
    const [selectedColor, setSelectedColor] = useState("#3498db");
    const [currentOnline, setCurrentOnline] = useState(0);

    useEffect(() => {
        if (socketConnection) {
            socketConnection.addEventListener('message', (event) => {
                const data = JSON.parse(event.data);
                if (data?.type === 'onlineUser') {
                    setCurrentOnline(data?.content?.length);
                } else if (data?.type === 'successLogin') {
                    dispatch(setAlert({type: 'info', message: 'You have logged in successfully'}));
                    dispatch(setUser(JSON.parse(data?.content)));
                    navigate('/chat');
                }
            });
        }
    }, [socketConnection]);

    useEffect(() => {
        if (user?.login) navigate('/chat');
    }, [user]);

    const handleLogin = () => {
        if (login !== '' && selectedColor) {
            dispatch(sendMessage('login', {
                username: login,
                color: selectedColor
            }))
        } else {
            dispatch(setAlert({type: 'error', message: 'Login and selected color cannot be empty'}))
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded shadow-md w-96">
        <span className="text-sm italic grayscale grid place-items-center">
          Chat Prototype
        </span>
                <h2 className="text-2xl font-bold mb-3">Login to chat</h2>
                <div className="text-sm mb-2">
                    Current online users: {currentOnline}
                </div>

                <div className="mb-4">
                    <label
                        htmlFor="login"
                        className="block text-gray-700 text-sm font-bold mb-2"
                    >
                        Login:
                    </label>

                    <input
                        type="text"
                        id="login"
                        className="w-full border rounded py-2 px-3"
                        placeholder="Your login"
                        value={login}
                        onChange={(e) => setLogin(e.target.value)}
                    />
                </div>

                <div className="mb-4">
                    <label
                        htmlFor="color"
                        className="block text-gray-700 text-sm font-bold mb-2"
                    >
                        Nickname color:
                    </label>
                    <input
                        type="color"
                        id="color"
                        className="w-full h-10"
                        value={selectedColor}
                        onChange={(e) => setSelectedColor(e.target.value)}
                    />
                </div>

                <button
                    className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue w-full"
                    onClick={handleLogin}
                >
                    Log in
                </button>
            </div>
        </div>
    );
};

export default Home;
