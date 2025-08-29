import { useTranslations } from "next-intl";

import { siteConfig } from "@/constants/siteConfig";

import FooterSocialLink from "./FooterSocialLink";

const FooterSocials = () => {
  const t = useTranslations("footer");

  return (
    <div>
      <h3 className="mb-4 font-micra uppercase leading-[20px] tracking-[1px] xl:mb-[18px]">
        {t("section.socials")}
      </h3>

      <ul className="flex gap-3">
        {siteConfig.socialLinks.map((link, index) => (
          <FooterSocialLink key={index} {...link} />
        ))}
      </ul>
    </div>
  );
};

export default FooterSocials;
