import { useEffect, useRef, useState } from "react";

import Navbar from "../components/Navbar";
import ChatMessage from "../components/ChatMessage";
import SchemeCard from "../components/SchemeCard";
import DocumentChecklist from "../components/DocumentChecklist";

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

  const handleSend = () => {
    const text = input.trim();

    if (!text || isLoading) {
      return;
    }

    // Add user message
    setMessages((previousMessages) => [
      ...previousMessages,
      {
        id: Date.now(),
        sender: "user",
        message: text,
      },
    ]);

    // Clear input
    setInput("");

    // Show loading state
    setIsLoading(true);

    // Temporary response.
    // This will be replaced with the real
    // FastAPI /chat response later.

    setTimeout(() => {
      setMessages((previousMessages) => [
        ...previousMessages,
        {
          id: Date.now() + 1,
          sender: "bot",
          message:
            "Received. I am processing your information...",
        },
      ]);

      setIsLoading(false);
    }, 800);
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