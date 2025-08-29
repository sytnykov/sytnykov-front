import Image from "next/image";

import IconButton from "@/components/shared/button/IconButton";

interface ICloseButtonProps {
  onClick: () => void;
}

const CloseButton = ({ onClick }: ICloseButtonProps) => {
  return (
    <IconButton
      handleClick={onClick}
      className="absolute right-4 top-5 z-[60] size-6 xl:right-6 xl:top-6 xl:size-10"
    >
      <Image
        src="/images/icons/cross.svg"
        alt="burger menu icon"
        width={24}
        height={24}
        className="h-full w-full"
      />
    </IconButton>
  );
};

export default CloseButton;
