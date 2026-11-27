import { getTranslations } from "next-intl/server";

import {
  PackagesBlock as Packages,
  pick,
} from "@/lib/sanity/types/courseBlocks";
import { cn } from "@/utils/cn";

import LineIcon from "../../homepage/LineIcon";
import SectionHead from "../../homepage/SectionHead";
import PackageCard, { PackageView } from "./PackageCard";
import { BlockCtx, formatPrice } from "./shared";

/** 7. Three participation packages with WayForPay payment links. */
const PackagesBlock = async ({
  block,
  ctx,
}: {
  block: Packages;
  ctx: BlockCtx;
}) => {
  const t = await getTranslations("courseBuilder");
  const { locale, salesClosed, data } = ctx;
  const packages: PackageView[] = (block.packages ?? []).map(p => ({
    key: p._key,
    name: pick(p.name, locale),
    note: pick(p.note, locale),
    price: formatPrice(p.price ?? 0),
    priceValue: p.price ?? 0,
    oldPrice: p.oldPrice ? formatPrice(p.oldPrice) : undefined,
    highlighted: !!p.highlighted,
    features: (p.features ?? []).map(f => ({
      text: pick(f.text, locale),
      included: f.included !== false,
    })),
    paymentUrl: p.paymentUrl,
  }));
  if (!packages.length) return null;

  const validUntil = data.priceValidUntil
    ? new Date(`${data.priceValidUntil}T00:00:00`).toLocaleDateString(
        locale === "ru" ? "ru-RU" : "uk-UA",
        { day: "numeric", month: "long" }
      )
    : null;

  return (
    <section
      id="packages"
      className="relative isolate scroll-mt-20 overflow-hidden bg-dark py-14 text-light md:py-20 xl:py-[100px]"
    >
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[radial-gradient(50%_60%_at_50%_100%,rgba(81,136,255,0.28)_0%,rgba(9,17,41,0)_70%)]"
      />
      <div className="container max-w-[1280px]">
        <SectionHead
          tone="dark"
          title={pick(block.title, locale) || t("defaults.coursePackagesBlock")}
          action={
            validUntil && !salesClosed ? (
              <span className="inline-flex items-center gap-2 rounded-full bg-white/[0.08] px-4 py-2.5 text-[14px] font-medium shadow-[inset_0_0_0_1px_rgba(255,255,255,0.14)]">
                <LineIcon name="clock" className="size-4 text-accent" />
                {t("priceValid")} {validUntil}
              </span>
            ) : undefined
          }
        />
        {salesClosed && (
          <p className="-mt-3 mb-8 max-w-[560px] text-[15px] text-white/65">
            {t("nextFlowNote")}
          </p>
        )}
        <div
          className={cn(
            "grid grid-cols-1 gap-4 pt-3 md:grid-cols-2 lg:gap-5",
            packages.length >= 3 && "lg:grid-cols-3",
            packages.length === 4 && "xl:grid-cols-4"
          )}
        >
          {packages.map(p => (
            <PackageCard
              key={p.key}
              pkg={p}
              course={ctx.courseTitle}
              salesClosed={salesClosed}
              labels={{
                pay: t("pay"),
                nextFlow: t("nextFlow"),
                included: t("included"),
                showAll: t("showAll", {
                  count: Math.max(0, p.features.length),
                }),
                hide: t("hide"),
                recommended: t("recommended"),
                uah: t("uah"),
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PackagesBlock;
