import { useEffect, useRef, useState } from "react";

import Navbar from "../Components/Navbar";
import ChatMessage from "../Components/ChatMessage";
import SchemeCard from "../Components/SchemeCard";
import DocumentChecklist from "../Components/DocumentChecklist";

function Home() {
  // =========================
  // Chat messages
  // =========================

  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "bot",
      message:
        "Namaste! I can help you find government schemes you're eligible for. Aap Hindi ya English mein baat kar sakte hain.",
    },
    {
      id: 2,
      sender: "bot",
      message: "What is your age?",
    },
  ]);

  // =========================
  // User input
  // =========================

  const [input, setInput] = useState("");
  const [sessionId, setSessionId] = useState(null);

  // =========================
  // Loading / typing state
  // =========================

  const [isLoading, setIsLoading] = useState(false);

  // =========================
  // Scheme results
  // =========================

  const [schemes, setSchemes] = useState([]);

  // =========================
  // Selected scheme
  // =========================

  const [selectedScheme, setSelectedScheme] = useState(null);

  // =========================
  // Chat window reference
  // =========================

  const chatWindowRef = useRef(null);

  // =========================
  // Automatically scroll to
  // newest message
  // =========================

  useEffect(() => {
    if (chatWindowRef.current) {
      chatWindowRef.current.scrollTop =
        chatWindowRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  // =========================
  // Send message
  // =========================

 const handleSend = async () => {
  const text = input.trim();

  if (!text || isLoading) {
    return;
  }

  setMessages((previousMessages) => [
    ...previousMessages,
    {
      id: Date.now(),
      sender: "user",
      message: text,
    },
  ]);

  setInput("");
  setIsLoading(true);

  const sendWithRetry = async (retries = 1) => {
    try {
      const response = await fetch("/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          session_id: sessionId,
          message: text,
        }),
      });

      if (!response.ok) {
        throw new Error(`Backend returned ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      if (retries > 0) {
        await new Promise((resolve) => setTimeout(resolve, 3000));
        return sendWithRetry(retries - 1);
      }
      throw error;
    }
  };

  try {
    const data = await sendWithRetry(1);

    if (data.session_id) {
      setSessionId(data.session_id);
    }

    setMessages((previousMessages) => [
      ...previousMessages,
      {
        id: Date.now() + 1,
        sender: "bot",
        message: data.reply,
      },
    ]);

    if (data.completed && data.matched_schemes) {
      setSchemes(data.matched_schemes);
    }
  } catch (error) {
    console.error("Chat request failed:", error);

    setMessages((previousMessages) => [
      ...previousMessages,
      {
        id: Date.now() + 1,
        sender: "bot",
        message: `Backend error: ${error.message}`,
      },
    ]);
  } finally {
    setIsLoading(false);
  }
};

  // =========================
  // Enter key
  // =========================

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSend();
    }
  };

  // =========================
  // Open document checklist
  // =========================

  const handleDocuments = (scheme) => {
    setSelectedScheme(scheme);
  };

  // =========================
  // Close document checklist
  // =========================

  const handleCloseDocuments = () => {
    setSelectedScheme(null);
  };

  // =========================
  // Temporary test results
  // =========================

  const showTestResults = () => {
    setSchemes([
      {
        id: 2,
        name: "National Scholarship Portal - Post Matric",
        description:
          "Scholarship for students from economically weaker sections pursuing post-matric education.",
        official_url: "https://scholarships.gov.in/",
        documents: [
          "Aadhaar Card",
          "Income Certificate",
          "Previous Academic Marksheet",
          "Bank Account Details",
        ],
      },
    ]);
  };

  return (
    <div className="app">

      {/* =========================
          Navbar
      ========================== */}

      <Navbar />


      {/* =========================
          Main content
      ========================== */}

      <main className="main-content">

        <div className="chat-container">

          {/* =========================
              Chat window
          ========================== */}

          <div
            className="chat-window"
            ref={chatWindowRef}
          >

            {messages.map((message) => (
              <ChatMessage
                key={message.id}
                sender={message.sender}
                message={message.message}
              />
            ))}

            {/* Loading indicator */}

            {isLoading && (
              <div className="typing-indicator">
                Assistant is typing...
              </div>
            )}

          </div>


          {/* =========================
              Temporary test button
          ========================== */}

          <button
            type="button"
            onClick={showTestResults}
            className="test-results-button"
          >
            Test Scheme Results
          </button>


          {/* =========================
              Scheme results
          ========================== */}

          {schemes.length > 0 && (
            <div className="scheme-results">

              <h2>Eligible Schemes</h2>

              {schemes.map((scheme) => (
                <SchemeCard
                  key={scheme.id}
                  scheme={scheme}
                  onDocuments={handleDocuments}
                />
              ))}

            </div>
          )}


          {/* =========================
              Message input
          ========================== */}

          <div className="message-input-container">

            <input
              className="message-input"
              type="text"
              placeholder={
                isLoading
                  ? "Please wait..."
                  : "Type your message..."
              }
              value={input}
              onChange={(event) => setInput(event.target.value)}
              onKeyDown={handleKeyDown}
              disabled={isLoading}
            />


            {/* Mic button */}

            <button
              className="icon-button"
              type="button"
              aria-label="Voice input"
              disabled={isLoading}
            >
              🎤
            </button>


            {/* Send button */}

            <button
              className="send-button"
              type="button"
              onClick={handleSend}
              aria-label="Send message"
              disabled={isLoading}
            >
              ➤
            </button>

          </div>

        </div>

      </main>


      {/* =========================
          Document checklist
      ========================== */}

      {selectedScheme && (
        <DocumentChecklist
          scheme={selectedScheme}
          onClose={handleCloseDocuments}
        />
      )}

    </div>
  );
}

export default Home;