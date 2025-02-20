import { ICategory } from "@/interfaces/Category";
import { getAllCategory, updateCategory } from "@/services/features/category/categorySlice";
import { useAppDispatch, useAppSelector } from "@/services/store/store";
import { FC, useEffect } from "react";
import { useForm } from "react-hook-form";

interface FormCategoryData {
    id: string;
    name: string;
    parentId?: string | null;
}

interface UpdateCategoryPopupProps {
    isOpen: boolean;
    onClose: () => void;
    categoryToEdit: ICategory | null;
}

const UpdateCategoryPopup: FC<UpdateCategoryPopupProps> = ({ isOpen, onClose, categoryToEdit }) => {
    const dispatch = useAppDispatch();
    const { categories } = useAppSelector((state) => state.categories);

    const { register, handleSubmit, reset, formState: { errors } } = useForm<FormCategoryData>();

    // Lấy danh sách danh mục khi component mount
    useEffect(() => {
        dispatch(getAllCategory());
    }, [dispatch]);

    // Reset form khi mở popup
    useEffect(() => {
        if (categoryToEdit) {
            reset({
                id: categoryToEdit.id.toString(),
                name: categoryToEdit.name,
                parentId: categoryToEdit.parentId ? categoryToEdit.parentId.toString() : "",
            });
        }
    }, [categoryToEdit, reset]);

    const onSubmit = async (data: FormCategoryData) => {
        const categoryData = {
            id: data.id,
            name: data.name,
            parentId: data.parentId || null, // Nếu không chọn danh mục cha, gửi null
        };

        const result = await dispatch(updateCategory(categoryData));
        if (updateCategory.fulfilled.match(result)) {
            await dispatch(getAllCategory()); // Load lại danh mục sau khi cập nhật
            onClose();
            reset();
        }
    };

    return (
        <div className={`${isOpen ? "flex" : "hidden"} fixed inset-0 z-50 items-center justify-center backdrop-blur-sm bg-black/50`}>
            <div className="relative p-4 w-full max-w-lg bg-white rounded-lg shadow dark:bg-gray-800 md:p-8">
                <h3 className="mb-3 text-2xl font-bold text-gray-900 dark:text-white">Update Category</h3>

                <form onSubmit={handleSubmit(onSubmit)}>
                    {/* Hidden Input để giữ ID */}
                    <input type="hidden" {...register("id")} />

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
                                    .filter(category => category.id !== categoryToEdit?.id) // Không chọn chính nó làm cha
                                    .map(category => (
                                        <option key={category.id} value={category.id}>
                                            {category.name}
                                        </option>
                                    ))}
                        </select>
                    </div>

                    {/* Nút hành động */}
                    <div className="flex justify-between items-center">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 text-white bg-red-500 rounded-lg"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 text-white bg-blue-600 rounded-lg"
                        >
                            Update Category
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateCategoryPopup;