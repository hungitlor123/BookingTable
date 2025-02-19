import { IProduct } from "@/interfaces/Product";
import { getAllCategory } from "@/services/features/category/categorySlice";
import { getAllProduct, updateProduct } from "@/services/features/product/productSlice";
import { useAppDispatch, useAppSelector } from "@/services/store/store";
import { FC, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

interface FormProductData {
    id: number;
    name: string;
    description: string;
    image: FileList | string;
    price: number;
    categoryId: number;
    date: number;
}

interface UpdateProductPopupProps {
    isOpen: boolean;
    onClose: () => void;
    product: IProduct;
}

const UpdateProductPopup: FC<UpdateProductPopupProps> = ({ isOpen, onClose, product }) => {
    const dispatch = useAppDispatch();
    const [imageUrl, setImageUrl] = useState<string | null>(product.image_url || null);
    const { categories } = useAppSelector((state) => state.categories);

    const { register, handleSubmit, reset, formState: { errors } } = useForm<FormProductData>();

    // Lấy danh sách danh mục khi component mount
    useEffect(() => {
        dispatch(getAllCategory());
    }, [dispatch]);

    // Reset form và cập nhật ảnh khi chọn sản phẩm khác
    useEffect(() => {
        reset({
            id: product.id,
            name: product.name,
            description: product.description,
            price: Number(product.price),
            categoryId: product.categoryId,
        });
        setImageUrl(product.image_url || null);
    }, [product, reset]);

    const onSubmit = async (data: FormProductData) => {
        const formData = new FormData();
        formData.append("id", data.id.toString());
        formData.append("name", data.name);
        formData.append("description", data.description);
        formData.append("price", data.price.toString());
        formData.append("categoryId", data.categoryId.toString());
        formData.append("date", Date.now().toString());

        if (data.image && typeof data.image !== "string" && data.image.length > 0) {
            formData.append("imageFile", data.image[0]);
        }

        const result = await dispatch(updateProduct({ data: formData }));
        if (updateProduct.fulfilled.match(result)) {
            await dispatch(getAllProduct());
            onClose();
        }
    };

    return (
        <div
            className={`${isOpen ? "flex" : "hidden"} fixed inset-0 z-50 items-center justify-center backdrop-blur-sm bg-black/50`}
        >
            <div className="relative p-4 w-full max-w-lg bg-white rounded-lg shadow dark:bg-gray-800 md:p-8">
                <h3 className="mb-3 text-2xl font-bold text-gray-900 dark:text-white">Update Product</h3>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-4">
                        <label className="block text-gray-700 dark:text-gray-400">Name</label>
                        <input {...register("name", { required: "Name is required" })} className="w-full px-3 py-2 mt-1 border rounded-lg dark:bg-gray-700 dark:text-gray-300" />
                        {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 dark:text-gray-400">Description</label>
                        <textarea {...register("description", { required: "Description is required" })} className="w-full px-3 py-2 mt-1 border rounded-lg dark:bg-gray-700 dark:text-gray-300 h-32" />
                        {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 dark:text-gray-400">Image</label>
                        {imageUrl && <img src={imageUrl} alt="Product" className="mb-2 w-full h-60 object-cover rounded-lg" />}
                        <input type="file" {...register("image")} className="w-full px-3 py-2 mt-1 border rounded-lg dark:bg-gray-700 dark:text-gray-300" />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 dark:text-gray-400">Category</label>
                        <select {...register("categoryId", { required: "Category is required" })} className="w-full px-3 py-2 mt-1 border rounded-lg dark:bg-gray-700 dark:text-gray-300">
                            <option value="">Select Category</option>
                            {categories && categories.map((category) => (
                                <option key={category.id} value={category.id}>{category.name}</option>
                            ))}
                        </select>
                        {errors.categoryId && <p className="text-red-500 text-sm">{errors.categoryId.message}</p>}
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 dark:text-gray-400">Price</label>
                        <input type="number" {...register("price", { required: "Price is required" })} className="w-full px-3 py-2 mt-1 border rounded-lg dark:bg-gray-700 dark:text-gray-300" />
                        {errors.price && <p className="text-red-500 text-sm">{errors.price.message}</p>}
                    </div>
                    <div className="flex justify-between items-center">
                        <button type="button" className="px-4 py-2 text-white bg-red-500 rounded-lg" onClick={onClose}>Cancel</button>
                        <button type="submit" className="px-4 py-2 text-white bg-blue-600 rounded-lg">Update Product</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateProductPopup;
