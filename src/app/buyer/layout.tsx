import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { LogOut, ShoppingCart } from "lucide-react";

export default function BuyerLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen flex flex-col">
            <header className="h-16 border-b px-6 flex items-center justify-between bg-white">
                <Link href="/buyer/dashboard" className="flex items-center gap-2">
                    <Image src="/logo.png" alt="AgroLinked Logo" width={80} height={80} className="rounded-full" />
                    <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">Buyer</span>
                </Link>
                <nav className="flex items-center gap-6">
                    <Link href="/buyer/market" className="text-sm font-medium hover:underline underline-offset-4">
                        Marketplace
                    </Link>
                    <Link href="/buyer/dashboard" className="text-sm font-medium hover:underline underline-offset-4">
                        Dashboard
                    </Link>
                    <Link href="/api/auth/signout">
                        <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground hover:text-foreground">
                            <LogOut className="h-4 w-4" /> Logout
                        </Button>
                    </Link>
                </nav>
            </header>
            <main className="flex-1 bg-gray-50/50">
                {children}
            </main>
        </div>
    );
}
