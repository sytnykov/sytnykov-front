import { getMessages, getTranslations } from "next-intl/server";

import LineIcon, { LineIconName } from "../homepage/LineIcon";
import SectionHead from "../homepage/SectionHead";

const ICONS: LineIconName[] = [
  "document",
  "scales",
  "columns",
  "gavel",
  "shield",
];

/** «Справи, якими ми пишаємося»: the decree case leads, the rest as cards. */
const AboutCases = async () => {
  const t = await getTranslations("experiencePage.about");
  const messages = await getMessages();
  const proud = messages.experiencePage.proud as {
    title: string;
    proudList: { title: string; descr: string }[];
  };
  const list = proud.proudList;
  const featuredIdx = Math.max(
    0,
    list.findIndex(i => /Указ/i.test(i.title))
  );
  const featured = list[featuredIdx];
  const rest = list.filter((_, i) => i !== featuredIdx);

  return (
    <section className="bg-light py-14 md:py-20 xl:py-[100px]">
      <div className="container max-w-[1280px]">
        <SectionHead title={proud.title} descr={t("casesDescr")} />
        <div className="grid grid-cols-1 gap-3 md:gap-4 lg:grid-cols-12">
          <article className="relative isolate flex flex-col overflow-hidden rounded-[28px] bg-dark p-6 text-light md:p-8 lg:col-span-5">
            <span
              aria-hidden
              className="absolute -right-[20%] -top-[20%] -z-10 size-[70%] rounded-full bg-accent/30 blur-[80px]"
            />
            <span className="inline-flex items-center gap-2 self-start rounded-full bg-[#22b573]/15 px-3 py-1.5 text-[12px] font-semibold text-[#5fe0a3] shadow-[inset_0_0_0_1px_rgba(34,181,115,0.4)]">
              <LineIcon name="check" className="size-3.5" />
              {t("won")}
            </span>
            <h3 className="mt-6 text-balance text-[22px] font-semibold leading-[1.25] md:text-[26px]">
              {featured.title}
            </h3>
            <p className="mt-4 text-pretty text-[15px] leading-[1.65] text-white/70 md:text-[16px]">
              {featured.descr}
            </p>
            <span className="mt-auto pt-8 text-[13px] font-medium text-[#9db8ff]">
              {t("featuredNote")}
            </span>
          </article>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-4 lg:col-span-7">
            {rest.map((item, idx) => (
              <article
                key={item.title}
                className="flex flex-col rounded-[24px] bg-[#f3f6fd] p-5 md:p-6"
              >
                <span className="grid size-11 place-items-center rounded-[14px] bg-accent/10 text-accent">
                  <LineIcon
                    name={ICONS[idx % ICONS.length]}
                    className="size-[22px]"
                  />
                </span>
                <h3 className="mt-5 text-pretty text-[17px] font-semibold leading-[1.3] md:text-[18px]">
                  {item.title}
                </h3>
                <p className="mt-2 line-clamp-6 text-pretty text-[14px] leading-[1.6] text-dark/65 md:text-[15px]">
                  {item.descr}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutCases;
