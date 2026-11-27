import { client } from "@/lib/sanity";
import { SITE_URL } from "@/utils/getBaseUrl";

export const revalidate = 86400;

/** llms.txt — a short, plain description of the site for AI assistants. */
export async function GET() {
  let courses: { title: string; url: string; descr?: string }[] = [];
  try {
    courses = await client.fetch(
      `*[_type == "course" && defined(slug.current)] | order(_createdAt desc){
        "title": title.uk,
        "descr": description.uk,
        "url": "/uk/education/" + courseType->slug.current + "/" + slug.current
      }`
    );
  } catch {
    /* CMS unavailable */
  }

  const body = `# Олександр Ситников — адвокат, суддя Вищого адміністративного суду України у відставці

> Офіційний сайт Олександра Ситникова: курси для адвокатів і юристів з адміністративного процесу, касації, судової промови та податкових спорів, а також консультації адвоката у публічно-правових спорах (спори з державними органами, апеляція, касація). Понад 30 років у праві, понад 10 000 розглянутих справ, понад 17 років викладання.

Мови сайту: українська (/uk), російська (/ru).
Контакти: +38 066 255 54 86, sytnykovof@gmail.com, м. Київ.

## Основні сторінки
- [Головна](${SITE_URL}/uk): позиціонування, курси, досвід, консультація
- [Навчання](${SITE_URL}/uk/education): усі курси та вебінари Школи процесуального мистецтва
- [Послуги](${SITE_URL}/uk/services): судова практика, аналітична та наукова робота, консалтинг
- [Досвід та діяльність](${SITE_URL}/uk/experience): кар'єра, справи, якими пишаємося
- [Публікації](${SITE_URL}/uk/publications): статті з адміністративного права та процесу
- [Анонси](${SITE_URL}/uk/announcements): найближчі заходи та вебінари
- [Контакти](${SITE_URL}/uk/contacts)

## Курси
${courses
  .map(
    c => `- [${c.title}](${SITE_URL}${c.url})${c.descr ? `: ${c.descr}` : ""}`
  )
  .join("\n")}

## Додатково
- [Карта сайту](${SITE_URL}/sitemap.xml)
`;

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
