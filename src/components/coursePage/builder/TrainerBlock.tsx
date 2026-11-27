import { getMessages, getTranslations } from "next-intl/server";
import Image from "next/image";

import {
  TrainerBlock as TrainerB,
  pick,
} from "@/lib/sanity/types/courseBlocks";

import LineIcon, { Rings } from "../../homepage/LineIcon";
import SectionHead from "../../homepage/SectionHead";
import { BlockCtx, paragraphs } from "./shared";

/**
 * 4. Trainer: filled once in the admin («Тренер») and shown in every course.
 * Hierarchy: heading → lead quote → story → numbers → achievements → logos.
 */
const TrainerBlock = async ({
  block,
  ctx,
}: {
  block: TrainerB;
  ctx: BlockCtx;
}) => {
  const t = await getTranslations("courseBuilder");
  const messages = await getMessages();
  const { locale } = ctx;
  const tr = ctx.data.trainer;

  const hero = messages.homepage.hero as {
    descr: string;
    proof: { number: string; label: string }[];
  };
  const name = pick(tr?.name, locale) || t("trainerFallback.name");
  const role = pick(tr?.role, locale) || t("trainerFallback.role");
  const story =
    pick(block.storyOverride, locale) || pick(tr?.story, locale) || hero.descr;
  const [lead, ...rest] = paragraphs(story);
  const facts = tr?.facts?.length
    ? tr.facts.map(f => ({
        number: f.value ?? "",
        label: pick(f.label, locale),
      }))
    : hero.proof;
  const achievements = (tr?.achievements ?? [])
    .map(a => pick(a, locale))
    .filter(Boolean);
  const logos = (tr?.logos ?? []).map(l => l?.url).filter(Boolean) as string[];

  return (
    <section className="relative isolate overflow-hidden bg-dark py-14 text-light md:py-20 xl:py-[100px]">
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[radial-gradient(45%_60%_at_15%_30%,rgba(81,136,255,0.2)_0%,rgba(9,17,41,0)_70%),radial-gradient(40%_50%_at_100%_100%,rgba(0,28,88,0.9)_0%,rgba(9,17,41,0)_100%)]"
      />
      <Rings className="pointer-events-none absolute -right-[220px] -top-[200px] -z-10 w-[640px] opacity-60 max-lg:hidden" />

      <div className="container grid max-w-[1280px] grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-14">
        {/* portrait with the name plate */}
        <div className="relative isolate h-[440px] overflow-hidden rounded-[28px] bg-[linear-gradient(160deg,#5b8fff_0%,#2c52bd_42%,#13245a_100%)] sm:h-[500px] lg:col-span-5 lg:h-auto lg:min-h-[480px]">
          <span
            aria-hidden
            className="absolute inset-0 -z-10 bg-[radial-gradient(rgba(255,255,255,0.12)_1px,transparent_1.2px)] [background-size:16px_16px] [mask-image:linear-gradient(200deg,#000_0%,transparent_55%)]"
          />
          <span
            aria-hidden
            className="absolute -right-[10%] top-[8%] -z-10 size-[80%] rounded-full bg-[#9db8ff]/40 blur-[70px]"
          />
          <div className="absolute inset-x-0 bottom-0 h-[92%]">
            <Image
              src={
                tr?.photo?.url || "/images/homepage/home-hero-person-hq.webp"
              }
              alt={name}
              fill
              sizes="(min-width: 1024px) 480px, 90vw"
              className="object-contain object-bottom"
            />
          </div>
          <div className="absolute inset-x-4 bottom-4 rounded-[20px] bg-dark/75 p-4 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.14)] backdrop-blur-md md:inset-x-5 md:bottom-5 md:p-5">
            <p className="text-[18px] font-semibold leading-[1.2] md:text-[20px]">
              {name}
            </p>
            <p className="mt-1 text-[13px] leading-[1.45] text-[#c9d8ff] md:text-[14px]">
              {role}
            </p>
          </div>
        </div>

        <div className="min-w-0 lg:col-span-7 lg:self-center">
          <SectionHead
            tone="dark"
            title={
              pick(block.title, locale) || t("defaults.courseTrainerBlock")
            }
            className="md:mb-8"
          />

          {lead && (
            <blockquote className="relative pl-12 md:pl-14">
              <LineIcon
                name="quote"
                className="absolute left-0 top-0 size-9 text-accent md:size-10"
              />
              <p className="text-pretty text-[18px] font-medium leading-[1.5] md:text-[21px]">
                {lead}
              </p>
            </blockquote>
          )}
          {rest.length > 0 && (
            <div className="mt-5 flex flex-col gap-3 pl-12 text-[15px] leading-[1.65] text-white/65 md:pl-14 md:text-[16px]">
              {rest.map(p => (
                <p key={p}>{p}</p>
              ))}
            </div>
          )}

          {facts.length > 0 && (
            <ul className="mt-8 grid grid-cols-1 divide-y divide-white/10 rounded-[24px] bg-white/[0.05] px-5 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.1)] md:mt-10 md:grid-cols-3 md:divide-x md:divide-y-0 md:px-0 md:py-6">
              {facts.map(f => (
                <li
                  key={f.label}
                  className="flex items-center gap-4 py-4 md:block md:px-6 md:py-0"
                >
                  <span className="block min-w-[120px] whitespace-nowrap font-micra text-[26px] leading-none text-accent md:min-w-0 md:text-[24px] xl:text-[30px]">
                    {f.number}
                  </span>
                  <span className="block text-[13px] leading-[1.4] text-white/65 md:mt-3 md:text-[14px]">
                    {f.label}
                  </span>
                </li>
              ))}
            </ul>
          )}

          {achievements.length > 0 && (
            <ul className="mt-8 grid grid-cols-1 gap-x-6 gap-y-3.5 md:grid-cols-2">
              {achievements.map(a => (
                <li
                  key={a}
                  className="flex items-start gap-3 text-[14px] leading-[1.5] text-white/85 md:text-[15px]"
                >
                  <span className="mt-[1px] grid size-6 shrink-0 place-items-center rounded-full bg-accent/15 text-accent shadow-[inset_0_0_0_1px_rgba(81,136,255,0.35)]">
                    <LineIcon name="check" className="size-3.5" />
                  </span>
                  {a}
                </li>
              ))}
            </ul>
          )}

          {logos.length > 0 && (
            <ul className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4 border-t border-white/10 pt-6">
              {logos.map(src => (
                <li
                  key={src}
                  className="relative h-8 w-[110px] opacity-70 brightness-0 invert"
                >
                  <Image
                    src={src}
                    alt=""
                    fill
                    sizes="110px"
                    className="object-contain object-left"
                  />
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
};

export default TrainerBlock;
