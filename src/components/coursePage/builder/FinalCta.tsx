import { getTranslations } from "next-intl/server";

import { APPLICATION } from "@/constants/application";
import { siteConfig } from "@/constants/siteConfig";
import { cn } from "@/utils/cn";

import LineIcon, { Rings } from "../../homepage/LineIcon";
import ModalTrigger from "../../module/modal/ModalTrigger";

const formatPhone = (phone: string) => {
  const d = phone.replace(/\D/g, "");
  return `+${d.slice(0, 2)} ${d.slice(2, 5)} ${d.slice(5, 8)} ${d.slice(8, 10)} ${d.slice(10)}`;
};

/** Closing call to action on every course page. */
const FinalCta = async ({
  course,
  afterDark = false,
}: {
  course: string;
  /** previous block is dark: frame the card so the two dark areas don't merge */
  afterDark?: boolean;
}) => {
  const t = await getTranslations("courseBuilder");

  return (
    <section
      className={cn(
        "bg-[#f3f6fd] md:px-6 md:pb-6",
        afterDark && "px-3 py-3 md:pt-6"
      )}
    >
      <div
        className={cn(
          "relative isolate overflow-hidden bg-dark text-light md:rounded-[32px]",
          afterDark && "rounded-[24px]"
        )}
      >
        <Rings className="absolute -right-[80px] top-1/2 -z-10 w-[620px] -translate-y-1/2 max-md:hidden" />
        <div
          aria-hidden
          className="absolute inset-0 -z-20 bg-[radial-gradient(40%_70%_at_0%_100%,rgba(0,28,88,0.9)_0%,rgba(9,17,41,0)_100%),radial-gradient(40%_60%_at_85%_50%,rgba(81,136,255,0.22)_0%,rgba(9,17,41,0)_70%)]"
        />
        <div className="container max-w-[1280px] py-14 md:py-16 xl:py-20">
          <h2 className="max-w-[640px] text-balance font-micra text-[26px] leading-[1.12] [word-spacing:-0.18em] md:text-[34px] xl:text-[44px]">
            {t("finalTitle")}
          </h2>
          <p className="mt-4 max-w-[520px] text-[15px] leading-[1.6] text-white/70 md:text-[17px]">
            {t("finalText")}
          </p>
          <div className="mt-8 flex flex-col gap-3 md:flex-row">
            <ModalTrigger
              variant="course"
              course={course}
              buttonVariant="accent"
              label={t("apply")}
              buttonClassName="h-[50px] py-0 text-[15px] font-semibold md:w-[250px]"
              messageFrom={APPLICATION.COURSE}
            />
            <a
              href={`tel:+${siteConfig.phone.replace(/\D/g, "")}`}
              className="flex h-[50px] items-center justify-center gap-2.5 whitespace-nowrap rounded-full border border-white/25 px-6 text-[15px] font-semibold tabular-nums transition-colors duration-300 hover:border-white"
            >
              <LineIcon name="phone" className="size-[18px] text-accent" />
              {formatPhone(siteConfig.phone)}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FinalCta;
