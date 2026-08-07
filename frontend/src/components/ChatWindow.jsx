import { useEffect, useRef } from "react";
import ChatBubble from "./ChatBubble";
import WelcomeMessage from "./WelcomeMessage";
import TypingIndicator from "./TypingIndicator";
import { useLanguage } from "../context/LanguageContext";

function ChatWindow() {
  const { t } = useLanguage();

  const chatEndRef = useRef(null);

  const messages = [
    {
      id: 1,
      sender: "bot",
      text: t.firstMessage
    },
    {
      id: 2,
      sender: "bot",
      text: t.ageQuestion
    }
  ];

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({
      behavior: "smooth"
    });
  }, [messages]);

  return (
    <div className="chat-window">

      {messages.map((message) => (
        <ChatBubble
          key={message.id}
          message={message.text}
          sender={message.sender}
        />
      ))}

      <div ref={chatEndRef}></div>

    </div>
  );
}

export default ChatWindow;