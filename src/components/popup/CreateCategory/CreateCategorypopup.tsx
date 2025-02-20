import { createCategory, getAllCategory } from "@/services/features/category/categorySlice";
import { useAppDispatch, useAppSelector } from "@/services/store/store";
import { FC, useEffect } from "react";
import { useForm } from "react-hook-form";

interface CreateCategoryPopupProps {
    isOpen: boolean;
    onClose: () => void;
}

interface FormCategoryData {
    name: string;
    parentId?: string;
}

const CreateCategoryPopup: FC<CreateCategoryPopupProps> = ({ isOpen, onClose }) => {
    const dispatch = useAppDispatch();
    const { register, handleSubmit, formState: { errors }, reset } = useForm<FormCategoryData>();

    // Lấy danh sách categories từ Redux Store
    const { categories } = useAppSelector((state) => state.categories);

    useEffect(() => {
        dispatch(getAllCategory());
    }, [dispatch]);

    const onSubmit = async (data: FormCategoryData) => {
        const categoryData = {
            name: data.name,
            parentId: data.parentId || null, // Nếu không chọn danh mục cha thì gửi null
        };

        const result = await dispatch(createCategory(categoryData));
        if (createCategory.fulfilled.match(result)) {
            await dispatch(getAllCategory()); // Load lại danh mục sau khi thêm mới
            onClose();
            reset();
        }
    };

    return (
        <div className={`${isOpen ? "flex" : "hidden"} fixed inset-0 z-50 items-center justify-center backdrop-blur-sm bg-black/50`}>
            <div className="relative p-4 w-full max-w-lg bg-white rounded-lg shadow dark:bg-gray-800 md:p-8">
                <h3 className="mb-3 text-2xl font-bold text-gray-900 dark:text-white">Create Category</h3>

                <form onSubmit={handleSubmit(onSubmit)}>
                    {/* Nhập tên danh mục */}
                    <div className="mb-4">
                        <label className="block text-gray-700 dark:text-gray-400">Category Name</label>
                        <input
                            {...register("name", { required: "Category name is required" })}
                            className="w-full px-3 py-2 mt-1 border rounded-lg dark:bg-gray-700 dark:text-gray-300"
                        />
                        {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
                    </div>

                    {/* Chọn danh mục cha */}
                    <div className="mb-4">
                        <label className="block text-gray-700 dark:text-gray-400">Parent Category (Optional)</label>
                        <select
                            {...register("parentId")}
                            className="w-full px-3 py-2 mt-1 border rounded-lg dark:bg-gray-700 dark:text-gray-300"
                        >
                            <option value="">No Parent (Main Category)</option>
                            {categories &&
                                categories
                                    .filter(category => category.parentId === null) // Chỉ lấy danh mục cha
                                    .map(category => (
                                        <option key={category.id} value={category.id}>
                                            {category.name}
                                        </option>
                                    ))}
                        </select>
                    </div>

                    {/* Nút hành động */}
                    <div className="flex justify-between items-center space-y-4 sm:flex sm:space-y-0">
                        <button
                            type="button"
                            onClick={onClose}
                            className="py-2 px-4 w-full text-sm font-medium text-white bg-red-500 rounded-lg sm:w-auto hover:bg-red-700"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="py-2 px-4 w-full text-sm font-medium text-white bg-green-700 rounded-lg sm:w-auto hover:bg-green-800"
                        >
                            Create Category
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateCategoryPopup;