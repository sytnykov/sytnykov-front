"use client";

import { useTranslations } from "next-intl";

import { ROUTES } from "@/constants/routes";

import MenuLink from "./MenuLink";

interface INavMenuProps {
  closeMenu: () => void;
}

const NavMenu = ({ closeMenu }: INavMenuProps) => {
  const t = useTranslations("header.menu");

  const menuList = [
    { title: t("home"), path: `${ROUTES.HOME}` },
    { title: t("services"), path: `${ROUTES.SERVICES}` },
    { title: t("gallery"), path: `${ROUTES.GALLERY}` },
    { title: t("experience"), path: `${ROUTES.EXPERIENCE}` },
    { title: t("publications"), path: `${ROUTES.PUBLICATIONS}` },
    { title: t("contacts"), path: `${ROUTES.CONTACTS}` },
    { title: t("education"), path: `${ROUTES.EDUCATION}` },
    { title: t("announcements"), path: `${ROUTES.ANNOUNCEMENTS}` },
  ];

  return (
    <nav className="relative flex w-full max-w-[318px] items-center">
      <ul className="flex flex-col gap-7">
        {menuList.map((menuItem, idx) => (
          <MenuLink key={idx} menuItem={menuItem} onClick={closeMenu} />
        ))}
      </ul>
    </nav>
  );
};

export default NavMenu;
