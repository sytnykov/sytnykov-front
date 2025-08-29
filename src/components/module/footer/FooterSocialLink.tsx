import { type ReactNode } from "react";

interface FooterSocialLinkProps {
  href: string;
  icon: ReactNode;
  label: string;
}

const FooterSocialLink = ({ href, icon, label }: FooterSocialLinkProps) => {
  return (
    <li className="h-6 w-6">
      <a
        href={href}
        aria-label={label}
        target="_blank"
        rel="noopener noreferrer"
        className="link-transition"
      >
        {icon}
      </a>
    </li>
  );
};

export default FooterSocialLink;
