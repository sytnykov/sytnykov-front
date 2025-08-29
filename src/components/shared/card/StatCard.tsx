import Image from "next/image";

interface IStatCardProps {
  title: string;
  number: string;
  decorPosition?: "bottom-right" | "top-right";
  className?: string;
}

const StatCard = ({ number, title, decorPosition }: IStatCardProps) => {
  return (
    <div className="relative flex h-full flex-col justify-center overflow-hidden pl-8">
      <p className="mb-3 font-micra text-[44px] xl:text-[58px]">{number}</p>
      <p className="text-[20px] font-light">{title}</p>

      {decorPosition === "top-right" && (
        <>
          <div className="absolute right-0 top-0 hidden h-[154px] w-[131px] xl:block">
            <Image
              src="/images/homepage/home-courses-decor-2-desk.webp"
              alt="Декоративне зображення"
              width={131}
              height={154}
            />
          </div>
          <div className="absolute right-0 top-0 h-[125px] w-[107px] xl:hidden">
            <Image
              src="/images/homepage/home-courses-decor-2-mob.webp"
              alt="Декоративне зображення"
              width={107}
              height={125}
            />
          </div>
        </>
      )}

      {decorPosition === "bottom-right" && (
        <>
          <div className="absolute bottom-0 right-0 hidden h-[134px] w-[153px] xl:block">
            <Image
              src="/images/homepage/home-courses-decor-1-desk.webp"
              alt="Декоративне зображення"
              width={153}
              height={134}
            />
          </div>
          <div className="absolute bottom-0 right-0 h-[131px] w-[128px] xl:hidden">
            <Image
              src="/images/homepage/home-courses-decor-1-mob.webp"
              alt="Декоративне зображення"
              width={128}
              height={131}
            />
          </div>
        </>
      )}
    </div>
  );
};
export default StatCard;
