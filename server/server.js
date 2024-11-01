const WebSocket = require("ws");
const wss = new WebSocket.Server({ port: 8080 });

const broadcastNotification = (notificationData) => {
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(notificationData));
    }
  });
};

wss.on("connection", (ws) => {
  console.log("Client connected");

  ws.send(JSON.stringify({ message: "Welcome to the notification server!" }));

  ws.on("message", (message) => {
    console.log(`Received message: ${message}`);
    const notificationData = JSON.parse(message);
    broadcastNotification(notificationData);
  });

  ws.on("close", () => {
    console.log("Client disconnected");
  });
});

console.log("WebSocket server is running on ws://localhost:8080");
