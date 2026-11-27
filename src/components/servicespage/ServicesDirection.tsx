import { getTranslations } from "next-intl/server";
import Image from "next/image";

import { APPLICATION } from "@/constants/application";
import { cn } from "@/utils/cn";

import LineIcon, { LineIconName } from "../homepage/LineIcon";
import SectionHead from "../homepage/SectionHead";
import ModalTrigger from "../module/modal/ModalTrigger";

type Item = { title: string; descr: string };
type Direction = {
  id: string;
  title: string;
  descr: string;
  tag: string;
  imgAlt: string;
  items: Item[];
};

type Config = {
  tone: "light" | "dark";
  icons: LineIconName[];
  /** photo = full-bleed photo; cutout = portrait cut-out on a brand gradient */
  media: { kind: "photo" | "cutout"; src: string; position?: string };
  mediaRight?: boolean;
  bg: string;
};

const CONFIG: Record<string, Config> = {
  practice: {
    tone: "light",
    bg: "bg-light",
    icons: [
      "chat",
      "shield",
      "compass",
      "target",
      "scales",
      "document",
      "check",
      "gavel",
    ],
    media: {
      kind: "photo",
      src: "/images/servicespage/v2/practice-stock.webp",
      position: "object-[45%_70%]",
    },
  },
  analytics: {
    tone: "dark",
    bg: "bg-dark",
    mediaRight: true,
    icons: ["search", "book", "layers", "chart", "document"],
    media: {
      kind: "photo",
      src: "/images/servicespage/v2/analytics-stock.webp",
      position: "object-[45%_50%]",
    },
  },
  consulting: {
    tone: "light",
    bg: "bg-light",
    icons: ["columns", "team", "building", "briefcase", "ruler", "target"],
    media: {
      kind: "photo",
      src: "/images/servicespage/v2/consulting-stock.webp",
      position: "object-[55%_30%]",
    },
  },
};

/** One service direction: heading row, sticky media card, and a list of service tiles. */
const ServicesDirection = async ({ index }: { index: number }) => {
  const t = await getTranslations("servicepage");
  const d = (t.raw("directions") as Direction[])[index];
  const c = CONFIG[d.id];
  const dark = c.tone === "dark";

  const button = (
    <ModalTrigger
      variant="service"
      buttonVariant={dark ? "accent" : "dark"}
      buttonClassName="h-[50px] py-0 text-[15px] font-semibold md:w-[250px]"
      messageFrom={APPLICATION.SERVICE}
    />
  );

  return (
    <section
      id={d.id}
      className={cn(
        "relative isolate scroll-mt-20 overflow-hidden py-14 md:py-20 xl:py-[100px]",
        c.bg,
        dark && "text-light"
      )}
    >
      {dark && (
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-[radial-gradient(45%_60%_at_100%_20%,rgba(81,136,255,0.22)_0%,rgba(9,17,41,0)_70%),radial-gradient(40%_50%_at_0%_100%,rgba(0,28,88,0.9)_0%,rgba(9,17,41,0)_100%)]"
        />
      )}

      <div className="container max-w-[1280px]">
        <SectionHead
          tone={c.tone}
          title={d.title}
          descr={d.descr}
          action={<div className="max-md:hidden">{button}</div>}
        />

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-12 lg:gap-6">
          {/* media */}
          <div className={cn("lg:col-span-5", c.mediaRight && "lg:order-last")}>
            <div
              className={cn(
                "relative isolate h-[340px] overflow-hidden rounded-[24px] sm:h-[400px] md:h-[440px] lg:h-full lg:min-h-[460px]",
                c.media.kind === "cutout"
                  ? "bg-[linear-gradient(160deg,#5b8fff_0%,#2c52bd_42%,#13245a_100%)]"
                  : "bg-[#dfe6f5]"
              )}
            >
              {c.media.kind === "cutout" ? (
                <>
                  <span
                    aria-hidden
                    className="absolute -right-[10%] top-[10%] -z-10 size-[80%] rounded-full bg-[#9db8ff]/40 blur-[70px]"
                  />
                  <span
                    aria-hidden
                    className="absolute inset-0 -z-10 bg-[radial-gradient(rgba(255,255,255,0.12)_1px,transparent_1.2px)] [background-size:16px_16px] [mask-image:linear-gradient(200deg,#000_0%,transparent_55%)]"
                  />
                  <div className="absolute inset-x-0 bottom-0 h-[90%]">
                    <Image
                      src={c.media.src}
                      alt={d.imgAlt}
                      fill
                      sizes="(min-width: 1024px) 480px, 90vw"
                      className="object-contain object-bottom"
                    />
                  </div>
                </>
              ) : (
                <>
                  <Image
                    src={c.media.src}
                    alt={d.imgAlt}
                    fill
                    sizes="(min-width: 1280px) 500px, (min-width: 1024px) 40vw, 92vw"
                    className={cn("object-cover", c.media.position)}
                  />
                  <span
                    aria-hidden
                    className="absolute inset-x-0 bottom-0 h-[40%] bg-[linear-gradient(0deg,rgba(9,17,41,0.7)_0%,rgba(9,17,41,0)_100%)]"
                  />
                </>
              )}
              <span className="absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-full bg-dark/70 px-3.5 py-2 text-[13px] font-medium text-light shadow-[inset_0_0_0_1px_rgba(255,255,255,0.18)] backdrop-blur-md md:bottom-5 md:left-5">
                <LineIcon name="check" className="size-4 text-accent" />
                {d.tag}
              </span>
            </div>
          </div>

          {/* services */}
          <ul
            className={cn(
              "grid grid-cols-1 gap-2 rounded-[28px] p-2 md:grid-cols-2 lg:col-span-7",
              dark
                ? "bg-white/[0.04] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08)]"
                : "bg-[#f3f6fd]"
            )}
          >
            {d.items.map((item, idx) => (
              <li
                key={item.title}
                className={cn(
                  "flex gap-4 rounded-[22px] p-5 transition-[background-color,box-shadow] duration-300 md:flex-col md:p-6",
                  // an odd count leaves a hole in the 2-col grid: let the last tile span it
                  d.items.length % 2 === 1 &&
                    idx === d.items.length - 1 &&
                    "md:col-span-2",
                  dark
                    ? "bg-white/[0.05] hover:bg-white/[0.09]"
                    : "bg-white shadow-[0_1px_2px_rgba(9,17,41,0.04)] hover:shadow-[0_18px_40px_-24px_rgba(9,17,41,0.35)]"
                )}
              >
                <span
                  className={cn(
                    "grid size-11 shrink-0 place-items-center rounded-[14px] text-accent",
                    dark
                      ? "bg-accent/15 shadow-[inset_0_0_0_1px_rgba(81,136,255,0.35)]"
                      : "bg-accent/10"
                  )}
                >
                  <LineIcon
                    name={c.icons[idx % c.icons.length]}
                    className="size-[22px]"
                  />
                </span>
                <div>
                  <h3 className="text-pretty text-[16px] font-semibold leading-[1.3] md:text-[17px]">
                    {item.title}
                  </h3>
                  <p
                    className={cn(
                      "mt-2 text-pretty text-[14px] leading-[1.5]",
                      dark ? "text-white/60" : "text-dark/60"
                    )}
                  >
                    {item.descr}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-6 md:hidden">{button}</div>
      </div>
    </section>
  );
};

export default ServicesDirection;
