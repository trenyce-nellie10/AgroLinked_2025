import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CheckCircle2, Leaf, Users, Globe } from "lucide-react";

export default function AboutPage() {
    return (
        <div className="flex flex-col min-h-screen pt-12 text-gray-900">
            {/* Hero Section */}
            <section className="py-12 md:py-24 lg:py-32 bg-green-50">
                <div className="container px-4 md:px-6 mx-auto text-center">
                    <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl text-green-900">
                        Cultivating Connections
                    </h1>
                    <p className="mx-auto max-w-[700px] text-gray-600 md:text-xl mt-4">
                        AgroLinked is on a mission to democratize agricultural trade by directly connecting hardworking farmers with conscious buyers.
                    </p>
                </div>
            </section>

            {/* Mission & Vision */}
            <section className="py-12 md:py-24 lg:py-32">
                <div className="container px-4 md:px-6 mx-auto grid md:grid-cols-2 gap-12 items-center">
                    <div className="space-y-4">
                        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Our Mission</h2>
                        <p className="text-gray-600 text-lg leading-relaxed">
                            To eliminate food waste and increase farmer profitability by removing unnecessary middlemen from the supply chain. We believe in a transparent, fair, and efficient marketplace for everyone.
                        </p>
                        <ul className="space-y-2 mt-4">
                            <li className="flex items-center gap-2">
                                <CheckCircle2 className="h-5 w-5 text-green-600" />
                                <span>Fair prices for farmers</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <CheckCircle2 className="h-5 w-5 text-green-600" />
                                <span>Fresher produce for buyers</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <CheckCircle2 className="h-5 w-5 text-green-600" />
                                <span>Sustainable local economies</span>
                            </li>
                        </ul>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-green-100 p-6 rounded-2xl flex flex-col items-center justify-center text-center h-48">
                            <Leaf className="h-10 w-10 text-green-600 mb-2" />
                            <h3 className="font-bold">Sustainability</h3>
                        </div>
                        <div className="bg-blue-100 p-6 rounded-2xl flex flex-col items-center justify-center text-center h-48">
                            <Users className="h-10 w-10 text-blue-600 mb-2" />
                            <h3 className="font-bold">Community</h3>
                        </div>
                        <div className="bg-orange-100 p-6 rounded-2xl flex flex-col items-center justify-center text-center h-48 col-span-2">
                            <Globe className="h-10 w-10 text-orange-600 mb-2" />
                            <h3 className="font-bold">Global Impact, Local Roots</h3>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-12 md:py-24 lg:py-32 bg-black text-white text-center">
                <div className="container px-4 md:px-6 mx-auto">
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl mb-4">Join the Revolution</h2>
                    <p className="mx-auto max-w-[600px] text-gray-400 mb-8">
                        Whether you are growing the food or enjoying it, there is a place for you at AgroLinked.
                    </p>
                    <div className="flex justify-center gap-4">
                        <Link href="/auth/signup">
                            <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white">Get Started</Button>
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
