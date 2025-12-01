import ProductForm from "@/components/farmer/product-form";

export default function NewProductPage() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[80vh] p-8">
            <div className="w-full max-w-2xl space-y-6">
                <h1 className="text-3xl font-bold text-center">Add New Product</h1>
                <div className="bg-white p-6 rounded-lg shadow-sm border">
                    <ProductForm />
                </div>
            </div>
        </div>
    );
}
