import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const orders = [
    { id: 'ORD-29102', date: 'Oct 24, 2023', status: 'Shipped', statusColor: 'bg-blue-100 text-blue-700', total: '$313.18', items: 2 },
    { id: 'ORD-29087', date: 'Oct 12, 2023', status: 'Delivered', statusColor: 'bg-green-100 text-green-700', total: '$89.99', items: 1 },
    { id: 'ORD-28930', date: 'Sep 28, 2023', status: 'Delivered', statusColor: 'bg-green-100 text-green-700', total: '$459.97', items: 3 },
    { id: 'ORD-28750', date: 'Sep 10, 2023', status: 'Cancelled', statusColor: 'bg-red-100 text-red-700', total: '$199.99', items: 1 },
]

const addresses = [
    { label: 'Home', name: 'John Doe', address: '123 Main Street, Apt 4B', city: 'New York, NY 10001', country: 'United States', default: true },
    { label: 'Work', name: 'John Doe', address: '456 Office Park Blvd', city: 'New York, NY 10002', country: 'United States', default: false },
]

export default function UserProfilePage() {
    return (
        <div className="bg-background-light dark:bg-gray-950 font-display text-slate-900 dark:text-gray-100 antialiased min-h-screen flex flex-col transition-colors duration-300">
            <Navbar />
            <main className="flex-grow mx-auto max-w-[1440px] px-6 py-8 lg:px-12">
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-8">My Account</h1>
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Sidebar */}
                    <aside className="w-full lg:w-64 flex-shrink-0">
                        <div className="bg-white dark:bg-gray-900 rounded-xl border border-slate-200 dark:border-gray-800 p-6 shadow-sm">
                            <div className="flex flex-col items-center text-center mb-6">
                                <div className="size-20 rounded-full bg-gradient-to-br from-primary to-blue-400 flex items-center justify-center text-white text-2xl font-bold shadow-lg shadow-primary/30 mb-3">JD</div>
                                <h2 className="text-lg font-bold text-slate-900 dark:text-white">John Doe</h2>
                                <p className="text-sm text-slate-500 dark:text-gray-400">john.doe@example.com</p>
                            </div>
                            <nav className="space-y-1">
                                {[
                                    { icon: 'person', label: 'Profile Info', active: true },
                                    { icon: 'shopping_bag', label: 'My Orders', active: false },
                                    { icon: 'location_on', label: 'Addresses', active: false },
                                    { icon: 'favorite', label: 'Wishlist', active: false },
                                    { icon: 'settings', label: 'Settings', active: false },
                                ].map(item => (
                                    <button key={item.label} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${item.active ? 'bg-primary/10 text-primary' : 'text-slate-600 dark:text-gray-400 hover:bg-slate-50 dark:hover:bg-gray-800'}`}>
                                        <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>{item.icon}</span>
                                        {item.label}
                                    </button>
                                ))}
                            </nav>
                            <div className="mt-6 pt-6 border-t border-slate-100 dark:border-gray-800">
                                <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors">
                                    <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>logout</span>
                                    Sign Out
                                </button>
                            </div>
                        </div>
                    </aside>

                    {/* Main Content */}
                    <div className="flex-1 space-y-8">
                        {/* Profile Info */}
                        <div className="bg-white dark:bg-gray-900 rounded-xl border border-slate-200 dark:border-gray-800 p-6 shadow-sm">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-xl font-bold text-slate-900 dark:text-white">Profile Information</h2>
                                <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-200 dark:border-gray-700 text-sm font-medium text-slate-700 dark:text-gray-300 hover:bg-slate-50 dark:hover:bg-gray-800 transition-colors">
                                    <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>edit</span>
                                    Edit
                                </button>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {[['First Name', 'John'], ['Last Name', 'Doe'], ['Email', 'john.doe@example.com'], ['Phone', '+1 (555) 123-4567']].map(([label, val]) => (
                                    <div key={label}>
                                        <label className="block text-xs font-medium text-slate-500 dark:text-gray-400 uppercase tracking-wide mb-1">{label}</label>
                                        <p className="text-sm font-semibold text-slate-900 dark:text-white py-3 px-4 bg-slate-50 dark:bg-gray-800 rounded-lg">{val}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Recent Orders */}
                        <div className="bg-white dark:bg-gray-900 rounded-xl border border-slate-200 dark:border-gray-800 shadow-sm overflow-hidden">
                            <div className="flex items-center justify-between p-6 border-b border-slate-100 dark:border-gray-800">
                                <h2 className="text-xl font-bold text-slate-900 dark:text-white">Recent Orders</h2>
                                <Link to="/products" className="text-sm font-medium text-primary hover:text-primary-dark">View All</Link>
                            </div>
                            <div className="divide-y divide-slate-100 dark:divide-gray-800">
                                {orders.map(order => (
                                    <div key={order.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-6 gap-4 hover:bg-slate-50 dark:hover:bg-gray-800 transition-colors">
                                        <div>
                                            <p className="text-sm font-bold text-primary">{order.id}</p>
                                            <p className="text-xs text-slate-500 dark:text-gray-400 mt-0.5">{order.date} · {order.items} item{order.items > 1 ? 's' : ''}</p>
                                        </div>
                                        <span className={`inline-flex self-start sm:self-auto items-center px-3 py-1 rounded-full text-xs font-semibold ${order.statusColor} dark:opacity-80`}>{order.status}</span>
                                        <div className="flex items-center gap-6">
                                            <p className="text-sm font-bold text-slate-900 dark:text-white">{order.total}</p>
                                            <Link to="/orders/1" className="flex items-center gap-1 text-sm font-medium text-slate-600 hover:text-primary transition-colors">
                                                View <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>arrow_forward</span>
                                            </Link>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Addresses */}
                        <div className="bg-white dark:bg-gray-900 rounded-xl border border-slate-200 dark:border-gray-800 p-6 shadow-sm">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-xl font-bold text-slate-900 dark:text-white">Saved Addresses</h2>
                                <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-white text-sm font-medium hover:bg-primary-dark transition-colors shadow-md shadow-primary/25">
                                    <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>add</span>
                                    Add Address
                                </button>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {addresses.map(addr => (
                                    <div key={addr.label} className={`relative rounded-xl border p-5 ${addr.default ? 'border-primary bg-primary/5 dark:bg-primary/20 ring-1 ring-primary/20' : 'border-slate-200 dark:border-gray-800'}`}>
                                        {addr.default && (
                                            <span className="absolute top-3 right-3 bg-primary text-white text-[10px] font-bold px-2 py-0.5 rounded-full">Default</span>
                                        )}
                                        <div className="flex items-center gap-2 mb-3">
                                            <span className="material-symbols-outlined text-slate-500 dark:text-gray-400" style={{ fontSize: '18px' }}>location_on</span>
                                            <p className="text-sm font-bold text-slate-900 dark:text-white">{addr.label}</p>
                                        </div>
                                        <p className="text-sm text-slate-600 dark:text-gray-400">{addr.name}</p>
                                        <p className="text-sm text-slate-600 dark:text-gray-400">{addr.address}</p>
                                        <p className="text-sm text-slate-600 dark:text-gray-400">{addr.city}</p>
                                        <p className="text-sm text-slate-600 dark:text-gray-400">{addr.country}</p>
                                        <div className="flex gap-3 mt-4">
                                            <button className="text-xs font-medium text-primary hover:underline">Edit</button>
                                            {!addr.default && <button className="text-xs font-medium text-red-500 hover:underline">Delete</button>}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    )
}
