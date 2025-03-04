import { useAppDispatch, useAppSelector } from "@/services/store/store";
import { useParams } from "react-router-dom";
import { formatMMDDYYYYDate } from "@/utils";
import { useEffect } from "react";
import { getAllProduct, getProductById } from "@/services/features/product/productSlice";
import Header from "@/components/Header/Header";
import { Footer } from "@/components/Footer/Footer";
import { getAllCategory } from "@/services/features/category/categorySlice";
import { Link } from "react-router-dom";

const ProductDetailPage = () => {
    const { id } = useParams();
    const dispatch = useAppDispatch();

    // Lấy thông tin sản phẩm, danh sách sản phẩm và loading từ Redux
    const { product, loading, products } = useAppSelector((state) => state.products);
    // Lấy danh sách danh mục từ Redux
    const categories = useAppSelector((state) => state.categories.categories);

    useEffect(() => {
        if (id) {
            dispatch(getProductById({ id: Number(id) }));
            dispatch(getAllCategory());
            // Gọi API lấy danh sách sản phẩm để hiển thị phần "You might also like"
            dispatch(getAllProduct());
        }
    }, [dispatch, id]);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen text-xl font-bold text-blue-500">
                Loading product details...
            </div>
        );
    }

    if (!product) {
        return (
            <div className="flex items-center justify-center h-screen text-xl font-bold text-red-500">
                Product not found!
            </div>
        );
    }

    // Tìm danh mục tương ứng với categoryId của sản phẩm
    const category = categories?.find((cat) => cat.id === product.categoryId);

    // Lọc ra danh sách sản phẩm khuyến nghị, loại bỏ sản phẩm hiện tại
    const recommendedProducts = products?.filter((p) => p.id !== product.id) || [];

    return (
        <>
            <Header />
            <div className="max-w-6xl mx-auto p-6 mt-10">
                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                    <div className="md:grid md:grid-cols-2">
                        {/* Cột bên trái: Hình ảnh sản phẩm */}
                        <div className="relative">
                            <img
                                src={product.image_url}
                                alt={product.name}
                                className="w-full h-96 object-cover"
                            />
                        </div>
                        {/* Cột bên phải: Thông tin chi tiết sản phẩm */}
                        <div className="p-8 flex flex-col justify-between">
                            <div>
                                <h1 className="text-4xl font-bold text-gray-800 mb-4">
                                    {product.name}
                                </h1>
                                <p className="inline-block bg-blue-100 text-blue-600 text-sm font-semibold px-3 py-1 rounded-full mb-6">
                                    {category ? category.name : "Unknown"}
                                </p>
                                <p className="text-gray-600 text-lg leading-relaxed mb-6 italic">
                                    {product.description}
                                </p>
                            </div>
                            <div>
                                <p className="text-gray-500 text-sm mb-4">
                                    Last updated: {formatMMDDYYYYDate(new Date(product.updatedAt))}
                                </p>
                                <div className="flex space-x-4">
                                    <a
                                        href={product.url ? product.url : "#"}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex-1 flex items-center justify-center py-3 bg-green-300 text-black font-semibold rounded-lg hover:bg-green-600 transition"
                                    >
                                        Preview
                                    </a>

                                    <a
                                        href="https://www.facebook.com/profile.php?id=61572939565326"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex-1 flex items-center justify-center py-3 bg-blue-300 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
                                    >
                                        {/* Facebook SVG */}
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 36 36"
                                            className="w-6 h-6"
                                        >
                                            <defs>
                                                <linearGradient x1="50%" x2="50%" y1="97.078%" y2="0%" id="a">
                                                    <stop offset="0%" stopColor="#0062E0" />
                                                    <stop offset="100%" stopColor="#19AFFF" />
                                                </linearGradient>
                                            </defs>
                                            <path
                                                d="M15 35.8C6.5 34.3 0 26.9 0 18 0 8.1 8.1 0 18 0s18 8.1 18 18c0 8.9-6.5 16.3-15 17.8l-1-.8h-4l-1 .8z"
                                                fill="url(#a)"
                                            />
                                            <path
                                                fill="#FFF"
                                                d="m25 23 .8-5H21v-3.5c0-1.4.5-2.5 2.7-2.5H26V7.4c-1.3-.2-2.7-.4-4-.4-4.1 0-7 2.5-7 7v4h-4.5v5H15v12.7c1 .2 2 .3 3 .3s2-.1 3-.3V23h4z"
                                            />
                                        </svg>
                                    </a>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>

                {/* Phần "You might also like" */}
                <div className="mt-12">
                    <h2 className="text-2xl font-bold mb-4">You Might Also Like</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {recommendedProducts && recommendedProducts.length > 0 ? (
                            recommendedProducts.slice(0, 8).map((prod) => (
                                <Link key={prod.id} to={`/products/${prod.id}`} className="block">
                                    {/* Container item có nền tối và text màu trắng */}
                                    <div className="bg-gray-100 text-gray-800 p-3 rounded hover:shadow-lg transition">
                                        {/* Hình ảnh sản phẩm */}
                                        <div className="overflow-hidden h-48 mb-2">
                                            <img
                                                src={prod.image_url}
                                                alt={prod.name}
                                                className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
                                            />
                                        </div>
                                        {/* Tên sản phẩm */}
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

            </div>
            <Footer />
        </>
    );
};
export default ProductDetailPage;