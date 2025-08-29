"use client";

import { ReactNode } from "react";

import { Variants, motion } from "framer-motion";

import { fadeInAnimation } from "@/helpers/animation";

import AnimatedWrapper from "./AnimatedWrapper";

interface AnimatedListProps {
  className?: string;
  animation?: Variants;
  viewport?: { once?: boolean; amount?: number };
  initial?: string;
  animate?: string;
  children: ReactNode;
}

const AnimatedList = ({
  className = "",
  animation = fadeInAnimation({}),
  viewport = { once: true, amount: 0.3 },
  initial = "hidden",
  animate,
  children,
}: AnimatedListProps) => {
  return (
    <AnimatedWrapper
      as={motion.ul}
      initial={initial}
      animate={animate}
      viewport={viewport}
      animation={animation}
      className={className}
    >
      {children}
    </AnimatedWrapper>
  );
};

export default AnimatedList;
