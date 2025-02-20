import { useAppDispatch, useAppSelector } from "@/services/store/store";
import { useParams } from "react-router-dom";
import { formatMMDDYYYYDate } from "@/utils";
import { useEffect } from "react";
import { getProductById } from "@/services/features/product/productSlice";
import Header from "@/components/Header/Header";
import { Footer } from "@/components/Footer/Footer";
import { getAllCategory } from "@/services/features/category/categorySlice";

const ProductDetailPage = () => {
    const { id } = useParams();
    const dispatch = useAppDispatch();

    // Lấy thông tin sản phẩm từ Redux
    const { product, loading } = useAppSelector((state) => state.products);
    // Lấy danh sách danh mục từ Redux
    const categories = useAppSelector((state) => state.categories.categories);

    useEffect(() => {
        if (id) {
            dispatch(getProductById({ id: Number(id) }));
            dispatch(getAllCategory());
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
                                        className="flex-1 text-center py-3 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition"
                                    >
                                        Driver
                                    </a>
                                    <a
                                        href="https://www.facebook.com/profile.php?id=61572939565326"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex-1 text-center py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
                                    >
                                        Facebook
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default ProductDetailPage;