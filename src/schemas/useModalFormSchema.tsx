"use client";

import { useTranslations } from "next-intl";

import { z } from "zod";

import { nameRegex, onlyDigitsRegex } from "@/regex/regex";

const useModalFormSchema = () => {
  const t = useTranslations("form.formValidation");

  const modalFormSchema = z.object({
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
  });

  return modalFormSchema;
};

export type ModalFormSchema = z.infer<ReturnType<typeof useModalFormSchema>>;

export default useModalFormSchema;
