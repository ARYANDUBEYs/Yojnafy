import { useLanguage } from "../context/LanguageContext";

function TypingIndicator() {
  const { t } = useLanguage();

  return (
    <div className="typing-indicator">
      {t.typing}
    </div>
  );
}

export default TypingIndicator;