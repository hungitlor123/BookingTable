import { useEffect, useState } from "react";
import Header from "@/components/Header/Header";
import { useAppDispatch, useAppSelector } from "@/services/store/store";
import { getAllProduct } from "@/services/features/product/productSlice";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Footer } from "@/components/Footer/Footer";
import { Link } from "react-router-dom";
import Category from "@/components/Category/Category";


// Fake API call delay simulation



const HomePage = () => {
    const dispatch = useAppDispatch();
    const { products } = useAppSelector((state) => state.products);
    const [loading, setLoading] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false);
    const [visibleProducts, setVisibleProducts] = useState(6); // Mặc định hiển thị 6 sản phẩm

    useEffect(() => {
        dispatch(getAllProduct());
        // Giả lập tải dữ liệu ban đầu trong 2 giây
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1000);

        return () => clearTimeout(timer);
    }, [dispatch]);

    // Xử lý Load More
    const handleLoadMore = () => {
        setLoadingMore(true); // Hiển thị Skeleton khi tải thêm
        setTimeout(() => {
            setVisibleProducts((prev) => prev + 6); // Tăng thêm 6 sản phẩm mỗi lần
            setLoadingMore(false);
        }, 1000); // Giả lập thời gian tải 2s
    };

    return (
        <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
            <Header />

            <main className="container mx-auto px-4 py-10 flex-grow">
                <div className="mb-8">
                    <h2 className="text-xl font-semibold flex items-center gap-2">
                        <span className="bg-black text-white px-3 py-1 rounded">
                            RECENTLY UPLOADED RYTEMS MODEL
                        </span>
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {loading
                        ? Array.from({ length: 6 }).map((_, index) => (
                            <div key={index} className="w-full">
                                <Skeleton className="w-full aspect-[16/9] rounded-lg" />
                                <div className="mt-2 h-6 w-3/4 mx-auto bg-gray-200 rounded animate-pulse"></div>
                            </div>
                        ))
                        : products?.slice(0, visibleProducts).map((product) => (
                            <Link key={product.id} to={`/products/${product.id}`} className="text-center group">
                                <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
                                    <div className="w-full aspect-[16/9] overflow-hidden bg-gray-50">
                                        <img
                                            src={product.image_url}
                                            alt={product.name}
                                            className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                                        />
                                    </div>
                                </div>
                                <h3 className="mt-3 text-base font-medium text-gray-900 group-hover:text-blue-700 transition-colors">
                                    {product.name}
                                </h3>
                            </Link>
                        ))}

                    {/* Hiển thị Skeleton khi load thêm sản phẩm */}
                    {loadingMore &&
                        Array.from({ length: 6 }).map((_, index) => (
                            <div key={`loading-${index}`} className="w-full">
                                <Skeleton className="w-full aspect-[16/9] rounded-lg" />
                                <div className="mt-2 h-6 w-3/4 mx-auto bg-gray-200 rounded animate-pulse"></div>
                            </div>
                        ))}
                </div>

                {/* Nút Load More */}
                {!loading && visibleProducts < (products?.length ?? 0) && (
                    <div className="flex justify-center mt-6">
                        <Button onClick={handleLoadMore} disabled={loadingMore} className="bg-blue-700 hover:bg-blue-600 text-white">
                            {loadingMore ? "Loading..." : "Load More"}
                        </Button>
                    </div>
                )}
            </main>

            <Category />

            <Footer />
        </div>
    );
};

export default HomePage;