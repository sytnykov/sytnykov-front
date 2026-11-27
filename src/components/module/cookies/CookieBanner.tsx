"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";

import { Link } from "@/i18n/navigation";
import { ROUTES } from "@/constants/routes";

import { OPEN_SETTINGS_EVENT, readConsent, saveConsent } from "./consent";

/** Cookie consent: analytics loads only after "Accept". */
const CookieBanner = () => {
  const t = useTranslations("cookies");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!readConsent()) setOpen(true);
    const reopen = () => setOpen(true);
    window.addEventListener(OPEN_SETTINGS_EVENT, reopen);
    return () => window.removeEventListener(OPEN_SETTINGS_EVENT, reopen);
  }, []);

  if (!open) return null;

  const choose = (analytics: boolean) => {
    saveConsent(analytics);
    setOpen(false);
  };

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label={t("title")}
      className="fixed inset-x-3 bottom-3 z-[120] md:inset-x-auto md:bottom-6 md:left-6 md:w-[420px]"
    >
      <div className="rounded-[24px] bg-dark p-5 text-light shadow-[0_30px_60px_-20px_rgba(0,0,0,0.7),inset_0_0_0_1px_rgba(255,255,255,0.1)] md:p-6">
        <div className="flex items-start gap-3">
          <span
            aria-hidden
            className="grid size-10 shrink-0 place-items-center rounded-full bg-accent/15 text-accent shadow-[inset_0_0_0_1px_rgba(81,136,255,0.35)]"
          >
            <svg viewBox="0 0 24 24" className="size-5">
              <path
                d="M20.5 12.5a8.5 8.5 0 1 1-9-9 3 3 0 0 0 3.5 3.5 3 3 0 0 0 3.5 3.5 3 3 0 0 0 2 2ZM8.5 11h.01M12 15.5h.01M15.5 14h.01M9 16.5h.01"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          <div>
            <p className="text-[16px] font-semibold leading-[1.3]">
              {t("title")}
            </p>
            <p className="mt-1.5 text-[13px] leading-[1.55] text-white/65">
              {t.rich("text", {
                link: chunks => (
                  <Link
                    href={ROUTES.PRIVACY}
                    className="underline underline-offset-2 hover:text-light"
                  >
                    {chunks}
                  </Link>
                ),
              })}
            </p>
          </div>
        </div>
        <div className="mt-5 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
          <button
            type="button"
            onClick={() => choose(true)}
            className="h-[46px] rounded-full bg-accent-strong text-[14px] font-semibold text-light transition-colors duration-300 hover:bg-[#2f5fe0]"
          >
            {t("accept")}
          </button>
          <button
            type="button"
            onClick={() => choose(false)}
            className="h-[46px] rounded-full border border-white/25 text-[14px] font-semibold transition-colors duration-300 hover:border-white"
          >
            {t("decline")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieBanner;
