"use server";

import { z } from "zod";
import { db } from "@/lib/db";
import { auth } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const productSchema = z.object({
    title: z.string().min(1),
    description: z.string().min(1),
    price: z.coerce.number().min(0),
    quantity: z.coerce.number().min(1),
    image: z.string().optional(),
});

export async function createProduct(values: z.infer<typeof productSchema>) {
    const session = await auth();
    if (!session || (session.user as any).role !== "farmer") {
        return { error: "Unauthorized" };
    }

    const validatedFields = productSchema.safeParse(values);
    if (!validatedFields.success) {
        return { error: "Invalid fields" };
    }

    await db.product.create({
        data: {
            ...validatedFields.data,
            farmerId: (session.user as any).id,
        },
    });

    revalidatePath("/farmer/products");
    redirect("/farmer/products");
}

export async function deleteProduct(id: string) {
    const session = await auth();
    if (!session || (session.user as any).role !== "farmer") {
        return { error: "Unauthorized" };
    }

    await db.product.delete({
        where: { id, farmerId: (session.user as any).id },
    });

    revalidatePath("/farmer/products");
}

export async function updateProduct(id: string, values: z.infer<typeof productSchema>) {
    const session = await auth();
    if (!session || (session.user as any).role !== "farmer") {
        return { error: "Unauthorized" };
    }

    const validatedFields = productSchema.safeParse(values);
    if (!validatedFields.success) {
        return { error: "Invalid fields" };
    }

    await db.product.update({
        where: { id, farmerId: (session.user as any).id },
        data: {
            ...validatedFields.data,
        },
    });

    revalidatePath("/farmer/products");
    revalidatePath(`/farmer/products/${id}`);
    redirect("/farmer/products");
}
