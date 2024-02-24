import { z } from "zod";
import { UserInterface } from "../interfaces/User";

const userSchema = z.object({
    name: z.string().min(1).max(100),
    email: z.string().email().min(1).max(100),
    password: z.string().min(8).max(20)
})

export function validateUser(shape: UserInterface) {
    return userSchema.safeParse(shape);
}
export function validatePartialUser(shape: UserInterface) {
    return userSchema.partial().safeParse(shape);
}