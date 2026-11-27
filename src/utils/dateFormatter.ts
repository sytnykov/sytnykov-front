import { Locale } from "@/types/locale";

/**
 * Start date of an event, always in Kyiv time.
 * A fixed time zone keeps the server and the browser output identical
 * (otherwise the hour differs and React reports a hydration error).
 */
export const formatStartDate = (isoDate: string, lang: Locale): string => {
  const parts = new Intl.DateTimeFormat("uk-UA", {
    timeZone: "Europe/Kyiv",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).formatToParts(new Date(isoDate));
  const get = (type: string) => parts.find(p => p.type === type)?.value ?? "";
  const date = `${get("day")}.${get("month")}.${get("year")}`;
  const time = `${get("hour")}:${get("minute")}`;

  return lang === "ru" ? `Начало: ${date} в ${time}` : `Початок: ${date} о ${time}`;
};
