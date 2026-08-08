import { useLanguage } from "../context/LanguageContext";

function LanguageSelector() {
  const { language, changeLanguage } = useLanguage();

  const handleChange = (e) => {
    changeLanguage(e.target.value);
  };

  return (
    <div className="language-selector">
      <span className="language-icon">🌐</span>

      <select value={language} onChange={handleChange}>
        <option value="en">English</option>
        <option value="hi">हिन्दी</option>
      </select>
    </div>
  );
}

export default LanguageSelector;