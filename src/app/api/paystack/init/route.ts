import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const body = await req.json();
    const { orderId, amount, email } = body;

    // Mock Paystack initialization
    // In a real app, we would call Paystack API here.
    // Here we just return a URL to our mock payment page.

    const authorization_url = `/buyer/checkout/mock-payment?orderId=${orderId}&amount=${amount}`;

    return NextResponse.json({
        status: true,
        message: "Authorization URL created",
        data: {
            authorization_url,
            access_code: "mock_access_code_" + orderId,
            reference: "mock_ref_" + orderId,
        },
    });
}
