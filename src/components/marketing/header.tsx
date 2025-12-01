import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function MarketingHeader() {
    return (
        <header className="px-6 h-16 flex items-center justify-between border-b border-gray-100 bg-white/80 backdrop-blur-md sticky top-0 z-50">
            <Link className="flex items-center gap-2" href="/">
                <Image src="/logo.png" alt="AgroLinked" width={40} height={40} className="rounded-full" />
                <span className="font-semibold text-lg tracking-tight text-gray-900">AgroLinked</span>
            </Link>
            <nav className="hidden md:flex gap-8 items-center">
                <Link className="text-sm font-medium text-gray-600 hover:text-green-600 transition-colors" href="/about">
                    About
                </Link>
                <Link className="text-sm font-medium text-gray-600 hover:text-green-600 transition-colors" href="/pricing">
                    Pricing
                </Link>
                <Link className="text-sm font-medium text-gray-600 hover:text-green-600 transition-colors" href="/auth/login">
                    Login
                </Link>
                <Link href="/auth/signup">
                    <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white rounded-full px-6">Get Started</Button>
                </Link>
            </nav>
            {/* Mobile Menu Placeholder - can be added later if needed */}
        </header>
    );
}
