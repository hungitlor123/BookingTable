import { IProduct } from "@/interfaces/Product";
import React from "react";
import { Link } from "react-router-dom";



// Định nghĩa props cho component
interface RecommendedProductsProps {
    products: IProduct[];
}

const RecommendedProducts: React.FC<RecommendedProductsProps> = ({ products }) => {
    return (
        <div className="mt-12">
            <h2 className="text-2xl font-bold mb-4">You Might Also Like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {products && products.length > 0 ? (
                    products.slice(0, 8).map((prod) => (
                        <Link key={prod.id} to={`/products/${prod.id}`} className="block">
                            <div className="bg-gray-100 text-gray-800 p-3 rounded hover:shadow-lg transition">
                                <div className="overflow-hidden h-48 mb-2">
                                    <img
                                        src={prod.image_url}
                                        alt={prod.name}
                                        className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
                                    />
                                </div>
                                <h3 className="text-sm font-semibold line-clamp-2">
                                    {prod.name}
                                </h3>
                            </div>
                        </Link>
                    ))
                ) : (
                    <div className="col-span-full text-center text-gray-500">
                        Loading recommendations...
                    </div>
                )}
            </div>
        </div>
    );
};

export default RecommendedProducts;
