import { getTranslations } from "next-intl/server";

import MenuLink from "../header/MenuLink";

const FooterNav = async () => {
  const t = await getTranslations("footer");

  const menuList = [
    { title: t("navigation.home"), path: "/" },
    { title: t("navigation.experience"), path: "/experience" },
    { title: t("navigation.gallery"), path: "/gallery" },
    { title: t("navigation.services"), path: "/services" },
    { title: t("navigation.publications"), path: "/publications" },
    { title: t("navigation.contacts"), path: "/contacts" },
  ];

  return (
    <div>
      <h3 className="mb-4 font-micra uppercase leading-[20px] tracking-[1px] xl:mb-[18px]">
        {t("section.nav")}
      </h3>
      <nav>
        <ul className="flex flex-col gap-3 xl:gap-6">
          {menuList.map((menuItem, idx) => (
            <MenuLink key={idx} menuItem={menuItem} variant="footer" />
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default FooterNav;
