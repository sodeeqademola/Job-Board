"use server";
import prisma from "@/lib/prima";
import { redirect } from "next/navigation";

const send = async (
  companyName: string,
  locationType: string,
  salary: number,
  title: string,
  type: string,
  applicationEmail: string | undefined,
  applicationUrl: string | undefined,
  description: string | undefined,
  location: string | undefined,
  companyLogoUrl: string,
  slug: string,
) => {
  await prisma.job.create({
    data: {
      title: title?.trim(),
      description,
      companyName: companyName?.trim(),
      locationType,
      salary,
      slug,
      type,
      companyLogoUrl,
      applicationEmail: applicationEmail?.trim(),
      applicationUrl: applicationUrl?.trim(),
      location,
    },
  });
  // NextResponse.json("done")

  redirect("/jobsubmitted");
};

export default send;
