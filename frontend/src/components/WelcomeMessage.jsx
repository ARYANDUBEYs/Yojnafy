import { useLanguage } from "../context/LanguageContext";

function WelcomeMessage() {
  const { t } = useLanguage();

  return (
    <div className="chat-bubble bot-message">
      {t.firstMessage}
    </div>
  );
}

export default WelcomeMessage;