import z from 'zod'

export const SignUpSchema = z.object({
    name : z.string(),
    email : z.string().min(3),
    password : z.string().min(3).max(10) 
})
export const SignInSchema = z.object({
    email : z.string().min(3),
    password : z.string().min(3).max(10) 
})
export const JobApplicationSchema = z.object({
  resumeId: z.string().optional(),

  jobTitle: z.string().min(1, "Job title is required"),
  company: z.string().min(1, "Company is required"),

  location: z.string().optional(),
  source: z.string().optional(),

  jobUrl: z
    .string()
    .url("Invalid job URL")
    .optional()
    .or(z.literal("")),

  status: z.enum([
    "Applied",
    "HR Call",
    "Interview 1",
    "Interview 2",
    "Test",
    "Rejected",
    "Offer",
    "Ghosted",
  ]),

  appliedDate: z.coerce.date().optional(),
  followUpDate: z.coerce.date().optional(),

  notes: z.array(z.string()).optional(),
  timeline: z.array(z.string()).optional(),
});
