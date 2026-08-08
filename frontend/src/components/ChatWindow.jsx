import { useEffect, useRef, useState } from "react";
import ChatBubble from "./ChatBubble";
import { useLanguage } from "../context/LanguageContext";

function ChatWindow({ userMessage, onQuestionChange }) {
  const { t } = useLanguage();

  const chatEndRef = useRef(null);
  const lastProcessedMessage = useRef("");

  const questions = [
    t.ageQuestion,
    t.occupationQuestion,
    t.incomeQuestion,
    t.stateQuestion,
    t.categoryQuestion,
  ];

  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "bot",
      text: t.firstMessage,
    },
    {
      id: 2,
      sender: "bot",
      text: questions[0],
    },
  ]);

  const [currentQuestion, setCurrentQuestion] = useState(0);

  
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
        text: questions[0],
      },
    ]);

    setCurrentQuestion(0);
    lastProcessedMessage.current = "";
  }, [t]);

  useEffect(() => {
    if (!userMessage) return;

    
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

    
    if (currentQuestion < questions.length - 1) {
      const nextQuestionIndex = currentQuestion + 1;

      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now() + 1,
            sender: "bot",
            text: questions[nextQuestionIndex],
          },
        ]);

        setCurrentQuestion(nextQuestionIndex);

        if (onQuestionChange) {
          onQuestionChange(nextQuestionIndex);
        }
      }, 500);
    } else {
      
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now() + 1,
            sender: "bot",
            text: t.completedMessage,
          },
        ]);

        if (onQuestionChange) {
          onQuestionChange("completed");
        }
      }, 500);
    }
  }, [userMessage, currentQuestion, t, onQuestionChange, questions]);

  
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  return (
    <div className="chat-window">
      {messages.map((message) => (
        <ChatBubble
          key={message.id}
          sender={message.sender}
          text={message.text}
        />
      ))}

      <div ref={chatEndRef} />
    </div>
  );
}

export default ChatWindow;