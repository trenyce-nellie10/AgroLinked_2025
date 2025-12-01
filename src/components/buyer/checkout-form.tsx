"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createOrder } from "@/actions/orders";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

export default function CheckoutForm({ product }: { product: any }) {
    const [quantity, setQuantity] = useState(1);
    const [loading, setLoading] = useState(false);
    const { toast } = useToast();
    const router = useRouter();

    const total = product.price * quantity;

    async function handleCheckout() {
        setLoading(true);
        try {
            // 1. Create Order
            const orderRes = await createOrder({
                productId: product.id,
                quantity: quantity,
            });

            if (orderRes.error) {
                toast({
                    variant: "destructive",
                    title: "Error",
                    description: orderRes.error,
                });
                setLoading(false);
                return;
            }

            // 2. Init Payment
            const paystackRes = await fetch("/api/paystack/init", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    orderId: orderRes.orderId,
                    amount: orderRes.amount,
                    email: "buyer@example.com", // Should get from session if possible, or pass it
                }),
            });

            const paystackData = await paystackRes.json();

            if (paystackData.status) {
                // 3. Redirect
                window.location.href = paystackData.data.authorization_url;
            } else {
                toast({
                    variant: "destructive",
                    title: "Payment Error",
                    description: "Could not initialize payment",
                });
                setLoading(false);
            }

        } catch (error) {
            toast({
                variant: "destructive",
                title: "Error",
                description: "Something went wrong",
            });
            setLoading(false);
        }
    }

    return (
        <Card className="w-[400px]">
            <CardHeader>
                <CardTitle>Checkout</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div>
                    <h3 className="font-bold">{product.title}</h3>
                    <p className="text-sm text-gray-500">${product.price.toFixed(2)} each</p>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="quantity">Quantity</Label>
                    <Input
                        id="quantity"
                        type="number"
                        min="1"
                        max={product.quantity}
                        value={quantity}
                        onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                    />
                </div>
                <div className="pt-4 border-t">
                    <div className="flex justify-between font-bold text-lg">
                        <span>Total</span>
                        <span>${total.toFixed(2)}</span>
                    </div>
                </div>
            </CardContent>
            <CardFooter>
                <Button className="w-full" onClick={handleCheckout} disabled={loading}>
                    {loading ? "Processing..." : "Proceed to Payment"}
                </Button>
            </CardFooter>
        </Card>
    );
}
