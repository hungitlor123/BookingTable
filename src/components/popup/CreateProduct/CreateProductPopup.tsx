import { createProduct, getAllProduct } from "@/services/features/product/productSlice";
import { useAppDispatch, useAppSelector } from "@/services/store/store";
import { FC, } from "react";
import { useForm } from "react-hook-form";

type FormProductData = {
    name: string;
    description: string;
    image: FileList;
    url: string;
    categoryId: number;  // Mới thêm categoryId
    date: number;
};

type CreateProductPopupProps = {
    isOpen: boolean;
    onClose: () => void;
};

const CreateProductPopup: FC<CreateProductPopupProps> = ({ isOpen, onClose }) => {
    const dispatch = useAppDispatch();
    const { register, handleSubmit, formState: { errors }, reset } = useForm<FormProductData>();

    const { categories } = useAppSelector((state) => state.categories);


    const onSubmit = async (data: FormProductData) => {
        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('description', data.description);

        // Append the image file with the correct key
        if (data.image && data.image.length > 0) {
            formData.append('imageFile', data.image[0]); // Changed 'image' to 'imageFile'
        } else {
            console.error("Image file not found");
            return;
        }

        formData.append('url', data.url.toString());
        formData.append('categoryId', data.categoryId.toString()); // Thêm categoryId vào formData
        formData.append('date', Date.now().toString()); // Đổi 'timestamp' thành 'date'
        // Dispatch the thunk action with formData
        const result = await dispatch(createProduct(formData));
        if (createProduct.fulfilled.match(result)) {
            await dispatch(getAllProduct());
            onClose();
            reset(); // Reset form after successful submission
        }
    };

    const handleClose = () => {
        reset();  // Reset form when the popup is closed
        onClose();
    };

    return (
        <div
            id="info-popup"
            className={`${isOpen ? "flex" : "hidden"} fixed inset-0 z-50 items-center justify-center backdrop-blur-sm bg-black/50`}
        >
            <div className="relative p-4 w-full max-w-lg bg-white rounded-lg shadow dark:bg-gray-800 md:p-8">
                <h3 className="mb-3 text-2xl font-bold text-gray-900 dark:text-white">
                    Create Product
                </h3>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-4">
                        <label className="block text-gray-700 dark:text-gray-400">Name</label>
                        <input
                            {...register("name", { required: "Name is required" })}
                            className="w-full px-3 py-2 mt-1 border rounded-lg dark:bg-gray-700 dark:text-gray-300"
                        />
                        {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 dark:text-gray-400">Description</label>
                        <textarea
                            {...register("description", { required: "Description is required" })}
                            className="w-full px-3 py-2 mt-1 border rounded-lg dark:bg-gray-700 dark:text-gray-300"
                        />
                        {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 dark:text-gray-400">Image</label>
                        <input
                            type="file"
                            accept="image/*"
                            {...register("image", { required: "Image file is required" })}
                            className="w-full px-3 py-2 mt-1 border rounded-lg dark:bg-gray-700 dark:text-gray-300"
                        />
                        {errors.image && <p className="text-red-500 text-sm">{errors.image.message}</p>}
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 dark:text-gray-400">Category</label>
                        <select
                            {...register("categoryId", { required: "Category is required" })}
                            className="w-full px-3 py-2 mt-1 border rounded-lg dark:bg-gray-700 dark:text-gray-300"
                        >
                            <option value="">Select Category</option>
                            {categories &&
                                categories
                                    .filter(category => category.parentId !== null) // Chỉ lấy category có parentId khác null
                                    .map((category) => (
                                        <option key={category.id} value={category.id}>
                                            {category.name}
                                        </option>
                                    ))}
                        </select>
                        {errors.categoryId && <p className="text-red-500 text-sm">{errors.categoryId.message}</p>}
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 dark:text-gray-400">url</label>
                        <input
                            type="string"
                            {...register("url", { required: "url is required" })}
                            className="w-full px-3 py-2 mt-1 border rounded-lg dark:bg-gray-700 dark:text-gray-300"
                        />
                        {errors.url && <p className="text-red-500 text-sm">{errors.url.message}</p>}
                    </div>

                    <div className="flex justify-between items-center space-y-4 sm:flex sm:space-y-0">
                        <button
                            type="button"
                            onClick={handleClose}
                            className="py-2 px-4 w-full text-sm font-medium text-white bg-red-500 rounded-lg border border-gray-200 sm:w-auto hover:bg-red-700 focus:ring-4 focus:outline-none"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="py-2 px-4 w-full text-sm font-medium text-white bg-green-700 rounded-lg sm:w-auto hover:bg-green-800 focus:ring-4 focus:outline-none"
                        >
                            Create Product
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
export default CreateProductPopup;
