import { getTranslations } from "next-intl/server";

import { APPLICATION } from "@/constants/application";
import { siteConfig } from "@/constants/siteConfig";

import LineIcon, { Rings } from "../homepage/LineIcon";
import SectionHead from "../homepage/SectionHead";
import ModalTrigger from "../module/modal/ModalTrigger";

type Qa = { q: string; a: string };

const formatPhone = (phone: string) => {
  const d = phone.replace(/\D/g, "");
  return `+${d.slice(0, 2)} ${d.slice(2, 5)} ${d.slice(5, 8)} ${d.slice(8, 10)} ${d.slice(10)}`;
};

/** FAQ (native details, works without JS) + a compact contact card. */
const ServicesFaq = async () => {
  const t = await getTranslations("servicepage.faq");
  const items = t.raw("items") as Qa[];

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  };

  return (
    <section className="bg-light py-14 md:py-20 xl:py-[100px]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />
      <div className="container grid max-w-[1280px] grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-10">
        <div className="contents lg:col-span-5 lg:block">
          <SectionHead
            title={t("title")}
            descr={t("descr")}
            className="max-lg:mb-0"
          />

          <div className="relative isolate order-3 overflow-hidden rounded-[24px] bg-dark p-6 text-light md:p-7 lg:order-none">
            <Rings className="absolute -right-[120px] -top-[120px] -z-10 w-[340px]" />
            <span className="grid size-12 place-items-center rounded-full bg-accent/15 text-accent shadow-[inset_0_0_0_1px_rgba(81,136,255,0.35)]">
              <LineIcon name="chat" className="size-[22px]" />
            </span>
            <p className="mt-5 text-[18px] font-semibold leading-[1.3]">
              {t("cardTitle")}
            </p>
            <p className="mt-2 text-[14px] leading-[1.55] text-white/65">
              {t("cardText")}
            </p>
            <div className="mt-6 flex flex-col gap-3">
              <ModalTrigger
                variant="consultation"
                buttonVariant="accent"
                buttonClassName="h-[50px] py-0 text-[15px] font-semibold"
                messageFrom={APPLICATION.CONSULTATION}
              />
              <a
                href={`tel:+${siteConfig.phone.replace(/\D/g, "")}`}
                className="flex h-[50px] items-center justify-center gap-2.5 rounded-full border border-white/25 px-6 text-[15px] font-semibold tabular-nums transition-colors duration-300 hover:border-white"
              >
                <LineIcon name="phone" className="size-[18px] text-accent" />
                {formatPhone(siteConfig.phone)}
              </a>
            </div>
          </div>
        </div>

        <div className="order-2 flex flex-col gap-2.5 lg:order-none lg:col-span-7">
          {items.map(({ q, a }, idx) => (
            <details
              key={q}
              open={idx === 0}
              className="group rounded-[22px] bg-[#f3f6fd] transition-colors duration-300 open:bg-white open:shadow-[0_18px_40px_-26px_rgba(9,17,41,0.35),inset_0_0_0_1px_rgba(9,17,41,0.06)]"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5 text-[16px] font-semibold leading-[1.35] text-dark md:px-6 md:text-[17px] [&::-webkit-details-marker]:hidden">
                {q}
                <span className="grid size-9 shrink-0 place-items-center rounded-full bg-white text-dark transition-[transform,background-color,color] duration-300 group-open:rotate-45 group-open:bg-accent-strong group-open:text-light">
                  <svg aria-hidden viewBox="0 0 20 20" className="size-4">
                    <path
                      d="M10 4v12M4 10h12"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
              </summary>
              <p className="-mt-1 max-w-[620px] text-pretty px-5 pb-5 text-[15px] leading-[1.6] text-dark/65 md:px-6 md:pb-6">
                {a}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesFaq;
