import { z } from 'zod';

export const applySchema = z.object({
  job: z.string().min(1),
  name: z.string().min(1),
  email: z.string().email(),
  resumeLink: z.string().url(),
  coverNote: z.string().min(50),
});

export type ApplyFormValues = z.infer<typeof applySchema>;
