import JobCard from "@/components/JobCard";
import JobSearch from "@/components/JobSearch";
import { searchSchemaType } from "@/components/Validation";
import { Suspense } from "react";
import type { Metadata } from "next";

interface Props {
  searchParams: {
    query?: string;
    type?: string;
    location?: string;
    remote?: string;
  };
}

export function generateMetadata({
  searchParams: { query, location, remote, type },
}: Props): Metadata {
  const filteredJob: searchSchemaType = {
    query,
    location,
    type,
    remote: remote === "true",
  };
  const getTitle = (filteredJob?: {
    query?: string | undefined;
    location?: string | undefined;
    remote?: boolean | undefined;
    type?: string | undefined;
  }) => {
    const getPrefix = query
      ? `${query} jobs`
      : type
        ? `which is${type}`
        : remote
          ? " and a remote developer Job"
          : "All  developers Jobs";

    const getJobLocation = location ? `in ${location}` : "";

    return `${getPrefix} ${getJobLocation}`;
  };
  return {
    title: ` ${getTitle(filteredJob)} | Job Board`,
  };
}

export default async function Home({
  searchParams: { query, location, remote, type },
}: Props) {
  // console.log(typeof searchParams);

  const filteredJob: searchSchemaType = {
    query,
    location,
    type,
    remote: remote === "true",
  };

  // console.log(filteredJob);

  const getTitle = (filteredJob?: {
    query?: string | undefined;
    location?: string | undefined;
    remote?: boolean | undefined;
    type?: string | undefined;
  }) => {
    const getPrefix = query
      ? `${query} jobs`
      : type
        ? `which is${type}`
        : remote
          ? " and a remote developer Job"
          : "All  developers Jobs";

    const getJobLocation = location ? `in ${location}` : "";

    return `${getPrefix} ${getJobLocation}`;
  };

  return (
    <div className="mt-4">
      <h1 className="mb-2 text-center text-3xl font-bold">
        {getTitle(filteredJob)}
      </h1>
      <h3 className="my-3 text-center">Find your dream job</h3>
      <div className="items-start justify-center gap-4 sm:flex">
        <JobSearch defaultJob={filteredJob} />
        <Suspense fallback={"loading"}>
          <JobCard filteredJob={filteredJob} />
        </Suspense>
      </div>
    </div>
  );
}
