import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight, Leaf, ShieldCheck, Truck } from "lucide-react";

export default function LandingPage() {
    return (
        <div className="flex flex-col min-h-screen">
            {/* Hero Section */}
            <section className="w-full py-20 md:py-32 lg:py-48 relative overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <Image
                        src="/vegetables-bg.png"
                        alt="Fresh Vegetables"
                        fill
                        className="object-cover brightness-[0.4]"
                        priority
                    />
                </div>
                <div className="container px-6 mx-auto relative z-10">
                    <div className="flex flex-col items-center space-y-8 text-center max-w-4xl mx-auto">
                        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl text-white">
                            Fresh produce, <span className="text-green-400">simplified.</span>
                        </h1>
                        <p className="mx-auto max-w-[700px] text-gray-200 md:text-xl leading-relaxed">
                            AgroLinked connects local farmers directly with buyers. No middlemen, just fresh, high-quality produce at fair prices.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
                            <Link href="/auth/signup">
                                <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white px-8 h-12 text-lg rounded-full w-full sm:w-auto border-none">
                                    Get Started <ArrowRight className="ml-2 h-4 w-4" />
                                </Button>
                            </Link>
                            <Link href="/about">
                                <Button variant="outline" size="lg" className="px-8 h-12 text-lg rounded-full w-full sm:w-auto bg-white/10 text-white border-white hover:bg-white/20 hover:text-white">
                                    Learn More
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Grid */}
            <section className="w-full py-12 md:py-24 bg-gray-50">
                <div className="container px-6 mx-auto">
                    <div className="grid md:grid-cols-3 gap-12">
                        <div className="flex flex-col items-center text-center space-y-4">
                            <div className="p-4 bg-green-100 rounded-full">
                                <Leaf className="h-8 w-8 text-green-600" />
                            </div>
                            <h3 className="text-xl font-bold">100% Organic</h3>
                            <p className="text-gray-500">Sourced directly from certified local farmers who care about quality.</p>
                        </div>
                        <div className="flex flex-col items-center text-center space-y-4">
                            <div className="p-4 bg-blue-100 rounded-full">
                                <ShieldCheck className="h-8 w-8 text-blue-600" />
                            </div>
                            <h3 className="text-xl font-bold">Secure Payments</h3>
                            <p className="text-gray-500">Transactions are protected and verified for your peace of mind.</p>
                        </div>
                        <div className="flex flex-col items-center text-center space-y-4">
                            <div className="p-4 bg-orange-100 rounded-full">
                                <Truck className="h-8 w-8 text-orange-600" />
                            </div>
                            <h3 className="text-xl font-bold">Fast Delivery</h3>
                            <p className="text-gray-500">Efficient logistics ensure your produce arrives fresh and on time.</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
