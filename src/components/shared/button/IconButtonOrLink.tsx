import { cn } from "@/utils/cn";

import { ArrowInCircleIcon } from "../icons";
import ButtonOrLink from "./ButtonOrLink ";

interface IIconButtonOrLinkProps {
  href?: string;
  onClick?: () => void;
  buttonClassName?: string;
  iconClassName?: string;
  type?: "button" | "submit";
  variant?: "gradient" | "light" | "dark";
  disabled?: boolean;
  isLoading?: boolean;
  ariaLabel?: string;
  external?: boolean;
}

const IconButtonOrLink = ({
  href,
  onClick,
  buttonClassName = "",
  iconClassName = "",
  type = "button",
  variant = "gradient",
  disabled,
  isLoading,
  ariaLabel,
  external = false,
}: IIconButtonOrLinkProps) => {
  const buttonStyles = cn(
    "flex h-[70px] w-[70px] shrink-0 items-center justify-center rounded-[8px] p-0",
    variant === "gradient" &&
      "bg-[linear-gradient(157.5deg,_#7F9EE3_14.64%,_#46577D_174.32%)]",
    variant === "light" && "w-[42px] h-[42px] bg-transparent text-dark",
    variant === "dark" &&
      "w-[42px] h-[42px] bg-transparent text-light border-none",
    buttonClassName
  );

  const iconStyles = cn(
    "h-[31px] w-[31px]",
    variant === "gradient" && "",
    variant === "light" && "w-[21px] h-[21px]",
    variant === "dark" && "w-[21px] h-[21px]",
    iconClassName
  );

  return (
    <ButtonOrLink
      href={href}
      onClick={onClick}
      type={type}
      disabled={disabled}
      isLoading={isLoading}
      ariaLabel={ariaLabel}
      external={external}
      variant="transparent"
      className={buttonStyles}
    >
      <ArrowInCircleIcon className={iconStyles} />
    </ButtonOrLink>
  );
};

export default IconButtonOrLink;
