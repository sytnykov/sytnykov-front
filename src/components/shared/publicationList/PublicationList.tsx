import {
  AnnouncementItem,
  PublicationItem,
} from "@/lib/sanity/types/queryTypes";
import { cn } from "@/utils/cn";
import { mapItemToCardProps } from "@/utils/mapItemToCardProps";
import { Locale } from "@/types/locale";
import { listVariants } from "@/helpers/animation";

import AnimatedList from "../animated/AnimatedList";
import AnimatedListItem from "../animated/AnimatedListItem";
import PublicationCard from "../card/PublicationCard";

interface IPublicationListProps {
  data: PublicationItem[] | AnnouncementItem[];
  lang: Locale;
  className?: string;
}

const PublicationList = ({ data, className, lang }: IPublicationListProps) => {
  const listStyles = cn(
    "grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] md:grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-4 md:mx-auto md:max-w-[804px] xl:max-w-full",
    className
  );

  // Because you need invoke animation after pagination
  const animationKey = data.map(item => item.title[lang]).join("-");

  return (
    <AnimatedList
      key={animationKey}
      initial="hidden"
      animate="visible"
      viewport={{ once: false, amount: 0.1 }}
      animation={listVariants({ staggerChildren: 0.5 })}
      className={listStyles}
    >
      {data.map(item => {
        const cardProps = mapItemToCardProps(item, lang);

        return (
          <AnimatedListItem
            key={item.title[lang]}
            className="mx-auto w-full max-w-[400px]"
          >
            <PublicationCard {...cardProps} />
          </AnimatedListItem>
        );
      })}
    </AnimatedList>
  );
};

export default PublicationList;
