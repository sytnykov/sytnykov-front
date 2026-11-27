import { cn } from "@/utils/cn";

/**
 * «Відгуки в Google»: the practice's Google Business Profile. Rendered only
 * when the link is set in the admin (Налаштування сайту → Відео та відгуки).
 */
const GoogleReviewsLink = ({
  href,
  label,
  className,
}: {
  href?: string;
  label: string;
  className?: string;
}) =>
  href ? (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn("inline-flex items-center gap-2", className)}
    >
      <svg aria-hidden viewBox="0 0 20 20" className="size-[18px] shrink-0">
        <path
          d="m10 2.5 2.2 4.6 5 .7-3.6 3.5.9 5-4.5-2.4-4.5 2.4.9-5L2.8 7.8l5-.7L10 2.5Z"
          fill="#fbbc04"
        />
      </svg>
      {label}
    </a>
  ) : null;

export default GoogleReviewsLink;
