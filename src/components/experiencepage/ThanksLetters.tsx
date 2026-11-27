import { getTranslations } from "next-intl/server";

import { getThanksLetters } from "@/lib/sanity/queries/thanksLetters";
import { Locale } from "@/types/locale";

import SectionHead from "../homepage/SectionHead";
import ThanksLettersGrid, { LetterView } from "./ThanksLettersGrid";

/** «Листи вдячності» from the admin; renders nothing while there are none. */
const ThanksLetters = async ({ locale }: { locale: string }) => {
  const letters = await getThanksLetters().catch(() => []);
  if (!letters.length) return null;

  const t = await getTranslations("experiencePage.letters");
  const view: LetterView[] = letters.map((l, i) => {
    const caption = l.caption?.[locale as Locale] || l.caption?.uk || "";
    const parts = [l.author, caption].filter(Boolean);
    return {
      url: l.url,
      alt: parts.length
        ? `${t("letter")}: ${parts.join(", ")}`
        : `${t("letter")} ${i + 1}`,
      caption: parts.join(" · ") || undefined,
    };
  });

  return (
    <section className="bg-[#f3f6fd] py-14 md:py-20 xl:py-[100px]">
      <div className="container max-w-[1280px]">
        <SectionHead title={t("title")} descr={t("descr")} />
        <ThanksLettersGrid
          letters={view}
          labels={{
            open: t("open"),
            prev: t("prev"),
            next: t("next"),
            close: t("close"),
          }}
        />
      </div>
    </section>
  );
};

export default ThanksLetters;
