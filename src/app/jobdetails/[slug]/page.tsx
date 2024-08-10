import React, { cache } from "react";
import type { Metadata } from "next";
import JobDetailsCard from "@/components/jobDetailsCard";
import { notFound } from "next/navigation";
import { error } from "console";
import { Button } from "@/components/ui/button";
import prisma from "@/lib/prima";

type jobdetailsProps = {
  params: {
    slug: string;
  };
};

const getJob = cache(async (slug: string) => {
  const res = await prisma?.job?.findUnique({
    where: {
      slug,
    },
  });
  if (!res) return notFound();
  return res;
});

// Return a list of `params` to populate the [slug] dynamic segment
export async function generateStaticParams() {
  const jobs = await prisma.job.findMany({
    where: { approved: true },
    select: { slug: true },
  });
  const slugs = jobs.map(({ slug }) => slug);
  return slugs;
}

export async function generateMetadata({
  params: { slug },
}: jobdetailsProps): Promise<Metadata> {
  const job = await getJob(slug);
  return {
    title: job?.title,
  };
}

const page = async ({ params: { slug } }: jobdetailsProps) => {
  // console.log(await getJob(slug));
  const job = await getJob(slug);
  const { applicationEmail, applicationUrl } = job;

  const applicationLink = applicationUrl ? (
    <a href={applicationUrl}>
      <Button> Apply Now</Button>
    </a>
  ) : (
    <a href={`mailto:${applicationEmail}`}>
      <Button> Apply Now</Button>
    </a>
  );

  // if (applicationLink) {
  //   console.log(error);
  //   notFound();
  // }

  return (
    <div className="flex flex-col items-start justify-between gap-4 sm:flex-row">
      <JobDetailsCard job={job} />
      <span className="mb-2 mt-4 self-center sm:self-start">
        {" "}
        {applicationLink}
      </span>
    </div>
  );
};

export default page;
