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

  // Reset chat when language changess
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

  // Process submitted message
  useEffect(() => {
    if (!userMessage || !userMessage.trim()) return;

    // Don't process the exact same submitted message twice
    if (userMessage === lastProcessedMessage.current) {
      return;
    }

    lastProcessedMessage.current = userMessage;

    // Add user's answer
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now(),
        sender: "user",
        text: userMessage,
      },
    ]);

    // Move to next question immediately
    if (currentQuestion < questions.length - 1) {
      const nextQuestionIndex = currentQuestion + 1;

      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now(),
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
      // All questions completed
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now(),
            sender: "bot",
            text: t.completedMessage,
          },
        ]);

        if (onQuestionChange) {
          onQuestionChange("completed");
        }
      }, 500);
    }
  }, [userMessage, currentQuestion, t]);

  // Auto-scroll
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

return (
  <div className="flex flex-col gap-5 p-5 sm:p-7">
    {messages.map((message) => (
      <ChatBubble
        key={message.id}
        text={message.text}
        sender={message.sender}
      />
    ))}

    <div ref={chatEndRef} />
  </div>
);
}

export default ChatWindow;
