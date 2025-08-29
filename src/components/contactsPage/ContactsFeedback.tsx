import { getMessages, getTranslations } from "next-intl/server";

import { fadeInAnimation } from "@/helpers/animation";

import AnimatedWrapper from "../shared/animated/AnimatedWrapper";
import ContactFeedbackForm from "./ContactFeedbackForm";

type FieldKey = "name" | "tel" | "mes";

export type FormPlaceholderMap = Record<FieldKey, string>;

const ContactsFeedback = async () => {
  const t = await getTranslations("contactsPage.feedback");

  const messages = await getMessages();

  const formPlaceholder = messages.contactsPage.feedback
    .formPlaceholder as FormPlaceholderMap;

  const btnText = messages.contactsPage.feedback.button as string;

  return (
    <section className="relative overflow-hidden py-[120px] xl:py-[163px]">
      <div className="container max-w-[1280px]">
        <div className="max-w-[400px] max-xl:mx-auto max-xl:text-center xl:ml-auto xl:max-w-[602px]">
          <AnimatedWrapper animation={fadeInAnimation({ y: -50 })}>
            <h2 className="mb-3 font-micra text-[24px] uppercase leading-[1.4] xl:mb-4 xl:text-[40px]">
              {t("title")}
            </h2>
            <p className="mb-[52px] text-[18px] font-light leading-[1.6] text-dark-light xl:mb-9">
              {t("descr")}
            </p>
          </AnimatedWrapper>

          <AnimatedWrapper animation={fadeInAnimation({ y: 50, delay: 0.5 })}>
            <ContactFeedbackForm
              formPlaceholder={formPlaceholder}
              btnText={btnText}
            />
          </AnimatedWrapper>
        </div>
      </div>

      <AnimatedWrapper
        animation={fadeInAnimation({ x: -100, y: 50, scale: 0.8, delay: 0.3 })}
        className="absolute -bottom-[300px] left-0 -z-[5] h-[1084px] w-[1106px] max-xl:hidden xl:bg-[url('/images/contactsPage/contacts-feedback-person-desk.webp')]"
      />

      <div className="absolute -bottom-[120px] right-0 h-[315px] w-[241px] max-xl:bg-[url('/images/contactsPage/contacts-feedback-decor-mob.webp')] xl:hidden" />
    </section>
  );
};

export default ContactsFeedback;
