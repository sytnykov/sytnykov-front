import Image from "next/image";

import IconButton from "@/components/shared/button/IconButton";

interface IBurgerButtonProps {
  openMenu: () => void;
  ariaLabel?: string;
}

const BurgerButton = ({ openMenu, ariaLabel }: IBurgerButtonProps) => {
  return (
    <IconButton
      handleClick={openMenu}
      ariaLabel={ariaLabel}
      className="relative size-11 shrink-0"
    >
      <Image
        src="/images/icons/menu.svg"
        alt=""
        width={40}
        height={40}
        className="h-full w-full"
        priority
      />
    </IconButton>
  );
};

export default BurgerButton;
