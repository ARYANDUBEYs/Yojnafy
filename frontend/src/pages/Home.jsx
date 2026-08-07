import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import ChatWindow from "../components/ChatWindow";

function Home() {
  return (
    <div className="home-page">

      <Navbar />

      <Hero />

      <main className="chat-container">
        <ChatWindow />
      </main>

    </div>
  );
}

export default Home;