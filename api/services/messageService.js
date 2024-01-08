const { getWebSocketServer } = require("../websocketServer");
const WebSocket = require("ws");
const { checkForUsername, addUser } = require("./userService");
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

      if (!msg || !msg.type) {
        handleSendMessage(ws, invalidMessage);
      } else {
        switch (message.type) {
          case "login":
            login(ws, message, userId);
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
  if (
    message?.content?.username &&
    !checkForUsername(message?.content?.username)
  ) {
    addUser(userId, message.content.username, message.content.color);
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
