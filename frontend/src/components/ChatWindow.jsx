// import { useEffect, useRef, useState } from "react";
// import ChatBubble from "./ChatBubble";
// import { useLanguage } from "../context/LanguageContext";

// function ChatWindow({ userMessage, onQuestionChange }) {
//   const { t } = useLanguage();

//   const chatEndRef = useRef(null);
//   const lastProcessedMessage = useRef("");

//   const questions = [
//     t.ageQuestion,
//     t.occupationQuestion,
//     t.incomeQuestion,
//     t.stateQuestion,
//     t.categoryQuestion,
//   ];

//   const [messages, setMessages] = useState([
//     {
//       id: 1,
//       sender: "bot",
//       text: t.firstMessage,
//     },
//     {
//       id: 2,
//       sender: "bot",
//       text: questions[0],
//     },
//   ]);

//   const [currentQuestion, setCurrentQuestion] = useState(0);

  
//   useEffect(() => {
//     setMessages([
//       {
//         id: 1,
//         sender: "bot",
//         text: t.firstMessage,
//       },
//       {
//         id: 2,
//         sender: "bot",
//         text: questions[0],
//       },
//     ]);

//     setCurrentQuestion(0);
//     lastProcessedMessage.current = "";
//   }, [t]);

//   useEffect(() => {
//     if (!userMessage) return;

    
//     if (userMessage === lastProcessedMessage.current) {
//       return;
//     }

//     lastProcessedMessage.current = userMessage;

    
//     setMessages((prev) => [
//       ...prev,
//       {
//         id: Date.now(),
//         sender: "user",
//         text: userMessage,
//       },
//     ]);

    
//     if (currentQuestion < questions.length - 1) {
//       const nextQuestionIndex = currentQuestion + 1;

//       setTimeout(() => {
//         setMessages((prev) => [
//           ...prev,
//           {
//             id: Date.now() + 1,
//             sender: "bot",
//             text: questions[nextQuestionIndex],
//           },
//         ]);

//         setCurrentQuestion(nextQuestionIndex);

//         if (onQuestionChange) {
//           onQuestionChange(nextQuestionIndex);
//         }
//       }, 500);
//     } else {
      
//       setTimeout(() => {
//         setMessages((prev) => [
//           ...prev,
//           {
//             id: Date.now() + 1,
//             sender: "bot",
//             text: t.completedMessage,
//           },
//         ]);

//         if (onQuestionChange) {
//           onQuestionChange("completed");
//         }
//       }, 500);
//     }
//   }, [userMessage, currentQuestion, t, onQuestionChange, questions]);

  
//   useEffect(() => {
//     chatEndRef.current?.scrollIntoView({
//       behavior: "smooth",
//     });
//   }, [messages]);

//   return (
//     <div className="chat-window">
//       {messages.map((message) => (
//         <ChatBubble
//           key={message.id}
//           sender={message.sender}
//           text={message.text}
//         />
//       ))}

//       <div ref={chatEndRef} />
//     </div>
//   );
// }

// export default ChatWindow;

import { useEffect, useRef, useState } from "react";
import ChatBubble from "./ChatBubble";
import { useLanguage } from "../context/LanguageContext";

const API_URL = "http://127.0.0.1:8000";

function ChatWindow({ userMessage, onQuestionChange }) {
  const { t } = useLanguage();

  const chatEndRef = useRef(null);
  const lastProcessedMessage = useRef("");
  const sessionIdRef = useRef(null);

  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "bot",
      text:
        "Namaste! I can help you find government schemes you're eligible for. Aap Hindi ya English mein baat kar sakte hain.",
    },
  ]);

  const [loading, setLoading] = useState(false);
  const [schemes, setSchemes] = useState([]);
  const [pdf, setPdf] = useState(null);

  /*
   * Send message to backend
   */
  useEffect(() => {
    if (!userMessage) return;

    // Prevent the same message from being processed twice
    if (userMessage === lastProcessedMessage.current) {
      return;
    }

    lastProcessedMessage.current = userMessage;

    // Show user's message immediately
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now(),
        sender: "user",
        text: userMessage,
      },
    ]);

    sendMessage(userMessage);
  }, [userMessage]);

  /*
   * Call FastAPI /chat endpoint
   */
  const sendMessage = async (message) => {
    setLoading(true);

    try {
      const requestBody = {
        message: message,
      };

      // IMPORTANT:
      // After the first request, send the same session_id
      // with every subsequent request.
      if (sessionIdRef.current) {
        requestBody.session_id = sessionIdRef.current;
      }

      const response = await fetch(`${API_URL}/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error(`Backend returned ${response.status}`);
      }

      const data = await response.json();

      console.log("BACKEND RESPONSE:", data);

      /*
       * Save session ID returned by backend.
       *
       * This is the important fix for your 404 problem.
       */
      if (data.session_id) {
        sessionIdRef.current = data.session_id;
      }

      /*
       * Display backend reply
       */
      if (data.reply) {
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now() + 1,
            sender: "bot",
            text: data.reply,
          },
        ]);
      }

      /*
       * Conversation is complete
       */
      if (data.completed) {
        if (onQuestionChange) {
          onQuestionChange("completed");
        }

        /*
         * Save matched schemes
         */
        if (Array.isArray(data.matched_schemes)) {
          setSchemes(data.matched_schemes);
        }

        /*
         * Save PDF information
         */
        if (data.pdf) {
          setPdf(data.pdf);
        }
      } else {
        /*
         * Conversation is still continuing.
         *
         * Backend controls the next question,
         * so we do NOT hardcode age/occupation/income/etc.
         */
        if (onQuestionChange) {
          onQuestionChange("next");
        }
      }
    } catch (error) {
      console.error("CHAT BACKEND ERROR:", error);

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 2,
          sender: "bot",
          text: `Backend error: ${error.message}`,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  /*
   * Auto-scroll chat to bottom
   */
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, schemes]);

  return (
    <div className="chat-window">

      {/* Chat messages */}
      {messages.map((message) => (
        <ChatBubble
          key={message.id}
          sender={message.sender}
          text={message.text}
        />
      ))}

      {/* Loading indicator */}
      {loading && (
        <ChatBubble
          sender="bot"
          text="Processing..."
        />
      )}

      {/* Scheme results */}
      {schemes.length > 0 && (
        <div className="scheme-results">
          <h2>Eligible Schemes</h2>

          {schemes.map((scheme) => (
            <div
              key={scheme.id}
              className="scheme-card"
            >
              <h3>{scheme.name}</h3>

              <p>{scheme.description}</p>

              <button
                type="button"
                onClick={() =>
                  alert("Document checklist will be added here.")
                }
              >
                View documents needed
              </button>

              <button
                type="button"
                onClick={() => {
                  if (scheme.official_url) {
                    window.open(
                      scheme.official_url,
                      "_blank",
                      "noopener,noreferrer"
                    );
                  } else {
                    alert("Official portal link not available.");
                  }
                }}
              >
                Official portal link
              </button>
            </div>
          ))}
        </div>
      )}

      {/* PDF download */}
      {pdf?.available && pdf?.download_url && (
        <div className="pdf-section">
          <a
            href={`${API_URL}${pdf.download_url}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Download Scheme Summary PDF
          </a>
        </div>
      )}

      <div ref={chatEndRef} />
    </div>
  );
}

export default ChatWindow;