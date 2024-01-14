const {getWebSocketServer} = require("../websocketServer");
const WebSocket = require("ws");
const {checkForUsername, addUser} = require("./userService");

/*
  TODO
  * Logout
  * Send Message to global chat
  * DM to user
*/
function handleReceivedMessage(ws, userId) {
    const invalidMessage = {
        type: "error",
        content: "The message type is not supported",
    };

    ws.on("message", (message) => {
        try {
            const msg = JSON.parse(message);
            console.log(`Received message: ${message}`);

            if (!msg.type) {
                handleSendMessage(ws, invalidMessage);
            } else {
                switch (msg.type) {
                    case "login":
                        login(ws, msg, userId);
                        break;

                    default:
                        handleSendMessage(ws, invalidMessage);
                        break;
                }
            }
        } catch (error) {
            console.error("JSON message parsing error:", error.message);
            console.error("Error message parsing:", message);
        }
    });
}

function handleSendMessage(ws, message) {
    try {
        ws.send(JSON.stringify(message));
    } catch (error) {
        console.error("JSON message parsing error:", error.message);
        console.error("Error message parsing:", message);
    }
}

function handleSendMessageToAll(message) {
    try {
        const wss = getWebSocketServer();

        wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify(message));
            }
        });
    } catch (error) {
        console.error("JSON message parsing error:", error.message);
        console.error("Error message parsing:", message);
    }
}

// Add user to the current user list and check if a username is already in array
function login(ws, message, userId) {
    if (message?.content?.username && !checkForUsername(message?.content?.username)) {
        const user = addUser(userId, message.content.username, message.content.color);
        handleSendMessage(ws, {
            type: "successLogin",
            content: JSON.stringify(user),
        });
    } else {
        handleSendMessage(ws, {
            type: "error",
            content: "Username is already taken",
        });
    }
}

module.exports = {
    handleReceivedMessage,
    handleSendMessage,
    handleSendMessageToAll,
};
