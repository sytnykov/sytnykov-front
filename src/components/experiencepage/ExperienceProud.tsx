import { getMessages, getTranslations } from "next-intl/server";
import Image from "next/image";

import { fadeInAnimation, listVariants } from "@/helpers/animation";

import InfoBox from "../shared/InfoBox";
import AnimatedList from "../shared/animated/AnimatedList";
import AnimatedListItem from "../shared/animated/AnimatedListItem";
import AnimatedWrapper from "../shared/animated/AnimatedWrapper";

type ProudItem = {
  title: string;
  descr: string;
  isImage?: boolean;
};

const ExperienceProud = async () => {
  const t = await getTranslations("experiencePage.proud");
  const messages = await getMessages();

  const proudList = messages.experiencePage.proud.proudList as ProudItem[];
  const proudListWithImage = [...proudList];
  proudListWithImage.splice(2, 0, { title: "", descr: "", isImage: true });

  const columns = [
    proudListWithImage.slice(0, 2),
    proudListWithImage.slice(2, 4),
    proudListWithImage.slice(4, 6),
  ];

  return (
    <section className="relative overflow-hidden pb-[120px] pt-[152px] xl:pb-[200px] xl:pt-[100px]">
      <div className="container max-w-[1280px]">
        <AnimatedWrapper animation={fadeInAnimation({ y: -50 })}>
          <h2 className="mx-auto mb-[52px] max-w-[490px] text-center font-micra text-[24px] xl:mb-[60px] xl:text-[40px]">
            {t("title")}
          </h2>
        </AnimatedWrapper>

        <div className="relative mx-auto flex flex-col gap-4 max-xl:max-w-[400px] xl:flex-row xl:justify-between xl:gap-6">
          {columns.map((column, colIdx) => (
            <AnimatedList
              viewport={{ once: true, amount: 0.4 }}
              animation={listVariants()}
              key={colIdx}
              className="flex flex-col gap-4 xl:w-[32%]"
            >
              {column.map(({ title, descr, isImage }, idx) => (
                <AnimatedListItem key={idx} className="h-full">
                  {isImage ? (
                    <div className="relative h-[252px] xl:h-full">
                      <Image
                        src="/images/experiencePage/experience-proud-image.webp"
                        alt="Зображення Феміди"
                        fill
                        sizes="400px"
                        className="rounded-lg object-cover"
                      />
                    </div>
                  ) : (
                    <InfoBox
                      variant="gradient"
                      classname="flex flex-col gap-4 h-full xl:pb-[35px] xl:pt-8"
                    >
                      <h3 className="font-micra text-[22px] max-sm:text-[18px] xl:text-[24px]">
                        {title}
                      </h3>
                      <p className="font-light max-xl:text-[14px]">{descr}</p>
                    </InfoBox>
                  )}
                </AnimatedListItem>
              ))}
            </AnimatedList>
          ))}
          <div className="absolute -bottom-[223px] left-0 -z-[3] h-[507px] w-[511px] bg-no-repeat max-xl:hidden xl:bg-[url('/images/experiencePage/experience-proud-decor-desk.webp')]" />
        </div>
      </div>

      <div className="absolute -top-[355px] left-0 -z-[3] h-[715px] w-[360px] max-xl:bg-[url('/images/experiencePage/experience-proud-decor-top-mob.webp')] xl:hidden" />
      <div className="absolute bottom-[450px] right-0 -z-[3] h-[780px] w-[308px] max-xl:bg-[url('/images/experiencePage/experience-proud-decor-mid-mob.webp')] xl:hidden" />
      <div className="absolute -bottom-[300px] left-0 -z-[3] h-[762px] w-[307px] max-xl:bg-[url('/images/experiencePage/experience-proud-decor-bot-mob.webp')] xl:hidden" />
    </section>
  );
};

export default ExperienceProud;
