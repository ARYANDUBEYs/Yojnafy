import { useState } from "react";

import Home from "./pages/Home";
import ChatPage from "./pages/ChatPage";
import Results from "./pages/Results";

function App() {
  const [currentPage, setCurrentPage] = useState("home");
  const [results, setResults] = useState([]);

  const handleStart = () => {
    setCurrentPage("chat");
  };

  const handleResults = (schemeResults) => {
    setResults(schemeResults);
    setCurrentPage("results");
  };

  const handleRestart = () => {
    setResults([]);
    setCurrentPage("home");
  };

  return (
    <>
      {currentPage === "home" && (
        <Home onStart={handleStart} />
      )}

      {currentPage === "chat" && (
        <ChatPage onComplete={handleResults} />
      )}

      {currentPage === "results" && (
        <Results
          schemes={results}
          onRestart={handleRestart}
        />
      )}
    </>
  );
}

export default App;