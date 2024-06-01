"use client";
import Phone from "@/components/phone";
import { COLORS, MODELS } from "@/components/validator/options.validator";
import { cn } from "@/lib/utils";
import { Configuration } from "@prisma/client";
import { Check } from "lucide-react";
import { useEffect, useState } from "react";
import Confetti from "react-dom-confetti";

const DesignPreview = ({ configuration }: { configuration: Configuration }) => {
  const [showConfetti, setShowConfetti] = useState(false);
  useEffect(() => setShowConfetti(true));

  const { color } = configuration;
  const { model: mobileModel } = configuration;
  const { croppedImageUrl } = configuration;

  const tw = COLORS.find(
    (supportedColor) => supportedColor.value === color
  )?.tw;

  const model = MODELS.options.find(
    (model) => model.value === mobileModel
  )?.label;
  return (
    <>
      <div
        className="pointer-events-none select-none absolute inset-0 overflow-hidden flex justify-center"
        aria-hidden="true"
      >
        <Confetti
          active={showConfetti}
          config={{
            elementCount: 1000,
            spread: 1400,
            duration: 6000,
            angle: 90,
            colors: ["#2dac5c", "#f542bc", "#2ab5db", "#d5db2a"],
            width: "10px",
            height: "10px",
          }}
        />
      </div>
      <div className="mt-12 grid grid-cols-1 text-sm sm:grid-cols-12 sm:grid-rows-1 sm:gap-x-6 md:gap-x-8 lg:gap-x-12">
        <div className="sm:col-span-4 md:col-span-3 md:row-span-2 md:row-end-2">
          <Phone className={cn(`bg-${tw}`)} imgSrc={croppedImageUrl!} />
        </div>
        <div className="mt-6 sm:col-span-9 sm:mt-0 md:row-end-1">
          <h3 className="text-3xl font-bold tracking-tight text-gray-900">
            Your {model} Case
          </h3>
          <div className="mt-3 flex items-center gap-1.5 text-base">
            <Check className="h-4 w-4 text-green-500" />
            In Stock and ready to ship
          </div>
        </div>
      </div>
    </>
  );
};

export default DesignPreview;
