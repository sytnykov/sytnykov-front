import { getMessages, getTranslations } from "next-intl/server";

import { cn } from "@/utils/cn";

import LineIcon, { LineIconName, Rings } from "../homepage/LineIcon";
import SectionHead from "../homepage/SectionHead";

const ICONS: LineIconName[] = ["compass", "shield", "book", "search"];

/** «Напрями діяльності»: four directions as a bento grid, the first one highlighted. */
const AboutExpertise = async () => {
  const t = await getTranslations("experiencePage.about");
  const messages = await getMessages();
  const items = messages.experiencePage.expertise.expertiseList as {
    title: string;
    descr: string[];
  }[];

  return (
    <section className="relative isolate overflow-hidden bg-[#f3f6fd] py-14 md:py-20 xl:py-[100px]">
      <Rings className="pointer-events-none absolute -right-[200px] -top-[220px] -z-10 w-[620px] max-md:hidden" />
      <div className="container max-w-[1280px]">
        <SectionHead title={t("expertiseTitle")} descr={t("expertiseDescr")} />
        <ul className="grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-4">
          {items.map((item, idx) => {
            const dark = idx === 0;
            return (
              <li
                key={item.title}
                className={cn(
                  "relative isolate flex flex-col overflow-hidden rounded-[28px] p-6 md:p-8",
                  dark ? "bg-dark text-light" : "bg-light"
                )}
              >
                {dark && (
                  <Rings className="absolute -bottom-[160px] -right-[140px] -z-10 w-[420px]" />
                )}
                <span
                  className={cn(
                    "grid size-12 place-items-center rounded-full",
                    dark ? "bg-accent text-light" : "bg-dark text-accent"
                  )}
                >
                  <LineIcon
                    name={ICONS[idx % ICONS.length]}
                    className="size-[22px]"
                  />
                </span>
                <h3 className="mt-5 text-[20px] font-semibold leading-[1.25] md:text-[22px]">
                  {item.title}
                </h3>
                {item.descr.map(p => (
                  <p
                    key={p.slice(0, 30)}
                    className={cn(
                      "mt-3 text-pretty text-[15px] leading-[1.65]",
                      dark ? "text-white/70" : "text-dark/65"
                    )}
                  >
                    {p}
                  </p>
                ))}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};

export default AboutExpertise;
