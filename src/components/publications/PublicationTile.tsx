import NextLink from "next/link";

import LineIcon, { Rings } from "../homepage/LineIcon";
import { ArrowUpRightIcon } from "../homepage/SectionHead";

/** Article card with a designed header (articles have no photos). */
const PublicationTile = ({
  href,
  title,
  description,
  info,
  label,
  headingLevel = 3,
}: {
  href: string;
  title: string;
  description: string;
  info: string;
  label: string;
  headingLevel?: 2 | 3;
}) => {
  const Heading = headingLevel === 2 ? "h2" : "h3";

  return (
    <NextLink
      href={href}
      className="group flex h-full flex-col overflow-hidden rounded-[20px] border border-dark/[0.07] bg-white transition-[border-color,box-shadow] duration-300 hover:border-accent/60 hover:shadow-[0_24px_50px_-28px_rgba(9,17,41,0.45)]"
    >
      <div className="relative isolate h-[150px] overflow-hidden bg-[linear-gradient(150deg,#13275f_0%,#091129_80%)] p-5 text-light md:p-6">
        <span
          aria-hidden
          className="absolute inset-0 -z-10 bg-[radial-gradient(70%_90%_at_100%_0%,rgba(81,136,255,0.55),rgba(81,136,255,0)_65%)]"
        />
        <span
          aria-hidden
          className="absolute inset-0 -z-10 bg-[radial-gradient(rgba(255,255,255,0.09)_1px,transparent_1.2px)] [background-size:16px_16px] [mask-image:linear-gradient(90deg,transparent,#000)]"
        />
        <Rings className="absolute -right-[90px] -top-[90px] -z-10 w-[260px] transition-transform duration-700 group-hover:rotate-12" />
        <LineIcon
          name="document"
          className="absolute bottom-4 right-5 size-[64px] text-accent/80 transition-transform duration-500 group-hover:-translate-y-1"
        />
        <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 text-[12px] font-medium shadow-[inset_0_0_0_1px_rgba(255,255,255,0.14)]">
          <LineIcon name="clock" className="size-3.5" />
          {info}
        </span>
        <p className="absolute bottom-5 left-5 text-[12px] font-semibold uppercase tracking-[0.14em] text-white/60 md:left-6">
          {label}
        </p>
      </div>
      <div className="flex flex-1 flex-col p-5 md:p-6">
        <Heading className="text-balance text-[18px] font-semibold leading-[1.3] tracking-[-0.01em] text-dark md:text-[19px]">
          {title}
        </Heading>
        <p className="mt-2.5 line-clamp-3 text-[14px] leading-[1.55] text-dark/65">
          {description}
        </p>
        <span className="mt-auto flex justify-end pt-5">
          <span className="grid size-9 place-items-center rounded-full bg-dark/5 text-dark transition-colors duration-300 group-hover:bg-accent-strong group-hover:text-light">
            <ArrowUpRightIcon />
          </span>
        </span>
      </div>
    </NextLink>
  );
};

export default PublicationTile;
