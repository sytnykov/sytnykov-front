import { cn } from "@/utils/cn";

import { Link } from "@/i18n/navigation";

interface IMenuLinkProps {
  menuItem: {
    title: string;
    path: string;
  };
  onClick?: () => void;
  variant?: "header" | "footer";
  className?: string;
}

const MenuLink = ({
  menuItem,
  onClick,
  className = "",
  variant = "header",
}: IMenuLinkProps) => {
  const { title, path } = menuItem;

  const baseStyles = cn(
    "inline-block link-transition",
    variant === "header" && "xl:text-xl",
    variant === "footer" && "text-sm font-light leading-none"
  );

  return (
    <li className={className}>
      <Link href={path} onClick={onClick} className={baseStyles}>
        {title}
      </Link>
    </li>
  );
};
export default MenuLink;
