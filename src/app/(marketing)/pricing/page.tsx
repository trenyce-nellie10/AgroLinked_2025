import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Check } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export default function PricingPage() {
    return (
        <div className="flex flex-col min-h-screen pt-12 text-gray-900">
            <section className="py-12 md:py-24 lg:py-32 text-center">
                <div className="container px-4 md:px-6 mx-auto">
                    <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4 text-gray-900">
                        Simple, Transparent Pricing
                    </h1>
                    <p className="mx-auto max-w-[700px] text-gray-600 md:text-xl">
                        Choose the plan that fits your needs. No hidden fees.
                    </p>
                </div>
            </section>

            <section className="pb-12 md:pb-24 lg:pb-32">
                <div className="container px-4 md:px-6 mx-auto grid md:grid-cols-3 gap-8 max-w-5xl">
                    {/* Buyer Plan */}
                    <Card className="flex flex-col border-2 hover:border-green-500 transition-all">
                        <CardHeader>
                            <CardTitle className="text-2xl">Buyer</CardTitle>
                            <CardDescription>For individuals and families</CardDescription>
                        </CardHeader>
                        <CardContent className="flex-1">
                            <div className="text-4xl font-bold mb-4">$0<span className="text-lg font-normal text-gray-500">/mo</span></div>
                            <ul className="space-y-2 text-sm">
                                <li className="flex items-center gap-2">
                                    <Check className="h-4 w-4 text-green-600" /> Access to all farmers
                                </li>
                                <li className="flex items-center gap-2">
                                    <Check className="h-4 w-4 text-green-600" /> Secure payments
                                </li>
                                <li className="flex items-center gap-2">
                                    <Check className="h-4 w-4 text-green-600" /> Order tracking
                                </li>
                            </ul>
                        </CardContent>
                        <CardFooter>
                            <Link href="/auth/signup" className="w-full">
                                <Button className="w-full" variant="outline">Sign Up Free</Button>
                            </Link>
                        </CardFooter>
                    </Card>

                    {/* Farmer Basic */}
                    <Card className="flex flex-col border-2 border-green-600 shadow-lg scale-105 relative">
                        <div className="absolute top-0 right-0 bg-green-600 text-white text-xs px-3 py-1 rounded-bl-lg font-bold">POPULAR</div>
                        <CardHeader>
                            <CardTitle className="text-2xl">Farmer Basic</CardTitle>
                            <CardDescription>Start selling your produce</CardDescription>
                        </CardHeader>
                        <CardContent className="flex-1">
                            <div className="text-4xl font-bold mb-4">5%<span className="text-lg font-normal text-gray-500"> commission</span></div>
                            <ul className="space-y-2 text-sm">
                                <li className="flex items-center gap-2">
                                    <Check className="h-4 w-4 text-green-600" /> Unlimited product listings
                                </li>
                                <li className="flex items-center gap-2">
                                    <Check className="h-4 w-4 text-green-600" /> Dashboard analytics
                                </li>
                                <li className="flex items-center gap-2">
                                    <Check className="h-4 w-4 text-green-600" /> Direct buyer communication
                                </li>
                                <li className="flex items-center gap-2">
                                    <Check className="h-4 w-4 text-green-600" /> No monthly fees
                                </li>
                            </ul>
                        </CardContent>
                        <CardFooter>
                            <Link href="/auth/signup" className="w-full">
                                <Button className="w-full bg-green-600 hover:bg-green-700">Start Selling</Button>
                            </Link>
                        </CardFooter>
                    </Card>

                    {/* Enterprise */}
                    <Card className="flex flex-col border-2 hover:border-green-500 transition-all">
                        <CardHeader>
                            <CardTitle className="text-2xl">Enterprise</CardTitle>
                            <CardDescription>For wholesalers and co-ops</CardDescription>
                        </CardHeader>
                        <CardContent className="flex-1">
                            <div className="text-4xl font-bold mb-4">Custom</div>
                            <ul className="space-y-2 text-sm">
                                <li className="flex items-center gap-2">
                                    <Check className="h-4 w-4 text-green-600" /> Bulk ordering tools
                                </li>
                                <li className="flex items-center gap-2">
                                    <Check className="h-4 w-4 text-green-600" /> API access
                                </li>
                                <li className="flex items-center gap-2">
                                    <Check className="h-4 w-4 text-green-600" /> Dedicated support
                                </li>
                            </ul>
                        </CardContent>
                        <CardFooter>
                            <Button className="w-full" variant="outline">Contact Sales</Button>
                        </CardFooter>
                    </Card>
                </div>
            </section>
        </div>
    );
}
