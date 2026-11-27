import { getTranslations } from "next-intl/server";

import LineIcon, { LineIconName, Rings } from "../homepage/LineIcon";
import SectionHead from "../homepage/SectionHead";

type Step = { title: string; descr: string };

const ICONS: LineIconName[] = ["phone", "search", "compass", "shield"];

/** Four-step working process; the numbers carry the order, so they stay. */
const ServicesProcess = async () => {
  const t = await getTranslations("servicepage.process");
  const steps = t.raw("steps") as Step[];

  return (
    <section className="relative isolate overflow-hidden bg-[#f3f6fd] py-14 md:py-20 xl:py-[100px]">
      <Rings className="pointer-events-none absolute -right-[180px] -top-[220px] -z-10 w-[640px] max-md:hidden" />

      <div className="container max-w-[1280px]">
        <SectionHead title={t("title")} descr={t("descr")} />

        <ol className="relative grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-4 xl:grid-cols-4">
          {/* connector behind the step markers (desktop row) */}
          <span
            aria-hidden
            className="absolute left-[12%] right-[12%] top-[46px] hidden border-t border-dashed border-accent/40 xl:block"
          />
          {steps.map((step, idx) => (
            <li
              key={step.title}
              className="relative flex gap-4 rounded-[24px] bg-white p-5 shadow-[0_1px_2px_rgba(9,17,41,0.04)] md:flex-col md:gap-6 md:p-6 xl:p-7"
            >
              <div className="flex shrink-0 items-center gap-3 self-start md:justify-between md:self-auto">
                <span
                  className={
                    idx === steps.length - 1
                      ? "grid size-12 place-items-center rounded-full bg-accent text-light shadow-[0_12px_28px_-10px_rgba(81,136,255,0.9)]"
                      : "grid size-12 place-items-center rounded-full bg-dark text-accent"
                  }
                >
                  <LineIcon name={ICONS[idx]} className="size-[22px]" />
                </span>
                <span className="font-micra text-[28px] leading-none text-dark/10 max-md:hidden">
                  {String(idx + 1).padStart(2, "0")}
                </span>
              </div>
              <div>
                <p className="text-[13px] font-semibold uppercase tracking-[0.08em] text-accent-ink md:hidden">
                  {String(idx + 1).padStart(2, "0")}
                </p>
                <h3 className="text-[17px] font-semibold leading-[1.3] text-dark md:text-[18px]">
                  {step.title}
                </h3>
                <p className="mt-2 text-pretty text-[14px] leading-[1.55] text-dark/60 md:text-[15px]">
                  {step.descr}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
};

export default ServicesProcess;
