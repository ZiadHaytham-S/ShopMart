import * as zod from 'zod';

export const schema = zod
  .object({
    name: zod
      .string()
      .nonempty('Name is required')
      .min(3, 'Name must be at least 3 characters')
      .max(20, 'Name must be at most 20 characters'),

    email: zod
      .string()
      .nonempty('Email is required')
      .regex(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        'Please enter a valid email address'
      ),

    password: zod
      .string()
      .nonempty('Password is required')
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        'Password must be at least 8 characters, and include uppercase, lowercase, number, and special character'
      ),

    rePassword: zod
      .string()
      .nonempty('Confirm Password is required'),

    phone: zod
      .string()
      .trim()
      .regex(/^01(0|1|2|5)\d{8}$/, {
        message: 'Phone number must be a valid Egyptian number (e.g., 01012345678)',
      }),
  })
  .refine((data) => data.rePassword === data.password, {
    path: ['rePassword'],
    message: 'Passwords do not match',
  });
