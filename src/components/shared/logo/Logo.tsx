"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";

import { cn } from "@/utils/cn";

import { Link } from "@/i18n/navigation";

interface LogoProps {
  className?: string;
  textStyles?: string;
  variant?: "dark" | "light";
}

const Logo = ({ className, textStyles, variant = "dark" }: LogoProps) => {
  const t = useTranslations("header");

  return (
    <Link href="/" className="flex items-center gap-2 xl:gap-3">
      {variant === "dark" ? (
        <Image
          src="/images/icons/logo.svg"
          alt="logo"
          width="40"
          height="41"
          className={cn("h-auto w-[33px] xl:w-10", className)}
        />
      ) : (
        <Image
          src="/images/icons/logo-light.svg"
          alt="logo"
          width="40"
          height="41"
          className={cn("h-auto w-[33px] xl:w-10", className)}
        />
      )}
      <p
        className={cn(
          "w-24 font-micra text-[12px] uppercase xl:w-[120px] xl:text-[14px]",
          textStyles
        )}
      >
        {t("companyName")}
      </p>
    </Link>
  );
};
export default Logo;
