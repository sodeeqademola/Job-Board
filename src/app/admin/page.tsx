import AdminJobCard from "@/components/AdminJobCard";
import { PrismaClient } from "@prisma/client";
import Image from "next/image";
import React, { Suspense } from "react";
import prisma from "@/lib/prima";

// const prisma =new PrismaClient()

const page = async () => {
  const jobs = await prisma.job.findMany({
    where: {
      approved: false,
    },
    orderBy: {
      createdAt: "asc",
    },
  });

  // console.log(jobs);

  return (
    <div>
      <h1 className="my-2 text-center text-3xl font-bold">Admin DashBoard</h1>
      <Suspense fallback={"loading unapproved jobs posted..."}>
        <AdminJobCard jobs={jobs} />
      </Suspense>
    </div>
  );
};

export default page;
