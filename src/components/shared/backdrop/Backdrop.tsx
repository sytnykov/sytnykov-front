"use client";

import { useEffect } from "react";

import { cn } from "@/utils/cn";

interface BackdropProps {
  isVisible: boolean;
  onClick: () => void;
}

export default function Backdrop({
  isVisible = false,
  onClick,
}: BackdropProps) {
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isVisible) {
        onClick();
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isVisible, onClick]);

  return (
    <div
      className={cn(
        "fixed inset-0 z-40 h-dvh w-dvw bg-black bg-opacity-40 transition duration-[1000ms] ease-in-out",
        isVisible
          ? "no-doc-scroll opacity-100"
          : "pointer-events-none opacity-0"
      )}
      onClick={onClick}
    />
  );
}
