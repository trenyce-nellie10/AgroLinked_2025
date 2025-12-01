import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ShoppingBag, ShoppingCart, DollarSign, ArrowRight, Store } from "lucide-react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

export default async function BuyerDashboard() {
    const session = await auth();
    const buyerId = (session?.user as any).id;

    const orders = await db.order.findMany({
        where: { buyerId },
        orderBy: { createdAt: "desc" },
        take: 5,
        include: { product: true },
    });

    const totalOrders = await db.order.count({
        where: { buyerId },
    });

    const paidOrders = await db.order.findMany({
        where: {
            buyerId,
            paymentStatus: "paid",
        },
    });

    const totalSpent = paidOrders.reduce((acc: number, order: any) => acc + order.totalAmount, 0);

    return (
        <div className="p-8 space-y-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
                    <p className="text-muted-foreground">Welcome back, here's your shopping overview.</p>
                </div>
                <div className="flex gap-2">
                    <Link href="/buyer/market">
                        <Button className="gap-2">
                            <Store className="h-4 w-4" /> Browse Market
                        </Button>
                    </Link>
                </div>
            </div>

            {/* KPI Cards */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Spent</CardTitle>
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">${totalSpent.toFixed(2)}</div>
                        <p className="text-xs text-muted-foreground">Lifetime purchases</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
                        <ShoppingBag className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{totalOrders}</div>
                        <p className="text-xs text-muted-foreground">Orders placed</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Recent Activity</CardTitle>
                        <ShoppingCart className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{orders.length}</div>
                        <p className="text-xs text-muted-foreground">Orders in last 30 days</p>
                    </CardContent>
                </Card>
            </div>

            {/* Recent Orders Table */}
            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>Recent Orders</CardTitle>
                    {/* Placeholder for View All link if we had an orders page */}
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Product</TableHead>
                                <TableHead>Date</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Total</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {orders.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={5} className="text-center text-muted-foreground">
                                        No orders yet. Go to the market to start shopping!
                                    </TableCell>
                                </TableRow>
                            ) : (
                                orders.map((order: any) => (
                                    <TableRow key={order.id}>
                                        <TableCell className="font-medium">{order.product.title}</TableCell>
                                        <TableCell>{new Date(order.createdAt).toLocaleDateString()}</TableCell>
                                        <TableCell>
                                            <span className={`px-2 py-1 rounded-full text-xs ${order.paymentStatus === 'paid' ? 'bg-green-100 text-green-800' :
                                                    order.paymentStatus === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                                        'bg-red-100 text-red-800'
                                                }`}>
                                                {order.paymentStatus}
                                            </span>
                                        </TableCell>
                                        <TableCell className="text-right">${order.totalAmount.toFixed(2)}</TableCell>
                                        <TableCell className="text-right">
                                            <Link href={`/buyer/product/${order.product.id}`}>
                                                <Button variant="ghost" size="sm">
                                                    View Product <ArrowRight className="ml-2 h-4 w-4" />
                                                </Button>
                                            </Link>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}
