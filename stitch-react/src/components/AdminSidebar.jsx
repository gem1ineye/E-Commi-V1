import { Link, useLocation } from 'react-router-dom'

const navItems = [
    { label: 'Dashboard', icon: 'dashboard', to: '/admin' },
    { label: 'Products', icon: 'inventory_2', to: '/admin/products' },
    { label: 'Orders', icon: 'shopping_cart', to: '/admin/orders', badge: 12 },
    { label: 'Categories', icon: 'category', to: '/admin/categories' },
    { label: 'Customers', icon: 'group', to: '/admin/customers' },
]

export default function AdminSidebar() {
    const location = useLocation()
    return (
        <aside className="hidden lg:flex flex-col w-72 h-screen bg-white dark:bg-gray-900 border-r border-slate-200 dark:border-gray-800 fixed left-0 top-0 z-20 transition-colors duration-300">
            {/* Logo */}
            <div className="flex items-center gap-3 px-8 py-8">
                <Link to="/" className="flex size-10 rounded-xl bg-gradient-to-br from-primary to-blue-600 items-center justify-center text-white shadow-lg shadow-primary/30">
                    <span className="material-symbols-outlined">storefront</span>
                </Link>
                <div>
                    <h1 className="text-slate-900 dark:text-white text-lg font-bold leading-none">E-Shop Admin</h1>
                    <p className="text-slate-500 dark:text-gray-400 text-xs font-medium mt-1">Manage Store</p>
                </div>
            </div>
            {/* Nav */}
            <nav className="flex-1 px-4 flex flex-col gap-2 overflow-y-auto">
                <p className="px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 mt-4">Main Menu</p>
                {navItems.map(item => {
                    const active = location.pathname === item.to
                    return (
                        <Link
                            key={item.to}
                            to={item.to}
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${active ? 'bg-primary/10 text-primary' : 'text-slate-600 dark:text-gray-400 hover:bg-slate-50 dark:hover:bg-gray-800'}`}
                        >
                            <span className="material-symbols-outlined">{item.icon}</span>
                            <span>{item.label}</span>
                            {item.badge && (
                                <span className="ml-auto bg-primary text-white text-[10px] font-bold px-2 py-0.5 rounded-full">{item.badge}</span>
                            )}
                        </Link>
                    )
                })}
                <p className="px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 mt-8">System</p>
                <a href="#" className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-600 dark:text-gray-400 hover:bg-slate-50 dark:hover:bg-gray-800 transition-colors">
                    <span className="material-symbols-outlined">settings</span>
                    <span>Settings</span>
                </a>
            </nav>
            {/* User */}
            <div className="p-4 mt-auto">
                <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-gray-800 border border-slate-100 dark:border-gray-700">
                    <img className="size-10 rounded-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBX_r67Bp1oTwcQRwvDOlLSsjZf1cvH8ifrl24VrSYfzuNQitxqC4Toz_-9GT7dab4nu9qxdcGkma6VVsQ-5QZ46l7zq4V9ExW8fGSCecymemYZAdPYgewfTgbz6yo27nUnd5Q2P-nbmTs3eK9ApOUjR95rVq44zH9KOzmrrEhExvkJMVYJr8e1M68k5k45vr_i6iGSEPZjNkpnvXf4FFKRuu40xPqg8ooLX2QVT0KhejPNi9d1zHw4H9SNzmQV60-R5YzXPI6cUZ4" alt="Admin user" />
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-slate-900 dark:text-white truncate">Tom Cook</p>
                        <p className="text-xs text-slate-500 dark:text-gray-400 truncate">tom@example.com</p>
                    </div>
                    <button className="text-slate-400 hover:text-red-500 transition-colors">
                        <span className="material-symbols-outlined text-[20px]">logout</span>
                    </button>
                </div>
            </div>
        </aside>
    )
}
