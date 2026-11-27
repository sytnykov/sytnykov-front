"use client";

import { useRef, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { BeatLoader } from "react-spinners";
import { useTranslations } from "next-intl";

import useFeedbackFormSchema, {
  FeedbackFormSchema,
} from "@/schemas/useFeedbackFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";

import { getSessionTouch } from "@/lib/analytics/attribution";
import { track } from "@/lib/analytics/track";
import { leadEventParams } from "@/lib/leads/context";
import sendTelegramMessage from "@/lib/telegram/sendTelegramMessage";
import { APPLICATION } from "@/constants/application";

import ButtonOrLink from "../shared/button/ButtonOrLink ";
import FormConsent from "../shared/formField/FormConsent";
import FormField from "../shared/formField/FormField";
import FormHoneypot from "../shared/formField/FormHoneypot";
import FormTextarea from "../shared/formField/FormTextarea";
import { FormPlaceholderMap } from "./ContactsFeedback";

interface IContactFeedbackFormProps {
  formPlaceholder: FormPlaceholderMap;
  btnText: string;
}

const ContactFeedbackForm = ({
  formPlaceholder,
  btnText,
}: IContactFeedbackFormProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "ok" | "error">("idle");
  const tN = useTranslations("modal.notifications");
  const openedAt = useRef(Date.now());
  const validationSchema = useFeedbackFormSchema();

  const methods = useForm<FeedbackFormSchema>({
    resolver: zodResolver(validationSchema),
  });
  const { handleSubmit, reset } = methods;

  const onSubmit = async (data: FeedbackFormSchema) => {
    setIsLoading(true);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { consent, ...fields } = data;
    const success = await sendTelegramMessage({
      messageFrom: APPLICATION.CONTACTS,
      ...fields,
      elapsed: Date.now() - openedAt.current,
    });

    if (success) {
      track("generate_lead", {
        form_type: APPLICATION.CONTACTS,
        ...leadEventParams(getSessionTouch()),
      });
      reset();
    }
    setStatus(success ? "ok" : "error");

    setIsLoading(false);
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="relative mx-auto flex w-full flex-col gap-5"
      >
        <FormHoneypot />
        <div className="flex w-full flex-col gap-5 md:flex-row">
          <FormField
            name="name"
            type="text"
            placeholder={`* ${formPlaceholder.name}`}
            variant="soft"
          />

          <FormField
            name="phone"
            type="tel"
            placeholder={`* ${formPlaceholder.tel}`}
            required
            variant="soft"
          />
        </div>

        <FormField
          name="email"
          type="email"
          placeholder={`* ${formPlaceholder.email}`}
          required
          variant="soft"
        />

        <FormTextarea
          name="message"
          placeholder={formPlaceholder.mes}
          rows={5}
          variant="soft"
        />

        <FormConsent />

        <ButtonOrLink
          type="submit"
          variant="accent"
          disabled={isLoading}
          className="h-[54px] py-0 text-[15px] font-semibold md:w-[260px]"
        >
          {isLoading ? <BeatLoader color="#ffffff" size={10} /> : btnText}
        </ButtonOrLink>

        {status !== "idle" && (
          <div
            role="status"
            className={
              status === "ok"
                ? "rounded-[16px] bg-[#22b573]/10 p-4 text-[14px] leading-[1.5] text-[#15724a]"
                : "rounded-[16px] bg-red-500/10 p-4 text-[14px] leading-[1.5] text-red-700"
            }
          >
            <p className="font-semibold">
              {status === "ok"
                ? tN("successful.title")
                : tN("unsuccessful.title")}
            </p>
            <p className="mt-1">
              {status === "ok"
                ? tN("successful.description")
                : tN("unsuccessful.description")}
            </p>
          </div>
        )}
      </form>
    </FormProvider>
  );
};

export default ContactFeedbackForm;
