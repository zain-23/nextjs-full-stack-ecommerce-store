import React, { Suspense } from "react";
import ThankYou from "./thankYou";

const Page = () => {
  return (
    <Suspense>
      <ThankYou />
    </Suspense>
  );
};

export default Page;
