import { db } from "@/lib/db";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ShoppingCart, Store, Package } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export default async function ProductDetailsPage({ params }: { params: { id: string } }) {
    const product = await db.product.findUnique({
        where: { id: params.id },
        include: { farmer: true },
    });

    if (!product) return notFound();

    return (
        <div className="container mx-auto py-8 px-4 max-w-6xl">
            <Link href="/buyer/market" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors">
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to Market
            </Link>

            <div className="grid md:grid-cols-2 gap-12 lg:gap-16">
                {/* Product Image Section */}
                <div className="space-y-4">
                    <div className="aspect-square bg-gray-100 relative rounded-xl overflow-hidden border shadow-sm">
                        {product.image ? (
                            <img src={product.image} alt={product.title} className="object-cover w-full h-full hover:scale-105 transition-transform duration-500" />
                        ) : (
                            <div className="flex flex-col items-center justify-center h-full text-muted-foreground bg-gray-50">
                                <Package className="h-16 w-16 mb-2 opacity-20" />
                                <span className="text-sm font-medium">No Image Available</span>
                            </div>
                        )}
                    </div>
                </div>

                {/* Product Details Section */}
                <div className="flex flex-col justify-center space-y-8">
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <Badge variant={product.quantity > 0 ? "default" : "destructive"} className="px-3 py-1">
                                {product.quantity > 0 ? "In Stock" : "Out of Stock"}
                            </Badge>
                            <span className="text-sm text-muted-foreground flex items-center">
                                <Store className="mr-1 h-4 w-4" /> {product.farmer.name}
                            </span>
                        </div>

                        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900">{product.title}</h1>
                        <p className="text-3xl font-bold text-green-600">${product.price.toFixed(2)}</p>
                    </div>

                    <Separator />

                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Description</h3>
                        <p className="text-gray-600 leading-relaxed text-lg">
                            {product.description}
                        </p>
                    </div>

                    <div className="space-y-4 pt-4">
                        <div className="flex items-center justify-between text-sm text-muted-foreground bg-gray-50 p-4 rounded-lg">
                            <span>Available Quantity</span>
                            <span className="font-medium text-gray-900">{product.quantity} units</span>
                        </div>

                        <Link href={`/buyer/checkout/${product.id}`} className="block">
                            <Button size="lg" className="w-full h-14 text-lg gap-2 shadow-lg hover:shadow-xl transition-all" disabled={product.quantity <= 0}>
                                <ShoppingCart className="h-5 w-5" />
                                {product.quantity > 0 ? "Buy Now" : "Currently Unavailable"}
                            </Button>
                        </Link>
                        <p className="text-xs text-center text-muted-foreground">
                            Secure payment via Paystack • Direct from Farmer
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
