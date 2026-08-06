import WelcomeMessage from "./WelcomeMessage";
import ChatBubble from "./ChatBubble";
import TypingIndicator from "./TypingIndicator";

function ChatWindow() {
  return (
    <div className="chat-window">

      <WelcomeMessage />

      <ChatBubble
        sender="bot"
        text="What is your age?"
      />

      <ChatBubble
        sender="user"
        text="21"
      />

      <TypingIndicator />

    </div>
  );
}

export default ChatWindow;