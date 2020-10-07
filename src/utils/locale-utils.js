export const locales = {
  ru: "ru-RU",
  ua: "uk-UA",
  en: "en-US",
};

export const pluralize = (count, lang, words) => {
  if (lang === "en") {
    return `${count} ${words[0]}${count > 1 ? "s" : ""}`;
  } else {
    let cases = [2, 0, 1, 1, 1, 2];
    return (
      count +
      " " +
      words[
        count % 100 > 4 && count % 100 < 20 ? 2 : cases[Math.min(count % 10, 5)]
      ]
    );
  }
};
