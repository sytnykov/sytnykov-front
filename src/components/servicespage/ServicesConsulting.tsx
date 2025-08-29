import { getMessages, getTranslations } from "next-intl/server";

import { APPLICATION } from "@/constants/application";
import { fadeInAnimation } from "@/helpers/animation";

import ModalTrigger from "../module/modal/ModalTrigger";
import AnimatedWrapper from "../shared/animated/AnimatedWrapper";
import ServiceList from "./ServiceList";

const ServicesConsulting = async () => {
  const t = await getTranslations("servicepage.consulting");
  const messages = await getMessages();

  const consultingList = messages.servicepage.consulting
    .consultingList as string[];

  return (
    <section className="relative overflow-hidden pb-[261px] pt-[120px] xl:py-[112px]">
      <div className="container relative z-10 max-w-[400px] md:max-w-[700px] xl:max-w-[1280px]">
        <AnimatedWrapper animation={fadeInAnimation({ y: -50 })}>
          <h2 className="mb-[52px] font-micra text-[24px] xl:mb-12 xl:max-w-[409px] xl:text-[40px]">
            {t("title")}
          </h2>
        </AnimatedWrapper>

        <ServiceList
          data={consultingList}
          className="mb-10 xl:mb-[68px] xl:max-w-[409px]"
        />

        <AnimatedWrapper animation={fadeInAnimation({ y: 50, delay: 0.3 })}>
          <ModalTrigger
            variant="service"
            buttonClassName="xl:max-w-[409px]"
            messageFrom={APPLICATION.SERVICE}
          />
        </AnimatedWrapper>
      </div>

      <AnimatedWrapper
        animation={fadeInAnimation({ x: 100, y: 50, scale: 0.8, delay: 0.7 })}
        className="absolute bottom-0 right-0 h-[430px] w-[400px] bg-[url('/images/servicespage/services-consulting-person-mob.webp')] bg-contain xl:-bottom-[50px] xl:h-[726px] xl:w-[827px] xl:bg-[url('/images/servicespage/services-consulting-person-desk.webp')]"
      />
    </section>
  );
};

export default ServicesConsulting;
