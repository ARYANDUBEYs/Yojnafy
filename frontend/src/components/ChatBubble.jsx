function ChatBubble({ text, sender = "bot" }) {
  return (
    <div
      className={`chat-bubble ${
        sender === "user" ? "user-message" : "bot-message"
      }`}
    >
      {text}
    </div>
  );
}

export default ChatBubble;