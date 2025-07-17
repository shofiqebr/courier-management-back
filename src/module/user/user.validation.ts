import { z } from 'zod';

export const userValidation = {
  updateUserSchema: z.object({
    body: z.object({
      name: z.string().optional(),
      email: z.string().email().optional(),
      role: z.enum(['admin', 'agent', 'customer']).optional(),
      password: z.string().min(5).optional(),
    }),
  }),
};
