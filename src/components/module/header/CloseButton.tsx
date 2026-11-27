import { useTranslations } from "next-intl";
import Image from "next/image";

import IconButton from "@/components/shared/button/IconButton";

interface ICloseButtonProps {
  onClick: () => void;
}

const CloseButton = ({ onClick }: ICloseButtonProps) => {
  const t = useTranslations("header.nav");

  return (
    <IconButton
      handleClick={onClick}
      ariaLabel={t("closeMenu")}
      className="relative grid size-11 place-items-center rounded-full bg-white/[0.06]"
    >
      <Image
        src="/images/icons/cross.svg"
        alt=""
        width={24}
        height={24}
        className="size-5"
      />
    </IconButton>
  );
};

export default CloseButton;
