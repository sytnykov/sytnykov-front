import { getTranslations } from "next-intl/server";
import Image from "next/image";

import { Link } from "@/i18n/navigation";
import { getAllAnnouncements } from "@/lib/sanity/queries/queries";
import { AnnouncementItem } from "@/lib/sanity/types/queryTypes";
import { ROUTES } from "@/constants/routes";
import { siteConfig } from "@/constants/siteConfig";
import { cn } from "@/utils/cn";
import { Locale } from "@/types/locale";

import LineIcon, { Rings } from "../homepage/LineIcon";
import SectionHead from "../homepage/SectionHead";
import { TelegramIcon } from "../shared/icons";
import MobileMoreList from "./MobileMoreList";

const TZ = "Europe/Kyiv";

const dateParts = (iso: string, lang: Locale) => {
  const d = new Date(iso);
  const locale = lang === "ru" ? "ru-UA" : "uk-UA";
  const day = new Intl.DateTimeFormat(locale, {
    timeZone: TZ,
    day: "numeric",
  }).format(d);
  const dayMonth = new Intl.DateTimeFormat(locale, {
    timeZone: TZ,
    day: "numeric",
    month: "long",
  }).format(d);
  return {
    day,
    month: dayMonth.replace(day, "").trim(),
    year: new Intl.DateTimeFormat(locale, {
      timeZone: TZ,
      year: "numeric",
    }).format(d),
    time: new Intl.DateTimeFormat(locale, {
      timeZone: TZ,
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    }).format(d),
    full: new Intl.DateTimeFormat(locale, {
      timeZone: TZ,
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(d),
  };
};

// titles are typed in capitals in the admin; show them in sentence case
const sentence = (s: string) =>
  s === s.toUpperCase() ? s.charAt(0) + s.slice(1).toLowerCase() : s;

const EventCard = ({
  item,
  lang,
  upcoming,
  labels,
}: {
  item: AnnouncementItem;
  lang: Locale;
  upcoming: boolean;
  labels: { soon: string; done: string; start: string };
}) => {
  const p = dateParts(item.startDate, lang);
  return (
    <article className="flex h-full flex-col rounded-[24px] bg-white p-5 shadow-[0_1px_2px_rgba(9,17,41,0.05)] transition-shadow duration-300 hover:shadow-[0_24px_48px_-28px_rgba(9,17,41,0.35)] md:p-6">
      <div className="flex items-start justify-between gap-4">
        <div className="relative grid size-[76px] shrink-0 place-items-center overflow-hidden rounded-[18px] bg-dark text-light">
          <span className="absolute inset-0 bg-[radial-gradient(80%_80%_at_80%_0%,rgba(81,136,255,0.45),transparent_70%)]" />
          <span className="relative text-center leading-none">
            <span className="block text-[28px] font-semibold tabular-nums">
              {p.day}
            </span>
            <span className="mt-1 block text-[12px] font-medium text-white/75">
              {p.month}
            </span>
          </span>
        </div>
        <span
          className={cn(
            "inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[13px] font-medium",
            upcoming
              ? "bg-accent-strong text-light"
              : "bg-[#f3f6fd] text-dark/70"
          )}
        >
          {upcoming ? labels.soon : labels.done}
        </span>
      </div>
      {item.previewImage?.url && (
        <div className="relative mt-5 aspect-[16/9] overflow-hidden rounded-[16px]">
          <Image
            src={item.previewImage.url}
            alt={item.title[lang]}
            fill
            sizes="(min-width: 1280px) 380px, (min-width: 768px) 45vw, 92vw"
            className="object-cover"
          />
        </div>
      )}
      <h3 className="mt-5 text-pretty text-[19px] font-semibold leading-[1.3] text-dark md:text-[20px]">
        {sentence(item.title[lang])}
      </h3>
      <p className="mb-5 mt-2 text-pretty text-[15px] leading-[1.55] text-dark/65">
        {item.description[lang]}
      </p>
      <p className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-dark/[0.08] pt-4 text-[14px] font-medium text-dark/70">
        <span className="inline-flex items-center gap-2">
          <LineIcon name="calendar" className="size-4 text-accent-strong" />
          {p.year}
        </span>
        <span className="inline-flex items-center gap-2">
          <LineIcon name="clock" className="size-4 text-accent-strong" />
          {labels.start} {p.time}
        </span>
      </p>
    </article>
  );
};

/** «Анонси»: what is coming next (or how not to miss it) and the event archive. */
const AnnouncementsView = async ({ lang }: { lang: Locale }) => {
  const t = await getTranslations("announcementsPage");
  const list = await getAllAnnouncements();
  const now = Date.now();
  const upcoming = list
    .filter(a => new Date(a.startDate).getTime() >= now)
    .sort((a, b) => +new Date(a.startDate) - +new Date(b.startDate));
  const past = list.filter(a => new Date(a.startDate).getTime() < now);
  const next = upcoming[0];
  const telegram = siteConfig.socialLinks.find(
    s => s.label === "Telegram"
  )?.href;
  const labels = {
    soon: t("v2.soon"),
    done: t("v2.done"),
    start: t("v2.start"),
  };
  const np = next && dateParts(next.startDate, lang);

  return (
    <>
      <section className="relative isolate overflow-hidden bg-dark text-light">
        <div
          aria-hidden
          className="absolute inset-0 -z-20 bg-[radial-gradient(45%_60%_at_78%_45%,rgba(81,136,255,0.32)_0%,rgba(9,17,41,0)_70%),radial-gradient(35%_45%_at_0%_100%,rgba(0,28,88,0.9)_0%,rgba(9,17,41,0)_100%)]"
        />
        <span
          aria-hidden
          className="absolute inset-0 -z-20 bg-[radial-gradient(rgba(255,255,255,0.07)_1px,transparent_1.2px)] [background-size:18px_18px] [mask-image:linear-gradient(160deg,#000_0%,transparent_45%)]"
        />
        <div className="container grid max-w-[1280px] grid-cols-1 gap-10 pb-12 pt-[104px] md:grid-cols-12 md:gap-8 md:pb-16 md:pt-[132px] xl:gap-12 xl:pb-[72px] xl:pt-[150px]">
          <div className="min-w-0 md:col-span-6 md:self-center">
            <h1>
              <span className="block font-micra text-[clamp(30px,9vw,40px)] uppercase leading-[1.08] [word-spacing:-0.2em] md:text-[44px] xl:text-[60px]">
                {t("hero.title")}
              </span>
              <span className="mt-4 block max-w-[520px] text-pretty text-[15px] font-medium leading-[1.45] text-[#c9d8ff] md:mt-5 md:text-[17px]">
                {t("v2.seo")}
              </span>
            </h1>
            <p className="mt-5 max-w-[520px] text-pretty text-[15px] leading-[1.6] text-white/70 md:text-[16px]">
              {t("hero.descr")}
            </p>
          </div>

          <div className="relative md:col-span-6">
            <Rings className="pointer-events-none absolute -right-[30%] top-1/2 -z-10 w-[140%] -translate-y-1/2" />
            <div className="relative overflow-hidden rounded-[28px] bg-white/[0.06] p-5 shadow-[0_40px_80px_-40px_rgba(0,0,0,0.9),inset_0_0_0_1px_rgba(255,255,255,0.12)] backdrop-blur-md md:p-7">
              <span className="inline-flex items-center gap-2 rounded-full bg-light px-3.5 py-2 text-[13px] font-semibold text-dark">
                <span className="relative flex size-2">
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-60" />
                  <span className="relative inline-flex size-2 rounded-full bg-accent-strong" />
                </span>
                {t("v2.nextLabel")}
              </span>
              {next && np ? (
                <>
                  <p className="mt-6 text-[14px] font-medium text-[#c9d8ff]">
                    {np.full} · {np.time}
                  </p>
                  <h2 className="mt-2 text-balance text-[24px] font-semibold leading-[1.25] md:text-[28px]">
                    {sentence(next.title[lang])}
                  </h2>
                  <p className="mt-3 text-[15px] leading-[1.6] text-white/70">
                    {next.description[lang]}
                  </p>
                </>
              ) : (
                <>
                  <h2 className="mt-6 text-balance text-[24px] font-semibold leading-[1.25] md:text-[28px]">
                    {t("v2.noneTitle")}
                  </h2>
                  <p className="mt-3 text-[15px] leading-[1.6] text-white/70">
                    {t("v2.noneDescr")}
                  </p>
                </>
              )}
              <div className="mt-7 grid grid-cols-1 gap-3 xl:grid-cols-2">
                {telegram && (
                  <a
                    href={telegram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-[50px] items-center justify-center gap-2.5 rounded-full bg-accent-strong px-5 text-[15px] font-semibold shadow-[0_12px_32px_-12px_rgba(81,136,255,0.8)] transition-colors duration-300 hover:bg-[#2f5fe0]"
                  >
                    <span className="size-5 [&_svg]:size-5">
                      <TelegramIcon />
                    </span>
                    {t("v2.telegram")}
                  </a>
                )}
                <Link
                  href={ROUTES.EDUCATION}
                  className="flex h-[50px] items-center justify-center gap-2.5 rounded-full bg-light px-5 text-[15px] font-semibold text-dark transition-colors duration-300 hover:bg-[#dfe8ff]"
                >
                  <LineIcon
                    name="book"
                    className="size-[18px] text-accent-strong"
                  />
                  {t("v2.courses")}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {upcoming.length > 1 && (
        <section className="bg-white py-14 md:py-20 xl:py-[100px]">
          <div className="container max-w-[1280px]">
            <SectionHead title={t("v2.upcomingTitle")} />
            <ul className="grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-5 xl:grid-cols-3">
              {upcoming.slice(1).map((a, i) => (
                <li key={i}>
                  <EventCard item={a} lang={lang} upcoming labels={labels} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {past.length > 0 && (
        <section className="bg-[#f3f6fd] py-14 md:py-20 xl:py-[100px]">
          <div className="container max-w-[1280px]">
            <SectionHead title={t("v2.pastTitle")} descr={t("v2.pastDescr")} />
            <MobileMoreList moreLabel={t("v2.more")}>
              {past.map((a, i) => (
                <EventCard
                  key={i}
                  item={a}
                  lang={lang}
                  upcoming={false}
                  labels={labels}
                />
              ))}
            </MobileMoreList>
          </div>
        </section>
      )}
    </>
  );
};

export default AnnouncementsView;
