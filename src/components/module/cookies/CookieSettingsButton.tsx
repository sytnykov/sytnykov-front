"use client";

import { ReactNode } from "react";

import { OPEN_SETTINGS_EVENT } from "./consent";

/** Re-opens the cookie banner so the visitor can change the choice. */
const CookieSettingsButton = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => (
  <button
    type="button"
    className={className}
    onClick={() => window.dispatchEvent(new Event(OPEN_SETTINGS_EVENT))}
  >
    {children}
  </button>
);

export default CookieSettingsButton;
