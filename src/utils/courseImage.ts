/**
 * Courses in the admin have no preview photos yet: each course gets a
 * themed photo until a preview image is uploaded.
 */
const BY_TOPIC: { match: RegExp; image: string }[] = [
  { match: /податк|налог/i, image: "/images/educationPage/v2/tax-documents.webp" },
  { match: /касац|кассац/i, image: "/images/educationPage/v2/cassation-court.webp" },
  { match: /промов|речи|речь/i, image: "/images/homepage/courses/speech.webp" },
  { match: /оскарж|обжал/i, image: "/images/homepage/courses/appeal.webp" },
  { match: /строк|срок/i, image: "/images/educationPage/v2/gavel-blue.webp" },
  {
    match: /публічн|публичн|доказ/i,
    image: "/images/servicespage/v2/analytics-stock.webp",
  },
  { match: /процедур/i, image: "/images/educationPage/v2/books.webp" },
  {
    match: /команд|консалт|корпорат/i,
    image: "/images/educationPage/v2/team.webp",
  },
  {
    match: /актуальн|питання|вопрос/i,
    image: "/images/servicespage/v2/practice-stock.webp",
  },
];

const FALLBACKS = [
  "/images/servicespage/v2/practice-stock.webp",
  "/images/educationPage/v2/books.webp",
  "/images/educationPage/v2/gavel-blue.webp",
];

export const courseImage = (title: string, preview?: string | null) => {
  if (preview) return preview;
  const hit = BY_TOPIC.find(({ match }) => match.test(title));
  if (hit) return hit.image;
  const n = [...title].reduce((a, c) => a + c.charCodeAt(0), 0);
  return FALLBACKS[n % FALLBACKS.length];
};

/** Some titles in the CMS are typed in caps — show them in sentence case. */
export const normalizeTitle = (title: string) =>
  title === title.toUpperCase()
    ? title.charAt(0) + title.slice(1).toLowerCase()
    : title;
