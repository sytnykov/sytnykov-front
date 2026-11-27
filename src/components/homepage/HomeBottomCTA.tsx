import { getTranslations } from "next-intl/server";
import Image from "next/image";

import { APPLICATION } from "@/constants/application";
import { ROUTES } from "@/constants/routes";

import ModalTrigger from "../module/modal/ModalTrigger";
import ButtonOrLink from "../shared/button/ButtonOrLink ";
import LineIcon, { Rings } from "./LineIcon";
import { ArrowIcon } from "./SectionHead";

/** The single closing call to action. */
const HomeBottomCTA = async () => {
  const t = await getTranslations("homepage.final");

  return (
    <section className="bg-[#f3f6fd] md:px-6 md:pb-6">
      <div className="relative isolate overflow-hidden bg-dark text-light md:rounded-[32px]">
        <div
          aria-hidden
          className="absolute inset-0 -z-20 bg-[radial-gradient(40%_70%_at_0%_100%,rgba(0,28,88,0.9)_0%,rgba(9,17,41,0)_100%)]"
        />
        <span
          aria-hidden
          className="absolute inset-0 -z-20 bg-[radial-gradient(rgba(255,255,255,0.07)_1px,transparent_1.2px)] [background-size:18px_18px] [mask-image:linear-gradient(90deg,#000,transparent_45%)]"
        />
        <div className="relative mx-auto grid max-w-[1280px] md:grid-cols-[1.15fr_1fr]">
          <Rings className="absolute -right-[60px] top-1/2 -z-10 w-[680px] -translate-y-1/2 max-md:hidden" />

          <div className="relative z-10 self-center px-8 pt-14 md:p-10 xl:px-[50px] xl:py-16">
            <h2 className="text-balance font-micra text-[26px] leading-[1.12] [word-spacing:-0.18em] md:text-[34px] xl:text-[44px]">
              {t("title")}
            </h2>
            <p className="mt-4 max-w-[460px] text-pretty text-[15px] leading-[1.55] text-white/70 md:mt-5 md:text-[17px]">
              {t("descr")}
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:max-w-[400px] lg:flex-row xl:mt-9">
              <ButtonOrLink
                href={ROUTES.EDUCATION}
                variant="accent"
                className="h-[50px] py-0 text-[15px] font-semibold md:h-[52px] lg:w-[200px]"
              >
                {t("button")}
                <ArrowIcon className="ml-2 size-4" />
              </ButtonOrLink>
              <ModalTrigger
                variant="consultation"
                buttonVariant="transparent"
                buttonClassName="h-[50px] py-0 md:h-[52px] text-[15px] lg:w-[240px] border-white/35 hover:border-white"
                messageFrom={APPLICATION.CONSULTATION}
              />
            </div>
          </div>

          {/* soft light behind the portrait, free to fade past the grid */}
          <span
            aria-hidden
            className="absolute right-[-10%] top-1/2 -z-10 size-[720px] -translate-y-1/2 rounded-full bg-accent/40 blur-[120px] max-md:size-[420px]"
          />
          {/* full, uncropped portrait — the crisp 1094×1450 cut-out */}
          <div className="relative mt-8 h-[440px] w-full self-end overflow-hidden [mask-image:linear-gradient(to_bottom,#000_82%,transparent_100%)] md:mx-auto md:mt-10 md:h-auto md:w-[88%] md:max-w-[380px] md:overflow-visible md:[mask-image:none] xl:max-w-[420px]">
            <div className="absolute left-1/2 top-0 aspect-[1094/1450] w-[120%] -translate-x-1/2 md:relative md:left-auto md:w-full md:translate-x-0">
              <Image
                src="/images/homepage/home-hero-person-hq.webp"
                alt=""
                fill
                sizes="(min-width: 1280px) 420px, (min-width: 768px) 40vw, 120vw"
                className="object-contain object-bottom md:[mask-image:linear-gradient(to_bottom,#000_82%,transparent_100%)]"
              />
            </div>
            {/* floating proof chips */}
            <span className="absolute left-8 top-[7%] z-10 inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-2 text-[13px] font-medium shadow-[inset_0_0_0_1px_rgba(255,255,255,0.18),0_14px_30px_-14px_rgba(0,0,0,0.6)] backdrop-blur-md md:left-[-14%] md:top-[30%]">
              <LineIcon name="scales" className="size-4 text-accent" />
              {t("chip1")}
            </span>
            <span className="absolute bottom-[20%] right-8 z-10 inline-flex items-center gap-2 rounded-full bg-light px-3.5 py-2 text-[13px] font-semibold text-dark shadow-[0_14px_30px_-14px_rgba(0,0,0,0.6)] md:right-[-2%]">
              <span className="grid size-5 place-items-center rounded-full bg-accent text-light">
                <LineIcon name="check" className="size-3" />
              </span>
              {t("chip2")}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeBottomCTA;
