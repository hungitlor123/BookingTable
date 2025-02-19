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

    const { product } = useAppSelector((state) => state.products);

    useEffect(() => {
        if (id) {
            dispatch(getProductById({ id: Number(id) }));
        }
    }, [dispatch, id]);

    if (!product) {
        return (
            <div className="flex items-center justify-center h-screen text-xl font-bold text-red-500">
                Product not found!
            </div>
        );
    }

    return (
        <>
            <Header />
            <div className="max-w-5xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
                <h1 className="text-4xl font-bold text-center mb-6">{product.name}</h1>
                <div className="w-full flex justify-center mb-4">
                    <img
                        src={product.image_url}
                        alt={product.name}
                        className="w-full h-[500px] object-cover rounded-lg shadow-md"
                    />
                </div>
                <p className="text-gray-600 text-lg leading-relaxed text-center italic mb-4">
                    {product.description}
                </p>
                <div className="border-t border-gray-300 pt-4 mt-4">
                    <p className="text-xl text-center font-semibold text-blue-600">
                        Price: {product.price.toLocaleString()} USD
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
