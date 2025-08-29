import { useTranslations } from "next-intl";

import ButtonOrLink from "@/components/shared/button/ButtonOrLink ";
import { ROUTES } from "@/constants/routes";

interface FreeConsultationProps {
  closeMenu: () => void;
}

const FreeConsultation = ({ closeMenu }: FreeConsultationProps) => {
  const t = useTranslations("");

  return (
    <div className="mb-12 max-w-[318px] xl:mb-20">
      <h2 className="mb-4 text-center font-micra text-lg uppercase xl:mb-5 xl:text-2xl">
        {t("header.freeConsultation.title")}
      </h2>
      <p className="mb-8 text-center text-xs leading-[20px] xl:mb-[38px] xl:text-base">
        {t("header.freeConsultation.description")}
      </p>

      <ButtonOrLink
        href={ROUTES.CONTACTS}
        variant="transparent"
        onClick={closeMenu}
      >
        {t("buttons.leaveContacts")}
      </ButtonOrLink>
    </div>
  );
};

export default FreeConsultation;
