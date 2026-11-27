import { getTranslations } from "next-intl/server";
import Image from "next/image";

import { getGallery } from "@/lib/sanity/queries/gallery";
import { Locale } from "@/types/locale";

import LineIcon, { Rings } from "../homepage/LineIcon";
import GalleryEvent from "./GalleryEvent";

/** «Галерея заходів»: dark hero with a photo collage, then one bento per event. */
const GalleryView = async ({ lang }: { lang: Locale }) => {
  const t = await getTranslations("galleryPage");
  const events = (await getGallery()).filter(e => e.images?.length);
  const cover = events.map(e => e.images[0]).slice(0, 3);
  const labels = {
    allPhotos: t("v2.allPhotos"),
    photo: t("v2.photo"),
    prev: t("v2.prev"),
    next: t("v2.next"),
    close: t("v2.close"),
  };

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
        <div className="container max-w-[1280px] pb-12 pt-[104px] md:pb-16 md:pt-[132px] xl:pb-[72px] xl:pt-[150px]">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-8 xl:gap-12">
            <div className="min-w-0 md:col-span-6 md:self-center">
              <h1>
                <span className="block text-balance font-micra text-[clamp(28px,8.4vw,36px)] uppercase leading-[1.1] [word-spacing:-0.2em] md:text-[40px] xl:text-[54px]">
                  {t("hero.title")}
                </span>
                <span className="mt-4 block max-w-[520px] text-pretty text-[15px] font-medium leading-[1.45] text-[#c9d8ff] md:mt-5 md:text-[17px]">
                  {t("hero.subtitle")}
                </span>
              </h1>
              <p className="mt-5 max-w-[520px] text-pretty text-[15px] leading-[1.6] text-white/70 md:text-[16px]">
                {t("hero.descr")}
              </p>
            </div>

            {/* collage of real event photos */}
            <div className="relative md:col-span-6">
              <Rings className="pointer-events-none absolute -right-[30%] top-1/2 -z-10 w-[140%] -translate-y-1/2" />
              <div className="relative h-[340px] sm:h-[380px] md:h-[400px] xl:h-[460px]">
                {cover[0] && (
                  <div className="absolute inset-y-0 left-0 w-[66%] overflow-hidden rounded-[28px] shadow-[0_40px_80px_-40px_rgba(0,0,0,0.9)] ring-1 ring-white/10">
                    <Image
                      src={cover[0].url}
                      alt={events[0].title[lang]}
                      fill
                      priority
                      sizes="(min-width: 1280px) 400px, (min-width: 768px) 32vw, 62vw"
                      className="object-cover object-[50%_30%]"
                    />
                  </div>
                )}
                {cover.slice(1).map((img, i) => (
                  <div
                    key={img.url}
                    className={
                      i === 0
                        ? "absolute right-0 top-0 h-[47%] w-[44%] overflow-hidden rounded-[22px] shadow-[0_30px_60px_-30px_rgba(0,0,0,0.9)] ring-4 ring-dark"
                        : "absolute bottom-0 right-0 h-[47%] w-[44%] overflow-hidden rounded-[22px] shadow-[0_30px_60px_-30px_rgba(0,0,0,0.9)] ring-4 ring-dark"
                    }
                  >
                    <Image
                      src={img.url}
                      alt={events[i + 1].title[lang]}
                      fill
                      sizes="(min-width: 1280px) 260px, (min-width: 768px) 22vw, 42vw"
                      className="object-cover object-[50%_30%]"
                    />
                  </div>
                ))}
                <span className="absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-full bg-dark/70 px-3.5 py-2 text-[13px] font-medium shadow-[inset_0_0_0_1px_rgba(255,255,255,0.18)] backdrop-blur-md">
                  <LineIcon name="team" className="size-4 text-accent" />
                  {t("v2.caption")}
                </span>
              </div>
            </div>
          </div>

          {events.length > 1 && (
            <nav aria-label={t("v2.navLabel")} className="mt-10 md:mt-14">
              <ul className="grid grid-cols-1 gap-2.5 md:gap-3 xl:grid-cols-3 xl:gap-4">
                {events.map((e, i) => (
                  <li key={i}>
                    <a
                      href={`#event-${i + 1}`}
                      className="group flex h-full items-center gap-4 rounded-[20px] bg-white/[0.05] p-3 pr-4 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.1)] backdrop-blur-sm transition-colors duration-300 hover:bg-white/[0.1] md:p-4 md:pr-5"
                    >
                      <span className="relative size-12 shrink-0 overflow-hidden rounded-[14px] ring-1 ring-white/15">
                        <Image
                          src={e.images[0].url}
                          alt=""
                          fill
                          sizes="48px"
                          className="object-cover"
                        />
                      </span>
                      <span className="line-clamp-2 min-w-0 flex-1 text-[15px] font-semibold leading-[1.3]">
                        {e.title[lang]}
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
          )}
        </div>
      </section>

      {events.map((e, i) => (
        <GalleryEvent
          key={i}
          id={`event-${i + 1}`}
          title={e.title[lang]}
          description={e.description[lang]}
          images={e.images}
          labels={labels}
          tone={i % 2 === 0 ? "white" : "soft"}
        />
      ))}
    </>
  );
};

export default GalleryView;
