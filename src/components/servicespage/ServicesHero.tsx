import { Fragment } from "react";
import { getTranslations } from "next-intl/server";
import Image from "next/image";

import { APPLICATION } from "@/constants/application";
import { siteConfig } from "@/constants/siteConfig";

import LineIcon, { LineIconName, Rings } from "../homepage/LineIcon";
import ModalTrigger from "../module/modal/ModalTrigger";

type Direction = { id: string; title: string; short: string; items: unknown[] };

const NAV_ICONS: Record<string, LineIconName> = {
  practice: "gavel",
  analytics: "search",
  consulting: "compass",
};

const formatPhone = (phone: string) => {
  const d = phone.replace(/\D/g, "");
  return `+${d.slice(0, 2)} ${d.slice(2, 5)} ${d.slice(5, 8)} ${d.slice(8, 10)} ${d.slice(10)}`;
};

const highlight = (text: string, words: string[]) => {
  const pattern = new RegExp(`(${words.join("|")})`, "g");
  return text.split(pattern).map((part, idx) =>
    words.includes(part) ? (
      <span key={idx} className="text-accent">
        {part}
      </span>
    ) : (
      <Fragment key={idx}>{part}</Fragment>
    )
  );
};

/** Dark hero: offer + actions, office portrait, and the three directions as an index. */
const ServicesHero = async () => {
  const t = await getTranslations("servicepage");
  const directions = t.raw("directions") as Direction[];
  const accent = t.raw("hero.titleAccent") as string[];

  return (
    <section className="relative isolate overflow-hidden bg-dark text-light">
      <div
        aria-hidden
        className="absolute inset-0 -z-20 bg-[radial-gradient(45%_55%_at_78%_38%,rgba(81,136,255,0.34)_0%,rgba(9,17,41,0)_70%),radial-gradient(35%_45%_at_0%_100%,rgba(0,28,88,0.9)_0%,rgba(9,17,41,0)_100%)]"
      />
      <span
        aria-hidden
        className="absolute inset-0 -z-20 bg-[radial-gradient(rgba(255,255,255,0.07)_1px,transparent_1.2px)] [background-size:18px_18px] [mask-image:linear-gradient(160deg,#000_0%,transparent_45%)]"
      />

      <div className="container max-w-[1280px] pb-12 pt-[104px] md:pb-16 md:pt-[132px] xl:pb-[72px] xl:pt-[150px]">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-12 md:gap-8 xl:gap-12">
          {/* offer */}
          <div className="min-w-0 md:col-span-7 md:self-center">
            <h1>
              <span className="block text-balance font-micra text-[clamp(28px,8.4vw,36px)] leading-[1.1] [word-spacing:-0.2em] md:text-[40px] xl:text-[54px] xl:leading-[1.06]">
                {highlight(t("hero.title"), accent)}
              </span>
              <span className="mt-4 block max-w-[520px] text-pretty text-[14px] font-medium leading-[1.45] text-[#c9d8ff] sm:text-[15px] md:mt-5 md:text-[16px] xl:text-[17px]">
                {t("hero.titleSeo")}
              </span>
            </h1>
            <p className="mt-5 max-w-[560px] text-pretty text-[15px] leading-[1.6] text-white/70 max-md:hidden md:text-[16px]">
              {t("hero.descr")}
            </p>

            <div className="mt-7 flex flex-col gap-3 md:mt-9 lg:flex-row">
              <ModalTrigger
                variant="consultation"
                buttonVariant="accent"
                buttonClassName="h-[50px] py-0 text-[15px] font-semibold lg:w-[250px]"
                messageFrom={APPLICATION.CONSULTATION}
              />
              <a
                href={`tel:+${siteConfig.phone.replace(/\D/g, "")}`}
                className="flex h-[50px] items-center justify-center gap-2.5 whitespace-nowrap rounded-full border border-white/25 px-6 text-[15px] font-semibold tabular-nums transition-colors duration-300 hover:border-white"
              >
                <LineIcon name="phone" className="size-[18px] text-accent" />
                {formatPhone(siteConfig.phone)}
              </a>
            </div>
          </div>

          {/* portrait */}
          <div className="relative md:col-span-5">
            <Rings className="pointer-events-none absolute -right-[38%] top-1/2 -z-10 w-[150%] -translate-y-1/2" />
            <div className="relative isolate h-[420px] overflow-hidden rounded-[28px] shadow-[0_40px_80px_-40px_rgba(0,0,0,0.9)] ring-1 ring-white/10 sm:h-[480px] md:h-[500px] xl:h-[560px]">
              <Image
                src="/images/servicespage/v2/hero.webp"
                alt={t("hero.imgAlt")}
                fill
                priority
                sizes="(min-width: 1280px) 460px, (min-width: 768px) 40vw, 92vw"
                className="object-cover object-[50%_20%]"
              />
              <span
                aria-hidden
                className="absolute inset-x-0 bottom-0 h-[45%] bg-[linear-gradient(0deg,rgba(9,17,41,0.85)_0%,rgba(9,17,41,0)_100%)]"
              />

              <span className="absolute right-4 top-4 inline-flex items-center gap-2 rounded-full bg-dark/70 px-3.5 py-2 text-[13px] font-medium shadow-[inset_0_0_0_1px_rgba(255,255,255,0.18)] backdrop-blur-md">
                <LineIcon name="scales" className="size-4 text-accent" />
                {t("hero.chip")}
              </span>

              <div className="absolute inset-x-4 bottom-4 flex items-center gap-3 rounded-[18px] bg-light p-2.5 pr-4 text-dark shadow-[0_20px_40px_-20px_rgba(0,0,0,0.6)] md:inset-x-5 md:bottom-5">
                <span className="grid size-11 shrink-0 place-items-center rounded-full bg-dark text-accent">
                  <LineIcon name="shield" className="size-5" />
                </span>
                <div className="min-w-0">
                  <p className="text-[15px] font-semibold leading-[1.2]">
                    {t("hero.name")}
                  </p>
                  <p className="mt-0.5 text-[13px] text-dark/60">
                    {t("hero.role")}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* directions index */}
        <nav aria-label={t("hero.navLabel")} className="mt-10 md:mt-14">
          <ul className="grid grid-cols-1 gap-2.5 md:gap-3 xl:grid-cols-3 xl:gap-4">
            {directions.map(d => (
              <li key={d.id}>
                <a
                  href={`#${d.id}`}
                  className="group flex h-full items-center gap-4 rounded-[20px] bg-white/[0.05] p-3 pr-4 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.1)] backdrop-blur-sm transition-colors duration-300 hover:bg-white/[0.1] md:p-4 md:pr-5"
                >
                  <span className="grid size-12 shrink-0 place-items-center rounded-[14px] bg-accent/15 text-accent shadow-[inset_0_0_0_1px_rgba(81,136,255,0.35)]">
                    <LineIcon
                      name={NAV_ICONS[d.id] ?? "briefcase"}
                      className="size-6"
                    />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="flex items-center gap-2">
                      <span className="text-[15px] font-semibold leading-[1.25] md:text-[16px]">
                        {d.title}
                      </span>
                    </span>
                    <span className="mt-1 block text-[13px] text-white/55">
                      {d.short}
                    </span>
                  </span>
                  <span className="grid size-9 shrink-0 place-items-center rounded-full bg-white/10 transition-colors duration-300 group-hover:bg-accent">
                    <svg aria-hidden viewBox="0 0 20 20" className="size-4">
                      <path
                        d="M10 4v11m-4-4 4 4 4-4"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </section>
  );
};

export default ServicesHero;
