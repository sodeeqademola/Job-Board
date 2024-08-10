import { Job } from "@prisma/client";

import Image from "next/image";
import Link from "next/link";
import React from "react";

import { FaMapMarkedAlt } from "react-icons/fa";
import { FaLocationDot, FaMoneyBill } from "react-icons/fa6";
import Markdown from "react-markdown";

type jobProps = {
  job: Job;
};
const JobDetailsCard = ({
  job: {
    title,
    applicationEmail,
    applicationUrl,
    companyName,
    companyLogoUrl,
    description,
    location,
    salary,
    type,
    locationType,
  },
}: jobProps) => {
  return (
    <div className="mt-3 w-full grow space-y-5">
      <div className="flex items-center gap-3">
        <Image
          src={companyLogoUrl || "/laptop.jpg"}
          alt="Company Logo"
          width={150}
          height={130}
          className="mr-2 rounded-xl"
        />
        <div>
          <div>
            <h1 className="text-xl font-bold">{title}</h1>
            <p className="font-semibold">
              {applicationUrl ? (
                <Link
                  href={new URL(applicationUrl).origin}
                  // href={applicationUrl}
                  className="text-green-500 hover:underline"
                >
                  {companyName}
                </Link>
              ) : (
                <span>{companyName}</span>
              )}
            </p>
          </div>
          <div className="text-muted-foreground">
            <div className="flex items-center gap-1">
              <FaLocationDot />
              <h3>{type}</h3>
            </div>

            <div className="flex items-center gap-1">
              <FaMapMarkedAlt />
              <h3>{location}</h3>
            </div>
            <div className="flex items-center gap-1">
              <FaMoneyBill />
              <h3>{`$${salary}`}</h3>
            </div>
            <h3 className={"w-fit rounded-sm bg-gray-300 p-0.5 sm:hidden"}>
              {type}
            </h3>
          </div>
        </div>
      </div>
      <div>
        <Markdown className="space-y-3">{description}</Markdown>
        {/* {description} */}
      </div>
    </div>
  );
};

export default JobDetailsCard;
