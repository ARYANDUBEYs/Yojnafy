function ChatMessage({ sender, message }) {
  return (
    <div className={`message-row ${sender}`}>
      <div className="message-bubble">
        {message}
      </div>
    </div>
  );
}

export default ChatMessage;