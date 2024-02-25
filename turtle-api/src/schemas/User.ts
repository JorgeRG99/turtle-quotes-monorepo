import { z } from 'zod';
import { UserInterface } from '../interfaces/User';

const userSchema = z.object({
  name: z
    .string()
    .min(3, { message: 'Name is too short, must be at least 3 character' })
    .max(100, { message: 'Name is too long, must be at most 100 characters' }),
  email: z
    .string()
    .email()
    .min(5, { message: 'Email is too short, must be at least 5 character' })
    .max(100, { message: 'Email is too long, must be at most 100 characters' }),
  password: z
    .string()
    .min(8, { message: 'Password is too short, must be at least 8 characters' })
    .max(20, {
      message: 'Password is too long, must be at most 20 characters',
    }),
});

export function validateUser(shape: UserInterface) {
  return userSchema.safeParse(shape);
}
export function validatePartialUser(shape: UserInterface) {
  return userSchema.partial().safeParse(shape);
}
