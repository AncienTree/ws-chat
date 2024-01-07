const express = require("express");
const http = require("http");
const { createWebSocketServer } = require("./websocketServer");
const {
  handleReceivedMessage,
  handleSendMessage,
  handleSendMessageToAll,
} = require("./services/messageService");
const { getActiveUsers } = require("./services/userService");
const { v4: uuidv4 } = require("uuid");

const app = express();
const server = http.createServer(app);
const wss = createWebSocketServer(server);

// WebSocket handling
wss.on("connection", (ws) => {
  // Creating new id for user
  const userId = uuidv4();

  // Handle all receive massage
  handleReceivedMessage(ws, userId);

  const activeUsers = {
    type: "users",
    content: getActiveUsers(),
  };

  // Send on connection list of active users
  handleSendMessage(ws, activeUsers);

  // WebSocket close handling
  ws.on("close", (code) => {
    // removeUser(userId);

    // Notify other when a user leaves
    const leftUserMessage = {
      type: "userLeft",
      content: { userId },
    };
    handleSendMessageToAll(leftUserMessage);

    if (code === 1000) {
      console.log(`The connection to user ${userId} was closed`);
    } else {
      console.log(`The connection to user ${userId} was suddenly lost`);
    }
  });
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
