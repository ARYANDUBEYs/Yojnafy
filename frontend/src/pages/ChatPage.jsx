import { useState } from "react";
import Navbar from "../components/Navbar";
import ChatWindow from "../components/ChatWindow";
import { useTheme } from "../context/ThemeContext";

function ChatPage({ onComplete }) {
  const { darkMode } = useTheme();

  const [input, setInput] = useState("");
  const [submittedMessage, setSubmittedMessage] = useState("");
  const [isCompleted, setIsCompleted] = useState(false);

  const handleSend = () => {
    const message = input.trim();

    if (!message || isCompleted) return;

    setSubmittedMessage(message);
    setInput("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  const handleQuestionChange = (question) => {
    if (question === "completed") {
      setIsCompleted(true);

      if (onComplete) {
        onComplete([]);
      }
    }
  };

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        darkMode ? "bg-slate-950 text-white" : "bg-slate-50 text-slate-900"
      }`}
    >
      <Navbar />

      {/* Main Chat Area */}
      <main className="mx-auto flex w-full max-w-5xl flex-col px-4 py-6 sm:px-6 lg:py-8">
        {/* Chat Header */}
        <div
          className={`mb-4 flex items-center justify-between rounded-2xl border px-5 py-4 shadow-sm transition-all duration-300 ${
            darkMode
              ? "border-slate-800 bg-slate-900 shadow-black/20"
              : "border-slate-200 bg-white"
          }`}
        >
          <div className="flex items-center gap-3">
            <div className="relative flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-md">
              ✨
              <span
                className={`absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 ${
                  darkMode ? "border-slate-900" : "border-white"
                } bg-emerald-500`}
              />
            </div>

            <div>
              <h2
                className={`font-semibold transition-colors ${
                  darkMode ? "text-white" : "text-slate-900"
                }`}
              >
                YojnaFy Assistant
              </h2>

              <p className="text-xs text-emerald-500 dark:text-emerald-400">
                Online · Ready to help
              </p>
            </div>
          </div>

          {/* Progress */}
          <div className="hidden text-right sm:block">
            <p
              className={`text-xs font-medium transition-colors ${
                darkMode ? "text-slate-500" : "text-slate-400"
              }`}
            >
              SCHEME DISCOVERY
            </p>

            <p
              className={`text-sm font-semibold transition-colors ${
                darkMode ? "text-slate-200" : "text-slate-700"
              }`}
            >
              Answer a few questions
            </p>
          </div>
        </div>

        {/* Chat container */}
        <div
          className={`overflow-hidden rounded-3xl border shadow-xl transition-all duration-300 ${
            darkMode
              ? "border-slate-800 bg-slate-900 shadow-black/30"
              : "border-slate-200 bg-white shadow-slate-900/5"
          }`}
        >
          {/* Messages */}
          <div
            className={`min-h-[55vh] max-h-[65vh] overflow-y-auto transition-colors duration-300 ${
              darkMode
                ? "bg-gradient-to-b from-slate-900 to-slate-950"
                : "bg-gradient-to-b from-slate-50/80 to-white"
            }`}
          >
            <ChatWindow
              userMessage={submittedMessage}
              onQuestionChange={handleQuestionChange}
            />
          </div>

          {/* Input */}
          {!isCompleted && (
            <div
              className={`border-t p-4 transition-colors duration-300 sm:p-5 ${
                darkMode
                  ? "border-slate-800 bg-slate-900"
                  : "border-slate-200 bg-white"
              }`}
            >
              <div
                className={`flex items-center gap-3 rounded-2xl border p-2 transition-all ${
                  darkMode
                    ? "border-slate-700 bg-slate-800 focus-within:border-blue-500 focus-within:bg-slate-800 focus-within:ring-4 focus-within:ring-blue-500/10"
                    : "border-slate-200 bg-slate-50 focus-within:border-blue-400 focus-within:bg-white focus-within:ring-4 focus-within:ring-blue-500/10"
                }`}
              >
                {/* Input */}
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Type your answer..."
                  className={`min-w-0 flex-1 bg-transparent px-3 py-3 text-sm outline-none transition-colors ${
                    darkMode
                      ? "text-white placeholder:text-slate-500"
                      : "text-slate-800 placeholder:text-slate-400"
                  }`}
                />

                {/* Mic */}
                <button
                  type="button"
                  className={`hidden h-11 w-11 items-center justify-center rounded-xl transition sm:flex ${
                    darkMode
                      ? "text-slate-400 hover:bg-slate-700 hover:text-slate-200"
                      : "text-slate-500 hover:bg-slate-200 hover:text-slate-700"
                  }`}
                  title="Voice input"
                >
                  🎙️
                </button>

                {/* Send */}
                <button
                  type="button"
                  onClick={handleSend}
                  disabled={!input.trim()}
                  className="flex h-11 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-5 text-sm font-semibold text-white shadow-md shadow-blue-600/20 transition hover:-translate-y-0.5 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:translate-y-0"
                >
                  <span className="hidden sm:inline">Send</span>
                  <span>➤</span>
                </button>
              </div>

              <p
                className={`mt-3 text-center text-xs transition-colors ${
                  darkMode ? "text-slate-500" : "text-slate-400"
                }`}
              >
                Your answers help us find relevant government schemes.
              </p>
            </div>
          )}

          {/* Completion state */}
          {isCompleted && (
            <div
              className={`border-t px-5 py-6 text-center transition-colors ${
                darkMode
                  ? "border-slate-800 bg-slate-900"
                  : "border-slate-200 bg-white"
              }`}
            >
              <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/10 text-xl text-emerald-500">
                ✓
              </div>

              <p
                className={`font-semibold transition-colors ${
                  darkMode ? "text-white" : "text-slate-800"
                }`}
              >
                We've got everything we need.
              </p>

              <p
                className={`mt-1 text-sm transition-colors ${
                  darkMode ? "text-slate-400" : "text-slate-500"
                }`}
              >
                Finding schemes that may be relevant to you...
              </p>
            </div>
          )}
        </div>

        {/* Privacy note */}
        <div
          className={`mt-5 flex items-center justify-center gap-2 text-xs transition-colors ${
            darkMode ? "text-slate-500" : "text-slate-400"
          }`}
        >
          <span>🔒</span>
          Your information is used only to find relevant schemes.
        </div>
      </main>
    </div>
  );
}

export default ChatPage;
