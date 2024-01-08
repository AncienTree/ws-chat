import { useState } from "react";
import './tailwind.css'

function App() {
  const [login, setLogin] = useState("");
  const [selectedColor, setSelectedColor] = useState("#3498db");

  const handleLogin = () => {
    console.log(
      `Login: ${login}, Color: ${selectedColor}`
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <span className="text-sm italic grayscale grid place-items-center">Chat Prototype</span>
        <h2 className="text-2xl font-bold mb-6">Logowanie</h2>

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
            placeholder="Twój login"
            value={login}
            onChange={(e) => setLogin(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="color"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Kolor nicka:
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
          Zaloguj się
        </button>
      </div>
    </div>
  );
}

export default App;
