import { z } from 'zod';

export const createLinkSchema = z.object({
  body: z.object({
    destination: z
      .string()
      .url({ message: 'Destination must be a valid URL' })
      .refine((val) => val.startsWith('https://'), { message: 'Destination must use HTTPS' }),
  }),
});

export type CreateLinkInput = z.infer<typeof createLinkSchema>['body'];
