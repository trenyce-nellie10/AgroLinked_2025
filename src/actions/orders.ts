"use server";

import { z } from "zod";
import { db } from "@/lib/db";
import { auth } from "@/lib/auth";

const orderSchema = z.object({
    productId: z.string(),
    quantity: z.coerce.number().min(1),
});

export async function createOrder(values: z.infer<typeof orderSchema>) {
    const session = await auth();
    if (!session || (session.user as any).role !== "buyer") {
        return { error: "Unauthorized" };
    }

    const { productId, quantity } = values;

    const product = await db.product.findUnique({ where: { id: productId } });
    if (!product) return { error: "Product not found" };
    if (product.quantity < quantity) return { error: "Insufficient quantity" };

    const totalAmount = product.price * quantity;

    const order = await db.order.create({
        data: {
            buyerId: (session.user as any).id,
            productId,
            quantity,
            totalAmount,
            paymentStatus: "pending",
        },
    });

    // Decrease product quantity? 
    // Usually done after payment, or reserve it. 
    // For simplicity, we'll decrease it now or after payment.
    // Let's decrease after payment in the callback.

    return { success: true, orderId: order.id, amount: totalAmount };
}
