import {
  FacebookIcon,
  InstagramIcon,
  LinkedInIcon,
  TelegramIcon,
  TikTokIcon,
} from "@/components/shared/icons";

export const siteConfig = {
  phone: "+380-66-255-54-86",
  email: "sytnykovof@gmail.com",

  socialLinks: [
    {
      href: "https://www.facebook.com/SytnykovOF/",
      icon: <FacebookIcon />,
      label: "Facebook",
    },
    {
      href: "#",
      icon: <InstagramIcon />,
      label: "Instagram",
    },
    {
      href: "https://t.me/+LYDGqiNMPTI3Yjhi",
      icon: <TelegramIcon />,
      label: "Telegram",
    },
    {
      href: "#",
      icon: <LinkedInIcon />,
      label: "LinkedIn",
    },
    {
      href: "#",
      icon: <TikTokIcon />,
      label: "TikTok",
    },
  ],

  cyanidium: {
    url: "https://www.cyanidium.dev/",
    name: "cyanidium.dev",
  },
};
