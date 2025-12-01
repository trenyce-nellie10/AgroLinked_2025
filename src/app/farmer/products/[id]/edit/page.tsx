import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import ProductForm from "@/components/farmer/product-form";
import { redirect } from "next/navigation";

interface EditProductPageProps {
    params: {
        id: string;
    };
}

export default async function EditProductPage({ params }: EditProductPageProps) {
    const session = await auth();
    const farmerId = (session?.user as any).id;

    const product = await db.product.findUnique({
        where: {
            id: params.id,
            farmerId,
        },
    });

    if (!product) {
        redirect("/farmer/products");
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-[80vh] p-8">
            <div className="w-full max-w-2xl space-y-6">
                <h1 className="text-3xl font-bold text-center">Edit Product</h1>
                <div className="bg-white p-6 rounded-lg shadow-sm border">
                    <ProductForm initialData={product} />
                </div>
            </div>
        </div>
    );
}
