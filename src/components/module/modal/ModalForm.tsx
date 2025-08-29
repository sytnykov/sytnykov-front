"use client";

import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { BeatLoader } from "react-spinners";
import { useTranslations } from "next-intl";

import useModalFormSchema, {
  ModalFormSchema,
} from "@/schemas/useModalFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";

import sendTelegramMessage from "@/lib/telegram/sendTelegramMessage";

import ButtonOrLink from "../../shared/button/ButtonOrLink ";
import FormField from "../../shared/formField/FormField";

interface IModalFormProps {
  buttonText: string;
  messageFrom: string;
  closeDialog: () => void;
  priceText?: string;
  course?: string;
  openResponseDialog: (success: boolean) => void;
}

const ModalForm = ({
  buttonText,
  closeDialog,
  priceText,
  course,
  messageFrom,
  openResponseDialog,
}: IModalFormProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const t = useTranslations("form");

  const validationSchema = useModalFormSchema();

  const methods = useForm<ModalFormSchema>({
    resolver: zodResolver(validationSchema),
  });
  const { handleSubmit, reset } = methods;

  const onSubmit = async (data: ModalFormSchema) => {
    setIsLoading(true);
    const fullData = { messageFrom, ...data, course: course };

    const success = await sendTelegramMessage(fullData);

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
          <div className="mb-8 flex flex-col gap-4">
            <FormField
              name="name"
              type="text"
              placeholder={t("formPlaceholder.name")}
              variant="basic"
            />

            <FormField
              name="phone"
              type="tel"
              placeholder={`* ${t("formPlaceholder.tel")}`}
              required
              variant="basic"
            />
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
