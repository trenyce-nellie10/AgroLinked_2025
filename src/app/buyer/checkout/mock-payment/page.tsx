"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export default function MockPaymentPage() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const { toast } = useToast();
    const orderId = searchParams.get("orderId");
    const amount = searchParams.get("amount");
    const [loading, setLoading] = useState(false);

    async function handlePayment() {
        setLoading(true);
        try {
            const res = await fetch("/api/paystack/callback", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ reference: "mock_ref_" + orderId }),
            });
            const data = await res.json();

            if (data.status) {
                toast({
                    title: "Payment Successful",
                    description: "Your order has been paid.",
                });
                router.push("/buyer/dashboard");
            } else {
                toast({
                    variant: "destructive",
                    title: "Payment Failed",
                    description: data.message,
                });
            }
        } catch (error) {
            toast({
                variant: "destructive",
                title: "Error",
                description: "Something went wrong",
            });
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="flex h-screen items-center justify-center bg-gray-100">
            <Card className="w-[350px]">
                <CardHeader>
                    <CardTitle>Paystack Simulation</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="text-center">
                        <p className="text-sm text-gray-500">Paying for Order #{orderId}</p>
                        <p className="text-2xl font-bold">${amount}</p>
                    </div>
                    <Button onClick={handlePayment} className="w-full" disabled={loading}>
                        {loading ? "Processing..." : "Pay Now (Mock)"}
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
}
