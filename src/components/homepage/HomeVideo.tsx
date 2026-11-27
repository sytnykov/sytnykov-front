import { getSiteContacts } from "@/lib/siteSettings";
import { Locale } from "@/types/locale";

import YouTubeLite from "../coursePage/builder/YouTubeLite";
import JsonLd from "../seo/JsonLd";
import { PERSON_ID } from "../seo/siteSchema";
import SectionHead from "./SectionHead";

/**
 * Business-card video from the admin (Налаштування сайту → Відео-візитка).
 * Nothing is rendered while the link is empty. Only the YouTube thumbnail
 * loads (lazily); the player itself loads after a click.
 */
const HomeVideo = async ({ locale }: { locale: Locale }) => {
  const { video } = await getSiteContacts();
  if (!video) return null;

  const title = video.title?.[locale] || video.title?.uk || "";
  const name =
    title || (locale === "ru" ? "Александр Сытников" : "Олександр Ситников");
  // Google rejects VideoObject without uploadDate, so skip the markup then
  const videoLd = video.uploadDate && {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name,
    description: name,
    thumbnailUrl: [
      `https://i.ytimg.com/vi/${video.id}/maxresdefault.jpg`,
      `https://i.ytimg.com/vi/${video.id}/hqdefault.jpg`,
    ],
    uploadDate: video.uploadDate,
    embedUrl: `https://www.youtube.com/embed/${video.id}`,
    url: `https://www.youtube.com/watch?v=${video.id}`,
    inLanguage: locale,
    author: { "@id": PERSON_ID },
  };

  return (
    <section className="bg-white py-14 md:py-20 xl:py-[100px]">
      {videoLd && <JsonLd data={videoLd} />}
      <div className="container grid max-w-[1280px] grid-cols-1 items-center gap-6 lg:grid-cols-12 lg:gap-10">
        {title && (
          <div className="lg:col-span-4">
            <SectionHead title={title} className="mb-0 md:mb-0" />
          </div>
        )}
        <div className={title ? "lg:col-span-8" : "lg:col-span-12"}>
          <YouTubeLite id={video.id} title={name} />
        </div>
      </div>
    </section>
  );
};

export default HomeVideo;
