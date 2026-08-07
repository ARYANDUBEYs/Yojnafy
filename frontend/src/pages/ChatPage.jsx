import Navbar from "../components/Navbar";
import ChatWindow from "../components/ChatWindow";

function ChatPage() {
  return (
    <div className="chat-page">

      <Navbar />

      <main className="chat-container">

        <ChatWindow />

      </main>

    </div>
  );
}

export default ChatPage;