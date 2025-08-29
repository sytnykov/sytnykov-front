"use client";

import { RefObject } from "react";

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
}: IModalWithFormProps) => {
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
      />
    </BaseModal>
  );
};

export default ModalWithForm;
