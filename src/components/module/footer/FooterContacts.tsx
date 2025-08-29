import { useTranslations } from "next-intl";

import { siteConfig } from "@/constants/siteConfig";

const FooterContacts = () => {
  const t = useTranslations("footer");
  const { email, phone } = siteConfig;

  return (
    <div>
      <h3 className="mb-4 font-micra uppercase leading-[20px] tracking-[1px] xl:mb-[18px]">
        {t("section.contacts")}
      </h3>
      <nav>
        <ul className="flex flex-col gap-3 xl:gap-6">
          <li>
            <a
              href={`tel:${phone}`}
              target="_blank"
              rel="noopener noreferrer"
              className="link-transition"
            >
              {phone}
            </a>
          </li>
          <li>
            <a
              href={`mailto:${email}`}
              target="_blank"
              rel="noopener noreferrer"
              className="link-transition"
            >
              {email}
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default FooterContacts;
