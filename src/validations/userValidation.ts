import { z } from 'zod';

export const registerSchema = z.object({
    userName: z.string().min(2, "Name must be at least 2 characters").max(255),
    userEmail: z.string().email("Invalid email address"),
    userPassword: z.string().min(6, "Password must be at least 6 characters")
});

export type RegisterInput = z.infer<typeof registerSchema>;
