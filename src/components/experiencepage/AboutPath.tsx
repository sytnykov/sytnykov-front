import { getMessages, getTranslations } from "next-intl/server";
import Image from "next/image";

import LineIcon, { LineIconName } from "../homepage/LineIcon";

const ICONS: LineIconName[] = ["book", "gavel", "target"];

/** «Мій шлях»: education → career → achievements as a vertical timeline. */
const AboutPath = async () => {
  const t = await getTranslations("experiencePage.about");
  const messages = await getMessages();
  const items = messages.experiencePage.careerPath.careerPathList as {
    title: string;
    descr: string[];
  }[];

  return (
    <section className="bg-light py-14 md:py-20 xl:py-[100px]">
      <div className="container grid max-w-[1280px] grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-14">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <h2 className="text-balance font-micra text-[26px] leading-[1.12] [word-spacing:-0.18em] md:text-[34px] xl:text-[44px]">
              {t("pathTitle")}
            </h2>
            <p className="mt-4 max-w-[460px] text-pretty text-[15px] leading-[1.55] text-dark/65 md:mt-5 md:text-[17px]">
              {t("pathDescr")}
            </p>
            <div className="relative mt-8 h-[240px] overflow-hidden rounded-[24px] md:h-[300px]">
              <Image
                src="/images/experiencePage/experience-careerPath-university.webp"
                alt={t("universityAlt")}
                fill
                sizes="(min-width: 1024px) 460px, 92vw"
                className="object-cover"
              />
              <span
                aria-hidden
                className="absolute inset-0 bg-[linear-gradient(0deg,rgba(9,17,41,0.55),rgba(9,17,41,0)_55%)]"
              />
              <span className="absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-full bg-dark/70 px-3.5 py-2 text-[13px] font-medium text-light shadow-[inset_0_0_0_1px_rgba(255,255,255,0.18)] backdrop-blur-md">
                <LineIcon name="building" className="size-4 text-accent" />
                {t("universityCaption")}
              </span>
            </div>
          </div>
        </div>

        <ol className="relative flex flex-col gap-4 lg:col-span-7">
          <span
            aria-hidden
            className="absolute bottom-6 left-6 top-6 w-px bg-[linear-gradient(180deg,#5188ff,rgba(81,136,255,0.1))] md:left-7"
          />
          {items.map((item, idx) => (
            <li key={item.title} className="relative flex gap-4 md:gap-6">
              <span
                className={
                  idx === items.length - 1
                    ? "relative z-[1] grid size-12 shrink-0 place-items-center rounded-full bg-accent text-light shadow-[0_12px_28px_-10px_rgba(81,136,255,0.9)] md:size-14"
                    : "relative z-[1] grid size-12 shrink-0 place-items-center rounded-full bg-dark text-accent md:size-14"
                }
              >
                <LineIcon
                  name={ICONS[idx % ICONS.length]}
                  className="size-[22px] md:size-6"
                />
              </span>
              <div className="min-w-0 flex-1 rounded-[24px] bg-[#f3f6fd] p-5 md:p-7">
                <p className="text-[13px] font-semibold text-accent-ink">
                  {String(idx + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-1 text-[20px] font-semibold leading-[1.25] md:text-[22px]">
                  {item.title}
                </h3>
                {item.descr.map(p => (
                  <p
                    key={p.slice(0, 30)}
                    className="mt-3 text-pretty text-[15px] leading-[1.65] text-dark/70 md:text-[16px]"
                  >
                    {p}
                  </p>
                ))}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
};

export default AboutPath;
