function ChatBubble({ sender, text }) {
  return (
    <div
      className={sender === "bot" ? "bot-message" : "user-message"}
    >
      {text}
    </div>
  );
}

export default ChatBubble;