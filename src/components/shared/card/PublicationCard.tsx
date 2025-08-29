import Image from "next/image";

import InfoBox from "../InfoBox";
import IconButtonOrLink from "../button/IconButtonOrLink";
import { ClockIcon } from "../icons";

interface IPublicationCardProps {
  description: string;
  imgSrc?: string;
  info: string;
  title: string;
  href?: string;
  ariaLabel?: string;
}

const PublicationCard = ({
  description,
  imgSrc,
  info,
  title,
  href,
  ariaLabel,
}: IPublicationCardProps) => {
  const defaultCardImage =
    "/images/publications/publication-card-default-image.webp";

  return (
    <article className="h-full">
      <InfoBox variant="withImage" classname="relative h-full flex flex-col">
        <div className="relative -mx-6 -mt-6 h-[200px] shrink-0">
          <Image
            src={imgSrc || defaultCardImage}
            alt="картинка до публікації"
            fill
            sizes="400px"
            className="rounded-lg object-cover"
          />
        </div>

        <div className="absolute left-6 top-[177px] z-10 mr-6 min-w-[210px] max-w-[298px] rounded-[8px] p-[1px] before:absolute before:inset-0 before:z-0 before:rounded-[8px] before:bg-gradient-to-br before:from-[#EAEBFF] before:to-[#091129] before:content-['']">
          <div className="relative z-[1] flex gap-3 rounded-[8px] bg-white px-[22px] py-3 text-dark">
            <ClockIcon className="h-5 w-5 shrink-0" />
            <span className="font-light leading-[1.3] md:text-nowrap">
              {info}
            </span>
          </div>
        </div>

        <div className="flex grow flex-col justify-between gap-4 pt-[50px] xl:gap-6">
          <h3 className="line-clamp-4 font-micra text-[20px] uppercase tracking-normal xl:text-[24px]">
            {title}
          </h3>

          <div className="mt-auto flex gap-[18px]">
            <p className="line-clamp-4 tracking-normal">{description}</p>
            {href && <IconButtonOrLink href={href} ariaLabel={ariaLabel} />}
          </div>
        </div>
      </InfoBox>
    </article>
  );
};

export default PublicationCard;
