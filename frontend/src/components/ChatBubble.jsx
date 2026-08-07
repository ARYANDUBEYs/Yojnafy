function ChatBubble({ sender, text }) {
  return (
    <div
      className={`chat-bubble ${
        sender === "bot" ? "bot-message" : "user-message"
      }`}
    >
      {text}
    </div>
  );
}

export default ChatBubble;