import { getTranslations } from "next-intl/server";
import Image from "next/image";

import LineIcon, { LineIconName, Rings } from "./LineIcon";
import SectionHead from "./SectionHead";

type AudienceItem = { title: string; text: string };

const ICONS: LineIconName[] = [
  "briefcase",
  "team",
  "building",
  "layers",
  "scales",
  "compass",
];

const HomeAudience = async () => {
  const t = await getTranslations("homepage.audience");
  const list = t.raw("list") as AudienceItem[];

  return (
    <section className="relative isolate overflow-hidden bg-[#f3f6fd] py-14 md:py-20 xl:py-[100px]">
      {/* decor */}
      <div
        aria-hidden
        className="absolute -right-[200px] -top-[260px] -z-10 size-[680px] rounded-full bg-[radial-gradient(closest-side,rgba(81,136,255,0.2),rgba(81,136,255,0))]"
      />
      <Rings className="absolute -right-[190px] -top-[230px] -z-10 w-[640px] max-md:hidden" />

      <div className="container max-w-[1280px]">
        <div className="mb-7 grid gap-6 md:mb-10 md:grid-cols-[1fr_auto] md:items-end md:gap-10">
          <SectionHead
            title={t("title")}
            descr={t("descr")}
            className="mb-0 md:mb-0"
          />

          {/* badge: stacked audience icons */}
          <div className="hidden items-center gap-4 rounded-full bg-white py-2.5 pl-2.5 pr-6 shadow-[0_20px_50px_-28px_rgba(9,17,41,0.45)] md:flex md:self-end">
            <div className="flex -space-x-2.5">
              {ICONS.slice(0, 4).map(icon => (
                <span
                  key={icon}
                  className="grid size-11 place-items-center rounded-full bg-dark text-accent ring-[3px] ring-white"
                >
                  <LineIcon name={icon} className="size-[18px]" />
                </span>
              ))}
              <span className="grid size-11 place-items-center rounded-full bg-accent-strong text-[13px] font-semibold text-light ring-[3px] ring-white">
                +2
              </span>
            </div>
            <div>
              <p className="text-[15px] font-semibold leading-[1.25] text-dark">
                {t("badgeTitle")}
              </p>
              <p className="mt-0.5 text-[13px] text-dark/60">
                {t("badgeText")}
              </p>
            </div>
          </div>
        </div>

        <div className="grid gap-3 md:gap-4 xl:grid-cols-12 xl:gap-5">
          {/* quote card: a human voice next to the list */}
          <figure className="relative isolate flex flex-col justify-between overflow-hidden rounded-[24px] bg-dark p-6 text-light md:p-8 xl:col-span-4">
            <span
              aria-hidden
              className="absolute inset-0 -z-10 bg-[radial-gradient(90%_70%_at_100%_0%,rgba(81,136,255,0.5),rgba(81,136,255,0)_65%)]"
            />
            <Rings className="absolute -bottom-[170px] -right-[170px] -z-10 w-[420px]" />
            <svg aria-hidden viewBox="0 0 48 36" className="w-12 text-accent">
              <path
                fill="currentColor"
                d="M0 36V22C0 9.8 6.2 2.4 18.6 0l2 5.2C13.4 7.3 9.8 11.4 9.4 17.6H20V36H0Zm28 0V22C28 9.8 34.2 2.4 46.6 0l2 5.2c-7.2 2.1-10.8 6.2-11.2 12.4H48V36H28Z"
              />
            </svg>
            <blockquote className="mt-6 text-balance text-[21px] font-medium leading-[1.4] tracking-[-0.01em] md:text-[24px]">
              {t("quote")}
            </blockquote>
            <figcaption className="mt-8 flex items-center gap-3">
              <span className="relative size-12 shrink-0 overflow-hidden rounded-full bg-[radial-gradient(90%_90%_at_50%_20%,#3a6be0_0%,#13245a_70%)] ring-2 ring-accent/60">
                <Image
                  src="/images/homepage/home-hero-card-portrait.webp"
                  alt=""
                  fill
                  sizes="48px"
                  className="object-cover object-top"
                />
              </span>
              <span className="text-[13px] leading-[1.4] text-white/70">
                {t("quoteRole")}
              </span>
            </figcaption>
          </figure>

          <ul className="grid gap-3 md:grid-cols-2 md:gap-4 xl:col-span-8">
            {list.map(({ title, text }, idx) => (
              <li
                key={title}
                className="group relative flex gap-4 overflow-hidden rounded-[20px] border border-dark/[0.06] bg-white p-5 transition-[border-color,transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:border-accent/40 hover:shadow-[0_24px_50px_-30px_rgba(81,136,255,0.7)] md:p-6"
              >
                <span
                  aria-hidden
                  className="absolute -right-14 -top-14 size-36 rounded-full bg-accent/20 opacity-0 blur-[44px] transition-opacity duration-300 group-hover:opacity-100"
                />
                <span className="grid size-12 shrink-0 place-items-center rounded-[14px] bg-[linear-gradient(145deg,#13275f,#091129)] text-accent shadow-[0_10px_24px_-12px_rgba(9,17,41,0.8)]">
                  <LineIcon
                    name={ICONS[idx % ICONS.length]}
                    className="size-[22px]"
                  />
                </span>
                <div>
                  <h3 className="text-[17px] font-semibold leading-[1.3] tracking-[-0.01em] text-dark md:text-[18px]">
                    {title}
                  </h3>
                  <p className="mt-1.5 text-pretty text-[14px] leading-[1.55] text-dark/60">
                    {text}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default HomeAudience;
