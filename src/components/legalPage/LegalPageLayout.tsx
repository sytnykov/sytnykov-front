import { getTranslations } from "next-intl/server";

import AnimatedWrapper from "../shared/animated/AnimatedWrapper";
import { fadeInAnimation } from "@/helpers/animation";

interface LegalPageLayoutProps {
  namespace: string;
  children: React.ReactNode;
}

const LegalPageLayout = async ({
  namespace,
  children,
}: LegalPageLayoutProps) => {
  const t = await getTranslations(namespace);

  return (
    <>
      <section className="bg-dark pb-16 pt-[140px] text-light md:pb-20 md:pt-[180px]">
        <div className="container mx-auto max-w-[1280px] px-8 xl:px-[50px]">
          <AnimatedWrapper
            animation={fadeInAnimation({ y: 30 })}
            viewport={{ once: true, amount: 0 }}
          >
            <h1 className="font-micra text-[22px] uppercase xl:text-[44px]">
              {t("hero.title")}
            </h1>
          </AnimatedWrapper>

          <AnimatedWrapper
            animation={fadeInAnimation({ y: 30, delay: 0.2 })}
            viewport={{ once: true, amount: 0 }}
          >
            <p className="mt-4 max-w-[600px] text-sm font-light leading-relaxed xl:text-base">
              {t("hero.descr")}
            </p>
          </AnimatedWrapper>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="container mx-auto max-w-[1280px] px-8 xl:px-[50px]">
          {children}
        </div>
      </section>
    </>
  );
};

export default LegalPageLayout;
