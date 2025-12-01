import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
    const isLoggedIn = !!req.auth;
    const { nextUrl } = req;
    const user = req.auth?.user;

    const isFarmerRoute = nextUrl.pathname.startsWith("/farmer");
    const isBuyerRoute = nextUrl.pathname.startsWith("/buyer");
    const isAuthRoute = nextUrl.pathname.startsWith("/auth");

    if (isAuthRoute) {
        if (isLoggedIn) {
            if ((user as any).role === "farmer") {
                return NextResponse.redirect(new URL("/farmer/dashboard", nextUrl));
            } else {
                return NextResponse.redirect(new URL("/buyer/dashboard", nextUrl));
            }
        }
        return;
    }

    if (!isLoggedIn && (isFarmerRoute || isBuyerRoute)) {
        return NextResponse.redirect(new URL("/auth/login", nextUrl));
    }

    if (isLoggedIn) {
        if (isFarmerRoute && (user as any).role !== "farmer") {
            return NextResponse.redirect(new URL("/buyer/dashboard", nextUrl));
        }
        if (isBuyerRoute && (user as any).role !== "buyer") {
            return NextResponse.redirect(new URL("/farmer/dashboard", nextUrl));
        }
    }

    return;
});

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
