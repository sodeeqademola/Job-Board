"use server";
import { Job } from "@prisma/client";
import prisma from "@/lib/prima";
import { revalidatePath } from "next/cache";

export const adminAction = async (job: Job) => {
  console.log(job);

  await prisma?.job.update({
    where: {
      id: job.id,
    },
    data: {
      approved: true,
    },
  });
  revalidatePath("/");
};

export const adminDelete = async (job: Job) => {
  await prisma.job.delete({
    where: {
      id: job.id,
    },
  });
  //   console.log(job);
  revalidatePath("/admin");
};
