import mongoose, { Schema, models, model } from "mongoose";

const JobSchema = new Schema(
  {
    id: { type: String, required: true, unique: true, index: true },
    title: { type: String, required: true },
    country: { type: String, enum: ["Turkey", "Romania", "Austria"], required: true },
    jobType: { type: String, enum: ["Seasonal", "Full-time"], required: true },
    salaryEUR: { type: Number, required: true },
    duration: { type: String, required: true },
    sector: { type: String, required: true },
    requirements: { type: [String], default: [] },
    description: { type: String, default: "" },
    featured: { type: Boolean, default: false },
    postedAt: { type: String, default: () => new Date().toISOString().slice(0, 10) }
  },
  { timestamps: true }
);

const ApplicationSchema = new Schema(
  {
    type: { type: String, enum: ["application", "inquiry"], default: "application" },
    fullName: { type: String },
    passportNumber: { type: String },
    phone: { type: String },
    email: { type: String },
    preferredCountry: { type: String },
    jobId: { type: String },
    cvFilename: { type: String },
    // For inquiries
    name: { type: String },
    subject: { type: String },
    message: { type: String },
    status: { type: String, enum: ["new", "contacted", "placed", "rejected"], default: "new" }
  },
  { timestamps: true }
);

export const JobModel = models.Job || model("Job", JobSchema);
export const ApplicationModel = models.Application || model("Application", ApplicationSchema);

export type JobDoc = mongoose.InferSchemaType<typeof JobSchema>;
export type ApplicationDoc = mongoose.InferSchemaType<typeof ApplicationSchema>;
