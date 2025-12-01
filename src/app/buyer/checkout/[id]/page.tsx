import { db } from "@/lib/db";
import CheckoutForm from "@/components/buyer/checkout-form";
import { notFound } from "next/navigation";

export default async function CheckoutPage({ params }: { params: { id: string } }) {
    const product = await db.product.findUnique({ where: { id: params.id } });
    if (!product) return notFound();

    return (
        <div className="container mx-auto py-12 px-4 flex justify-center">
            <CheckoutForm product={product} />
        </div>
    );
}
