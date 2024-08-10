import JobForm from "@/components/JobForm";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Post a Job",
  description: "Find job around the world",
};
const page = () => {
  return (
    <div>
      <JobForm />
    </div>
  );
};

export default page;
