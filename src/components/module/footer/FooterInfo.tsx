import { getTranslations } from "next-intl/server";

import MenuLink from "../header/MenuLink";

const FooterInfo = async () => {
  const t = await getTranslations("footer");
  const tInfo = await getTranslations("footer.information");

  const menuList = [
    { title: tInfo("legalDetails"), path: "#" },
    { title: tInfo("ie"), path: "#" },
    { title: tInfo("offer"), path: "#" },
    { title: tInfo("privacy"), path: "#" },
  ];

  return (
    <div>
      <h3 className="mb-4 font-micra uppercase leading-[20px] tracking-[1px] xl:mb-[18px]">
        {t("section.info")}
      </h3>

      <ul className="flex flex-col gap-3 xl:gap-6">
        {menuList.map((menuItem, idx) => (
          <MenuLink key={idx} menuItem={menuItem} variant="footer" />
        ))}
      </ul>
    </div>
  );
};

export default FooterInfo;
