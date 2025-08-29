import { CourseItem } from "@/lib/sanity/types/courseTypes";
import { Locale } from "@/types/locale";
import { listVariants } from "@/helpers/animation";

import AnimatedList from "../shared/animated/AnimatedList";
import AnimatedListItem from "../shared/animated/AnimatedListItem";
import EducationCard from "./EducationCard";

interface IEducationListProps {
  courses: CourseItem[];
  lang: Locale;
}

const EducationList = ({ courses, lang }: IEducationListProps) => {
  const animationKey = courses.map(item => item.title[lang]).join("-");

  return (
    <AnimatedList
      key={animationKey}
      initial="hidden"
      animate="visible"
      viewport={{ once: false, amount: 0.1 }}
      animation={listVariants({ staggerChildren: 0.3 })}
      className="grid grid-cols-1 gap-5 md:mx-auto md:max-w-[820px] md:grid-cols-2 xl:max-w-full xl:grid-cols-3"
    >
      {courses.map(course => (
        <AnimatedListItem
          direction="down"
          key={course.title[lang]}
          className="mx-auto min-h-[451px] w-full max-w-[400px] xl:min-h-[508px]"
        >
          <EducationCard course={course} lang={lang} />
        </AnimatedListItem>
      ))}
    </AnimatedList>
  );
};

export default EducationList;
