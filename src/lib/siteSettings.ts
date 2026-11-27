import { cache } from "react";

import { client } from "@/lib/sanity";
import { siteConfig } from "@/constants/siteConfig";
import { extractVideoId } from "@/utils/extractVideoId";

/**
 * Contacts, socials and site-wide media from the admin document
 * «Налаштування сайту» (siteSettings). Every empty field keeps the value from
 * src/constants/siteConfig.tsx, so the site looks the same until the client
 * fills something in. Read once per request (React cache); pages are
 * rendered per request, so a publish shows up on the next page view.
 */

type Raw = {
  phone?: string;
  email?: string;
  telegram?: string;
  facebook?: string;
  instagram?: string;
  linkedin?: string;
  youtube?: string;
  tiktok?: string;
  googleReviewsUrl?: string;
  videoUrl?: string;
  videoTitle?: { uk?: string; ru?: string };
  videoUploadDate?: string;
};

export type SocialLink = (typeof siteConfig.socialLinks)[number];

export type SiteVideo = {
  id: string;
  url: string;
  title?: { uk?: string; ru?: string };
  uploadDate?: string;
};

export type SiteContacts = {
  phone: string;
  email: string;
  /** Telegram link (t.me) or undefined */
  telegram?: string;
  /** same shape as siteConfig.socialLinks; "#" = not set */
  socialLinks: SocialLink[];
  googleReviewsUrl?: string;
  video?: SiteVideo;
};

const LABEL_TO_FIELD: Record<string, keyof Raw> = {
  Facebook: "facebook",
  Instagram: "instagram",
  Telegram: "telegram",
  LinkedIn: "linkedin",
  YouTube: "youtube",
  TikTok: "tiktok",
};

const httpUrl = (v?: string) =>
  v && /^https?:\/\//i.test(v.trim()) ? v.trim() : undefined;

export function mergeSettings(raw: Raw | null): SiteContacts {
  const r = raw ?? {};
  const socialLinks = siteConfig.socialLinks.map(link => {
    const field = LABEL_TO_FIELD[link.label];
    const href = field ? httpUrl(r[field] as string | undefined) : undefined;
    return href ? { ...link, href } : link;
  });
  const telegram = socialLinks.find(s => s.label === "Telegram")?.href;
  const videoUrl = httpUrl(r.videoUrl);
  const videoId = videoUrl ? extractVideoId(videoUrl) : "";

  return {
    phone:
      r.phone && r.phone.replace(/\D/g, "").length >= 10
        ? r.phone.trim()
        : siteConfig.phone,
    email: r.email?.includes("@") ? r.email.trim() : siteConfig.email,
    telegram: telegram && telegram !== "#" ? telegram : undefined,
    socialLinks,
    googleReviewsUrl: httpUrl(r.googleReviewsUrl),
    video:
      videoUrl && videoId
        ? {
            id: videoId,
            url: videoUrl,
            title: r.videoTitle,
            uploadDate: r.videoUploadDate,
          }
        : undefined,
  };
}

export const getSiteContacts = cache(async (): Promise<SiteContacts> => {
  const raw = await client
    .fetch<Raw | null>(
      `*[_id == "siteSettings"][0]{
        phone, email, telegram, facebook, instagram, linkedin, youtube, tiktok,
        googleReviewsUrl, videoUrl, videoTitle, videoUploadDate
      }`
    )
    .catch(() => null);
  return mergeSettings(raw);
});
