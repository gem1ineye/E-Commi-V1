import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useTheme } from '../context/ThemeContext'
import { logout } from '../store/authSlice'
import toast from 'react-hot-toast'

export default function Navbar() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { isDarkMode, toggleTheme } = useTheme()

    const { totalItems } = useSelector(state => state.cart || { totalItems: 0 })
    const { isAuthenticated, user } = useSelector(state => state.auth || { isAuthenticated: false, user: null })

    const handleLogout = () => {
        dispatch(logout())
        toast.success('Logged out successfully')
        navigate('/login')
    }

    return (
        <header className="sticky top-0 z-50 w-full border-b border-[#e7e9f3] dark:border-gray-800 bg-white/95 dark:bg-gray-900/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-gray-900/60 transition-colors duration-300">
            <div className="mx-auto flex h-20 max-w-[1440px] items-center justify-between px-6 lg:px-12">
                {/* Logo */}
                <div className="flex items-center gap-4">
                    <Link to="/" className="flex items-center gap-2 group">
                        <div className="flex size-10 items-center justify-center rounded-xl bg-primary text-white transition-transform group-hover:scale-105">
                            <span className="material-symbols-outlined" style={{ fontSize: '28px' }}>shopping_bag</span>
                        </div>
                        <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white underline decoration-primary decoration-4 underline-offset-4">ShopMern</span>
                    </Link>
                </div>

                {/* Search Bar (Desktop) */}
                <div className="hidden flex-1 max-w-xl px-8 md:block">
                    <div className="relative group">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-gray-400 group-focus-within:text-primary">
                            <span className="material-symbols-outlined">search</span>
                        </div>
                        <input
                            className="block w-full rounded-full border-0 bg-slate-100 dark:bg-gray-800 py-3 pl-11 pr-4 text-sm text-slate-900 dark:text-white ring-1 ring-inset ring-slate-200 dark:ring-gray-700 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary focus:bg-white dark:focus:bg-gray-900 transition-all shadow-sm"
                            placeholder="Search for products, brands and more..."
                            type="text"
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    navigate(`/products?search=${e.target.value}`)
                                }
                            }}
                        />
                    </div>
                </div>

                {/* Right Actions */}
                <div className="flex items-center gap-2 sm:gap-6">
                    {/* Dark Mode Toggle */}
                    <button
                        onClick={toggleTheme}
                        className="flex size-10 items-center justify-center rounded-full bg-slate-100 dark:bg-gray-800 hover:bg-slate-200 dark:hover:bg-gray-700 transition-colors text-slate-700 dark:text-white"
                        title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                    >
                        <span className="material-symbols-outlined" style={{ fontSize: '22px' }}>
                            {isDarkMode ? 'light_mode' : 'dark_mode'}
                        </span>
                    </button>

                    {/* Auth Actions */}
                    <div className="flex items-center gap-2">
                        {isAuthenticated ? (
                            <div className="flex items-center gap-4">
                                <Link to="/profile" className="hidden sm:flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-gray-200 hover:text-primary transition-colors">
                                    <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>account_circle</span>
                                    {user?.name?.split(' ')[0]}
                                </Link>
                                <button
                                    onClick={handleLogout}
                                    className="px-4 py-2 text-sm font-bold text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                                >
                                    Logout
                                </button>
                            </div>
                        ) : (
                            <div className="flex items-center gap-2">
                                <Link to="/login" className="px-5 py-2 text-sm font-bold text-slate-700 dark:text-gray-200 hover:text-primary transition-colors">
                                    Login
                                </Link>
                                <Link to="/register" className="hidden sm:block px-5 py-2 text-sm font-bold bg-primary text-white rounded-xl hover:bg-primary-dark transition-all shadow-md shadow-primary/20">
                                    Register
                                </Link>
                            </div>
                        )}
                    </div>

                    <div className="h-6 w-px bg-slate-200 dark:bg-gray-700 mx-2"></div>

                    {/* Cart Button */}
                    <button
                        onClick={() => navigate('/cart')}
                        className="relative flex size-10 items-center justify-center rounded-full bg-slate-100 dark:bg-gray-800 hover:bg-slate-200 dark:hover:bg-gray-700 transition-colors text-slate-700 dark:text-white group"
                    >
                        <span className="material-symbols-outlined" style={{ fontSize: '22px' }}>shopping_cart</span>
                        {totalItems > 0 && (
                            <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-white shadow-sm ring-2 ring-white dark:ring-gray-900 animate-in zoom-in">
                                {totalItems}
                            </span>
                        )}
                    </button>

                    {/* Admin Link (Conditional) */}
                    {user?.role === 'admin' && (
                        <Link to="/admin" title="Admin Dashboard" className="flex size-10 items-center justify-center rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:opacity-90 transition-opacity">
                            <span className="material-symbols-outlined" style={{ fontSize: '22px' }}>dashboard_customize</span>
                        </Link>
                    )}
                </div>
            </div>
        </header>
    )
}