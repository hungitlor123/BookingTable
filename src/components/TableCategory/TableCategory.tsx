import { ICategory } from "@/interfaces/Category";
import { deleteCategory, getAllCategory } from "@/services/features/category/categorySlice";
import { useAppDispatch, useAppSelector } from "@/services/store/store";
import { useEffect, useState } from "react";
import { formatAnyDate } from "@/utils";
import PopupConfirmAction from "../popup/ConfirmDelete/PopupConfirmAction";
import CreateCategoryPopup from "../popup/CreateCategory/CreateCategorypopup";
import UpdateCategoryPopup from "../popup/UpdateCategory/UpdateCategory";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table";


const TableCategory = () => {
    const dispatch = useAppDispatch();
    const { categories } = useAppSelector(state => state.categories);

    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
    const [categoryIdToDelete, setCategoryIdToDelete] = useState<number | null>(null);
    const [categoryToEdit, setCategoryToEdit] = useState<any>(null);
    const [isCreatePopupOpen, setIsCreatePopupOpen] = useState(false);

    useEffect(() => {
        dispatch(getAllCategory());
    }, [dispatch]);

    const closeDeletePopup = () => {
        setIsPopupOpen(false);
        setCategoryIdToDelete(null);
    };

    const openEditPopup = (category: ICategory) => {
        setCategoryToEdit(category);
        setIsEditPopupOpen(true);
    };

    const closeEditPopup = () => {
        setIsEditPopupOpen(false);
        setCategoryToEdit(null);
    };

    const handleDeleteClick = (id: number) => {
        setCategoryIdToDelete(id);
        setIsPopupOpen(true);
    };

    const handleConfirmDelete = async () => {
        if (categoryIdToDelete !== null) {
            await dispatch(deleteCategory({ id: categoryIdToDelete }));
            dispatch(getAllCategory());
            closeDeletePopup();
        }
    };

    return (
        <>
            <div className="my-6 flex flex-row justify-between items-center">
                <h2 className="font-bold text-xl">Category Management</h2>
                <button
                    className="border border-slate-600 p-2 rounded-lg text-white bg-green-600 font-bold"
                    onClick={() => setIsCreatePopupOpen(true)}
                >
                    Create Category
                </button>
            </div>

            <Table>
                <TableCaption>A list of your product categories.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[200px]">Name</TableHead>
                        <TableHead className="w-[150px]">Parent ID</TableHead>
                        <TableHead className="text-right">Created At</TableHead>
                        <TableHead className="text-right">Updated At</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {categories && categories.length > 0 ? (
                        [...categories].sort((a, b) => b.id - a.id).map(category => (
                            category && (
                                <TableRow key={category.id}>
                                    <TableCell className="font-medium">
                                        {category.name || "No Name"}
                                    </TableCell>
                                    <TableCell>
                                        {category.parentId ? category.parentId : "Parent"}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        {formatAnyDate(category.createdAt)}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        {formatAnyDate(category.updatedAt)}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <button
                                            className="border border-slate-600 p-2 rounded-lg text-white bg-slate-800 font-bold"
                                            onClick={() => openEditPopup(category)}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            className="border border-slate-600 p-2 rounded-lg text-white bg-red-600 font-bold ml-2"
                                            onClick={() => handleDeleteClick(category.id)}
                                        >
                                            Delete
                                        </button>
                                    </TableCell>
                                </TableRow>
                            )
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={5} className="text-center">
                                No categories available
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>

            <CreateCategoryPopup
                isOpen={isCreatePopupOpen}
                onClose={() => setIsCreatePopupOpen(false)}
            />

            <PopupConfirmAction
                title={"Xác nhận xóa"}
                content={"Bạn có chắc chắn muốn xóa danh mục này không?"}
                actionDelete={"Xóa"}
                actionCancel={"Hủy"}
                isOpen={isPopupOpen}
                onClose={closeDeletePopup}
                onConfirm={handleConfirmDelete}
            />

            {categoryToEdit && (
                <UpdateCategoryPopup
                    isOpen={isEditPopupOpen}
                    onClose={closeEditPopup}
                    categoryToEdit={categoryToEdit}
                />
            )}
        </>
    );
};

export default TableCategory;