import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext'
import HomePage from './pages/HomePage'
import ProductListingPage from './pages/ProductListingPage'
import ProductDetailsPage from './pages/ProductDetailsPage'
import ShoppingCartPage from './pages/ShoppingCartPage'
import CheckoutPage from './pages/CheckoutPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import OrderDetailsPage from './pages/OrderDetailsPage'
import UserProfilePage from './pages/UserProfilePage'
import AdminDashboardPage from './pages/AdminDashboardPage'
import AdminProductManagementPage from './pages/AdminProductManagementPage'

export default function App() {
    return (
        <ThemeProvider>
            <BrowserRouter>
                <Routes>
                    {/* Public Routes */}
                    <Route path="/" element={<HomePage />} />
                    <Route path="/products" element={<ProductListingPage />} />
                    <Route path="/products/:id" element={<ProductDetailsPage />} />
                    <Route path="/cart" element={<ShoppingCartPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />

                    {/* Protected Routes placeholder */}
                    <Route path="/checkout" element={<CheckoutPage />} />
                    <Route path="/profile" element={<UserProfilePage />} />
                    <Route path="/orders/:id" element={<OrderDetailsPage />} />

                    {/* Admin Routes */}
                    <Route path="/admin" element={<AdminDashboardPage />} />
                    <Route path="/admin/products" element={<AdminProductManagementPage />} />

                    {/* Fallback */}
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </BrowserRouter>
        </ThemeProvider>
    )
}