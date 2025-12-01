import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

export default function FarmerLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen flex flex-col">
            <header className="h-16 border-b px-6 flex items-center justify-between bg-white">
                <Link href="/farmer/dashboard" className="flex items-center gap-2">
                    <Image src="/logo.png" alt="AgroLinked Logo" width={80} height={80} className="rounded-full" />
                    <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full">Farmer</span>
                </Link>
                <div className="flex items-center gap-4">
                    <Link href="/api/auth/signout">
                        <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground hover:text-foreground">
                            <LogOut className="h-4 w-4" /> Logout
                        </Button>
                    </Link>
                </div>
            </header>
            <main className="flex-1 bg-gray-50/50">
                {children}
            </main>
        </div>
    );
}
