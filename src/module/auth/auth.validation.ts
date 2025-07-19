import { z } from 'zod';

const registerBody = z.object({
  name: z.string({ required_error: 'Name is required' }),
  id: z.string({ required_error: 'ID is required' }),
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string(),
  role: z.enum(['admin', 'agent', 'customer']).optional(),
});

const loginBody = z.object({
  id: z.string({ required_error: 'ID is required' }),
  password: z.string({ required_error: 'Password is required' }),
});

export const AuthValidation = {
  registerValidationSchema: z.object({ body: registerBody }),
  loginValidationSchema: z.object({ body: loginBody }),
};
