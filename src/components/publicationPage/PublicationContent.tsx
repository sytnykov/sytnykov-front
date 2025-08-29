import { FullContentBlock, SanityImage } from "@/lib/sanity/types/shared";
import { fadeInAnimation } from "@/helpers/animation";

import AnimatedWrapper from "../shared/animated/AnimatedWrapper";
import GallerySlider from "../shared/gallerySlider/GallerySlider";
import RenderContent from "../shared/renderContent/RenderContent";

interface IPublicationContentProps {
  title: string;
  content: FullContentBlock[];
  gallery?: SanityImage[];
}

const PublicationContent = ({
  content,
  gallery,
  title,
}: IPublicationContentProps) => {
  return (
    <article>
      <div className="container max-w-[1280px]">
        <section className="flex flex-col gap-6 py-[120px] md:py-[100px]">
          <RenderContent content={content} />

          {gallery && gallery?.length > 0 && (
            <AnimatedWrapper animation={fadeInAnimation({ y: 50, delay: 0.4 })}>
              <GallerySlider
                wrapperClassName="mb-[46px]"
                gallery={gallery}
                imgAlt={title}
                sliderId="1"
                isDecor={false}
              />
            </AnimatedWrapper>
          )}
        </section>
      </div>
    </article>
  );
};

export default PublicationContent;
