import { cn } from "@/lib/utils";
import Marquee from "@/components/magicui/marquee";
import SectionSubHeading from "./SectionSubHeading";
import SectionHeading from "./SectionHeading";
import { Dumbbell } from "lucide-react";
import Paragraph from "./Paragraph";
import { ReviewCardProps } from "@/actions/reviews";

const reviews = [
  {
    name: "Jack",
    username: "@jack",
    body: "I've never seen anything like this before. It's amazing. I love it.",
    img: "https://avatar.vercel.sh/jack",
  },
  {
    name: "Jill",
    username: "@jill",
    body: "I don't know what to say. I'm speechless. This is amazing.",
    img: "https://avatar.vercel.sh/jill",
  },
  {
    name: "John",
    username: "@john",
    body: "I'm at a loss for words. This is amazing. I love it.",
    img: "https://avatar.vercel.sh/john",
  },
  {
    name: "Jane",
    username: "@jane",
    body: "I'm at a loss for words. This is amazing. I love it.",
    img: "https://avatar.vercel.sh/jane",
  },
  {
    name: "Jenny",
    username: "@jenny",
    body: "I'm at a loss for words. This is amazing. I love it.",
    img: "https://avatar.vercel.sh/jenny",
  },
  {
    name: "James",
    username: "@james",
    body: "I'm at a loss for words. This is amazing. I love it.",
    img: "https://avatar.vercel.sh/james",
  },
];

const firstRow = reviews.slice(0, reviews.length / 2);
const secondRow = reviews.slice(reviews.length / 2);

const ReviewCard = ({
  img,
  name,
  username,
  body,
}: {
  img: string;
  name: string;
  username: string;
  body: string;
}) => {
  return (
    <figure
      className={cn(
        "relative w-80 cursor-pointer overflow-hidden rounded-xl border p-4",
        // light styles
        "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
        // dark styles
        "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]"
      )}
    >
      <div className="flex flex-row items-center gap-2">
        <img className="rounded-full" width="32" height="32" alt="" src={img} />
        <div className="flex flex-col">
          <figcaption className="text-sm font-medium dark:text-white">
            {name}
          </figcaption>
          <p className="text-xs font-medium dark:text-white/40">{username}</p>
        </div>
      </div>
      <blockquote className="mt-2 text-sm">{body}</blockquote>
    </figure>
  );
};

export function Testimonials({ reviews }: { reviews: ReviewCardProps[] }) {
  return (
    <div className="py-8 relative flex h-auto w-full flex-col items-center justify-center overflow-hidden rounded-lg border bg-background md:shadow-xl px-8">
      <SectionSubHeading title="Testimonials" icon={Dumbbell} />
      <div className="py-2">
        <SectionHeading title="Explore Portfolio By Technology" />
      </div>
      <Paragraph
        text="I have been a full stack web developer since 2022 and I love building
      Software and Sharing, but it wasn't always like that. I went through a
      four-year Mechanical Engineering Course and it had nothing to do with
      Software development."
      />
      {reviews && reviews.length > 0 && (
        <Marquee pauseOnHover className="[--duration:20s]">
          {reviews.map((review) => (
            <ReviewCard
              key={review.id}
              img={review.reviewerImage}
              name={review.reviewerName}
              username={review.reviewerTitle}
              body={review.comment}
            />
          ))}
        </Marquee>
      )}
      {/* {reviews && reviews.length > 0 && (
        <Marquee reverse pauseOnHover className="[--duration:20s]">
          {reviews.map((review) => (
            <ReviewCard
              key={review.id}
              img={review.reviewerImage}
              name={review.reviewerName}
              username={review.reviewerTitle}
              body={review.comment}
            />
          ))}
        </Marquee>
      )} */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-white dark:from-background"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-white dark:from-background"></div>
    </div>
  );
}
