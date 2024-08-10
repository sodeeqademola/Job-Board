"use client";
import { adminDelete, adminAction } from "@/actions/adminAction";
import { Job } from "@prisma/client";
import Image from "next/image";

import React from "react";
import toast from "react-hot-toast";

import { FaMapMarkedAlt } from "react-icons/fa";
import { FaLocationDot, FaMoneyBill } from "react-icons/fa6";

type jobProp = {
  jobs: any;
};

const AdminJobCard: React.FC<jobProp> = ({ jobs }) => {
  return (
    <div className="space-y-3">
      {jobs.length > 0
        ? jobs.map((job: Job, index: number) => {
            return (
              <div
                key={index}
                className="just flex justify-between rounded-md border-2 border-gray-400 px-0.5 py-1"
              >
                <Image
                  src={job.companyLogoUrl || "/laptop.jpg"}
                  alt={job.companyName}
                  height={120}
                  width={140}
                  quality={95}
                  priority
                  className="[w-10%] m-2 rounded-md"
                />
                <div className="mr-auto mt-2 w-[45%] grow leading-6 tracking-normal">
                  <h1>{job.title}</h1>
                  <h3 className="mb-2">{job.companyName}</h3>
                  <div className="flex items-center gap-1">
                    <FaLocationDot />
                    <h3>{job.locationType}</h3>
                  </div>
                  {"job.location" && (
                    <div className="flex items-center gap-1">
                      <FaMapMarkedAlt />
                      <h3>{job.location}</h3>
                    </div>
                  )}
                  <div className="flex items-center gap-1">
                    <FaMoneyBill />
                    <h3>${job.salary}</h3>
                  </div>
                  <h3
                    className={"w-fit rounded-sm bg-gray-300 p-0.5 sm:hidden"}
                  >
                    {job.type}
                  </h3>
                </div>

                {/* last div */}

                <div className="last my-2 mr-1 flex w-[20%] flex-col items-center justify-between">
                  <h3 className="w-fit rounded-sm bg-gray-300 p-1">
                    {job.type}
                  </h3>
                  <div className="mt-auto flex gap-1">
                    <button
                      className="rounded-md bg-green-400 p-1.5 text-white"
                      onClick={() => {
                        adminAction(job);
                      }}
                    >
                      {job.approved === false ? "Approve" : "Approved"}
                    </button>
                    <button
                      className="rounded-md bg-red-400 p-1.5 text-white"
                      onClick={() => {
                        adminDelete(job);
                        toast.success(`${job.title} deleted successfully`);
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        : "There is no unapproved job"}
    </div>
  );
};

export default AdminJobCard;
