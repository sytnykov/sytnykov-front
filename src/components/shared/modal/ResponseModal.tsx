"use client";

import { RefObject } from "react";
import { useTranslations } from "next-intl";

import BaseModal from "./BaseModal";

interface IResponseModalProps {
  isError: boolean;
  dialogRef: RefObject<HTMLDialogElement | null>;
  onClose: () => void;
}

const ResponseModal = ({
  isError,
  dialogRef,
  onClose,
}: IResponseModalProps) => {
  const t = useTranslations("modal.notifications");

  return (
    <BaseModal dialogRef={dialogRef} onClose={onClose}>
      <div className="mb-8 text-center md:mb-[51px]">
        <h2
          id="modal-title"
          className="mb-4 font-micra text-[24px] uppercase md:mb-[18px] md:text-[32px]"
        >
          {t(`${isError ? "unsuccessful" : "successful"}.title`)}
        </h2>
        <p className="text-[14px] font-light">
          {t(`${isError ? "unsuccessful" : "successful"}.description`)}
        </p>
      </div>
    </BaseModal>
  );
};

export default ResponseModal;
