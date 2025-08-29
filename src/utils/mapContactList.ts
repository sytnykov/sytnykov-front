import { ContactIconKey, contactIcons } from "@/data/contactItems";

export type ContactItemRaw = {
  title: string;
  descr: string | string[];
  icon: ContactIconKey;
};

export const mapContactList = (list: ContactItemRaw[]) => {
  return list.map(({ title, descr, icon }) => {
    const Icon = contactIcons[icon];

    return {
      title,
      descr: Array.isArray(descr) ? descr : [descr],
      Icon,
    };
  });
};
