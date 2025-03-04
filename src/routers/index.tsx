
import NotFoundPage from "@/components/404/NotFound";
import CategoryManagement from "@/page/admin/CategoryManagement/CategoryManagement";
import ProductManagement from "@/page/admin/ProductManagement/ProductManagement";
import LoginPage from "@/page/Auth/Login/LoginPage";
import CategoryProductsPage from "@/page/CategoryProduct/CategoryProductPage";
import Dashboard from "@/page/Dashboard/DashboardPage";
import HomePage from "@/page/HomePage/HomePage";
import ProductDetailPage from "@/page/ProductDetail/ProductDetailPage";
import { Navigate, Route, Routes } from "react-router-dom";


const AppRouter = () => {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/product-management" element={<ProductManagement />} />
            <Route path="/products/:id" element={<ProductDetailPage />} />
            <Route path="/category/:categoryId" element={<CategoryProductsPage />} />
            <Route path="/category-management" element={<CategoryManagement />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="*" element={<Navigate to="/not-found" replace />} />
            <Route path="/not-found" element={<NotFoundPage />} />



        </Routes>
        //test
    );
}

export default AppRouter;