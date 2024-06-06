"use client";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { cn } from "@/lib/utils";
import { $Enums } from "@prisma/client";
import { useEffect, useRef, useState } from "react";

const PhonePreview = ({
  croppedImageUrl,
  color,
}: {
  croppedImageUrl: string;
  color: $Enums.CaseColor;
}) => {
  const [renderedDimension, setRenderedDimension] = useState({
    width: 0,
    height: 0,
  });
  const ref = useRef<HTMLDivElement>(null);

  const handleResize = () => {
    if (!ref.current) return;

    const { width, height } = ref.current.getBoundingClientRect();
    setRenderedDimension({
      width,
      height,
    });
  };

  useEffect(() => {
    if (!ref.current) return;

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  });

  let caseBackGroundColor = "bg-zinc-950";
  if (color === "blue") caseBackGroundColor = "bg-blue-950";
  if (color === "rose") caseBackGroundColor = "bg-rose-950";

  return (
    <AspectRatio
      ref={ref}
      ratio={3000 / 2001}
      className="relative pointer-events-none"
    >
      <div
        className="absolute z-20 scale-[1.0352]"
        style={{
          left:
            renderedDimension.width / 2 -
            renderedDimension.width / (1216 / 121),
          top: renderedDimension.height / 6.22,
        }}
      >
        <img
          src={croppedImageUrl}
          width={renderedDimension.width / (3000 / 637)}
          alt="preview phone case"
          className={cn(
            "relative z-20 rounded-t-[15px] rounded-b-[10px] md:rounded-t-[25px] md:rounded-b-[20px] preview-skew",
            caseBackGroundColor
          )}
        />
      </div>
      <div className="z-40 relative w-full h-full">
        <img
          src="/clearphone.png"
          alt="phone"
          className="pointer-events-none h-full w-full rounded-md"
        />
      </div>
    </AspectRatio>
  );
};

export default PhonePreview;
