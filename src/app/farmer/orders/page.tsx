import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

export default async function FarmerOrdersPage() {
    const session = await auth();
    const farmerId = (session?.user as any).id;

    const orders = await db.order.findMany({
        where: {
            product: {
                farmerId,
            },
        },
        include: {
            product: true,
            buyer: true,
        },
        orderBy: { createdAt: "desc" },
    });

    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold mb-6">Orders</h1>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Order ID</TableHead>
                        <TableHead>Product</TableHead>
                        <TableHead>Buyer</TableHead>
                        <TableHead>Quantity</TableHead>
                        <TableHead>Total</TableHead>
                        <TableHead>Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {orders.map((order) => (
                        <TableRow key={order.id}>
                            <TableCell>{order.id.slice(0, 8)}</TableCell>
                            <TableCell>{order.product.title}</TableCell>
                            <TableCell>{order.buyer.name}</TableCell>
                            <TableCell>{order.quantity}</TableCell>
                            <TableCell>${order.totalAmount.toFixed(2)}</TableCell>
                            <TableCell>{order.paymentStatus}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}
