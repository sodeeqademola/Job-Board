"use client";
import createJob from "@/actions/createJob";
import React, { useState } from "react";

import { Controller, useForm } from "react-hook-form";
import { createJobSchema, createJobSchemaType } from "@/components/Validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { JobTypes, LocationType } from "./JobType";
import Buton from "./Button";

const JobForm = () => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<createJobSchemaType>({
    resolver: zodResolver(createJobSchema),
  });

  const [applicationEmail, setApplicationEmail] = useState("");
  const [applicationUrl, setApplicationUrl] = useState("");

  const onSubmit = async (values: createJobSchemaType) => {
    // JSON.parse(JSON.stringify(createJob(values)));
    await createJob(values);
    console.log(values);

    // const formData = new FormData();
    // Object.entries(values).forEach(([key, value]) => {
    //   if (value) {
    //     // formData.append(key, value);
    //     console.log(value);
    //     try {
    //       createJob(value);
    //     } catch (error) {
    //       console.log(error);
    //     }
    //   }
    // });
    // console.log(values.companyLogo);
    // console.log(values);
  };

  return (
    <div>
      <div>
        <h1 className="mb-5 text-center text-4xl font-bold">
          Find your perfect developer
        </h1>
        <p className="text-center font-semibold">
          Get your job posting seen by thousands of developers job seekers
        </p>
        <div className="rounded-md border-2 border-gray-300 p-3">
          <h1 className="text-xl font-bold">Job details</h1>
          <p>provide a job decription and details</p>

          <form
            // action={createJob}
            onSubmit={handleSubmit(onSubmit)}
            method="post"
            className="mt-4"
          >
            {/* title */}
            <label htmlFor="title" className="title">
              Job title
            </label>{" "}
            <br />
            <input
              className="input"
              type="text"
              {...register("title")}
              id="title"
              placeholder="e.g Frontend developer"
            />
            {errors.title && (
              <p className="text-red-600">{errors.title.message}</p>
            )}
            {/* type */}
            <label htmlFor="type" className="title">
              Job type
            </label>{" "}
            <br />
            <select
              className="input"
              {...register("type")}
              id="type"
              defaultValue={""}
            >
              <option value="" hidden>
                All types
              </option>
              {JobTypes.map((jobtype) => {
                return (
                  <option key={jobtype} value={jobtype}>
                    {jobtype}
                  </option>
                );
              })}
            </select>
            <br />
            {/* Company */}
            <label htmlFor="companyName" className="title">
              Company
            </label>{" "}
            <br />
            <input
              className="input"
              type="text"
              {...register("companyName")}
              id="companyName"
              placeholder="Company Name"
            />
            {errors.companyName && (
              <p className="text-red-600">{errors.companyName.message}</p>
            )}{" "}
            <br />
            <label htmlFor="companyLogo" className="title">
              Company Logo
            </label>{" "}
            <br />
            <Controller
              name="companyLogo"
              control={control}
              defaultValue={undefined}
              render={({ field: { onChange } }) => (
                <input
                  className="input"
                  type="file"
                  onChange={(e: any) => {
                    onChange(e.target.files[0]);
                  }}
                />
              )}
            />
            {errors.companyLogo && (
              <p className="text-red-600">{errors.companyLogo.message}</p>
            )}{" "}
            <br />
            {/* // Location Type */}
            <label htmlFor="locationType" className="title">
              LocationType
            </label>{" "}
            <br />
            <select
              className="input"
              {...register("locationType")}
              id="locationType"
              defaultValue={""}
            >
              <option value="" hidden>
                Select an Option
              </option>
              {LocationType.map((locationtype) => {
                return (
                  <option key={locationtype} value={locationtype}>
                    {locationtype}
                  </option>
                );
              })}
            </select>
            {errors.locationType && (
              <p className="text-red-600">{errors.locationType.message}</p>
            )}
            <br />
            {/* Office location */}
            <label htmlFor="officelocation" className="title">
              Office Location
            </label>{" "}
            <br />
            <input
              className="input"
              type="text"
              {...register("location")}
              id="officelocation"
              placeholder="Where Office is located"
            />
            {errors.location && (
              <p className="text-red-600">{errors.location.message}</p>
            )}
            <br />
            <label htmlFor="applicationEmail" className="title">
              How to apply
            </label>{" "}
            <br />
            <div className="flex items-center justify-between">
              <div className="w-[45%]">
                <input
                  className="input"
                  type="text"
                  {...register("applicationEmail")}
                  id="applicationEmail"
                  value={applicationEmail}
                  onChange={(e) => {
                    setApplicationEmail(e.target.value);
                    setApplicationUrl("");
                  }}
                  placeholder="Application Email"
                />
                {errors.applicationEmail && (
                  <p className="text-red-600">
                    {errors.applicationEmail.message}
                  </p>
                )}{" "}
              </div>
              <span className="title">or</span>
              <div className="w-[45%]">
                <input
                  className="input"
                  type="text"
                  {...register("applicationUrl")}
                  id="applicationEmail"
                  value={applicationUrl}
                  onChange={(e) => {
                    setApplicationUrl(e.target.value);
                    setApplicationEmail("");
                  }}
                  placeholder="Application Url"
                />
                {errors.applicationUrl && (
                  <p className="text-red-600">
                    {errors.applicationUrl.message}
                  </p>
                )}
              </div>
            </div>
            <label htmlFor="description" className="title">
              Description
            </label>
            <textarea
              className="input"
              {...register("description")}
              id="description"
              placeholder="Description"
            />{" "}
            <br />
            <label htmlFor="salary" className="title">
              Salary
            </label>
            <input
              className="input"
              type="number"
              {...register("salary")}
              id="salary"
              placeholder="Salary"
            />
            <Buton>CreateJob</Buton>
          </form>
        </div>
      </div>
    </div>
  );
};

export default JobForm;
