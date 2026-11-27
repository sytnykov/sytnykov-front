"use client";

import { useTranslations } from "next-intl";

import LocaleSwitcher from "@/components/shared/localSwitcher/LocalSwitcher";
import { Link, usePathname } from "@/i18n/navigation";
import { ROUTES } from "@/constants/routes";
import { siteConfig } from "@/constants/siteConfig";
import { cn } from "@/utils/cn";

import CloseButton from "./CloseButton";

interface BurgerMenuMobTabProps {
  isOpen: boolean;
  closeMenu: () => void;
}

const formatPhone = (phone: string) => {
  const d = phone.replace(/\D/g, "");
  return `+${d.slice(0, 2)} ${d.slice(2, 5)} ${d.slice(5, 8)} ${d.slice(8, 10)} ${d.slice(10)}`;
};

const BurgerMenu = ({ isOpen, closeMenu }: BurgerMenuMobTabProps) => {
  const t = useTranslations("header.nav");
  const pathname = usePathname();

  const items = [
    { title: t("home"), path: ROUTES.HOME },
    { title: t("education"), path: ROUTES.EDUCATION },
    { title: t("services"), path: ROUTES.SERVICES },
    { title: t("experience"), path: ROUTES.EXPERIENCE },
    { title: t("publications"), path: ROUTES.PUBLICATIONS },
    { title: t("announcements"), path: ROUTES.ANNOUNCEMENTS },
    { title: t("gallery"), path: ROUTES.GALLERY },
    { title: t("contacts"), path: ROUTES.CONTACTS },
  ];

  const socials = siteConfig.socialLinks.filter(({ href }) => href !== "#");

  return (
    <div
      aria-hidden={!isOpen}
      className={cn(
        "fixed right-0 top-0 z-[110] flex h-[100dvh] w-[100vw] flex-col overflow-y-auto bg-dark text-light transition duration-500 ease-out md:w-[440px] md:border-l md:border-white/10",
        isOpen
          ? "no-doc-scroll visible translate-x-0 opacity-100"
          : "invisible translate-x-full opacity-0"
      )}
    >
      {/* soft light like the hero */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_40%_at_80%_0%,rgba(81,136,255,0.25)_0%,rgba(9,17,41,0)_70%)]"
      />

      <div className="relative flex items-center justify-between px-5 pt-4">
        <div className="rounded-full shadow-[inset_0_0_0_1px_rgba(255,255,255,0.3)] [&_button]:py-1.5 [&_button]:text-[13px]">
          <LocaleSwitcher />
        </div>
        <CloseButton onClick={closeMenu} />
      </div>

      <nav aria-label={t("menuTitle")} className="relative mt-6 px-5">
        <ul className="divide-y divide-white/10 border-y border-white/10">
          {items.map(({ title, path }) => {
            const isActive =
              path === ROUTES.HOME
                ? pathname === "/"
                : pathname.startsWith(path);
            return (
              <li key={path}>
                <Link
                  href={path}
                  onClick={closeMenu}
                  aria-current={isActive ? "page" : undefined}
                  className={cn(
                    "group flex items-center justify-between py-[14px] text-[20px] font-medium tracking-[-0.01em] transition-colors duration-300 hover:text-accent",
                    isActive && "text-accent"
                  )}
                >
                  {title}
                  <svg
                    aria-hidden
                    viewBox="0 0 20 20"
                    className="size-5 text-white/40 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-accent"
                  >
                    <path
                      d="M4 10h11m-4-4 4 4-4 4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="relative mt-auto space-y-3 px-5 pb-[max(24px,env(safe-area-inset-bottom))] pt-8">
        <Link
          href={ROUTES.EDUCATION}
          onClick={closeMenu}
          className="flex h-[50px] items-center justify-center gap-2 rounded-full bg-accent-strong text-[15px] font-semibold transition-colors duration-300 hover:bg-[#2f5fe0]"
        >
          {t("cta")}
        </Link>
        <a
          href={`tel:+${siteConfig.phone.replace(/\D/g, "")}`}
          className="flex h-[50px] items-center justify-center rounded-full border border-white/25 text-[15px] font-semibold tabular-nums transition-colors duration-300 hover:border-white"
        >
          {formatPhone(siteConfig.phone)}
        </a>
        {socials.length > 0 && (
          <ul className="flex justify-center gap-2 pt-2">
            {socials.map(({ href, label, icon }) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="grid size-11 place-items-center rounded-full bg-white/[0.06] text-white/80 transition-colors duration-300 hover:bg-accent hover:text-light [&_svg]:size-5"
                >
                  {icon}
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default BurgerMenu;
