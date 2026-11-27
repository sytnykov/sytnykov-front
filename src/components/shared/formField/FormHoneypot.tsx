"use client";

import { useFormContext } from "react-hook-form";

/**
 * Invisible anti-spam trap: hidden from people and screen readers,
 * but bots that fill every input will fill it too.
 */
const FormHoneypot = () => {
  const { register } = useFormContext();

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute -left-[9999px] top-0 h-0 w-0 overflow-hidden opacity-0"
    >
      <label>
        Company
        <input
          type="text"
          tabIndex={-1}
          autoComplete="off"
          {...register("company")}
        />
      </label>
    </div>
  );
};

export default FormHoneypot;
