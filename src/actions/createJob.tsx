"use client";
import { createJobSchema, createJobSchemaType } from "@/components/Validation";

import slugify from "slugify";
import send from "./action";
import toast from "react-hot-toast";
const createJob = async (formData: createJobSchemaType) => {
  // console.log(formData.description);
  // console.log(formData.title);
  // console.log(formData.location);
  // console.log(formData.locationType);
  // console.log(formData.type);
  // console.log(formData.salary);
  // console.log(formData.companyLogo);
  // console.log(formData.companyName);
  // console.log(formData.applicationEmail);
  // console.log(formData.applicationUrl);
  // const title = formData.title;
  // console.log(title);
  // const {} = formData;
  const {
    companyLogo,
    companyName,
    locationType,
    salary,
    title,
    type,
    applicationEmail,
    applicationUrl,
    description,
    location,
  } = formData;
  console.log(formData);

  const slug = slugify(title, {
    replacement: "-",
    remove: undefined,
    lower: true,
    strict: true,
    locale: "vi",
    trim: true,
  });
  console.log(slug);

  // getUrl

  const cloudName = "dpnms1tbz";
  const upload_preset = "jobboard";

  const getUrl = async () => {
    const formData = new FormData();
    formData.append("file", companyLogo);
    formData.append("upload_preset", upload_preset);
    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      {
        method: "POST",
        body: formData,
      },
    );
    const data = await res.json();
    return data.url;
    // console.log(data.url);
  };

  const companyLogoUrl: string = await getUrl();
  console.log(companyLogoUrl);

  send(
    companyName,
    locationType,
    salary,
    title,
    type,
    applicationEmail,
    applicationUrl,
    description,
    location,
    companyLogoUrl,
    slug,
  );
  toast.success("Job successfully posted");
};

export default createJob;
