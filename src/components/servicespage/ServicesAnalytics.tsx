import { getMessages, getTranslations } from "next-intl/server";

import { APPLICATION } from "@/constants/application";
import { fadeInAnimation } from "@/helpers/animation";

import ModalTrigger from "../module/modal/ModalTrigger";
import AnimatedWrapper from "../shared/animated/AnimatedWrapper";
import ServiceList from "./ServiceList";

const ServicesAnalytics = async () => {
  const t = await getTranslations("servicepage.analytics");
  const messages = await getMessages();

  const analyticsList = messages.servicepage.analytics
    .analyticsList as string[];

  return (
    <section className="relative bg-dark py-16 pb-[120px] pt-[188px] text-light xl:pb-[87px] xl:pt-[136px]">
      <div className="absolute right-0 top-0 h-[300px] w-[118px] bg-[url('/images/servicespage/services-analytics-decor-mob.webp')] xl:left-0 xl:h-[571px] xl:w-[246px] xl:bg-[url('/images/servicespage/services-analytics-decor-desk.webp')]" />

      <AnimatedWrapper
        animation={fadeInAnimation({ x: 100, y: 50, scale: 0.8, delay: 0.7 })}
        className="absolute bottom-0 left-[65px] hidden bg-[url('/images/servicespage/services-analytics-themis.webp')] xl:block xl:h-[613px] xl:w-[557px]"
      />

      <div className="container max-w-[400px] md:max-w-[700px] xl:max-w-[1280px]">
        <AnimatedWrapper animation={fadeInAnimation({ y: -50 })}>
          <h2 className="mb-[52px] font-micra text-[24px] xl:mb-12 xl:ml-auto xl:max-w-[509px] xl:text-[40px]">
            {t("title")}
          </h2>
        </AnimatedWrapper>

        <ServiceList
          data={analyticsList}
          className="mb-10 xl:mb-[68px] xl:ml-auto xl:max-w-[509px]"
        />

        <AnimatedWrapper animation={fadeInAnimation({ y: 50, delay: 0.3 })}>
          <ModalTrigger
            variant="service"
            buttonVariant="light"
            buttonClassName="bg-light text-dark xl:ml-auto xl:max-w-[509px]"
            messageFrom={APPLICATION.SERVICE}
          />
        </AnimatedWrapper>
      </div>
    </section>
  );
};

export default ServicesAnalytics;
