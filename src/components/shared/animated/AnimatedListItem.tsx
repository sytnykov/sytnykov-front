"use client";

import { ReactNode } from "react";

import { motion } from "framer-motion";

import { cn } from "@/utils/cn";

export type AnimatedListDirection = "up" | "down" | "left" | "right";

interface AnimatedListItemProps {
  children: ReactNode;
  className?: string;
  direction?: AnimatedListDirection;
}

const getVariants = (direction: AnimatedListDirection = "up") => {
  const distance = 50;

  const offset = {
    up: { y: distance, x: 0 },
    down: { y: -distance, x: 0 },
    left: { x: distance, y: 0 },
    right: { x: -distance, y: 0 },
  }[direction];

  return {
    hidden: {
      opacity: 0,
      ...offset,
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration: 1,
      },
    },
  };
};

const AnimatedListItem = ({
  children,
  className,
  direction = "up",
}: AnimatedListItemProps) => {
  return (
    <motion.li
      variants={getVariants(direction)}
      className={cn("list-none", className)}
    >
      {children}
    </motion.li>
  );
};

export default AnimatedListItem;
