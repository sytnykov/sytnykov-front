import { cn } from "@/utils/cn";
import { listVariants } from "@/helpers/animation";

import AnimatedList from "../shared/animated/AnimatedList";
import AnimatedListItem, {
  AnimatedListDirection,
} from "../shared/animated/AnimatedListItem";

interface IServiceListProps {
  data: string[];
  className?: string;
  direction?: AnimatedListDirection;
}

const ServiceList = ({ data, className, direction }: IServiceListProps) => {
  return (
    <AnimatedList
      viewport={{ once: true, amount: 0.4 }}
      animation={listVariants({ staggerChildren: 0.35 })}
      className={cn("flex flex-col gap-4 md:gap-[18px]", className)}
    >
      {data.map((item, index) => (
        <AnimatedListItem
          direction={direction}
          key={index}
          className="relative pl-6 before:absolute before:left-0 before:top-1/2 before:h-3 before:w-3 before:-translate-y-1/2 before:rounded-full before:bg-[linear-gradient(168.67deg,_#AFC8FF_8.35%,_#FFFFFF_129%)] xl:pl-8 xl:before:h-5 xl:before:w-5"
        >
          <p className="leading-[1.4] max-xl:text-[14px]">{item}</p>
        </AnimatedListItem>
      ))}
    </AnimatedList>
  );
};
export default ServiceList;
