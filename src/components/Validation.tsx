import { z } from "zod";
import { JobTypes, LocationType } from "./JobType";

const requiredString = z.string().min(1, {
  message: "required",
});

// z.instanceof(File || undefined);
const companyLogoSchema = z
  .instanceof(File || undefined)
  .refine((file) => {
    return !file || file.size <= 1024 * 1024 * 2;
  }, "it must be less than 2MB")
  .refine((file) => {
    return !file || file.type.startsWith("image/");
  }, "it must be an image");

const applicationSchema = z
  .object({
    applicationEmail: z.string().email().optional().or(z.literal("")),
    applicationUrl: z.string().url().optional().or(z.literal("")),
  })
  .refine((value) => value.applicationEmail || value.applicationUrl, {
    message: "email or url is needeed",
    path: ["applicationEmail"],
  });

//locationschema
const locationSchema = z
  .object({
    locationType: requiredString.refine(
      (value) => LocationType.includes(value),
      "Invalid location type",
    ),
    location: requiredString.max(100).optional(),
  })
  .refine(
    (value) =>
      !value.locationType || value.locationType === "Remote" || value.location,
    {
      message: "Location is required for onsite and hybrid job",
      path: ["location"],
    },
  );

//createJobSchema

export const createJobSchema = z
  .object({
    title: requiredString.max(300),
    type: requiredString.refine(
      (value) => JobTypes.includes(value),
      "invalid job type",
    ),
    companyName: requiredString.max(100),
    // companyLogo: z.custom<any | undefined>(),
    companyLogo: companyLogoSchema,
    description: requiredString
      .max(5000, "words should not be more than 5000")
      .optional(),
    salary: requiredString
      .max(9, "it must not be more than 9 digits")
      // .regex(/^\d+$/),
      .transform((value) => Number(value)),
  })
  .and(applicationSchema)
  .and(locationSchema);

export type createJobSchemaType = z.infer<typeof createJobSchema>;

//searchSchema

export const searchSchema = z.object({
  query: z.string().optional(),
  type: z.string().optional(),
  location: z.string().optional(),
  remote: z.coerce.boolean().optional(),
});

export type searchSchemaType = z.infer<typeof searchSchema>;
