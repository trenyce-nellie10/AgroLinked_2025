import Link from "next/link";

export default function MarketingFooter() {
    return (
        <footer className="py-8 w-full border-t border-gray-100 bg-white">
            <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
                <p className="text-sm text-gray-500">© 2025 AgroLinked. All rights reserved.</p>
                <nav className="flex gap-6">
                    <Link className="text-sm text-gray-500 hover:text-green-600 transition-colors" href="#">
                        Terms
                    </Link>
                    <Link className="text-sm text-gray-500 hover:text-green-600 transition-colors" href="#">
                        Privacy
                    </Link>
                </nav>
            </div>
        </footer>
    );
}
