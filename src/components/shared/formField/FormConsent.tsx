"use client";

import { useFormContext } from "react-hook-form";
import { useTranslations } from "next-intl";

import { Link } from "@/i18n/navigation";
import { ROUTES } from "@/constants/routes";
import { cn } from "@/utils/cn";

/** Required consent checkbox with a link to the privacy policy. */
const FormConsent = ({ tone = "light" }: { tone?: "light" | "dark" }) => {
  const t = useTranslations("form");
  const {
    register,
    formState: { errors },
  } = useFormContext();
  const error = errors?.consent?.message as string | undefined;

  return (
    <div className="relative">
      <label className="flex cursor-pointer items-start gap-3 text-left text-[13px] leading-[1.45]">
        <input
          type="checkbox"
          {...register("consent")}
          className={cn(
            "mt-[1px] size-[18px] shrink-0 cursor-pointer rounded-[5px] accent-[#5188ff]",
            error && "outline outline-1 outline-red-500"
          )}
        />
        <span className={tone === "dark" ? "text-white/75" : "text-dark/70"}>
          {t.rich("consent", {
            link: chunks => (
              <Link
                href={ROUTES.PRIVACY}
                target="_blank"
                className="underline underline-offset-2 hover:text-accent"
              >
                {chunks}
              </Link>
            ),
          })}
        </span>
      </label>
      {error && <p className="mt-1 pl-[30px] text-xs text-red-500">{error}</p>}
    </div>
  );
};

export default FormConsent;
