
import ProductManagement from "@/page/admin/ProductManagement/ProductManagement";
import LoginPage from "@/page/Auth/Login/LoginPage";
import HomePage from "@/page/HomePage/HomePage";
import ProductDetailPage from "@/page/ProductDetail/ProductDetailPage";
import { Route, Routes } from "react-router-dom";


const AppRouter = () => {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/product-management" element={<ProductManagement />} />
            <Route path="/products/:id" element={<ProductDetailPage />} />


        </Routes>
    );
}

export default AppRouter;