"use client";

import { AnimatePresence, motion } from "framer-motion";

import { routing } from "@/i18n/routing";
import { Locale } from "@/types/locale";

interface LocaleMenuProps {
  isOpen: boolean;
  currentLocale: string;
  onSelect: (locale: Locale) => void;
}

/**
 * The animated list of languages. Lives in its own file so that the animation
 * library is downloaded when the switcher is first used, not on every page.
 */
const LocaleMenu = ({ isOpen, currentLocale, onSelect }: LocaleMenuProps) => (
  <AnimatePresence>
    {isOpen && (
      <motion.div
        className="bg-light absolute right-0 z-50 mt-1 w-[65px] rounded-[8px] shadow-md"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.3 }}
      >
        {routing.locales.map(locale => (
          <button
            key={locale}
            onClick={() => onSelect(locale)}
            className={`flex w-full items-center px-4 py-2`}
          >
            <span
              className={` ${
                currentLocale === locale
                  ? "text-accent text-14med xl:text-16med"
                  : "text-14reg xl:text-16reg text-dark"
              }`}
            >
              {locale === "uk" ? "UA" : "RU"}
            </span>
          </button>
        ))}
      </motion.div>
    )}
  </AnimatePresence>
);

export default LocaleMenu;
