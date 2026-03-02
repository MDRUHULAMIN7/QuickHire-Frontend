import { z } from 'zod';

export const jobSchema = z.object({
  title: z.string().min(2),
  company: z.string().min(2),
  location: z.string().min(2),
  category: z.string().min(2),
  description: z.string().min(10),
  employment_type: z.string().min(2),
  tags: z.array(z.string()).optional(),
  company_logo_url: z.string().url().optional(),
});

export type JobFormValues = z.infer<typeof jobSchema>;
