import { db } from "@/lib/db";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Package, Store, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default async function MarketPage() {
    const products = await db.product.findMany({
        where: { status: "active", quantity: { gt: 0 } },
        include: { farmer: true },
        orderBy: { createdAt: "desc" },
    });

    return (
        <div className="container mx-auto py-8 px-4">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Marketplace</h1>
                    <p className="text-muted-foreground mt-1">Fresh produce directly from farmers to you.</p>
                </div>
                {/* Future: Search Bar could go here */}
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {products.length === 0 ? (
                    <div className="col-span-full text-center py-12">
                        <Package className="mx-auto h-12 w-12 text-muted-foreground opacity-20" />
                        <h3 className="mt-4 text-lg font-semibold">No products available</h3>
                        <p className="text-muted-foreground">Check back later for fresh harvest.</p>
                    </div>
                ) : (
                    products.map((product) => (
                        <Card key={product.id} className="group overflow-hidden border-none shadow-md hover:shadow-xl transition-all duration-300 flex flex-col h-full">
                            <div className="aspect-square relative bg-gray-100 overflow-hidden">
                                {product.image ? (
                                    <img
                                        src={product.image}
                                        alt={product.title}
                                        className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                                    />
                                ) : (
                                    <div className="flex flex-col items-center justify-center h-full text-muted-foreground bg-gray-50">
                                        <Package className="h-12 w-12 mb-2 opacity-20" />
                                        <span className="text-xs font-medium">No Image</span>
                                    </div>
                                )}
                                <div className="absolute top-2 right-2">
                                    <Badge className="bg-white/90 text-green-700 hover:bg-white shadow-sm backdrop-blur-sm">
                                        Fresh
                                    </Badge>
                                </div>
                            </div>
                            <CardHeader className="pb-2">
                                <div className="flex justify-between items-start gap-2">
                                    <CardTitle className="truncate text-lg font-bold">{product.title}</CardTitle>
                                </div>
                                <div className="flex items-center text-sm text-muted-foreground">
                                    <Store className="mr-1 h-3 w-3" />
                                    <span className="truncate">{product.farmer.name}</span>
                                </div>
                            </CardHeader>
                            <CardContent className="flex-1 pb-2">
                                <p className="text-xl font-bold text-green-600">${product.price.toFixed(2)}</p>
                                <p className="text-xs text-muted-foreground mt-1">{product.quantity} units available</p>
                            </CardContent>
                            <CardFooter className="pt-2">
                                <Link href={`/buyer/product/${product.id}`} className="w-full">
                                    <Button className="w-full gap-2 group-hover:bg-green-600 group-hover:text-white transition-colors">
                                        View Details <ArrowRight className="h-4 w-4" />
                                    </Button>
                                </Link>
                            </CardFooter>
                        </Card>
                    ))
                )}
            </div>
        </div>
    );
}
