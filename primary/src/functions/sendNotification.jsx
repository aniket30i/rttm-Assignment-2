export const sendNotification = async (notificationData) => {
  try {
    // Save the notification to your mock API
    const response = await fetch("http://localhost:3070/notifications", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(notificationData),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    console.log("Notification saved to API");

    const ws = new WebSocket("ws://localhost:8080");
    ws.onopen = () => {
      ws.send(JSON.stringify(notificationData));
      console.log("Notification broadcasted via WebSocket");
      ws.close();
    };
  } catch (error) {
    console.error("Failed to send notification:", error);
  }
};
