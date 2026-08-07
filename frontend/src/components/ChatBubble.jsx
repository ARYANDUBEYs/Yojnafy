function ChatBubble({ message, sender = "bot" }) {
  return (
    <div
      className={`chat-bubble ${
        sender === "user" ? "user-message" : "bot-message"
      }`}
    >
      {message}
    </div>
  );
}

export default ChatBubble;