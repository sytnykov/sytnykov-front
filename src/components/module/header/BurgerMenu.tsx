import { cn } from "@/utils/cn";

import CloseButton from "./CloseButton";
import FreeConsultation from "./FreeConsultation";
import NavMenu from "./NavMenu";

interface BurgerMenuMobTabProps {
  isOpen: boolean;
  closeMenu: () => void;
}

const BurgerMenu = ({ isOpen, closeMenu }: BurgerMenuMobTabProps) => {
  return (
    <div
      className={cn(
        "bg-dark text-light absolute right-0 top-0 z-50 h-[100dvh] w-[100vw] overflow-y-auto transition duration-[600ms] md:w-[514px]",
        isOpen
          ? "no-doc-scroll translate-x-0 opacity-100"
          : "translate-x-full opacity-0"
      )}
    >
      <div className="container relative flex max-w-full flex-col items-center px-[60px] py-14 xl:px-[98px]">
        <CloseButton onClick={closeMenu} />

        <FreeConsultation closeMenu={closeMenu} />

        <NavMenu closeMenu={closeMenu} />
      </div>
    </div>
  );
};

export default BurgerMenu;
