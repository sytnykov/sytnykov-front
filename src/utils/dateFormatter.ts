import { format } from "date-fns";
import { ru, uk } from "date-fns/locale";

import { Locale } from "@/types/locale";

export const formatStartDate = (isoDate: string, lang: Locale): string => {
  const date = new Date(isoDate);

  const formattedDate = format(date, "dd.MM.yyyy 'о' HH:mm", {
    locale: lang === "uk" ? uk : ru,
  });

  if (lang === "ru") {
    return `Начало: ${formattedDate.replace("о", "в")}`;
  }

  return `Початок: ${formattedDate}`;
};
