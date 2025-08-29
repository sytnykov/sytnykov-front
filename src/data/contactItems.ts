import {
  CalendarIcon,
  EmailIcon,
  MapIcon,
  PhoneIcon,
} from "@/components/shared/icons";

export const contactIcons = {
  email: EmailIcon,
  phone: PhoneIcon,
  map: MapIcon,
  calendar: CalendarIcon,
} as const;

export type ContactIconKey = keyof typeof contactIcons;
