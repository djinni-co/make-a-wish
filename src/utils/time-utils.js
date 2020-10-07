import { pluralize } from "./locale-utils";

const _formatDate = (time, locale = "ru") => {
  return time.toLocaleDateString(locale, {
    month: "long",
    day: "numeric",
  });
};

export const parseTime = (rawtime, locale = "ru") => {
  if (!rawtime) {
    return "";
  }
  const time = new Date(rawtime);
  const now = new Date();
  if (
    now.getFullYear() - time.getFullYear() == 0 &&
    now.getMonth() - time.getMonth() == 0
  ) {
    const dateDif = now.getDate() - time.getDate();
    if (dateDif == 0) {
      // TODAY
      const hoursDif = now.getHours() - time.getHours();
      if (hoursDif == 0) {
        // LESS THAN AN HOUR AGO
        const minutesDif = now.getMinutes() - time.getMinutes();
        if (minutesDif < 2) {
          return locale == "ru"
            ? "только что"
            : locale == "uk"
            ? "щойно"
            : "a moment ago";
        }
        if (minutesDif < 6) {
          return locale == "ru"
            ? "5 минут назад"
            : locale == "uk"
            ? "5 хвилин тому"
            : "5 minutes ago";
        } else if (minutesDif < 16) {
          return locale == "ru"
            ? "15 минут назад"
            : locale == "uk"
            ? "15 хвилин тому"
            : "15 minutes ago";
        } else {
          return locale == "ru"
            ? "час назад"
            : locale == "uk"
            ? "годину тому"
            : "hour ago";
        }
      } else if (hoursDif == 1) {
        return locale == "ru"
          ? "час назад"
          : locale == "uk"
          ? "годину тому"
          : "hour ago";
      } else {
        return locale == "ru"
          ? "cегодня"
          : locale == "uk"
          ? "cьогоднi"
          : "today";
      }
    } else if (dateDif == 1) {
      return locale == "ru" ? "вчера" : locale == "uk" ? "вчора" : "yesterday";
    } else if (dateDif == 2) {
      return locale == "ru"
        ? "позавчера"
        : locale == "uk"
        ? "позавчора"
        : "two days ago";
    } else {
      return _formatDate(time, locale);
    }
  } else {
    return _formatDate(time, locale);
  }
};
