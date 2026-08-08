import { useLanguage } from "../context/LanguageContext";

function Hero() {
  const { t } = useLanguage();

  return (
    <section className="hero">

      <h1>{t.welcome}</h1>
<p>{t.tagline}</p>
      <p>{t.description}</p>

    </section>
  );
}

export default Hero;