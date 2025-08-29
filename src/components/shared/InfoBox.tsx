import type { ReactNode } from "react";

import { cn } from "@/utils/cn";

interface IInfoBoxProps {
  children: ReactNode;
  variant?: "basic" | "gradient" | "withImage";
  classname?: string;
}

const InfoBox = ({ children, variant = "basic", classname }: IInfoBoxProps) => {
  const baseStyles = cn(
    "rounded-lg p-8 pt-6",
    variant === "basic" && "bg-light md:min-h-[170px] xl:min-h-[209px]",
    variant === "gradient" &&
      "bg-[linear-gradient(152.98deg,_#FFFFFF_16.89%,_#C0D4FF_274.64%)]",
    "rounded-lg h-full",
    variant === "withImage" && "px-6 pb-6 bg-card-with-img-gradient",
    classname
  );

  return (
    <div className="relative h-full rounded-lg p-[1px] before:absolute before:inset-0 before:z-[-1] before:rounded-lg before:bg-gradient-to-br before:from-[#213767] before:to-[#CBDBFF]">
      <div className={baseStyles}>{children}</div>
    </div>
  );
};

export default InfoBox;
