"use client";

import { useRef, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { BeatLoader } from "react-spinners";
import { useTranslations } from "next-intl";

import useModalFormSchema, {
  ModalFormSchema,
} from "@/schemas/useModalFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";

import { getSessionTouch } from "@/lib/analytics/attribution";
import { track } from "@/lib/analytics/track";
import { leadEventParams } from "@/lib/leads/context";
import sendTelegramMessage from "@/lib/telegram/sendTelegramMessage";

import ButtonOrLink from "../../shared/button/ButtonOrLink ";
import FormConsent from "../../shared/formField/FormConsent";
import FormField from "../../shared/formField/FormField";
import FormHoneypot from "../../shared/formField/FormHoneypot";

interface IModalFormProps {
  buttonText: string;
  messageFrom: string;
  closeDialog: () => void;
  priceText?: string;
  course?: string;
  openResponseDialog: (success: boolean) => void;
  /** start of the "time to fill in" count; defaults to the form's own mount */
  startedAt?: number;
}

const ModalForm = ({
  buttonText,
  closeDialog,
  priceText,
  course,
  messageFrom,
  openResponseDialog,
  startedAt,
}: IModalFormProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const openedAt = useRef(startedAt ?? Date.now());

  const t = useTranslations("form");

  const validationSchema = useModalFormSchema();

  const methods = useForm<ModalFormSchema>({
    resolver: zodResolver(validationSchema),
  });
  const { handleSubmit, reset } = methods;

  const onSubmit = async (data: ModalFormSchema) => {
    setIsLoading(true);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { consent, ...fields } = data;
    const success = await sendTelegramMessage({
      messageFrom,
      ...fields,
      course,
      elapsed: Date.now() - openedAt.current,
    });

    if (success) {
      track("generate_lead", {
        form_type: messageFrom,
        course: course || "",
        ...leadEventParams(getSessionTouch()),
      });
    }

    setIsLoading(false);

    reset();
    closeDialog();

    openResponseDialog(success);
  };

  return (
    <>
      <FormProvider {...methods}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mx-auto flex w-full flex-col"
        >
          <div className="relative mb-6 flex flex-col gap-5">
            <FormHoneypot />
            <FormField
              name="name"
              type="text"
              placeholder={`* ${t("formPlaceholder.name")}`}
              variant="basic"
            />

            <FormField
              name="phone"
              type="tel"
              placeholder={`* ${t("formPlaceholder.tel")}`}
              required
              variant="basic"
            />

            <FormField
              name="email"
              type="email"
              placeholder={`* ${t("formPlaceholder.email")}`}
              required
              variant="basic"
            />
          </div>

          <div className="mb-6">
            <FormConsent />
          </div>

          {priceText && (
            <span className="mb-5 leading-[20px] max-md:text-center">
              {t("price")}: {priceText} грн
            </span>
          )}

          <ButtonOrLink className="bg-dark" type="submit" disabled={isLoading}>
            {isLoading ? <BeatLoader color="#5188FF" /> : buttonText}
          </ButtonOrLink>
        </form>
      </FormProvider>
    </>
  );
};

export default ModalForm;
