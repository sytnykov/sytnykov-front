import { getTranslations } from "next-intl/server";

import { Link } from "@/i18n/navigation";
import { ROUTES } from "@/constants/routes";
import { cn } from "@/utils/cn";

import LineIcon, { LineIconName, Rings } from "./LineIcon";
import SectionHead, { PillLink } from "./SectionHead";

type Item = { title: string; text: string };

const PATH_ICONS: LineIconName[] = ["search", "gavel", "columns", "book"];
const FACT_ICONS: LineIconName[] = ["target", "shield", "ruler"];
const PEAK = 2; // cassation judge — the top of the path

/** "Why Oleksandr": headline fact, career path and three facts. */
const HomeAdvantages = async () => {
  const t = await getTranslations("homepage.why");
  const path = t.raw("path") as Item[];
  const facts = t.raw("facts") as Item[];

  return (
    <section className="relative isolate overflow-hidden bg-dark py-14 text-light md:py-20 xl:py-[100px]">
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[radial-gradient(50%_60%_at_85%_20%,rgba(81,136,255,0.22)_0%,rgba(9,17,41,0)_70%),radial-gradient(40%_50%_at_0%_100%,rgba(0,28,88,0.9)_0%,rgba(9,17,41,0)_100%)]"
      />
      <Rings className="absolute -right-[200px] -top-[220px] -z-10 w-[640px] max-md:hidden" />

      <div className="container max-w-[1280px]">
        <SectionHead
          tone="dark"
          title={t("title")}
          descr={t("descr")}
          action={
            <Link href={ROUTES.EXPERIENCE} className="max-md:hidden">
              <PillLink tone="dark">{t("button")}</PillLink>
            </Link>
          }
        />

        <div className="grid gap-3 md:gap-4 xl:grid-cols-12">
          {/* headline fact */}
          <div className="relative isolate flex flex-col justify-between overflow-hidden rounded-[24px] bg-[linear-gradient(160deg,#5188ff_0%,#2a4fb8_45%,#13245a_100%)] p-6 md:p-8 xl:col-span-4">
            <Rings
              color="#ffffff"
              className="absolute -right-[130px] -top-[130px] -z-10 w-[400px]"
            />
            <span
              aria-hidden
              className="absolute inset-0 -z-10 bg-[radial-gradient(rgba(255,255,255,0.12)_1px,transparent_1.2px)] [background-size:16px_16px] [mask-image:linear-gradient(0deg,#000_0%,transparent_60%)]"
            />
            <div>
              <p className="font-micra text-[56px] leading-none md:text-[84px]">
                {t("bigNumber")}
              </p>
              <p className="mt-3 text-[18px] font-semibold">{t("bigLabel")}</p>
            </div>
            <p className="mt-6 max-w-[320px] text-pretty text-[15px] leading-[1.55] text-white/80 md:mt-10">
              {t("bigText")}
            </p>
          </div>

          <div className="grid gap-3 md:gap-4 xl:col-span-8">
            {/* career path as one connected timeline */}
            <ol className="relative grid gap-0 rounded-[24px] bg-white/[0.04] p-5 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08)] md:grid-cols-4 md:p-6">
              <span
                aria-hidden
                className="absolute left-[44px] top-[52px] h-[calc(100%-104px)] w-px bg-gradient-to-b from-accent/70 via-accent/30 to-accent/70 md:left-[calc(12.5%+4px)] md:right-[calc(12.5%+4px)] md:top-[47px] md:h-px md:w-auto md:bg-gradient-to-r"
              />
              {path.map(({ title, text }, idx) => (
                <li
                  key={title}
                  className="relative flex gap-4 py-3 md:flex-col md:items-center md:gap-0 md:px-2 md:py-0 md:text-center"
                >
                  <span
                    className={cn(
                      "relative z-10 grid size-12 shrink-0 place-items-center rounded-full ring-[6px] ring-dark",
                      idx === PEAK
                        ? "bg-accent text-light shadow-[0_0_0_6px_rgba(81,136,255,0.25),0_0_30px_rgba(81,136,255,0.7)]"
                        : "bg-[#13245a] text-accent"
                    )}
                  >
                    <LineIcon name={PATH_ICONS[idx]} className="size-[22px]" />
                  </span>
                  <div className="md:mt-4">
                    <h3
                      className={cn(
                        "text-balance text-[16px] font-semibold leading-[1.3] md:text-[17px]",
                        idx === PEAK && "text-accent"
                      )}
                    >
                      {title}
                    </h3>
                    <p className="mt-1 text-[13px] leading-[1.45] text-white/60">
                      {text}
                    </p>
                  </div>
                </li>
              ))}
            </ol>

            {/* three facts */}
            <ul className="grid gap-3 md:grid-cols-3 md:gap-4">
              {facts.map(({ title, text }, idx) => (
                <li
                  key={title}
                  className="group relative isolate flex gap-4 overflow-hidden rounded-[22px] bg-[linear-gradient(160deg,rgba(81,136,255,0.16)_0%,rgba(255,255,255,0.03)_55%)] p-5 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.1)] transition-transform duration-300 hover:-translate-y-0.5 md:block md:p-6"
                >
                  <span
                    aria-hidden
                    className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-accent to-transparent"
                  />
                  <span
                    aria-hidden
                    className="absolute -right-16 -top-16 -z-10 size-40 rounded-full bg-accent/25 blur-[48px]"
                  />
                  <span className="grid size-11 shrink-0 place-items-center rounded-[14px] bg-accent/15 text-accent shadow-[inset_0_0_0_1px_rgba(81,136,255,0.4)]">
                    <LineIcon
                      name={FACT_ICONS[idx % FACT_ICONS.length]}
                      className="size-[22px]"
                    />
                  </span>
                  <div>
                    <h3 className="text-balance text-[17px] font-semibold leading-[1.3] md:mt-4">
                      {title}
                    </h3>
                    <p className="mt-1.5 text-pretty text-[14px] leading-[1.55] text-white/65 md:mt-2">
                      {text}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Link href={ROUTES.EXPERIENCE} className="mt-8 block md:hidden">
          <PillLink tone="dark">{t("button")}</PillLink>
        </Link>
      </div>
    </section>
  );
};

export default HomeAdvantages;
