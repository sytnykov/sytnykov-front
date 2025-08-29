"use client";

import { useRef, useState } from "react";
import { useTranslations } from "next-intl";

import ButtonOrLink from "@/components/shared/button/ButtonOrLink ";
import ResponseModal from "@/components/shared/modal/ResponseModal";

import ModalWithForm from "./ModalWithForm";

type Variant = "course" | "consultation" | "service";

const modalVariants: Record<
  Variant,
  {
    buttonText: string;
    title: string;
    description: string;
    modalButton: string;
    buttonClass?: string;
  }
> = {
  course: {
    buttonText: "course.triggerButton",
    title: "course.title",
    description: "course.description",
    modalButton: "course.modalButton",
  },
  consultation: {
    buttonText: "consultation.triggerButton",
    title: "consultation.title",
    description: "consultation.description",
    modalButton: "consultation.modalButton",
  },
  service: {
    buttonText: "service.triggerButton",
    title: "service.title",
    description: "service.description",
    modalButton: "service.modalButton",
  },
};

interface IModalTriggerProps {
  variant: Variant;
  buttonClassName?: string;
  messageFrom: string;
  buttonVariant?: "dark" | "light" | "transparent" | "light-gradient";
  course?: string;
}

const ModalTrigger = ({
  variant,
  buttonVariant = "dark",
  buttonClassName,
  course,
  messageFrom,
}: IModalTriggerProps) => {
  const [isError, setIsError] = useState(false);

  const t = useTranslations("modal");
  const config = modalVariants[variant];

  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const responseDialogRef = useRef<HTMLDialogElement | null>(null);

  const openDialog = () => {
    dialogRef.current?.showModal();
    document.body.style.overflow = "hidden";
  };

  const closeDialog = () => {
    dialogRef.current?.close();
    document.body.style.overflow = "";
  };

  const openResponseDialog = (success: boolean) => {
    setIsError(!success);
    responseDialogRef.current?.showModal();
    document.body.style.overflow = "hidden";
  };

  const closeResponseDialog = () => {
    responseDialogRef.current?.close();
    document.body.style.overflow = "";
  };

  return (
    <>
      <ButtonOrLink
        onClick={openDialog}
        variant={buttonVariant}
        className={buttonClassName}
      >
        {t(config.buttonText)}
      </ButtonOrLink>

      <ModalWithForm
        title={t(config.title)}
        description={t(config.description)}
        buttonText={t(config.modalButton)}
        dialogRef={dialogRef}
        onClose={closeDialog}
        course={course}
        messageFrom={messageFrom}
        openResponseDialog={openResponseDialog}
      />

      <ResponseModal
        dialogRef={responseDialogRef}
        onClose={closeResponseDialog}
        isError={isError}
      />
    </>
  );
};

export default ModalTrigger;
