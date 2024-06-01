import { db } from "@/db";
import { notFound } from "next/navigation";
import React from "react";
import DesignConfiguration from "./designConfigurator";

interface PageProps {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}

const Page = async ({ searchParams }: PageProps) => {
  const { id } = searchParams;

  if (!id || typeof id !== "string") return notFound();

  const configuration = await db.configuration.findUnique({
    where: { id },
  });

  if (!configuration?.id) return notFound();

  const { width, height, imageUrl } = configuration;

  return (
    <DesignConfiguration
      configId={configuration.id}
      imageUrl={imageUrl}
      dimension={{ width, height }}
    />
  );
};

export default Page;
