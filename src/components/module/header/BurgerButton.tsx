import Image from "next/image";

import IconButton from "@/components/shared/button/IconButton";

interface IBurgerButtonProps {
  openMenu: () => void;
}

const BurgerButton = ({ openMenu }: IBurgerButtonProps) => {
  return (
    <IconButton handleClick={openMenu} className="size-10 shrink-0">
      <Image
        src="/images/icons/menu.svg"
        alt="burger menu icon"
        width={40}
        height={40}
        className="h-full w-full"
      />
    </IconButton>
  );
};

export default BurgerButton;
