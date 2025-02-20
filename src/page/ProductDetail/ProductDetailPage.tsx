import { useAppDispatch, useAppSelector } from "@/services/store/store";
import { useParams } from "react-router-dom";
import { formatMMDDYYYYDate } from "@/utils";
import { useEffect } from "react";
import { getProductById } from "@/services/features/product/productSlice";
import Header from "@/components/Header/Header";
import { Footer } from "@/components/Footer/Footer";

const ProductDetailPage = () => {
    const { id } = useParams();
    const dispatch = useAppDispatch();

    // Lấy thông tin sản phẩm từ Redux
    const { product, loading } = useAppSelector((state) => state.products);

    // Lấy danh sách danh mục từ Redux (đã fetch trong Header)
    const categories = useAppSelector((state) => state.categories.categories);

    useEffect(() => {
        if (id) {
            dispatch(getProductById({ id: Number(id) }));
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
            <div className="max-w-5xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
                {/* Tên sản phẩm */}
                <h1 className="text-4xl font-bold text-center mb-6">{product.name}</h1>

                {/* Hiển thị danh mục sản phẩm */}
                <p className="text-lg text-left text-gray-700 font-bold mb-4">
                    <span className="text-blue-500">{category ? category.name : "Unknown"}</span>
                </p>

                {/* Hình ảnh sản phẩm */}
                <div className="w-full flex justify-center mb-4">
                    <img
                        src={product.image_url}
                        alt={product.name}
                        className="w-full h-[500px] object-cover rounded-lg shadow-md"
                    />
                </div>

                {/* Mô tả sản phẩm */}
                <p className="text-gray-600 text-lg leading-relaxed text-center italic mb-4">
                    {product.description}
                </p>

                {/* Giá sản phẩm & Ngày cập nhật */}
                <div className="border-t border-gray-300 pt-4 mt-4">
                    <p className="text-xl text-center font-semibold text-blue-600">
                        Price: {product.price ? product.price.toLocaleString() : "N/A"} USD
                    </p>
                    <p className="text-center text-gray-500 text-sm mt-2">
                        Update: {formatMMDDYYYYDate(new Date(product.updatedAt))}
                    </p>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default ProductDetailPage;