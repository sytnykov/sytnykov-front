"use client";

import { RefObject, useEffect } from "react";

import BaseModal from "@/components/shared/modal/BaseModal";

import ModalForm from "./ModalForm";

interface IModalWithFormProps {
  title: string;
  description: string;
  buttonText: string;
  onClose: () => void;
  dialogRef: RefObject<HTMLDialogElement | null>;
  messageFrom: string;
  priceText?: string;
  course?: string;
  openResponseDialog: (success: boolean) => void;
  /** when the visitor first saw the button that opens this form */
  startedAt?: number;
  /** called once the dialog is in the page and can be opened */
  onReady?: () => void;
}

const ModalWithForm = ({
  title,
  description,
  buttonText,
  priceText,
  dialogRef,
  onClose,
  course,
  messageFrom,
  openResponseDialog,
  startedAt,
  onReady,
}: IModalWithFormProps) => {
  useEffect(() => {
    onReady?.();
  }, [onReady]);

  return (
    <BaseModal dialogRef={dialogRef} onClose={onClose}>
      <div className="mb-8 text-center md:mb-[51px]">
        <h2
          id="modal-title"
          className="mb-4 font-micra text-[24px] uppercase md:mb-[18px] md:text-[32px]"
        >
          {title}
        </h2>
        <p className="text-[14px] font-light">{description}</p>
      </div>

      <ModalForm
        buttonText={buttonText}
        priceText={priceText}
        closeDialog={onClose}
        course={course}
        messageFrom={messageFrom}
        openResponseDialog={openResponseDialog}
        startedAt={startedAt}
      />
    </BaseModal>
  );
};

export default ModalWithForm;
