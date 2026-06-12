import { z } from "zod";

const optionalUrl = z
  .string()
  .trim()
  .refine(
    (value) => !value || /^(https?:\/\/)?[\w.-]+\.[a-z]{2,}(\/.*)?$/i.test(value),
    "Link opsional. Jika diisi, gunakan format domain atau URL, contoh linkedin.com/in/nama"
  );

const dateString = z.string().trim();

export const personalInfoSchema = z.object({
  fullName: z.string().trim().min(2, "Nama wajib diisi"),
  jobTitle: z.string().trim().optional(),
  email: z.string().trim().email("Format email tidak valid"),
  phone: z.string().trim().optional(),
  location: z.string().trim().optional(),
  linkedin: optionalUrl,
  github: optionalUrl,
  portfolio: optionalUrl,
  photo: z.string().optional()
});

export const experienceSchema = z
  .object({
    id: z.string(),
    companyName: z.string().trim().min(1, "Company wajib diisi"),
    position: z.string().trim().min(1, "Position wajib diisi"),
    location: z.string().optional(),
    startDate: dateString,
    endDate: dateString,
    currentlyWorking: z.boolean(),
    description: z.string().trim().min(1, "Description wajib diisi")
  })
  .refine((value) => value.currentlyWorking || value.endDate || !value.startDate, {
    message: "End date wajib diisi jika tidak sedang bekerja",
    path: ["endDate"]
  });

export const resumeSchema = z.object({
  personalInfo: personalInfoSchema,
  summary: z.string().trim().min(40, "Summary minimal 40 karakter untuk download"),
  experiences: z.array(experienceSchema).optional(),
  education: z.array(z.any()).optional(),
  projects: z.array(z.any()).optional(),
  skills: z.array(z.any()).optional(),
  certifications: z.array(z.any()).optional(),
  languages: z.array(z.any()).optional(),
  achievements: z.array(z.any()).optional()
});

export function getResumeWarnings(input: unknown) {
  const result = resumeSchema.safeParse(input);

  if (result.success) {
    return [];
  }

  return result.error.issues.map((issue) => issue.message);
}
