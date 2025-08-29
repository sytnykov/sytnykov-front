import { getMessages, getTranslations } from "next-intl/server";
import Image from "next/image";

import { fadeInAnimation, listVariants } from "@/helpers/animation";

import InfoBox from "../shared/InfoBox";
import AnimatedList from "../shared/animated/AnimatedList";
import AnimatedListItem from "../shared/animated/AnimatedListItem";
import AnimatedWrapper from "../shared/animated/AnimatedWrapper";

type AdvantageItem = {
  title: string;
  descr: string;
};

const HomeAdvantages = async () => {
  const t = await getTranslations("homepage.advantages");

  const messages = await getMessages();

  const advantageList = messages.homepage.advantages
    .advantageList as AdvantageItem[];

  return (
    <section className="relative pb-[188px] pt-[60px] xl:pb-[203px] xl:pt-[104px]">
      <div className="container relative max-w-[1280px]">
        <div className="xl:ml-[536px]">
          <AnimatedWrapper
            animation={fadeInAnimation({ x: -50 })}
            className="mb-[60px] md:mb-12"
          >
            <h2 className="mb-4 font-micra text-[24px] xl:text-[48px]">
              {t("title")}
            </h2>
            <p className="font-light">{t("descr")}</p>
          </AnimatedWrapper>

          <AnimatedList
            viewport={{ once: true, amount: 0.4 }}
            animation={listVariants({ staggerChildren: 0.5 })}
            className="grid gap-4 md:grid-cols-2"
          >
            {advantageList.map(({ title, descr }) => (
              <AnimatedListItem key={title} className="h-full">
                <InfoBox classname="flex flex-col gap-4 justify-start max-sm:px-4">
                  <h3 className="font-micra text-[24px] max-sm:text-[18px]">
                    {title}
                  </h3>
                  <p className="font-light max-xl:text-[14px]">{descr}</p>
                </InfoBox>
              </AnimatedListItem>
            ))}
          </AnimatedList>
        </div>
      </div>

      <AnimatedWrapper
        animation={fadeInAnimation({ x: -50, delay: 0.4, scale: 0.8 })}
        className="hidden xl:absolute xl:bottom-0 xl:left-0 xl:-z-20 xl:block xl:h-[947px] xl:w-[1280px]"
      >
        <Image
          src="/images/homepage/home-advantages-person.webp"
          alt="Фото Олександра Ситника"
          fill
          sizes="1280px"
          className="object-cover"
        />
      </AnimatedWrapper>

      <div className="absolute left-0 top-0 -z-[8] h-[774px] w-[353px] max-xl:block xl:hidden">
        <Image
          src="/images/homepage/home-advantages-decor-top-mob.webp"
          alt="Декоративне зображення"
          width={353}
          height={774}
          className="object-cover"
        />
      </div>

      <div className="absolute bottom-0 right-0 -z-[8] h-[368px] w-[360px] max-xl:block xl:hidden">
        <Image
          src="/images/homepage/home-advantages-decor-bottom-mob.webp"
          alt="Декоративне зображення"
          width={360}
          height={368}
          className="object-cover"
        />
      </div>
    </section>
  );
};

export default HomeAdvantages;
