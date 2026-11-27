import { getTranslations } from "next-intl/server";

import { Rings } from "@/components/homepage/LineIcon";
import { PillLink } from "@/components/homepage/SectionHead";
import { Link } from "@/i18n/navigation";
import { ROUTES } from "@/constants/routes";

export default async function NotFound() {
  const t = await getTranslations("notFound");

  return (
    <div className="bg-[#f3f6fd] pb-3 md:pb-6">
      <section className="relative isolate flex min-h-[80svh] items-center overflow-hidden bg-dark pb-16 pt-[120px] text-light rounded-b-[24px] md:rounded-b-[32px]">
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-[radial-gradient(45%_60%_at_75%_45%,rgba(81,136,255,0.3)_0%,rgba(9,17,41,0)_70%)]"
        />
        <Rings className="pointer-events-none absolute -right-[160px] top-1/2 -z-10 w-[720px] -translate-y-1/2 max-md:hidden" />
        <div className="container max-w-[1280px]">
          <p className="font-micra text-[64px] leading-none text-accent md:text-[96px]">
            404
          </p>
          <h1 className="mt-6 max-w-[620px] text-balance font-micra text-[26px] leading-[1.12] [word-spacing:-0.18em] md:text-[34px] xl:text-[44px]">
            {t("title")}
          </h1>
          <p className="mt-4 max-w-[520px] text-[15px] leading-[1.6] text-white/70 md:text-[17px]">
            {t("descr")}
          </p>
          <div className="mt-8 flex flex-col gap-3 md:flex-row">
            <Link href={ROUTES.HOME}>
              <PillLink tone="dark">{t("home")}</PillLink>
            </Link>
            <Link
              href={ROUTES.EDUCATION}
              className="flex h-[50px] items-center justify-center rounded-full border border-white/25 px-6 text-[15px] font-semibold transition-colors duration-300 hover:border-white"
            >
              {t("courses")}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
