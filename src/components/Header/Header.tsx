
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/services/store/store";
import { getAllCategoryTree } from "@/services/features/category/categorySlice";

export default function Header() {
    const dispatch = useAppDispatch();

    // Lấy danh mục dạng cây từ Redux store
    const { categortrees, loading } = useAppSelector((state) => state.categories);

    useEffect(() => {
        dispatch(getAllCategoryTree()); // Gọi API lấy danh mục cây khi component mount
    }, [dispatch]);

    // Lọc các danh mục cha (parentId === null)
    const categoriesWithoutParent = categortrees?.filter((category) => category.parentId === null);

    return (
        <header className="bg-[#004d4d] text-white shadow-md py-4">
            <nav className="container mx-auto px-6 flex items-center justify-between">
                {/* Logo */}
                <a href="/" className="text-2xl font-bold hover:text-blue-200">
                    <div className="text-4xl font-bold tracking-wide flex items-center">
                        <span className="text-white">RYTEMS</span>
                    </div>
                </a>

                {/* Danh mục hiển thị ngang hàng */}
                <div className="flex-1 flex justify-center space-x-6">
                    {loading ? (
                        <span className="text-sm text-gray-300">Loading...</span>
                    ) : (
                        categoriesWithoutParent && categoriesWithoutParent.length > 0 ? (
                            categoriesWithoutParent.map((category) => (
                                <div key={category.id} className="relative group">
                                    {/* Tên danh mục cha */}
                                    <a
                                        href={`#${category.name.toLowerCase()}`}
                                        className="uppercase text-sm font-bold hover:text-blue-200 transition-colors"
                                    >
                                        {category.name}
                                    </a>

                                    {/* Nếu có danh mục con, hiển thị dropdown */}
                                    {category.subcategories.length > 0 && (
                                        <div className="absolute left-0 mt-2 w-48 bg-white text-black shadow-lg rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                            <ul className="py-2">
                                                {category.subcategories.map((sub) => (
                                                    <li key={sub.id}>
                                                        <a
                                                            href={`/category/${sub.id}`}
                                                            className="block px-4 py-2 text-sm hover:bg-gray-200">
                                                            {sub.name}
                                                        </a>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            ))
                        ) : (
                            <span className="text-sm text-gray-300">No categories found</span>
                        )
                    )}
                </div>
            </nav>
        </header>
    );
}