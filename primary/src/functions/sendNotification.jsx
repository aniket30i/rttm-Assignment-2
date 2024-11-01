export const sendNotification = async (notificationData) => {
  try {
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
    console.log("Notification sent successfully");
  } catch (error) {
    console.error("Failed to send notification:", error);
  }
};
