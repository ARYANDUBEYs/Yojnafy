import { useLanguage } from "../context/LanguageContext";

function LanguageSelector() {
  const { language, changeLanguage, t } = useLanguage();

  const handleChange = (event) => {
    changeLanguage(event.target.value);
  };

  return (
    <div className="language-selector">
      <span className="language-icon">🌐</span>

      <select value={language} onChange={handleChange}>
        <option value="en">{t.english}</option>
        <option value="hi">{t.hindi}</option>
      </select>
    </div>
  );
}

export default LanguageSelector;