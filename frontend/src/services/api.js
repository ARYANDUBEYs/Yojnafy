export async function sendChatMessage(sessionId, message) {
  const sendWithRetry = async (retries = 1) => {
    try {
      const response = await fetch("/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          session_id: sessionId,
          message: message,
        }),
      });

      if (!response.ok) {
        throw new Error(`Backend returned ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      if (retries > 0) {
        await new Promise((resolve) => setTimeout(resolve, 3000));
        return sendWithRetry(retries - 1);
      }
      throw error;
    }
  };

  return sendWithRetry(1);
}