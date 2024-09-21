"use client";
import React from "react";
import { EmblaOptionsType } from "embla-carousel";
// import { DotButton, useDotButton } from "./EmblaCarouselDotButton";
// import {
//   PrevButton,
//   NextButton,
//   usePrevNextButtons,
// } from "./EmblaCarouselArrowButtons";
import useEmblaCarousel from "embla-carousel-react";
import { DotButton, useDotButton } from "./EmblaCarouselDotButton";
import {
  NextButton,
  PrevButton,
  usePrevNextButtons,
} from "./EmblaCarouselArrowButtons";
import { Calendar } from "lucide-react";
import { Experience } from "@prisma/client";

type PropType = {
  slides: number[];
  options?: EmblaOptionsType;
  experiences: Experience[];
};

const ExperienceCarousel: React.FC<PropType> = (props) => {
  const { slides, options, experiences } = props;
  const [emblaRef, emblaApi] = useEmblaCarousel(options);

  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi);

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);

  return (
    <section className="embla">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container px-4">
          {experiences.map((experience, index) => (
            <div className="embla__slide" key={index}>
              <div className="relative mb-6 sm:mb-0">
                <h2 className="mb-4 font-semibold text-lime-500">
                  {experience.period}
                </h2>
                <div className="flex items-center">
                  <div className="z-10 flex items-center justify-center w-8 h-8 bg-lime-100 rounded-full ring-0 ring-white dark:bg-lime-900 sm:ring-8 dark:ring-gray-900 shrink-0">
                    <Calendar className="w-4 h-4 text-lime-800 dark:text-lime-300" />
                  </div>
                  <div className="hidden sm:flex w-full bg-gray-200 h-0.5 dark:bg-gray-700"></div>
                </div>
                <div className="mt-3 sm:pe-8">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {experience.title}
                  </h3>
                  <h2 className="uppercase tracking-widest texts py-3 text-muted-foreground">
                    {experience.company}
                  </h2>
                  <p className="text-base font-normal text-gray-500 dark:text-gray-200 line-clamp-2">
                    {experience.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="embla__controls">
        <div className="embla__buttons ">
          <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
          <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
        </div>

        <div className="embla__dots  ">
          {scrollSnaps.map((_, index) => (
            <DotButton
              key={index}
              onClick={() => onDotButtonClick(index)}
              className={"embla__dot".concat(
                index === selectedIndex ? " embla__dot--selected" : ""
              )}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceCarousel;
