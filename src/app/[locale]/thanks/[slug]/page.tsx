import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { COURSE_PROTOTYPE } from "@/data/coursePrototype";

import LineIcon, { Rings } from "@/components/homepage/LineIcon";
import { TelegramIcon } from "@/components/shared/icons";
import PurchaseTracker from "@/components/thanks/PurchaseTracker";
import { Link } from "@/i18n/navigation";
import { checkThanks } from "@/lib/payments/wayforpay";
import { getCourseThanks } from "@/lib/sanity/queries/courses";
import { pick } from "@/lib/sanity/types/courseBlocks";
import { ROUTES } from "@/constants/routes";
import { getSiteContacts } from "@/lib/siteSettings";
import { normalizeTitle } from "@/utils/courseImage";
import { IS_PREVIEW } from "@/utils/env";
import { Locale } from "@/types/locale";

export const metadata: Metadata = {
  title: "Дякуємо за оплату | sitnikov.com.ua",
  robots: { index: false, follow: false },
};

type Search = Promise<{
  status?: string;
  amount?: string;
  currency?: string;
  order?: string;
  /** our proof that WayForPay signed an approved payment (api/thanks) */
  v?: string;
}>;

const FAILED = [
  "declined",
  "expired",
  "refunded",
  "voided",
  "refundinprocessing",
];

const formatPhone = (phone: string) => {
  const d = phone.replace(/\D/g, "");
  return `+${d.slice(0, 2)} ${d.slice(2, 5)} ${d.slice(5, 8)} ${d.slice(8, 10)} ${d.slice(10)}`;
};

/** After payment: confirmation, the course Telegram group, next steps. */
const ThanksPage = async ({
  params,
  searchParams,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
  searchParams: Search;
}) => {
  const { locale, slug } = await params;
  const { status = "", amount, currency, order, v } = await searchParams;
  const t = await getTranslations("thanks");
  const contacts = await getSiteContacts();

  // the prototype course exists only on the preview copy
  const isPrototype = slug === "prototype" && IS_PREVIEW;
  const course = isPrototype
    ? {
        title: COURSE_PROTOTYPE.title,
        slug: "prototype",
        category: undefined,
        telegramGroupUrl: contacts.socialLinks.find(
          s => s.label === "Telegram"
        )?.href,
        flowStart: COURSE_PROTOTYPE.flowStart,
      }
    : await getCourseThanks(slug).catch(() => null);

  const title = course ? normalizeTitle(pick(course.title, locale)) : "";
  const courseHref = isPrototype
    ? `${ROUTES.EDUCATION}/prototype`
    : course?.category
      ? `${ROUTES.EDUCATION}/${course.category}/${course.slug}`
      : ROUTES.EDUCATION;
  const failed = FAILED.includes(status.toLowerCase());
  // count a purchase only for a payment WayForPay signed as approved;
  // a hand-typed ?status=approved still shows the page, without a purchase
  const approved =
    status.toLowerCase() === "approved" &&
    checkThanks(
      {
        slug,
        order: order ?? "",
        amount: amount ?? "",
        currency: currency ?? "",
      },
      v,
      process.env.WAYFORPAY_SECRET_KEY
    );
  const telegram = course?.telegramGroupUrl;
  const start = course?.flowStart
    ? new Date(`${course.flowStart}T00:00:00`).toLocaleDateString(
        locale === "ru" ? "ru-RU" : "uk-UA",
        { day: "numeric", month: "long", year: "numeric" }
      )
    : null;
  const telHref = `tel:+${contacts.phone.replace(/\D/g, "")}`;

  const steps = [
    {
      icon: "chat" as const,
      title: t("step1"),
      text: telegram ? t("step1Text") : t("step1Manual"),
    },
    { icon: "mail" as const, title: t("step2"), text: t("step2Text") },
    {
      icon: "calendar" as const,
      title: t("step3"),
      text: start ? t("step3Date", { date: start }) : t("step3Text"),
    },
  ];

  return (
    <div className="bg-[#f3f6fd] pb-3 md:pb-6">
      <section className="relative isolate flex min-h-[100svh] items-center overflow-hidden rounded-b-[24px] bg-dark pb-16 pt-[120px] text-light md:min-h-[calc(100svh-24px)] md:rounded-b-[32px] md:pb-20 md:pt-[150px]">
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-[radial-gradient(45%_60%_at_50%_20%,rgba(81,136,255,0.32)_0%,rgba(9,17,41,0)_70%),radial-gradient(35%_45%_at_0%_100%,rgba(0,28,88,0.9)_0%,rgba(9,17,41,0)_100%)]"
        />
        <Rings className="pointer-events-none absolute left-1/2 top-[22%] -z-10 w-[760px] -translate-x-1/2 -translate-y-1/2 opacity-70" />

        {approved && course && (
          <PurchaseTracker
            course={title}
            order={order}
            value={amount ? Number(amount) : undefined}
            currency={currency}
          />
        )}

        <div className="container max-w-[1040px] text-center">
          <span
            className={
              failed
                ? "mx-auto grid size-20 place-items-center rounded-full bg-[#ff6b6b]/15 text-[#ff9090] shadow-[inset_0_0_0_1px_rgba(255,107,107,0.4)] md:size-24"
                : "mx-auto grid size-20 place-items-center rounded-full bg-[#22b573] text-light shadow-[0_20px_50px_-12px_rgba(34,181,115,0.8)] md:size-24"
            }
          >
            <LineIcon
              name={failed ? "close" : "check"}
              className="size-9 md:size-11"
            />
          </span>

          {title && (
            <p className="mx-auto mt-7 inline-flex max-w-full items-start gap-2 rounded-[16px] bg-white/[0.08] px-4 py-2 text-left text-[13px] font-medium leading-[1.4] text-[#c9d8ff] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.14)] md:items-center md:rounded-full md:text-[14px]">
              <LineIcon
                name="book"
                className="mt-[1px] size-4 shrink-0 text-accent md:mt-0"
              />
              <span>{t("failedCourse", { course: title })}</span>
            </p>
          )}
          <h1 className="mx-auto mt-5 max-w-[760px] text-balance font-micra text-[28px] leading-[1.12] [word-spacing:-0.18em] md:text-[40px] xl:text-[46px]">
            {failed ? t("failedTitle") : t("title")}
          </h1>
          <p className="mx-auto mt-5 max-w-[600px] text-pretty text-[16px] leading-[1.6] text-white/75 md:text-[18px]">
            {failed ? t("failedText") : telegram ? t("lead") : t("leadManual")}
          </p>

          <div className="mx-auto mt-9 flex flex-col gap-3 md:flex-row md:flex-wrap md:justify-center">
            {failed ? (
              <Link
                href={`${courseHref}#packages`}
                className="flex h-[54px] items-center justify-center rounded-full bg-accent-strong px-8 text-[16px] font-semibold shadow-[0_12px_32px_-12px_rgba(81,136,255,0.8)] transition-colors duration-300 hover:bg-[#2f5fe0]"
              >
                {t("retry")}
              </Link>
            ) : telegram ? (
              <a
                href={telegram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-[54px] items-center justify-center gap-3 whitespace-nowrap rounded-full bg-accent-strong pl-3 pr-8 text-[16px] font-semibold shadow-[0_12px_32px_-12px_rgba(81,136,255,0.8)] transition-colors duration-300 hover:bg-[#2f5fe0]"
              >
                <span className="grid size-9 place-items-center rounded-full bg-white text-accent">
                  <TelegramIcon className="size-5" />
                </span>
                <span className="md:hidden">{t("telegramShort")}</span>
                <span className="max-md:hidden">{t("telegram")}</span>
              </a>
            ) : null}
            <a
              href={telHref}
              className="flex h-[54px] items-center justify-center gap-2.5 whitespace-nowrap rounded-full border border-white/25 px-7 text-[15px] font-semibold tabular-nums transition-colors duration-300 hover:border-white"
            >
              <LineIcon name="phone" className="size-[18px] text-accent" />
              {formatPhone(contacts.phone)}
            </a>
          </div>

          {!failed && (
            <ol className="mt-12 grid grid-cols-1 gap-3 text-left md:mt-14 md:grid-cols-3">
              {steps.map((s, idx) => (
                <li
                  key={s.title}
                  className="rounded-[22px] bg-white/[0.05] p-5 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.1)] md:p-6"
                >
                  <div className="flex items-center justify-between">
                    <span className="grid size-11 place-items-center rounded-full bg-accent/15 text-accent shadow-[inset_0_0_0_1px_rgba(81,136,255,0.35)]">
                      <LineIcon name={s.icon} className="size-5" />
                    </span>
                    <span className="font-micra text-[22px] leading-none text-white/15">
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <p className="mt-5 text-[17px] font-semibold leading-[1.3]">
                    {s.title}
                  </p>
                  <p className="mt-1.5 text-[14px] leading-[1.5] text-white/60">
                    {s.text}
                  </p>
                </li>
              ))}
            </ol>
          )}

          <Link
            href={courseHref}
            className="mt-8 inline-flex items-center gap-2 text-[14px] font-medium text-white/60 underline-offset-4 transition-colors hover:text-light hover:underline"
          >
            {t("back")}
          </Link>
        </div>
      </section>
    </div>
  );
};

export default ThanksPage;
