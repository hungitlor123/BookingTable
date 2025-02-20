import { Footer } from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import { getProductByCategory } from "@/services/features/product/productSlice";
import { useAppDispatch, useAppSelector } from "@/services/store/store";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const CategoryProductsPage = () => {
    const { categoryId } = useParams<{ categoryId: string }>();
    const dispatch = useAppDispatch();
    const { products } = useAppSelector((state) => state.products);
    const [loading, setLoading] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false);
    const [visibleProducts, setVisibleProducts] = useState(6); // Hiển thị 6 sản phẩm ban đầu

    useEffect(() => {
        if (categoryId) {
            dispatch(getProductByCategory({ categoryId: Number(categoryId) }));
            setTimeout(() => {
                setLoading(false);
            }, 1000);
        }
    }, [dispatch, categoryId]);

    const handleLoadMore = () => {
        setLoadingMore(true);
        setTimeout(() => {
            setVisibleProducts((prev) => prev + 6);
            setLoadingMore(false);
        }, 1000);
    };

    return (
        <>
            <Header />
            <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
                <main className="container mx-auto px-4 py-8 flex-grow">
                    <h2 className="text-xl font-semibold flex items-center gap-2">
                        <span className="bg-black text-white px-3 py-1 rounded">
                            PRODUCT CATEGORY
                        </span>
                    </h2>

                    {/* Nếu loading thì hiển thị skeleton */}
                    {loading ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {Array.from({ length: 6 }).map((_, index) => (
                                <div key={index} className="w-full">
                                    <div className="w-full aspect-[4/3] bg-gray-200 rounded animate-pulse"></div>
                                    <div className="mt-2 h-6 w-3/4 mx-auto bg-gray-200 rounded animate-pulse"></div>
                                </div>
                            ))}
                        </div>
                    ) : products?.length === 0 ? (
                        /* Nếu không có sản phẩm nào */
                        <div className="text-center text-gray-500 text-lg mt-10">
                            This product is currently not available.
                        </div>
                    ) : (
                        /* Hiển thị danh sách sản phẩm nếu có */
                        <>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {products?.slice(0, visibleProducts).map((product) => (
                                    <a key={product.id} href={`/products/${product.id}`} className="text-center">
                                        <div className="border border-gray-300 rounded-md overflow-hidden shadow-sm">
                                            <div className="w-full aspect-[4/3] overflow-hidden">
                                                <img
                                                    src={product.image_url}
                                                    alt={product.name}
                                                    className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
                                                />
                                            </div>
                                        </div>
                                        <h3 className="mt-2 text-base font-semibold text-gray-900 hover:text-blue-700 transition-colors">
                                            {product.name}
                                        </h3>
                                    </a>
                                ))}
                            </div>

                            {/* Nút Load More */}
                            {visibleProducts < (products?.length ?? 0) && (
                                <div className="flex justify-center mt-6">
                                    <button
                                        onClick={handleLoadMore}
                                        disabled={loadingMore}
                                        className="bg-blue-700 hover:bg-blue-600 text-white px-4 py-2 rounded"
                                    >
                                        {loadingMore ? "Loading..." : "Load More"}
                                    </button>
                                </div>
                            )}
                        </>
                    )}
                </main>
            </div>
            <Footer />
        </>
    );
};

export default CategoryProductsPage;