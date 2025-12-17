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
    UserId: z.string(),
  resumeId: z.string().optional(),

  jobTitle: z.string().min(1),
  company: z.string().min(1),
  location: z.string().optional(),
  source: z.string().optional(),
  jobUrl: z.string().url().optional(),

  status: z.enum([
    "Applied",
    "HR Call",
    "Interview 1",
    "Interview 2",
    "Test",
    "Rejected",
    "Offer",
    "Ghosted"
  ]).default("Applied"),

  appliedDate: z.coerce.date().optional(),
  lastUpdate: z.coerce.date().optional(),
  followUpDate: z.coerce.date().optional(),

  notes: z.array(z.string()).optional(),
  timeline: z.array(z.string()).optional()
})