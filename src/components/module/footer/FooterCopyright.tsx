import { useTranslations } from "next-intl";

import { siteConfig } from "@/constants/siteConfig";

const FooterCopyright = () => {
  const t = useTranslations("footer");

  const year = new Date().getFullYear();

  return (
    <div className="flex flex-col gap-1 md:flex-row md:justify-around xl:justify-between">
      <p className="leading-[28.8px]">
        &copy; {year} {t("companyName")}
      </p>
      <p className="leading-[28.8px]">
        {t("copyright")}{" "}
        <a
          href={siteConfig.cyanidium.url}
          target="_blank"
          rel="noopener noreferrer"
          className="link-transition"
        >
          {siteConfig.cyanidium.name}
        </a>
      </p>
    </div>
  );
};

export default FooterCopyright;
