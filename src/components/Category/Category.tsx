import { Separator } from "@/components/ui/separator";
import { getAllCategoryTree } from "@/services/features/category/categorySlice";
import { useAppDispatch, useAppSelector } from "@/services/store/store";
import { useEffect } from "react";




export default function Category() {
    const dispatch = useAppDispatch();
    const { categortrees } = useAppSelector((state) => state.categories);

    useEffect(() => {
        dispatch(getAllCategoryTree());
    }
        , [dispatch]);

    return (
        <section className="bg-gray-50 py-12 mt-8">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {categortrees && categortrees
                        .filter(category => category.parentId === null) // Chỉ hiển thị danh mục cha
                        .map((category) => (
                            <div key={category.id} className="space-y-4">
                                {/* Hiển thị danh mục cha */}
                                <h2 className="text-black-700 font-semibold text-lg">
                                    {category.name}
                                </h2>
                                {/* Nếu có danh mục con, hiển thị chúng với chữ nhỏ hơn */}
                                {category.subcategories.length > 0 && (
                                    <ul className="ml-4 space-y-1">
                                        {category.subcategories.map((sub) => (
                                            <li key={sub.id}>
                                                <a
                                                    href="#"
                                                    className="text-gray-600 hover:text-blue-700 transition-colors text-sm"
                                                >
                                                    {sub.name}
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        ))}
                </div>
                <Separator className="my-5" />
            </div>
        </section>
    );
}
