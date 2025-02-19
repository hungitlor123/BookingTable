
import { useEffect } from "react";
import { Search } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/services/store/store";
import { getAllCategory } from "@/services/features/category/categorySlice";

export default function Header() {
    const dispatch = useAppDispatch();
    const { categories, loading } = useAppSelector((state) => state.categories); // Lấy danh mục từ Redux

    useEffect(() => {
        dispatch(getAllCategory()); // Gọi API lấy danh mục khi component mount
    }, [dispatch]);

    // Lọc các danh mục có parentId là null
    const categoriesWithoutParent = categories && categories.filter((category) => category.parentId === null);

    return (
        <header className="bg-[#004d4d] text-white shadow-md py-4">
            <nav className="container mx-auto px-6 flex items-center justify-between">
                {/* Logo */}
                <a href="/" className="text-2xl font-bold hover:text-blue-200">
                    <div className="text-4xl font-bold tracking-wide flex items-center">
                        <span className="text-white">DALAT</span>
                        <span className="text-gray-300">.PHE</span>
                    </div>
                </a>

                {/* Danh mục API hiển thị ngang hàng */}
                <div className="flex-1 flex justify-center space-x-6">
                    {loading ? (
                        <span className="text-sm text-gray-300">Loading...</span>
                    ) : (
                        categoriesWithoutParent && categoriesWithoutParent.length > 0 ? (
                            categoriesWithoutParent.map((category) => (
                                <a
                                    key={category.id}
                                    href={`#${category.name.toLowerCase()}`}
                                    className="uppercase text-sm font-bold hover:text-blue-200 transition-colors"
                                >
                                    {category.name}
                                </a>
                            ))
                        ) : (
                            <span className="text-sm text-gray-300">No categories found</span>
                        )
                    )}
                </div>

                {/* Search Icon */}
                <div className="ml-auto">
                    <Search className="w-6 h-6 text-white hover:text-blue-200 cursor-pointer" />
                </div>
            </nav>
        </header>
    );
}
