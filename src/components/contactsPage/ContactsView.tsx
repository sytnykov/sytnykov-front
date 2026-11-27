import { getMessages, getTranslations } from "next-intl/server";
import Image from "next/image";

import { TelegramIcon } from "@/components/shared/icons";
import { siteConfig } from "@/constants/siteConfig";

import LineIcon, { Rings } from "../homepage/LineIcon";
import SectionHead from "../homepage/SectionHead";
import ContactFeedbackForm from "./ContactFeedbackForm";
import { FormPlaceholderMap } from "./ContactsFeedback";

const formatPhone = (phone: string) => {
  const d = phone.replace(/\D/g, "");
  return `+${d.slice(0, 2)} ${d.slice(2, 5)} ${d.slice(5, 8)} ${d.slice(8, 10)} ${d.slice(10)}`;
};

/** «Контакти»: every way to reach the lawyer on the first screen + a calm form. */
const ContactsView = async () => {
  const t = await getTranslations("contactsPage");
  const messages = await getMessages();
  const placeholders = messages.contactsPage.feedback
    .formPlaceholder as FormPlaceholderMap;
  const telHref = `tel:+${siteConfig.phone.replace(/\D/g, "")}`;
  const telegram = siteConfig.socialLinks.find(
    s => s.label === "Telegram"
  )?.href;
  const socials = siteConfig.socialLinks.filter(({ href }) => href !== "#");

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
        <div className="container grid max-w-[1280px] grid-cols-1 gap-8 pb-12 pt-[104px] md:grid-cols-12 md:pb-16 md:pt-[132px] xl:gap-12 xl:pb-[72px] xl:pt-[150px]">
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
            <ul className="mt-7 flex flex-wrap gap-2.5">
              <li className="inline-flex items-center gap-2 rounded-full bg-white/[0.08] px-4 py-2.5 text-[14px] font-medium shadow-[inset_0_0_0_1px_rgba(255,255,255,0.14)]">
                <LineIcon name="building" className="size-4 text-accent" />
                {t("v2.city")}
              </li>
              <li className="inline-flex items-center gap-2 rounded-full bg-white/[0.08] px-4 py-2.5 text-[14px] font-medium shadow-[inset_0_0_0_1px_rgba(255,255,255,0.14)]">
                <LineIcon name="clock" className="size-4 text-accent" />
                {t("v2.hours")}
              </li>
            </ul>
          </div>

          {/* contact panel */}
          <div className="relative md:col-span-6">
            <Rings className="pointer-events-none absolute -right-[30%] top-1/2 -z-10 w-[140%] -translate-y-1/2" />
            <div className="relative isolate overflow-hidden rounded-[28px] bg-white/[0.06] p-5 shadow-[0_40px_80px_-40px_rgba(0,0,0,0.9),inset_0_0_0_1px_rgba(255,255,255,0.12)] backdrop-blur-md md:p-7">
              <p className="text-[13px] font-medium text-white/60">
                {t("v2.phoneLabel")}
              </p>
              <a
                href={telHref}
                className="mt-1 block whitespace-nowrap text-[28px] font-semibold tabular-nums tracking-[-0.01em] transition-colors hover:text-[#9db8ff] md:text-[26px] lg:text-[32px] xl:text-[38px]"
              >
                {formatPhone(siteConfig.phone)}
              </a>
              <p className="mt-5 text-[13px] font-medium text-white/60">
                {t("v2.emailLabel")}
              </p>
              <a
                href={`mailto:${siteConfig.email}`}
                className="mt-1 block break-all text-[18px] font-semibold transition-colors hover:text-[#9db8ff] md:text-[22px]"
              >
                {siteConfig.email}
              </a>

              <div className="mt-7 grid grid-cols-1 gap-3 xl:grid-cols-2">
                <a
                  href={telHref}
                  className="flex h-[50px] items-center justify-center gap-2.5 rounded-full bg-accent-strong px-5 text-[15px] font-semibold shadow-[0_12px_32px_-12px_rgba(81,136,255,0.8)] transition-colors duration-300 hover:bg-[#2f5fe0]"
                >
                  <LineIcon name="phone" className="size-[18px]" />
                  {t("v2.call")}
                </a>
                {telegram && (
                  <a
                    href={telegram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-[50px] items-center justify-center gap-2.5 rounded-full bg-light px-5 text-[15px] font-semibold text-dark transition-colors duration-300 hover:bg-[#dfe8ff]"
                  >
                    <span className="size-5 text-accent-strong [&_svg]:size-5">
                      <TelegramIcon />
                    </span>
                    Telegram
                  </a>
                )}
              </div>

              <div className="mt-6 flex flex-wrap items-center justify-between gap-x-4 gap-y-3 border-t border-white/10 pt-5">
                <span className="text-[13px] font-medium text-white/60">
                  {t("v2.socials")}
                </span>
                <ul className="flex flex-wrap gap-2">
                  {socials.map(({ href, icon, label }) => (
                    <li key={label}>
                      <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={label}
                        className="grid size-11 place-items-center rounded-full bg-white/[0.08] text-light shadow-[inset_0_0_0_1px_rgba(255,255,255,0.14)] transition-colors duration-300 hover:bg-accent-strong [&_svg]:size-5"
                      >
                        {icon}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#f3f6fd] py-14 md:py-20 xl:py-[100px]">
        <div className="container grid max-w-[1280px] grid-cols-1 gap-4 lg:grid-cols-12 lg:gap-6">
          <div className="rounded-[28px] bg-white p-6 shadow-[0_1px_2px_rgba(9,17,41,0.05)] md:p-10 lg:col-span-7">
            <SectionHead
              title={t("v2.formTitle")}
              descr={t("v2.formDescr")}
              className="md:mb-8"
            />
            <ContactFeedbackForm
              formPlaceholder={placeholders}
              btnText={t("feedback.button")}
            />
          </div>
          <div className="relative isolate min-h-[360px] overflow-hidden rounded-[28px] md:min-h-[440px] lg:col-span-5">
            <Image
              src="/images/announcementsPage/announcements-hero-person.webp"
              alt={t("v2.photoAlt")}
              fill
              sizes="(min-width: 1024px) 480px, 92vw"
              className="object-cover object-[40%_20%]"
            />
            <span
              aria-hidden
              className="absolute inset-x-0 bottom-0 h-[50%] bg-[linear-gradient(0deg,rgba(9,17,41,0.85),rgba(9,17,41,0))]"
            />
            <div className="absolute inset-x-4 bottom-4 flex items-center gap-3 rounded-[18px] bg-light p-2.5 pr-4 text-dark shadow-[0_20px_40px_-20px_rgba(0,0,0,0.6)] md:inset-x-5 md:bottom-5">
              <span className="relative grid size-11 shrink-0 place-items-center rounded-full bg-dark text-accent">
                <LineIcon name="chat" className="size-5" />
                <span className="absolute -right-0.5 -top-0.5 size-3 rounded-full bg-[#2fbf71] ring-2 ring-white" />
              </span>
              <span className="min-w-0">
                <span className="block text-[15px] font-semibold leading-[1.2]">
                  {t("v2.personal")}
                </span>
                <span className="mt-0.5 block text-[13px] text-dark/65">
                  {t("v2.hours")}
                </span>
              </span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ContactsView;
