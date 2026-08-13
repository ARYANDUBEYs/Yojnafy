import { useEffect, useRef, useState } from "react";
import ChatBubble from "./ChatBubble";
import { useLanguage } from "../context/LanguageContext";
import { sendChatMessage } from "../services/api";

function ChatWindow({ userMessage, onQuestionChange }) {
  const { t } = useLanguage();
  const chatEndRef = useRef(null);
  const lastProcessedMessage = useRef("");

  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "bot",
      text: t.firstMessage,
    },
    {
      id: 2,
      sender: "bot",
      text: t.ageQuestion,
    },
  ]);

  const [sessionId, setSessionId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Reset chat when language changes
  useEffect(() => {
    setMessages([
      {
        id: 1,
        sender: "bot",
        text: t.firstMessage,
      },
      {
        id: 2,
        sender: "bot",
        text: t.ageQuestion,
      },
    ]);
    setSessionId(null);
    lastProcessedMessage.current = "";
  }, [t]);

  // Process submitted message
  useEffect(() => {
    if (!userMessage || !userMessage.trim()) return;

    if (userMessage === lastProcessedMessage.current) {
      return;
    }
    lastProcessedMessage.current = userMessage;

    setMessages((prev) => [
      ...prev,
      {
        id: Date.now(),
        sender: "user",
        text: userMessage,
      },
    ]);

    setIsLoading(true);

    sendChatMessage(sessionId, userMessage)
      .then((data) => {
        if (data.session_id) {
          setSessionId(data.session_id);
        }

        setMessages((prev) => [
          ...prev,
          {
            id: Date.now() + 1,
            sender: "bot",
            text: data.reply,
          },
        ]);

        if (data.completed && data.matched_schemes) {
          if (onQuestionChange) {
            onQuestionChange("completed", data.matched_schemes);
          }
        }
      })
      .catch((error) => {
        console.error("Chat request failed:", error);
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now() + 1,
            sender: "bot",
            text: `Backend error: ${error.message}`,
          },
        ]);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [userMessage, sessionId]);

  // Auto-scroll
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, isLoading]);

  return (
    <div className="flex flex-col gap-5 p-5 sm:p-7">
      {messages.map((message) => (
        <ChatBubble
          key={message.id}
          text={message.text}
          sender={message.sender}
        />
      ))}

      {isLoading && (
        <div className="text-sm italic text-slate-400 px-2">
          Assistant is typing...
        </div>
      )}

      <div ref={chatEndRef} />
    </div>
  );
}

export default ChatWindow;