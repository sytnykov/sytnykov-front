import { getMessages, getTranslations } from "next-intl/server";
import Image from "next/image";

import { APPLICATION } from "@/constants/application";
import { siteConfig } from "@/constants/siteConfig";

import ModalTrigger from "../module/modal/ModalTrigger";
import LineIcon, { LineIconName, Rings } from "./LineIcon";
import SectionHead from "./SectionHead";

const ICONS: LineIconName[] = [
  "chat",
  "shield",
  "target",
  "chart",
  "scales",
  "document",
];

const formatPhone = (phone: string) => {
  const d = phone.replace(/\D/g, "");
  return `+${d.slice(0, 2)} ${d.slice(2, 5)} ${d.slice(5, 8)} ${d.slice(8, 10)} ${d.slice(10)}`;
};

/** Consultation: offer + services on the left, a composed portrait on the right. */
const HomeConsultation = async () => {
  const t = await getTranslations("homepage.consultation");
  const messages = await getMessages();
  const practice = (
    messages.servicepage.practice.practiceList as string[]
  ).slice(0, 6);

  return (
    <section className="relative isolate overflow-hidden bg-dark py-14 text-light md:py-20 xl:py-[100px]">
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[radial-gradient(50%_60%_at_15%_30%,rgba(81,136,255,0.2)_0%,rgba(9,17,41,0)_70%),radial-gradient(40%_50%_at_100%_100%,rgba(0,28,88,0.9)_0%,rgba(9,17,41,0)_100%)]"
      />

      <div className="container grid max-w-[1280px] grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-10">
        {/* offer + services */}
        <div className="min-w-0 lg:col-span-7">
          <SectionHead
            tone="dark"
            title={t("title")}
            descr={t("descr")}
            className="md:mb-8"
          />
          <div className="flex flex-col gap-3 md:flex-row">
            <ModalTrigger
              variant="consultation"
              buttonVariant="accent"
              buttonClassName="h-[50px] py-0 md:h-[52px] text-[15px] font-semibold md:w-[250px]"
              messageFrom={APPLICATION.CONSULTATION}
            />
            <a
              href={`tel:+${siteConfig.phone.replace(/\D/g, "")}`}
              className="flex h-[50px] items-center justify-center gap-2.5 rounded-full border border-white/25 px-6 text-[15px] font-semibold tabular-nums transition-colors duration-300 hover:border-white md:h-[52px]"
            >
              <LineIcon name="phone" className="size-[18px] text-accent" />
              {formatPhone(siteConfig.phone)}
            </a>
          </div>
          <ul className="mt-8 grid border-t border-white/10 md:mt-10 md:grid-cols-2 md:gap-x-8">
            {practice.map((item, idx) => (
              <li
                key={item}
                className="flex items-center gap-4 border-b border-white/10 py-4"
              >
                <span className="grid size-10 shrink-0 place-items-center rounded-[12px] bg-accent/15 text-accent shadow-[inset_0_0_0_1px_rgba(81,136,255,0.35)]">
                  <LineIcon
                    name={ICONS[idx % ICONS.length]}
                    className="size-5"
                  />
                </span>
                <span className="text-[15px] leading-[1.4] text-white/85">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* composed portrait */}
        <div className="relative isolate h-[440px] overflow-hidden rounded-[28px] bg-[linear-gradient(160deg,#5b8fff_0%,#2c52bd_42%,#13245a_100%)] max-lg:order-first sm:h-[520px] lg:col-span-5 lg:h-auto lg:min-h-[580px]">
          <Rings
            color="#ffffff"
            className="absolute -left-[140px] top-[6%] -z-10 w-[560px]"
          />
          <span
            aria-hidden
            className="absolute inset-0 -z-10 bg-[radial-gradient(rgba(255,255,255,0.12)_1px,transparent_1.2px)] [background-size:16px_16px] [mask-image:linear-gradient(200deg,#000_0%,transparent_55%)]"
          />
          <span
            aria-hidden
            className="absolute bottom-[-20%] left-[-10%] -z-10 size-[70%] rounded-full bg-[#091129]/60 blur-[60px]"
          />
          <div className="absolute bottom-0 right-0 h-[92%] w-[86%]">
            <Image
              src="/images/homepage/home-consult-person.webp"
              alt={t("personalRole")}
              fill
              sizes="(min-width: 1024px) 420px, 80vw"
              className="object-contain object-right-bottom"
            />
          </div>

          {/* floating cards */}
          <div className="absolute left-4 top-4 flex items-center gap-3 rounded-[18px] bg-light p-2.5 pr-4 text-dark shadow-[0_20px_40px_-20px_rgba(0,0,0,0.6)] md:left-6 md:top-6">
            <span className="relative grid size-10 place-items-center rounded-full bg-dark text-accent">
              <LineIcon name="chat" className="size-5" />
              <span className="absolute -right-0.5 -top-0.5 size-3 rounded-full bg-[#2fbf71] ring-2 ring-white" />
            </span>
            <div>
              <p className="text-[14px] font-semibold leading-[1.2]">
                {t("personal")}
              </p>
              <p className="mt-0.5 text-[12px] text-dark/60">{t("area")}</p>
            </div>
          </div>
          <span className="absolute bottom-5 left-4 inline-flex items-center gap-2 rounded-full bg-dark/70 px-3.5 py-2 text-[13px] font-medium shadow-[inset_0_0_0_1px_rgba(255,255,255,0.18)] backdrop-blur-md md:bottom-6 md:left-6">
            <LineIcon name="clock" className="size-4 text-accent" />
            {t("hours")}
          </span>
        </div>
      </div>
    </section>
  );
};

export default HomeConsultation;
