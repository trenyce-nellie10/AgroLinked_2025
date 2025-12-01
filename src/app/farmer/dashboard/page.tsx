import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Package, ShoppingCart, DollarSign, Plus, ArrowRight } from "lucide-react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

export default async function FarmerDashboard() {
    const session = await auth();
    const farmerId = (session?.user as any).id;

    const productCount = await db.product.count({
        where: { farmerId },
    });

    const orderCount = await db.order.count({
        where: {
            product: {
                farmerId,
            },
        },
    });

    const paidOrders = await db.order.findMany({
        where: {
            product: { farmerId },
            paymentStatus: "paid",
        },
    });

    const totalRevenue = paidOrders.reduce((acc: number, order: any) => acc + order.totalAmount, 0);

    const recentOrders = await db.order.findMany({
        where: {
            product: { farmerId },
        },
        include: {
            product: true,
            buyer: true,
        },
        orderBy: { createdAt: "desc" },
        take: 5,
    });

    return (
        <div className="p-8 space-y-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
                    <p className="text-muted-foreground">Welcome back, here's an overview of your farm.</p>
                </div>
                <div className="flex gap-2">
                    <Link href="/farmer/products/new">
                        <Button className="gap-2">
                            <Plus className="h-4 w-4" /> Add Product
                        </Button>
                    </Link>
                </div>
            </div>

            {/* KPI Cards */}
            <div className="grid gap-4 md:grid-cols-3">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">${totalRevenue.toFixed(2)}</div>
                        <p className="text-xs text-muted-foreground">Lifetime earnings</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
                        <ShoppingCart className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{orderCount}</div>
                        <p className="text-xs text-muted-foreground">Orders received</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Active Products</CardTitle>
                        <Package className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{productCount}</div>
                        <p className="text-xs text-muted-foreground">Products listed</p>
                    </CardContent>
                </Card>
            </div>

            {/* Quick Actions & Recent Orders */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4">
                    <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle>Recent Orders</CardTitle>
                        <Link href="/farmer/orders" className="text-sm text-blue-600 hover:underline flex items-center gap-1">
                            View All <ArrowRight className="h-4 w-4" />
                        </Link>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Product</TableHead>
                                    <TableHead>Buyer</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="text-right">Amount</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {recentOrders.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={4} className="text-center text-muted-foreground">
                                            No orders yet.
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    recentOrders.map((order: any) => (
                                        <TableRow key={order.id}>
                                            <TableCell className="font-medium">{order.product.title}</TableCell>
                                            <TableCell>{order.buyer.name}</TableCell>
                                            <TableCell>
                                                <span className={`px-2 py-1 rounded-full text-xs ${order.paymentStatus === 'paid' ? 'bg-green-100 text-green-800' :
                                                    order.paymentStatus === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                                        'bg-red-100 text-red-800'
                                                    }`}>
                                                    {order.paymentStatus}
                                                </span>
                                            </TableCell>
                                            <TableCell className="text-right">${order.totalAmount.toFixed(2)}</TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>

                <Card className="col-span-3">
                    <CardHeader>
                        <CardTitle>Quick Actions</CardTitle>
                    </CardHeader>
                    <CardContent className="grid gap-4">
                        <Link href="/farmer/products/new">
                            <Button variant="outline" className="w-full justify-start h-auto py-4">
                                <Plus className="mr-2 h-5 w-5" />
                                <div className="text-left">
                                    <div className="font-semibold">Add New Product</div>
                                    <div className="text-xs text-muted-foreground">List a new item for sale</div>
                                </div>
                            </Button>
                        </Link>
                        <Link href="/farmer/products">
                            <Button variant="outline" className="w-full justify-start h-auto py-4">
                                <Package className="mr-2 h-5 w-5" />
                                <div className="text-left">
                                    <div className="font-semibold">Manage Products</div>
                                    <div className="text-xs text-muted-foreground">Edit or delete existing listings</div>
                                </div>
                            </Button>
                        </Link>
                        <Link href="/farmer/orders">
                            <Button variant="outline" className="w-full justify-start h-auto py-4">
                                <ShoppingCart className="mr-2 h-5 w-5" />
                                <div className="text-left">
                                    <div className="font-semibold">View All Orders</div>
                                    <div className="text-xs text-muted-foreground">Track and fulfill orders</div>
                                </div>
                            </Button>
                        </Link>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
