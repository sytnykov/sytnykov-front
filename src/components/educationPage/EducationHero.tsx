import { Fragment } from "react";
import { getTranslations } from "next-intl/server";
import Image from "next/image";

import { APPLICATION } from "@/constants/application";

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

/** Dark first screen with a collage of course photos. */
const EducationHero = async () => {
  const t = await getTranslations("educationPage.hero");
  const accent = t.raw("titleAccent") as string[];

  return (
    <section className="relative isolate overflow-hidden bg-dark text-light">
      <div
        aria-hidden
        className="absolute inset-0 -z-20 bg-[radial-gradient(45%_60%_at_78%_45%,rgba(81,136,255,0.34)_0%,rgba(9,17,41,0)_70%),radial-gradient(35%_45%_at_0%_100%,rgba(0,28,88,0.9)_0%,rgba(9,17,41,0)_100%)]"
      />
      <span
        aria-hidden
        className="absolute inset-0 -z-20 bg-[radial-gradient(rgba(255,255,255,0.07)_1px,transparent_1.2px)] [background-size:18px_18px] [mask-image:linear-gradient(160deg,#000_0%,transparent_45%)]"
      />

      <div className="container grid max-w-[1280px] grid-cols-1 gap-10 pb-14 pt-[104px] md:grid-cols-12 md:gap-8 md:pb-16 md:pt-[132px] xl:gap-12 xl:pb-[80px] xl:pt-[150px]">
        <div className="min-w-0 md:col-span-6 md:self-center xl:col-span-6">
          <h1>
            <span className="block text-balance font-micra text-[clamp(28px,8.4vw,36px)] leading-[1.1] [word-spacing:-0.2em] md:text-[40px] xl:text-[54px] xl:leading-[1.06]">
              {highlight(t("title"), accent)}
            </span>
            <span className="mt-4 block max-w-[520px] text-pretty text-[14px] font-medium leading-[1.45] text-[#c9d8ff] sm:text-[15px] md:mt-5 md:text-[16px] xl:text-[17px]">
              {t("titleSeo")}
            </span>
          </h1>
          <p className="mt-5 max-w-[520px] text-pretty text-[15px] leading-[1.6] text-white/70 max-md:hidden md:text-[16px]">
            {t("descr")}
          </p>
          <div className="mt-7 flex flex-col gap-3 md:mt-9 lg:flex-row">
            <a
              href="#courses"
              className="flex h-[50px] items-center justify-center rounded-full bg-accent-strong px-7 text-[15px] font-semibold shadow-[0_12px_32px_-12px_rgba(81,136,255,0.8)] transition-colors duration-300 hover:bg-[#2f5fe0]"
            >
              {t("button")}
            </a>
            <ModalTrigger
              variant="course"
              course={t("helpCourse")}
              buttonVariant="transparent"
              label={t("help")}
              buttonClassName="h-[50px] py-0 px-7 text-[15px] font-semibold border-white/25 lg:w-auto"
              messageFrom={APPLICATION.COURSE}
            />
          </div>
        </div>

        {/* collage of course photos */}
        <div className="relative h-[340px] sm:h-[420px] md:col-span-6 md:h-[460px] xl:h-[520px]">
          <Rings className="pointer-events-none absolute -right-[30%] top-1/2 -z-10 w-[140%] -translate-y-1/2" />
          <div className="absolute left-0 top-0 h-[78%] w-[70%] overflow-hidden rounded-[28px] shadow-[0_40px_80px_-40px_rgba(0,0,0,0.9)] ring-1 ring-white/10">
            <Image
              src="/images/homepage/courses/speech.webp"
              alt=""
              fill
              priority
              sizes="(min-width: 1280px) 420px, (min-width: 768px) 35vw, 70vw"
              className="object-cover"
            />
            <span
              aria-hidden
              className="absolute inset-0 bg-[linear-gradient(0deg,rgba(9,17,41,0.5),rgba(9,17,41,0)_50%)]"
            />
          </div>
          <div className="absolute bottom-0 right-0 h-[62%] w-[56%] overflow-hidden rounded-[28px] shadow-[0_40px_80px_-30px_rgba(0,0,0,0.95)] ring-4 ring-dark">
            <Image
              src="/images/educationPage/v2/gavel-blue.webp"
              alt=""
              fill
              sizes="(min-width: 1280px) 340px, (min-width: 768px) 28vw, 56vw"
              className="object-cover"
            />
          </div>
          <span className="absolute bottom-[8%] left-0 inline-flex items-center gap-2.5 rounded-[18px] bg-light py-2.5 pl-2.5 pr-4 text-dark shadow-[0_20px_40px_-20px_rgba(0,0,0,0.6)] md:bottom-[10%]">
            <span className="grid size-10 place-items-center rounded-full bg-dark text-accent">
              <LineIcon name="book" className="size-5" />
            </span>
            <span>
              <span className="block text-[14px] font-semibold leading-[1.2]">
                {t("school")}
              </span>
              <span className="block text-[12px] text-dark/60">
                {t("schoolNote")}
              </span>
            </span>
          </span>
          <span className="absolute right-3 top-3 inline-flex items-center gap-2 rounded-full bg-dark/70 px-3.5 py-2 text-[13px] font-medium shadow-[inset_0_0_0_1px_rgba(255,255,255,0.18)] backdrop-blur-md md:right-4 md:top-4">
            <LineIcon name="monitor" className="size-4 text-accent" />
            {t("online")}
          </span>
        </div>
      </div>
    </section>
  );
};

export default EducationHero;
