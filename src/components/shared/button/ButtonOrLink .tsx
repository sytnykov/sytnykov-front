import { ReactNode } from "react";
import Link from "next/link";

import { cn } from "@/utils/cn";

interface ButtonOrLinkProps {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit";
  variant?: "dark" | "light" | "transparent" | "light-gradient";
  disabled?: boolean;
  isLoading?: boolean;
  ariaLabel?: string;
  external?: boolean;
}

const ButtonOrLink = ({
  children,
  href,
  onClick,
  className = "",
  type = "button",
  variant = "dark",
  disabled,
  isLoading,
  ariaLabel,
  external = false,
}: ButtonOrLinkProps) => {
  const baseStyles = cn(
    "group relative flex text-sm leading-[20px] font-medium items-center justify-center overflow-hidden rounded-full w-full py-[18px] transition duration-300 ease-out active:scale-95",
    variant === "dark" &&
      "text-white before:absolute before:inset-0 before:rounded-full before:z-[-1] before:p-[1px] before:bg-[linear-gradient(90deg,_#304F94_0%,_#6582C2_100%)] before:content-[''] after:absolute after:inset-[1px] after:rounded-full after:z-[-1] after:bg-[linear-gradient(94.05deg,_#091129_-15.57%,_#001C58_140.61%)] after:content-['']",
    variant === "light" &&
      "text-dark after:bg-light before:absolute before:inset-0 before:rounded-full before:z-[-1] before:p-[1px] before:bg-[linear-gradient(90deg,_#304F94_0%,_#6582C2_100%)] before:content-[''] after:absolute after:inset-[1px] after:z-[-1] after:rounded-full after:content-['']",
    variant === "transparent" &&
      "border-1 border-light text-light border border-solid bg-transparent",
    variant === "light-gradient" &&
      "text-dark before:absolute before:inset-0 before:rounded-full before:z-[-1] before:p-[1px] before:bg-[linear-gradient(128.72deg,_rgba(33,_55,_103,_0.5)_-16.95%,_rgba(203,_219,_255,_0.5)_104.2%)] before:content-[''] after:absolute after:inset-[1px] after:rounded-full after:z-[-1] after:content-[''] after:bg-[linear-gradient(152.98deg,_#FFFFFF_16.89%,_#C0D4FF_274.64%)]",
    disabled || isLoading ? "opacity-50 cursor-not-allowed" : "",
    className
  );

  const shimmerStyles = cn(
    "absolute left-[-150%] top-0 h-full w-full skew-x-[-40deg] bg-gradient-to-r opacity-70 transition-all duration-[800ms] ease-in-out group-[focus-visible]:left-[120%] xl:group-hover:left-[120%]",
    variant === "dark" && "via-blue/30 from-white/20 to-white/20",
    variant === "light" &&
      "via-blue/50 from-blue-700/20 via-[#11285280] to-blue-700/20",
    variant === "transparent" &&
      "via-blue/50 from-blue-700/20 via-[#11285280] to-blue-700/20",
    variant === "light-gradient" &&
      "via-blue/50 from-blue-700/20 via-[#11285280] to-blue-700/20"
  );

  const content = isLoading ? "Loading..." : children;

  if (href) {
    if (external) {
      return (
        <a
          href={href}
          className={baseStyles}
          aria-label={ariaLabel}
          target="_blank"
          rel="noopener noreferrer"
        >
          {content}
          <span className={shimmerStyles} />
        </a>
      );
    }

    return (
      <Link
        href={href}
        aria-label={ariaLabel}
        onClick={onClick}
        className={baseStyles}
      >
        {content}
        <span className={shimmerStyles} />
      </Link>
    );
  }

  return (
    <button
      type={type}
      aria-label={ariaLabel}
      onClick={onClick}
      disabled={disabled || isLoading}
      className={baseStyles}
    >
      {content}

      <span className={shimmerStyles} />
    </button>
  );
};

export default ButtonOrLink;
