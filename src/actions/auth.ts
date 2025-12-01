"use server";

import { z } from "zod";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";
import { signIn } from "@/lib/auth";
import { AuthError } from "next-auth";

const signupSchema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    role: z.enum(["farmer", "buyer"]),
});

export async function signup(values: z.infer<typeof signupSchema>) {
    const validatedFields = signupSchema.safeParse(values);

    if (!validatedFields.success) {
        return { error: "Invalid fields" };
    }

    const { email, password, name, role } = validatedFields.data;

    const existingUser = await db.user.findUnique({
        where: { email },
    });

    if (existingUser) {
        return { error: "Email already in use" };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await db.user.create({
        data: {
            name,
            email,
            passwordHash: hashedPassword,
            role,
        },
    });

    return { success: "Account created!" };
}

export async function login(values: z.infer<typeof signupSchema>) {
    // This is handled by next-auth signIn usually, but we can wrap it if needed.
    // For credentials login, we call signIn from client or server action.
    // Here we just export signup.
}
