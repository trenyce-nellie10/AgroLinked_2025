import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(req: Request) {
    const body = await req.json();
    const { reference } = body; // We'll use orderId as reference for simplicity in mock

    // Mock verification
    // Extract orderId from reference "mock_ref_ORDERID"
    const orderId = reference.replace("mock_ref_", "");

    try {
        await db.order.update({
            where: { id: orderId },
            data: { paymentStatus: "paid" },
        });

        return NextResponse.json({
            status: true,
            message: "Payment successful",
        });
    } catch (error) {
        return NextResponse.json(
            { status: false, message: "Payment verification failed" },
            { status: 400 }
        );
    }
}
