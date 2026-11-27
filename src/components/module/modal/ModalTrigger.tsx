"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";

import ButtonOrLink from "@/components/shared/button/ButtonOrLink ";
import ResponseModal from "@/components/shared/modal/ResponseModal";

type FormModal = typeof import("./ModalWithForm").default;

/**
 * The form with its validation library is a separate file: it is downloaded
 * once the page has loaded (one download for all buttons of the page) and
 * mounted when a button is first pressed, instead of slowing the first screen.
 * A failed download is simply retried on the next press.
 */
let formModal: Promise<FormModal> | null = null;
const loadFormModal = () =>
  (formModal ??= import("./ModalWithForm")
    .then(module => module.default)
    .catch(error => {
      formModal = null;
      throw error;
    }));

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
  buttonVariant?:
    | "dark"
    | "light"
    | "transparent"
    | "light-gradient"
    | "accent";
  course?: string;
  /** custom button text instead of the variant default */
  label?: string;
}

const ModalTrigger = ({
  variant,
  buttonVariant = "dark",
  buttonClassName,
  course,
  messageFrom,
  label,
}: IModalTriggerProps) => {
  const [isError, setIsError] = useState(false);
  const [Form, setForm] = useState<FormModal | null>(null);

  const t = useTranslations("modal");
  const config = modalVariants[variant];

  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const responseDialogRef = useRef<HTMLDialogElement | null>(null);
  // the "filled in too fast" check counts from the moment the button appeared
  const mountedAt = useRef(Date.now());
  const openWhenReady = useRef(false);

  // fetch the form in the background after the page has loaded
  useEffect(() => {
    const warmUp = () => {
      const fetchForm = () => void loadFormModal().catch(() => {});
      if (typeof window.requestIdleCallback === "function") {
        window.requestIdleCallback(fetchForm, { timeout: 3000 });
      } else {
        window.setTimeout(fetchForm, 1500);
      }
    };
    if (document.readyState === "complete") {
      warmUp();
      return;
    }
    window.addEventListener("load", warmUp, { once: true });
    return () => window.removeEventListener("load", warmUp);
  }, []);

  const showDialog = useCallback(() => {
    dialogRef.current?.showModal();
    document.body.style.overflow = "hidden";
  }, []);

  const openDialog = () => {
    if (dialogRef.current) {
      showDialog();
      return;
    }
    openWhenReady.current = true;
    loadFormModal()
      .then(component => setForm(() => component))
      .catch(() => {
        openWhenReady.current = false;
      });
  };

  /** The form reports that its dialog is in the page. */
  const handleFormReady = useCallback(() => {
    if (!openWhenReady.current) return;
    openWhenReady.current = false;
    showDialog();
  }, [showDialog]);

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
        {label || t(config.buttonText)}
      </ButtonOrLink>

      {Form && (
        <Form
          title={t(config.title)}
          description={t(config.description)}
          buttonText={t(config.modalButton)}
          dialogRef={dialogRef}
          onClose={closeDialog}
          course={course}
          messageFrom={messageFrom}
          openResponseDialog={openResponseDialog}
          startedAt={mountedAt.current}
          onReady={handleFormReady}
        />
      )}

      <ResponseModal
        dialogRef={responseDialogRef}
        onClose={closeResponseDialog}
        isError={isError}
      />
    </>
  );
};

export default ModalTrigger;
