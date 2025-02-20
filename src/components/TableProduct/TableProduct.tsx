import { useEffect, useState } from "react";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table";
import { useAppSelector, useAppDispatch } from "@/services/store/store";
import { formatAnyDate } from "@/utils";
import { IProduct } from "@/interfaces/Product";
import { deleteProduct, getAllProduct } from "@/services/features/product/productSlice";
import CreateProductPopup from "../popup/CreateProduct/CreateProductPopup";
import PopupConfirmAction from "../popup/ConfirmDelete/PopupConfirmAction";
import UpdateProductPopup from "../popup/UpdateProduct/UpdateProduct";

const TableProduct = () => {
    const dispatch = useAppDispatch();
    const { products } = useAppSelector(state => state.products);

    // State for delete confirmation popup
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [isEditPopupOpen, setIsEditPopupOpen] = useState(false); // State to control edit popup
    const [productIdToDelete, setproductIdToDelete] = useState<number | null>(null);
    const [productToEdit, setproductToEdit] = useState<any>(null); // State to store the product to edit
    const [isCreatePopupOpen, setIsCreatePopupOpen] = useState(false);

    // Close delete confirmation popup
    const closeDeletePopup = () => {
        setIsPopupOpen(false);
        setproductIdToDelete(null);
    };

    const openEditPopup = (product: IProduct) => {
        setproductToEdit(product); // Set the product to be edited
        setIsEditPopupOpen(true); // Open the edit popup
    };

    const closeEditPopup = () => {
        setIsEditPopupOpen(false);
        setproductToEdit(null);
    };

    // Handle delete button click
    const handleDeleteClick = (id: number) => {
        setproductIdToDelete(id);
        setIsPopupOpen(true);
    };

    // Confirm and execute product deletion
    const handleConfirmDelete = async () => {
        if (productIdToDelete !== null) {
            await dispatch(deleteProduct({ id: productIdToDelete }));
            dispatch(getAllProduct());
            closeDeletePopup();
        }
    };

    useEffect(() => {
        dispatch(getAllProduct());
    }, [dispatch]);
    return (
        <>
            <div className="my-6 flex flex-row justify-between items-center">
                <h2 className="font-bold text-xl">List Product Management</h2>
                <button
                    className="border border-slate-600 p-2 rounded-lg text-white bg-green-600 font-bold"
                    onClick={() => setIsCreatePopupOpen(true)} // Sử dụng trạng thái riêng
                >
                    Create Product
                </button>
            </div>

            <Table>
                <TableCaption>A list of your recent products.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[150px]">Name</TableHead>
                        <TableHead className="w-[100px]">URL</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead className="text-right">Create At</TableHead>
                        <TableHead className="text-right">Update At</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {products && products.length > 0 ? (
                        products.map(product => (
                            product && (
                                <TableRow key={product.id}>
                                    <TableCell className="font-medium w-[40vh]">
                                        {product.name || "No Name"}
                                    </TableCell>
                                    <TableCell className="w-[30vh]">
                                        {product.url ?? 0}
                                    </TableCell>
                                    <TableCell>
                                        {product.description
                                            ? (product.description.length > 30
                                                ? `${product.description.slice(0, 30)}...`
                                                : product.description)
                                            : "Empty"}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        {formatAnyDate(product.createdAt)}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        {formatAnyDate(product.updatedAt)}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <button
                                            className="border border-slate-600 p-2 rounded-lg text-white bg-slate-800 font-bold"
                                            onClick={() => openEditPopup(product)} // Open edit modal with product details
                                        >
                                            Edit
                                        </button>
                                        <button
                                            className="border border-slate-600 p-2 rounded-lg text-white bg-red-600 font-bold ml-2"
                                            onClick={() => handleDeleteClick(product.id)}
                                        >
                                            Delete
                                        </button>
                                    </TableCell>
                                </TableRow>
                            )
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={6} className="text-center">
                                No products available
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>

            <CreateProductPopup
                isOpen={isCreatePopupOpen}
                onClose={() => setIsCreatePopupOpen(false)}
            />

            {/* Popup xác nhận xóa */}
            <PopupConfirmAction
                title={"Xác nhận xóa"}
                content={"Bạn có chắc chắn muốn xóa mục này không?"}
                actionDelete={"Xóa"}
                actionCancel={"Hủy"}
                isOpen={isPopupOpen}
                onClose={closeDeletePopup}
                onConfirm={handleConfirmDelete}
            />

            {/* Update product modal */}
            {productToEdit && (
                <UpdateProductPopup
                    isOpen={isEditPopupOpen}
                    onClose={closeEditPopup}
                    product={productToEdit} // Pass the specific product to edit
                />
            )}
        </>
    );
};

export default TableProduct;
