"use client";

import { ElementType, PropsWithChildren } from "react";

import { Variants, motion } from "framer-motion";

import { fadeInAnimation } from "@/helpers/animation";

interface AnimatedWrapperProps extends PropsWithChildren {
  as?: ElementType;
  className?: string;
  animation?: Variants;
  viewport?: { once?: boolean; amount?: number };
  initial?: string;
  animate?: string;
}

const AnimatedWrapper = ({
  as: Component = motion.div,
  className = "",
  animation = fadeInAnimation({}),
  viewport = { once: true, amount: 0.3 },
  initial = "hidden",
  animate,
  children,
}: AnimatedWrapperProps) => {
  return (
    <Component
      initial={initial}
      animate={animate}
      whileInView="visible"
      viewport={viewport}
      variants={animation}
      className={className}
    >
      {children}
    </Component>
  );
};

export default AnimatedWrapper;
