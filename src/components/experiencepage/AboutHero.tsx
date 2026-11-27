import { Fragment } from "react";
import { getMessages, getTranslations } from "next-intl/server";
import Image from "next/image";

import { Link } from "@/i18n/navigation";
import { APPLICATION } from "@/constants/application";
import { ROUTES } from "@/constants/routes";

import LineIcon, { Rings } from "../homepage/LineIcon";
import ModalTrigger from "../module/modal/ModalTrigger";

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

/** «Про мене» first screen: the path in one line, a real photo, the numbers. */
const AboutHero = async () => {
  const t = await getTranslations("experiencePage.about");
  const tHero = await getTranslations("experiencePage.hero");
  const messages = await getMessages();
  const proof = messages.homepage.hero.proof as {
    number: string;
    label: string;
  }[];

  return (
    <section className="relative isolate overflow-hidden bg-dark text-light">
      <div
        aria-hidden
        className="absolute inset-0 -z-20 bg-[radial-gradient(45%_60%_at_78%_40%,rgba(81,136,255,0.34)_0%,rgba(9,17,41,0)_70%),radial-gradient(35%_45%_at_0%_100%,rgba(0,28,88,0.9)_0%,rgba(9,17,41,0)_100%)]"
      />
      <span
        aria-hidden
        className="absolute inset-0 -z-20 bg-[radial-gradient(rgba(255,255,255,0.07)_1px,transparent_1.2px)] [background-size:18px_18px] [mask-image:linear-gradient(160deg,#000_0%,transparent_45%)]"
      />

      <div className="container max-w-[1280px] pb-12 pt-[104px] md:pb-16 md:pt-[132px] xl:pb-[72px] xl:pt-[150px]">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-12 xl:gap-12">
          <div className="min-w-0 md:col-span-7 md:self-center">
            <h1>
              <span className="block text-balance font-micra text-[clamp(26px,7.6vw,34px)] leading-[1.1] [word-spacing:-0.2em] md:text-[38px] xl:text-[50px] xl:leading-[1.06]">
                {highlight(t("title"), t.raw("titleAccent") as string[])}
              </span>
              <span className="mt-4 block max-w-[540px] text-pretty text-[14px] font-medium leading-[1.45] text-[#c9d8ff] sm:text-[15px] md:mt-5 md:text-[16px] xl:text-[17px]">
                {t("seo")}
              </span>
            </h1>
            <blockquote className="relative mt-6 max-w-[560px] pl-10 max-md:hidden">
              <LineIcon
                name="quote"
                className="absolute left-0 top-0 size-7 text-accent"
              />
              <p className="text-pretty text-[16px] leading-[1.6] text-white/75">
                {tHero("descr")}
              </p>
            </blockquote>
            <div className="mt-7 flex flex-col gap-3 md:mt-9 lg:flex-row">
              <ModalTrigger
                variant="consultation"
                buttonVariant="accent"
                buttonClassName="h-[50px] py-0 px-7 text-[15px] font-semibold lg:w-auto"
                messageFrom={APPLICATION.CONSULTATION}
              />
              <Link
                href={ROUTES.EDUCATION}
                className="flex h-[50px] items-center justify-center rounded-full border border-white/25 px-7 text-[15px] font-semibold transition-colors duration-300 hover:border-white"
              >
                {t("courses")}
              </Link>
            </div>
          </div>

          <div className="relative md:col-span-5">
            <Rings className="pointer-events-none absolute -right-[38%] top-1/2 -z-10 w-[150%] -translate-y-1/2" />
            <div className="relative isolate h-[320px] overflow-hidden rounded-[28px] shadow-[0_40px_80px_-40px_rgba(0,0,0,0.9)] ring-1 ring-white/10 sm:h-[400px] md:h-full md:min-h-[440px]">
              <Image
                src="/images/experiencePage/experience-hero-photo.webp"
                alt={tHero("imgAlt")}
                fill
                priority
                sizes="(min-width: 1280px) 460px, (min-width: 768px) 40vw, 92vw"
                className="object-cover object-[62%_50%]"
              />
              <span
                aria-hidden
                className="absolute inset-x-0 bottom-0 h-[45%] bg-[linear-gradient(0deg,rgba(9,17,41,0.85)_0%,rgba(9,17,41,0)_100%)]"
              />
              <span className="absolute inset-x-4 bottom-4 flex items-center gap-3 rounded-[18px] bg-light p-2.5 pr-4 text-dark shadow-[0_20px_40px_-20px_rgba(0,0,0,0.6)] md:inset-x-5 md:bottom-5">
                <span className="grid size-10 shrink-0 place-items-center rounded-full bg-dark text-accent">
                  <LineIcon name="chat" className="size-5" />
                </span>
                <span className="min-w-0 text-[13px] leading-[1.35] text-dark/70">
                  {t("photoCaption")}
                </span>
              </span>
            </div>
          </div>
        </div>

        <ul className="mt-10 grid grid-cols-1 divide-y divide-white/10 rounded-[24px] bg-white/[0.05] px-5 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.1)] md:mt-14 md:grid-cols-3 md:divide-x md:divide-y-0 md:px-0 md:py-7">
          {proof.map(f => (
            <li
              key={f.label}
              className="flex items-center gap-4 py-4 md:block md:px-8 md:py-0"
            >
              <span className="block min-w-[120px] whitespace-nowrap font-micra text-[28px] leading-none text-accent md:min-w-0 md:text-[30px] xl:text-[40px]">
                {f.number}
              </span>
              <span className="block text-[14px] leading-[1.4] text-white/65 md:mt-3 md:text-[15px]">
                {f.label}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default AboutHero;
