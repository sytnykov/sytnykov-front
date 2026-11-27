"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";

import Backdrop from "@/components/shared/backdrop/Backdrop";
import LocaleSwitcher from "@/components/shared/localSwitcher/LocalSwitcher";
import Logo from "@/components/shared/logo/Logo";
import { Link, usePathname } from "@/i18n/navigation";
import { ROUTES } from "@/constants/routes";
import { siteConfig } from "@/constants/siteConfig";
import { cn } from "@/utils/cn";

import BurgerButton from "./BurgerButton";
import BurgerMenu from "./BurgerMenu";

const PhoneIcon = ({ className }: { className?: string }) => (
  <svg aria-hidden viewBox="0 0 24 24" className={className}>
    <path
      fill="currentColor"
      d="M6.6 10.8a15.2 15.2 0 0 0 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1A17 17 0 0 1 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1l-2.3 2.2Z"
    />
  </svg>
);

const formatPhone = (phone: string) => {
  const d = phone.replace(/\D/g, "");
  // 380662555486 → +38 066 255 54 86
  return `+${d.slice(0, 2)} ${d.slice(2, 5)} ${d.slice(5, 8)} ${d.slice(8, 10)} ${d.slice(10)}`;
};

const Header = () => {
  const [isNavMenuOpened, setIsNavMenuOpened] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const t = useTranslations("header.nav");
  const pathname = usePathname();

  const openMenu = () => setIsNavMenuOpened(true);
  const closeMenu = () => setIsNavMenuOpened(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const telHref = `tel:+${siteConfig.phone.replace(/\D/g, "")}`;
  // the bar is see-through only on top of the dark home hero
  const isFloating = !isScrolled && pathname === "/";

  const navItems = [
    { title: t("education"), path: ROUTES.EDUCATION },
    { title: t("services"), path: ROUTES.SERVICES },
    { title: t("experience"), path: ROUTES.EXPERIENCE },
    { title: t("publications"), path: ROUTES.PUBLICATIONS },
    { title: t("contacts"), path: ROUTES.CONTACTS },
  ];

  return (
    <header
      className={cn(
        "fixed inset-x-0 z-[100] text-light transition-[top] duration-500",
        isScrolled ? "top-2.5" : "top-3 xl:top-5"
      )}
    >
      <div className="container max-w-[1280px] px-3 md:px-6 xl:px-[34px]">
        <div
          className={cn(
            "flex h-[60px] items-center gap-3 rounded-full pl-5 pr-2 transition-[background-color,box-shadow] duration-500 xl:gap-4",
            isFloating
              ? "bg-transparent"
              : "bg-dark/80 shadow-[0_14px_34px_-18px_rgba(0,0,0,0.8),inset_0_0_0_1px_rgba(255,255,255,0.1)] backdrop-blur-xl backdrop-saturate-150"
          )}
        >
          <Logo
            className="h-auto w-6"
            variant="light"
            textStyles="text-light w-[86px] text-[11px] leading-[1.25]"
          />

          {/* nav capsule */}
          <nav
            aria-label="Головна навігація"
            className="mx-auto hidden rounded-full bg-white/[0.06] p-[5px] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.14)] backdrop-blur-md xl:block"
          >
            <ul className="flex items-center gap-0.5">
              {navItems.map(({ title, path }) => {
                const isActive = pathname.startsWith(path);
                return (
                  <li key={path}>
                    <Link
                      href={path}
                      aria-current={isActive ? "page" : undefined}
                      className={cn(
                        "block whitespace-nowrap rounded-full px-[15px] py-2 text-[14px] font-medium transition-colors duration-300",
                        "hover:bg-light hover:text-dark focus-visible:bg-light focus-visible:text-dark focus-visible:outline-none",
                        isActive && "bg-light text-dark"
                      )}
                    >
                      {title}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="ml-auto flex items-center gap-2 xl:ml-0 xl:gap-4">
            <div className="hidden rounded-full shadow-[inset_0_0_0_1px_rgba(255,255,255,0.3)] md:block [&_button]:py-1.5 [&_button]:text-[13px]">
              <LocaleSwitcher />
            </div>

            <a
              href={telHref}
              className="hidden whitespace-nowrap text-[14px] font-semibold tabular-nums transition-colors duration-300 hover:text-accent md:block"
            >
              {formatPhone(siteConfig.phone)}
            </a>

            {/* CTA: white pill with a round accent arrow */}
            <Link
              href={ROUTES.EDUCATION}
              className="group hidden h-[46px] items-center gap-3 rounded-full bg-light pl-5 pr-[7px] text-[14px] font-semibold text-dark transition-colors duration-300 hover:bg-[#dfe8ff] md:flex"
            >
              {t("cta")}
              <span className="grid size-8 place-items-center rounded-full bg-accent text-light transition-transform duration-300 group-hover:translate-x-0.5">
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

            {/* mobile: filled call button */}
            <a
              href={telHref}
              aria-label={t("call")}
              className="grid size-11 place-items-center rounded-full bg-accent md:hidden"
            >
              <PhoneIcon className="size-5 text-white" />
            </a>

            <div className="xl:hidden">
              <BurgerButton openMenu={openMenu} ariaLabel={t("openMenu")} />
            </div>
          </div>
        </div>
      </div>
      <BurgerMenu isOpen={isNavMenuOpened} closeMenu={closeMenu} />
      <Backdrop isVisible={isNavMenuOpened} onClick={closeMenu} />
    </header>
  );
};

export default Header;
