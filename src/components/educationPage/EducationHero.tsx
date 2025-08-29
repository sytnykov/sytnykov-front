import { getTranslations } from "next-intl/server";

const EducationHero = async () => {
  const t = await getTranslations("educationPage.hero");

  return (
    <section className="relative h-[665px] bg-dark pt-[136px] text-light max-md:rounded-b-2xl md:h-[480px] xl:h-[520px]">
      <div className="container max-w-[1280px] md:pl-[420px] xl:pl-[582px]">
        <h1 className="mb-8 font-micra text-[22px] uppercase max-xl:max-w-[390px] md:mb-[38px] md:text-[28px] xl:w-[662px] xl:text-[36px]">
          {t("title")}
        </h1>

        <p className="max-w-[306px] text-[14px] font-light max-md:mr-[110px] md:ml-auto md:text-right">
          {t("descr")}
        </p>
      </div>

      <div className="absolute left-0 z-[5] h-[233px] w-full bg-[url('/images/educationPage/education-hero-bg.webp')] bg-cover bg-no-repeat max-md:bottom-0 max-md:rounded-b-2xl md:top-0 md:h-full md:w-[390px] xl:w-[40%]" />

      <div className="absolute bottom-0 right-0 h-[435px] w-[255px] bg-[url('/images/educationPage/education-hero-decor-mob.webp')] md:h-[167px] md:w-[563px] md:bg-[url('/images/educationPage/education-hero-decor-right-desk.webp')]" />
      <div className="absolute bottom-0 left-[390px] h-[277px] w-[230px] max-md:hidden md:bg-[url('/images/educationPage/education-hero-decor-left-desk.webp')] xl:left-[40%]" />
    </section>
  );
};

export default EducationHero;
