import { useEffect, useRef, useState } from "react";
import ChatBubble from "./ChatBubble";
import TypingIndicator from "./TypingIndicator";
import WelcomeMessage from "./WelcomeMessage";

function ChatWindow() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "bot",
      text: "Namaste! I can help you find government schemes you're eligible for. Aap Hindi ya English mein baat kar sakte hain.",
    },
    {
      id: 2,
      sender: "bot",
      text: "What is your age?",
    },
  ]);

  const [isTyping, setIsTyping] = useState(false);

  const chatEndRef = useRef(null);

  // Automatically scroll to the latest message
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, isTyping]);

  return (
    <div className="chat-container">

      <div className="chat-window">

        {messages.map((message) => (
          <ChatBubble
            key={message.id}
            sender={message.sender}
            text={message.text}
          />
        ))}

        {isTyping && <TypingIndicator />}

        <div ref={chatEndRef} />

      </div>

    </div>
  );
}

export default ChatWindow;