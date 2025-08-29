"use client";

import { useTranslations } from "next-intl";

import { z } from "zod";

import { nameRegex, onlyDigitsRegex } from "@/regex/regex";

const useFeedbackFormSchema = () => {
  const t = useTranslations("form.formValidation");

  const feedbackFormSchema = z.object({
    name: z
      .string()
      .min(2, t("nameMinMaxValidation"))
      .max(150, t("nameMinMaxValidation"))
      .regex(nameRegex, t("nameAllowedSymbols")),
    phone: z
      .string()
      .min(7, t("phoneMinMaxValidation"))
      .max(15, t("phoneMinMaxValidation"))
      .regex(onlyDigitsRegex, t("phoneOnlyDigits")),
    message: z.string().max(1000, t("messageValidation")),
  });

  return feedbackFormSchema;
};

export type FeedbackFormSchema = z.infer<
  ReturnType<typeof useFeedbackFormSchema>
>;

export default useFeedbackFormSchema;
