// websocket-server.js
const WebSocket = require('ws');

let wss;

function createWebSocketServer(server) {
  if (!wss) {
    wss = new WebSocket.Server({ server });
  }
  return wss;
}

function getWebSocketServer() {
  if (!wss) {
    throw new Error('WebSocket Server not created yet');
  }
  return wss;
}

module.exports = { createWebSocketServer, getWebSocketServer };
