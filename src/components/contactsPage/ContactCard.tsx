import AnimatedListItem from "../shared/animated/AnimatedListItem";

type Props = {
  title: string;
  descr: string[];
  Icon: React.FC<React.SVGProps<SVGSVGElement>>;
};

export const ContactCard = ({ title, descr, Icon }: Props) => (
  <AnimatedListItem direction="down">
    <div className="flex -translate-y-20 flex-col items-center text-center xl:w-[231px]">
      <div className="mb-6 flex size-20 items-center justify-center rounded-full bg-light">
        <Icon className="size-10" />
      </div>
      <p className="mb-[20px] text-[20px] font-semibold leading-[1.6] text-dark">
        {title}
      </p>
      {descr.map(line => (
        <p
          key={line}
          className="mb-3 text-[18px] font-medium leading-none text-[#545454] last:mb-0"
        >
          {line}
        </p>
      ))}
    </div>
  </AnimatedListItem>
);
