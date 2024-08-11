"use server";
import Image from "next/image";
import React from "react";
import { FaLocationDot } from "react-icons/fa6";
import { FaMapMarkedAlt } from "react-icons/fa";
import { FaMoneyBill } from "react-icons/fa";
import { CiClock1 } from "react-icons/ci";
import prisma from "@/lib/prima";
import Time from "@/components/Time";
import { Currency } from "./Currency";
import { searchSchemaType } from "./Validation";
import { Prisma } from "@prisma/client";
import Link from "next/link";

type Props = {
  filteredJob: searchSchemaType;
};

const JobCard = async ({
  filteredJob: { query, location, remote, type },
}: Props) => {
  // console.log(query, location, remote, type);

  const searchedQuery = query
    ?.split(" ")
    .filter((word) => word.length > 0)
    .join(" & ");

  // console.log(searchedQuery);

  const searchQuery: Prisma.JobWhereInput = searchedQuery
    ? {
        OR: [
          { title: { search: searchedQuery } },
          { location: { search: searchedQuery } },
          { type: { search: searchedQuery } },
          { locationType: { search: searchedQuery } },
          { companyName: { search: searchedQuery } },
        ],
      }
    : {};

  const where: Prisma.JobWhereInput = {
    AND: [
      searchQuery,
      location ? { location } : {},
      type ? { type } : {},
      remote ? { locationType: "Remote" } : {},
      { approved: true },
    ],
  };

  const jobs = await prisma.job.findMany({
    where,
    orderBy: {
      createdAt: "desc",
    },
  });
  // console.log(jobs);

  return (
    <div className="w-full space-y-3 sm:w-[70%]">
      {jobs.length ? (
        jobs.map((job, index) => {
          return (
            <Link
              className="just flex justify-between rounded-md border-2 border-gray-400 px-0.5 py-1"
              href={`jobdetails/${job.slug}`}
              key={index}
            >
              <Image
                src={job.companyLogoUrl || "/laptop.jpg"}
                alt={"laptop"}
                height={70}
                width={100}
                quality={95}
                priority
                className="m-2 rounded-full"
              />
              <div className="mr-auto mt-2 w-[45%] grow leading-6 tracking-normal">
                <h1>{job.title}</h1>
                <h3 className="mb-2">{job.companyName}</h3>
                <div className="flex items-center gap-1">
                  <FaLocationDot />
                  <h3>{job.locationType}</h3>
                </div>
                {job.location && (
                  <div className="flex items-center gap-1">
                    <FaMapMarkedAlt />
                    <h3>{job.location}</h3>
                  </div>
                )}
                <div className="flex items-center gap-1">
                  <FaMoneyBill />
                  <h3>
                    <Currency amount={job.salary} />
                  </h3>
                </div>
                <h3 className={"w-fit rounded-sm bg-gray-300 p-0.5 sm:hidden"}>
                  {job.type}
                </h3>
                <div className={"flex items-center gap-1 sm:hidden"}>
                  <CiClock1 />
                  <h3>
                    <Time time={job.createdAt} />
                  </h3>
                </div>
              </div>

              {/* last div */}

              <div className="last mr-1 flex w-[20%] flex-col items-center justify-center pb-6 pt-3">
                <div className="mb-auto">
                  <h3 className="w-fit rounded-sm bg-gray-300 p-1">
                    {job.type}
                  </h3>
                </div>

                <div className="flex items-center gap-1 tracking-tighter">
                  <CiClock1 />
                  <h3>
                    <Time time={job.createdAt} />
                  </h3>
                </div>
              </div>
            </Link>
          );
        })
      ) : (
        <h1>Sorry oops!! This job is not available </h1>
      )}
    </div>
  );
};

export default JobCard;
