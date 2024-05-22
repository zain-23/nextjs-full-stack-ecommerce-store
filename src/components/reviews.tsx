"use client";
import Image from "next/image";
import MaxWidthWrapper from "./maxWidthWrapper";
import React, { HTMLAttributes, useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { cn } from "@/lib/utils";
import Phone from "./phone";

const PHONES = [
  "/testimonials/1.jpg",
  "/testimonials/2.jpg",
  "/testimonials/3.jpg",
  "/testimonials/4.jpg",
  "/testimonials/5.jpg",
  "/testimonials/6.jpg",
];

function splitArray<T>(array: Array<T>, numParts: number) {
  const result: Array<Array<T>> = [];
  for (let i = 0; i < array.length; i++) {
    const index = i % numParts;
    if (!result[index]) {
      result[index] = [];
    }
    result[index].push(array[i]);
  }
  return result;
}

function ReviewColomn({
  reviews,
  className,
  reviewClassName,
  msPerPixel = 0,
}: {
  reviews: string[];
  className?: string;
  reviewClassName?: (reviewIndex: number) => string;
  msPerPixel?: number;
}) {
  const colomnRef = useRef<HTMLDivElement | null>(null);
  const [coloumnHeight, setColoumnHeight] = useState<number>(0);

  const duration = `${coloumnHeight * msPerPixel}ms`;

  useEffect(() => {
    if (!colomnRef.current) return;

    const resizeObserver = new window.ResizeObserver(() => {
      setColoumnHeight(colomnRef.current?.offsetHeight ?? 0);
    });

    resizeObserver.observe(colomnRef.current);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);
  return (
    <div
      ref={colomnRef}
      className={cn("animate-marquee space-y-8 py-4", className)}
      style={
        {
          "--marquee-duration": duration,
        } as React.CSSProperties
      }
    >
      {reviews.concat(reviews).map((imgSrc, reviewIndex) => (
        <Review
          key={reviewIndex}
          className={reviewClassName?.(reviewIndex % reviews.length)}
          imgSrc={imgSrc}
        />
      ))}
    </div>
  );
}

interface ReviewProps extends HTMLAttributes<HTMLDivElement> {
  imgSrc: string;
}

function Review({ imgSrc, className, ...props }: ReviewProps) {
  const POSSIBLE_ANIMATION_DELAY = [
    "0s",
    "0.1s",
    "0.2s",
    "0.3s",
    "0.4s",
    "0.5s",
  ];
  const animationDelay =
    POSSIBLE_ANIMATION_DELAY[
      Math.floor(Math.random() * POSSIBLE_ANIMATION_DELAY.length)
    ];
  return (
    <div
      className={cn(
        "animate-fade-in rounded-[2.25rem] bg-white p-6 shadow-xl shadow-slate-900/5",
        className
      )}
      style={{
        animationDelay,
      }}
      {...props}
    >
      <Phone imgSrc={imgSrc} />
    </div>
  );
}

const ReviewGrid = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.4 });
  const colomns = splitArray(PHONES, 3);
  const colomn1 = colomns[0];
  const colomn2 = colomns[1];
  const colomn3 = splitArray(colomns[2], 2);
  return (
    <div
      className="relative grid -mx-4 mt-16 h-[49rem] max-h-[150vh] grid-cols-1 items-start gap-8 overflow-hidden px-4 sm:mt-20 md:grid-cols-2 lg:grid-cols-3"
      ref={containerRef}
    >
      {isInView ? (
        <>
          <ReviewColomn
            reviews={[...colomn1, ...colomn3.flat(), ...colomn2]}
            reviewClassName={(reviewIndex) =>
              cn({
                "md:hidden": reviewIndex >= colomn1.length + colomn3[0].length,
                "lg:hidden": reviewIndex >= colomn1.length,
              })
            }
            msPerPixel={10}
          />
          <ReviewColomn
            reviews={[...colomn2, ...colomn3[1]]}
            className="hidden md:block"
            reviewClassName={(reviewIndex) =>
              reviewIndex >= colomn2.length ? "lg:hidden" : ""
            }
            msPerPixel={8}
          />
          <ReviewColomn
            reviews={colomn3.flat()}
            className="hidden md:block"
            msPerPixel={6}
          />
        </>
      ) : null}
      <div className="pointer-events-none bg-gradient-to-b from-slate-100 absolute inset-x-0 top-0 h-32" />
      <div className="pointer-events-none bg-gradient-to-t from-slate-100 absolute inset-x-0 bottom-0 h-32" />
    </div>
  );
};

export const Reviews = () => {
  return (
    <MaxWidthWrapper className="relative max-w-5xl">
      <Image
        src={"/what-people-are-buying.png"}
        alt="what people are buying"
        width={100}
        height={100}
        className="absolute select-none hidden xl:block -left-32 top-1/3"
      />
      <ReviewGrid />
    </MaxWidthWrapper>
  );
};
