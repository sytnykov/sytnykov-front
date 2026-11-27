import { getTranslations } from "next-intl/server";

import CookieSettingsButton from "@/components/module/cookies/CookieSettingsButton";
import Logo from "@/components/shared/logo/Logo";
import { Link } from "@/i18n/navigation";
import { LEGAL_PAGES, legalPath } from "@/constants/legal";
import { ROUTES } from "@/constants/routes";
import { siteConfig } from "@/constants/siteConfig";

const formatPhone = (phone: string) => {
  const d = phone.replace(/\D/g, "");
  return `+${d.slice(0, 2)} ${d.slice(2, 5)} ${d.slice(5, 8)} ${d.slice(8, 10)} ${d.slice(10)}`;
};

const CodeSiteMark = () => (
  <svg width="18" height="17" viewBox="0 0 18 17" fill="none" aria-hidden>
    <path
      d="M6.70209 16.6336L10.2077 3.6084H11.342L7.4754 16.6336H6.70209Z"
      fill="currentColor"
    />
    <path
      d="M12.3976 16.055V14.693L16.2396 11.8575L12.373 9.02203L12.3976 7.80566L17.0129 11.07V12.7905L12.3976 16.055Z"
      fill="currentColor"
    />
    <path
      d="M4.6153 15.9828V14.6207L0.773268 11.7853L4.63985 8.94976L4.6153 7.7334L0 10.9977V12.7183L4.6153 15.9828Z"
      fill="currentColor"
    />
    <path
      d="M12.5389 4.6733C11.9997 5.21253 10.0225 5.57201 10.0225 5.57201C10.0225 5.57201 9.12381 3.4151 9.30355 2.69614C9.4833 1.97717 10.0225 1.43794 10.0225 1.43794C10.9444 0.46301 11.6776 0.245598 13.0781 0C13.3398 1.86884 13.0781 4.13407 12.5389 4.6733Z"
      fill="currentColor"
    />
  </svg>
);

const Label = ({ children }: { children: string }) => (
  <p className="mb-4 text-[13px] font-medium text-accent">{children}</p>
);

const Footer = async () => {
  const t = await getTranslations("footer");
  const tLegal = await getTranslations("legal");
  const year = new Date().getFullYear();

  const nav = [
    { title: t("education"), path: ROUTES.EDUCATION },
    { title: t("navigation.services"), path: ROUTES.SERVICES },
    { title: t("navigation.experience"), path: ROUTES.EXPERIENCE },
    { title: t("navigation.publications"), path: ROUTES.PUBLICATIONS },
    { title: t("announcements"), path: ROUTES.ANNOUNCEMENTS },
    { title: t("navigation.gallery"), path: ROUTES.GALLERY },
    { title: t("navigation.contacts"), path: ROUTES.CONTACTS },
  ];
  const socials = siteConfig.socialLinks.filter(({ href }) => href !== "#");
  const telHref = `tel:+${siteConfig.phone.replace(/\D/g, "")}`;

  return (
    <footer className="bg-[#f3f6fd] md:px-6 md:pb-6">
      <div className="relative isolate overflow-hidden border-t border-white/10 bg-dark text-light md:rounded-[32px] md:border-t-0">
        {/* decor kept away from the contacts */}
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-[radial-gradient(45%_60%_at_0%_100%,rgba(81,136,255,0.28),rgba(81,136,255,0)_70%),radial-gradient(40%_50%_at_0%_100%,rgba(0,28,88,0.9),rgba(9,17,41,0)_100%)]"
        />
        <svg
          aria-hidden
          viewBox="0 0 600 600"
          className="absolute -bottom-[320px] -left-[260px] -z-10 w-[680px]"
        >
          {[290, 230, 170, 110].map((r, i) => (
            <circle
              key={r}
              cx="300"
              cy="300"
              r={r}
              fill="none"
              stroke="#5188ff"
              strokeOpacity={0.12 + i * 0.05}
              strokeDasharray={i === 0 ? "2 7" : undefined}
            />
          ))}
        </svg>

        <div className="mx-auto max-w-[1280px] px-8 pb-6 pt-12 md:px-10 md:pt-10 xl:px-[50px]">
          {/* top: logo + nav pills (tablet/desktop) */}
          <div className="flex items-center justify-between gap-6 border-b border-white/10 pb-7">
            <Logo
              className="h-auto w-7"
              variant="light"
              textStyles="text-light w-[96px] text-[12px] leading-[1.25]"
            />
            <nav aria-label={t("section.nav")} className="hidden lg:block">
              <ul className="flex flex-wrap justify-end gap-2">
                {nav.map(({ title, path }) => (
                  <li key={path}>
                    <Link
                      href={path}
                      className="inline-flex h-10 items-center rounded-full px-4 text-[14px] font-medium text-white/80 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.14)] transition-colors duration-300 hover:bg-light hover:text-dark"
                    >
                      {title}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <div className="grid gap-10 py-9 md:grid-cols-2 md:gap-8 md:py-10 xl:grid-cols-[1.2fr_0.8fr_1.2fr]">
            {/* contacts — the most important thing in a footer, first on phones */}
            <div className="relative xl:order-3 xl:text-right">
              <span
                aria-hidden
                className="absolute -inset-8 -z-10 rounded-full bg-dark/80 blur-[40px]"
              />
              <Label>{t("contactsLabel")}</Label>
              <a
                href={telHref}
                className="block text-[26px] font-semibold tabular-nums leading-tight tracking-[-0.02em] transition-colors duration-300 hover:text-accent md:text-[30px]"
              >
                {formatPhone(siteConfig.phone)}
              </a>
              <a
                href={`mailto:${siteConfig.email}`}
                className="mt-2 block text-[17px] font-medium text-white/85 transition-colors duration-300 hover:text-accent md:text-[20px]"
              >
                {siteConfig.email}
              </a>
              <p className="mt-3 text-[14px] text-white/55">
                {t("address")} · {t("hours")}
              </p>
              {socials.length > 0 && (
                <ul className="mt-5 flex gap-2 xl:justify-end">
                  {socials.map(({ href, label, icon }) => (
                    <li key={label}>
                      <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={label}
                        className="grid size-11 place-items-center rounded-full bg-white/[0.06] text-white/85 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.12)] transition-colors duration-300 hover:bg-accent hover:text-light [&_svg]:size-5"
                      >
                        {icon}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* who + main action */}
            <div className="xl:order-1">
              <p className="max-w-[360px] text-pretty text-[15px] leading-[1.6] text-white/70">
                {t("tagline")}
              </p>
              <Link
                href={ROUTES.EDUCATION}
                className="group relative mt-6 flex h-[50px] w-full items-center justify-center rounded-full bg-light px-14 text-[15px] font-semibold text-dark transition-colors duration-300 hover:bg-[#dfe8ff] md:inline-flex md:w-auto md:justify-start md:gap-3 md:pl-6 md:pr-[7px]"
              >
                {t("cta")}
                <span className="absolute right-[7px] grid size-9 place-items-center rounded-full bg-accent text-light transition-transform duration-300 group-hover:translate-x-0.5 md:static">
                  <svg aria-hidden viewBox="0 0 16 16" className="size-4">
                    <path
                      d="M2 8h12M9 3l5 5-5 5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.7"
                    />
                  </svg>
                </span>
              </Link>
            </div>

            {/* menu as plain links on phones/tablets */}
            <nav aria-label={t("menuLabel")} className="lg:hidden">
              <Label>{t("menuLabel")}</Label>
              <ul className="grid grid-cols-2 gap-x-6 gap-y-3.5">
                {nav.map(({ title, path }) => (
                  <li key={path}>
                    <Link
                      href={path}
                      className="text-[15px] font-medium text-white/85 transition-colors duration-300 hover:text-accent"
                    >
                      {title}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            {/* legal */}
            <div className="xl:order-2">
              <Label>{t("section.info")}</Label>
              <ul className="space-y-3 text-[14px] text-white/60">
                {LEGAL_PAGES.map(slug => (
                  <li key={slug}>
                    <Link
                      href={legalPath(slug)}
                      className="transition-colors duration-300 hover:text-light"
                    >
                      {tLegal(`docs.${slug}`)}
                    </Link>
                  </li>
                ))}
                <li>
                  <CookieSettingsButton className="text-left transition-colors duration-300 hover:text-light">
                    {tLegal("settings")}
                  </CookieSettingsButton>
                </li>
              </ul>
            </div>
          </div>

          {/* bottom bar */}
          <div className="flex flex-col gap-3 border-t border-white/10 pt-5 text-[13px] text-white/50 md:flex-row md:items-center md:justify-between">
            <p>
              &copy; 2000 - {year} sitnikov.com.ua {t("rights")}
            </p>
            <p className="inline-flex items-center gap-2 uppercase tracking-[0.08em]">
              {t("createdBy")}
              <a
                href="https://www.code-site.art"
                target="_blank"
                rel="nofollow noopener noreferrer"
                className="inline-flex items-center gap-1.5 font-semibold text-light transition-colors duration-300 hover:text-accent"
              >
                CODE-SITE.ART
                <CodeSiteMark />
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
