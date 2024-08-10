import { Label } from "@radix-ui/react-label";
import React from "react";
import { Input } from "./ui/input";

import { searchSchema, searchSchemaType } from "./Validation";
import { redirect } from "next/navigation";
import prisma from "@/lib/prima";

import { JobTypes } from "./JobType";
import Buton from "./Button";

type Props = {
  defaultJob: searchSchemaType;
};
const JobSearch = async ({
  defaultJob: { query, location, remote, type },
}: Props) => {
  const filterateJob = async (formData: FormData) => {
    "use server";

    const values = Object.fromEntries(formData.entries());
    const { location, query, remote, type } = searchSchema.parse(values);
    // console.log(location, query, remote, type);

    const searchParams = new URLSearchParams({
      ...(query && { query: query.trim() }),
      ...(type && { type }),
      ...(location && { location }),
      ...(remote && { remote: "true" }),
    });

    redirect(`/?${searchParams.toString()}`);
  };

  //getLocations
  const distinctLocation = await prisma.job.findMany({
    where: {
      approved: true,
    },
    select: {
      location: true,
    },
    distinct: ["location"],
  });
  const locations = distinctLocation
    .map((item) => {
      return item.location;
    })
    .filter((item) => {
      return item !== null;
    });

  // console.log(locations);

  // console.log(distinctLocation);

  //ALL RETURNS

  return (
    <div className="sticky top-0 my-3 h-fit w-full bg-white sm:my-0 sm:w-[30%]">
      <div>
        <form
          key={JSON.stringify({ query, remote, location, type })}
          action={filterateJob}
          className="space-y-2 rounded-sm border border-gray-400 p-2"
        >
          <Label className="text-md font-bold" htmlFor="query">
            Search
          </Label>
          <Input
            name="query"
            id="query"
            placeholder="title company e.t.c"
            defaultValue={query || ""}
          ></Input>
          <Label htmlFor="type" className="text-md font-bold">
            Types
          </Label>
          <select
            id="example1"
            className="focus:border-primary-300 focus:ring-primary-200 b block h-11 w-full rounded-md border border-gray-400 shadow-sm focus:ring focus:ring-opacity-50"
            name="type"
            defaultValue={type || ""}
          >
            <option value="">All Types</option>
            {JobTypes.map((type) => {
              return (
                <option key={type} value={type}>
                  {type}
                </option>
              );
            })}
          </select>
          <Label htmlFor="type" className="text-md font-bold">
            location
          </Label>
          <select
            id="example1"
            className="focus:border-primary-300 focus:ring-primary-200 b block h-11 w-full rounded-md border border-gray-400 shadow-sm focus:ring focus:ring-opacity-50"
            name="location"
            defaultValue={location || ""}
          >
            <option value="">All locations</option>
            {locations.map((location) => {
              return (
                <option key={location} value={location}>
                  {location}
                </option>
              );
            })}
          </select>{" "}
          <input
            className="mr-2 accent-black"
            type="checkbox"
            name="remote"
            defaultChecked={remote}
          />
          <Label>Remote jobs</Label> <br />
          <Buton>Filter Job</Buton>
        </form>
      </div>
    </div>
  );
};

export default JobSearch;
