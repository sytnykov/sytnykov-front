import { getTranslations } from "next-intl/server";
import Image from "next/image";

import { Link } from "@/i18n/navigation";
import { FullContentBlock, SanityImage } from "@/lib/sanity/types/shared";
import { APPLICATION } from "@/constants/application";
import { ROUTES } from "@/constants/routes";

import LineIcon, { Rings } from "../homepage/LineIcon";
import SectionHead from "../homepage/SectionHead";
import ModalTrigger from "../module/modal/ModalTrigger";
import GallerySlider from "../shared/gallerySlider/GallerySlider";
import RenderContent from "../shared/renderContent/RenderContent";
import PublicationTile from "./PublicationTile";
import { TileData } from "./PublicationsGrid";

/** One article: dark header, readable body, author card, related articles. */
const ArticleView = async ({
  title,
  description,
  readingTime,
  content,
  gallery,
  related,
}: {
  title: string;
  description: string;
  readingTime: string;
  content: FullContentBlock[];
  gallery?: SanityImage[];
  related: TileData[];
}) => {
  const t = await getTranslations("publicationsPage");
  const tHome = await getTranslations("homepage.publications");

  return (
    <>
      <section className="relative isolate overflow-hidden bg-dark text-light">
        <div
          aria-hidden
          className="absolute inset-0 -z-20 bg-[radial-gradient(45%_70%_at_85%_30%,rgba(81,136,255,0.3)_0%,rgba(9,17,41,0)_70%),radial-gradient(35%_60%_at_0%_100%,rgba(0,28,88,0.9)_0%,rgba(9,17,41,0)_100%)]"
        />
        <Rings className="pointer-events-none absolute -right-[180px] top-1/2 -z-10 w-[640px] -translate-y-1/2 max-md:hidden" />
        <div className="container max-w-[1280px] pb-12 pt-[110px] md:pb-16 md:pt-[140px]">
          <Link
            href={ROUTES.PUBLICATIONS}
            className="inline-flex items-center gap-2 text-[14px] font-medium text-white/70 transition-colors hover:text-light"
          >
            <svg aria-hidden viewBox="0 0 20 20" className="size-4">
              <path
                d="M16 10H5m4-4-4 4 4 4"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            {t("back")}
          </Link>
          <div className="mt-6 flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 text-[13px] font-medium shadow-[inset_0_0_0_1px_rgba(255,255,255,0.14)]">
              <LineIcon name="clock" className="size-4 text-accent" />
              {readingTime}
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 text-[13px] font-medium shadow-[inset_0_0_0_1px_rgba(255,255,255,0.14)]">
              <LineIcon name="document" className="size-4 text-accent" />
              {tHome("label")}
            </span>
          </div>
          <h1 className="mt-5 max-w-[980px] text-balance font-micra text-[24px] leading-[1.15] [word-spacing:-0.18em] md:text-[34px] xl:text-[44px]">
            {title}
          </h1>
          <p className="mt-5 max-w-[720px] text-pretty text-[16px] leading-[1.6] text-[#c9d8ff] md:text-[18px]">
            {description}
          </p>
        </div>
      </section>

      <section className="bg-light py-12 md:py-16 xl:py-20">
        <div className="container grid max-w-[1280px] grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-14">
          <article className="min-w-0 lg:col-span-8">
            <div className="flex max-w-[760px] flex-col gap-5 text-[16px] leading-[1.75] text-dark/80 md:text-[18px] [&_a]:text-accent-strong [&_h2]:mt-6 [&_h2]:font-micra [&_h2]:text-[22px] [&_h2]:font-normal [&_h2]:leading-[1.2] [&_h2]:text-dark md:[&_h2]:text-[26px] [&_h3]:mt-5 [&_h3]:text-[20px] [&_h3]:leading-[1.3] [&_h3]:text-dark [&_h4]:mt-4 [&_h4]:text-[18px] [&_h4]:text-dark [&_li::marker]:text-accent [&_span.font-bold]:font-semibold [&_span.font-bold]:text-dark [&_ul]:flex [&_ul]:flex-col [&_ul]:gap-2">
              <RenderContent content={content} />
            </div>
            {gallery && gallery.length > 0 && (
              <div className="mt-10">
                <GallerySlider
                  gallery={gallery}
                  imgAlt={title}
                  sliderId="1"
                  isDecor={false}
                />
              </div>
            )}
          </article>

          <aside className="lg:col-span-4">
            <div className="relative isolate overflow-hidden rounded-[28px] bg-dark p-6 text-light md:p-7 lg:sticky lg:top-28">
              <Rings className="absolute -right-[130px] -top-[130px] -z-10 w-[360px]" />
              <p className="text-[13px] font-medium text-white/60">
                {t("author")}
              </p>
              <div className="mt-3 flex items-center gap-3">
                <span className="relative size-14 shrink-0 overflow-hidden rounded-full bg-[#2c52bd]">
                  <Image
                    src="/images/homepage/home-hero-card-portrait.webp"
                    alt=""
                    fill
                    sizes="56px"
                    className="object-cover object-top"
                  />
                </span>
                <span>
                  <span className="block text-[17px] font-semibold leading-[1.25]">
                    {t("authorName")}
                  </span>
                  <span className="mt-0.5 block text-[13px] leading-[1.4] text-[#c9d8ff]">
                    {t("authorRole")}
                  </span>
                </span>
              </div>
              <div className="mt-6">
                <ModalTrigger
                  variant="consultation"
                  buttonVariant="accent"
                  label={t("consult")}
                  buttonClassName="h-[50px] py-0 text-[15px] font-semibold"
                  messageFrom={APPLICATION.CONSULTATION}
                />
              </div>
              <Link
                href={ROUTES.EDUCATION}
                className="mt-3 flex h-[50px] items-center justify-center rounded-full border border-white/25 px-6 text-[15px] font-semibold transition-colors duration-300 hover:border-white"
              >
                {t("courses")}
              </Link>
            </div>
          </aside>
        </div>
      </section>

      {related.length > 0 && (
        <section className="bg-[#f3f6fd] py-14 md:py-20">
          <div className="container max-w-[1280px]">
            <SectionHead title={t("related")} />
            <ul className="grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-5 xl:grid-cols-3">
              {related.map(item => (
                <li key={item.href}>
                  <PublicationTile {...item} label={tHome("label")} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
    </>
  );
};

export default ArticleView;
