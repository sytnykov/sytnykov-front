"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useLocale } from "next-intl";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useSearchParams } from "next/navigation";

import { cn } from "@/utils/cn";

import { usePathname, useRouter } from "@/i18n/navigation";
import { Locale } from "@/types/locale";

const loadLocaleMenu = () => import("./LocaleMenu");
// the list (and its animation library) is fetched on first use
const LocaleMenu = dynamic(loadLocaleMenu, { ssr: false });

const LocaleSwitcher = () => {
  const [isOpen, setIsOpen] = useState(false);
  // stays true after the first opening so the closing animation can play
  const [wasOpened, setWasOpened] = useState(false);

  const currentLocale = useLocale();
  const pathName = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleLocaleChange = (newLocale: Locale) => {
    const hash = window.location.hash;

    const newPath = `${pathName}${hash}?${searchParams.toString()}`;

    router.replace(newPath, { locale: newLocale });

    setIsOpen(false);
  };

  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  }, []);

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (event.key === "Escape") {
      setIsOpen(false);
    }
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("click", handleClickOutside);
      document.addEventListener("keydown", handleKeyDown);
    } else {
      document.removeEventListener("click", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, handleClickOutside, handleKeyDown]);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => {
          setWasOpened(true);
          setIsOpen(!isOpen);
        }}
        onPointerEnter={loadLocaleMenu}
        onFocus={loadLocaleMenu}
        className="flex items-center gap-2 px-3 py-2 outline-none"
      >
        <span className="text-light font-bold leading-tight">
          {currentLocale === "uk" ? "UA" : "RU"}
        </span>
        <Image
          src="/images/icons/arrow.svg"
          alt="arrow icon"
          width="16"
          height="16"
          className={cn(
            "size-4 transition duration-300 ease-in-out",
            isOpen ? "rotate-180" : "rotate-0"
          )}
        />
      </button>

      {wasOpened && (
        <LocaleMenu
          isOpen={isOpen}
          currentLocale={currentLocale}
          onSelect={handleLocaleChange}
        />
      )}
    </div>
  );
};

export default LocaleSwitcher;
