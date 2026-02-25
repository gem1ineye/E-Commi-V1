import { Link } from 'react-router-dom'
import AdminSidebar from '../components/AdminSidebar'

const recentOrders = [
    { id: '#ORD-001', customer: 'JD', customerName: 'John Doe', date: 'Oct 24, 2023', amount: '$120.00', payment: 'Paid', paymentColor: 'bg-green-100 text-green-700', status: 'Pending', statusColor: 'bg-yellow-100 text-yellow-700', img: null },
    { id: '#ORD-002', customer: 'SS', customerName: 'Sarah Smith', date: 'Oct 23, 2023', amount: '$450.50', payment: 'Paid', paymentColor: 'bg-green-100 text-green-700', status: 'Shipped', statusColor: 'bg-blue-100 text-blue-700', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBvyUkm5JTxHpgkkBiOzC7vE27wwMgV4fFEpX0_eoCr1VNRNPKtpCPZn7OO5aMtFqRGYfbG6EJFSgDFtRzehcTloF7HjRrKX781QsJP8OtUy9HwgwSkDPyoYEzLQ4Qkobj_gPEj06wR3s-u4V3wl7q0EX3yxyl8UMvYyIsm6qa3NOuzo_SF4GotyjdNUZm-7E1QyTMHXpx17fjuBCtmAPLDQdWNey67WfhmcHdbbHjTEVfUPQxPUxD3J5g5vdTNHpjtN1iX1sx_fSM' },
    { id: '#ORD-003', customer: 'MJ', customerName: 'Michael Johnson', date: 'Oct 22, 2023', amount: '$89.99', payment: 'Failed', paymentColor: 'bg-red-100 text-red-700', status: 'Cancelled', statusColor: 'bg-red-100 text-red-700', img: null },
    { id: '#ORD-004', customer: 'ED', customerName: 'Emily Davis', date: 'Oct 21, 2023', amount: '$1,299.00', payment: 'Paid', paymentColor: 'bg-green-100 text-green-700', status: 'Delivered', statusColor: 'bg-green-100 text-green-700', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAylEzpcSiqtuYfeszZF0eBu4QqC_19QO-KbcQ2rjCu04P5BEJVQOShl4__djSrMqwnwQ0RehkOdRA7LDn_mZMSv3zlvVwmi1LoKUH1cUpyG2YBnXu8-BOVU5eVk_8dGaehndXjA6VXcGE51hoDr-ekTH2ZvwZSQbVryLVVtwnFn_U0x3AW8Sw5Ya1YiCNl6dkYNgfYBl7mArNOtHRxORivnqV5cPhUYf7FaHu7kctMXtoSaXO38Owq8VFdsoNRloMdvKOHGHN5Sis' },
    { id: '#ORD-005', customer: 'RW', customerName: 'Robert Wilson', date: 'Oct 21, 2023', amount: '$56.00', payment: 'Pending', paymentColor: 'bg-orange-100 text-orange-700', status: 'Processing', statusColor: 'bg-slate-100 text-slate-700', img: null },
]

export default function AdminDashboardPage() {
    return (
        <div className="bg-[#f6f6f8] dark:bg-gray-950 text-slate-900 dark:text-gray-100 min-h-screen flex overflow-hidden font-display transition-colors duration-300">
            <AdminSidebar />
            <main className="flex-1 lg:ml-72 flex flex-col h-screen overflow-hidden bg-[#f6f6f8] dark:bg-gray-950">
                {/* Header */}
                <header className="h-20 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-slate-200 dark:border-gray-800 flex items-center justify-between px-8 sticky top-0 z-10">
                    <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-gray-400">
                        <span className="hover:text-primary cursor-pointer">Pages</span>
                        <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>chevron_right</span>
                        <span className="text-slate-900 dark:text-white font-medium">Dashboard</span>
                    </div>
                    <div className="flex items-center gap-6">
                        <div className="relative hidden sm:block">
                            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-gray-500 text-[20px]">search</span>
                            <input className="pl-10 pr-4 py-2 rounded-lg bg-slate-100 dark:bg-gray-800 border-none text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-primary/20 w-64 placeholder:text-slate-400 dark:placeholder:text-gray-500" placeholder="Search..." type="text" />
                        </div>
                        <button className="relative p-2 text-slate-500 dark:text-gray-400 hover:bg-slate-100 dark:hover:bg-gray-800 rounded-lg transition-colors">
                            <span className="material-symbols-outlined">notifications</span>
                            <span className="absolute top-2 right-2 size-2 bg-red-500 rounded-full border-2 border-white dark:border-gray-900"></span>
                        </button>
                    </div>
                </header>

                {/* Scrollable Content */}
                <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
                    <div className="max-w-7xl mx-auto space-y-8">
                        {/* Welcome */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <div>
                                <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">Dashboard Overview</h2>
                                <p className="text-slate-500 dark:text-gray-400 mt-1">Here's what's happening with your store today.</p>
                            </div>
                            <div className="flex gap-3">
                                <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 border border-slate-200 dark:border-gray-700 rounded-lg text-sm font-medium text-slate-700 dark:text-gray-300 hover:bg-slate-50 dark:hover:bg-gray-700 transition-colors shadow-sm">
                                    <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>download</span>
                                    Export
                                </button>
                                <Link to="/admin/products" className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary-dark transition-colors shadow-lg shadow-primary/25">
                                    <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>add</span>
                                    Add Product
                                </Link>
                            </div>
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {[
                                { label: 'Total Sales', value: '$124,592.00', trend: '+12%', up: true, icon: 'attach_money', bg: 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400', watermark: 'payments' },
                                { label: 'Total Orders', value: '1,452', trend: '+5%', up: true, icon: 'shopping_cart', bg: 'bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400', watermark: 'shopping_bag' },
                                { label: 'Total Users', value: '8,432', trend: '-1%', up: false, icon: 'person', bg: 'bg-orange-50 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400', watermark: 'group' },
                            ].map(stat => (
                                <div key={stat.label} className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-slate-200 dark:border-gray-800 shadow-sm relative overflow-hidden group">
                                    <div className="absolute right-0 top-0 p-6 opacity-5 dark:opacity-10 group-hover:opacity-10 dark:group-hover:opacity-20 transition-opacity">
                                        <span className="material-symbols-outlined text-primary" style={{ fontSize: '120px' }}>{stat.watermark}</span>
                                    </div>
                                    <div className="relative z-10">
                                        <div className="flex items-center gap-2 mb-4">
                                            <div className={`p-2 rounded-lg ${stat.bg}`}>
                                                <span className="material-symbols-outlined">{stat.icon}</span>
                                            </div>
                                            <p className="text-sm font-medium text-slate-500 dark:text-gray-400">{stat.label}</p>
                                        </div>
                                        <h3 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight mb-2">{stat.value}</h3>
                                        <div className="flex items-center gap-2">
                                            <span className={`flex items-center text-xs font-semibold px-2 py-1 rounded-full ${stat.up ? 'text-green-600 bg-green-50 dark:bg-green-950/30' : 'text-red-600 bg-red-50 dark:bg-red-950/30'}`}>
                                                <span className="material-symbols-outlined" style={{ fontSize: '14px', marginRight: '2px' }}>{stat.up ? 'trending_up' : 'trending_down'}</span>
                                                {stat.trend}
                                            </span>
                                            <span className="text-xs text-slate-400 dark:text-gray-500">from last month</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Chart */}
                        <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-slate-200 dark:border-gray-800 shadow-sm">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Sales Analytics</h3>
                                <select className="bg-slate-50 dark:bg-gray-800 border border-slate-200 dark:border-gray-700 text-slate-700 dark:text-gray-300 text-sm rounded-lg focus:ring-primary focus:border-primary block p-2">
                                    <option>This Week</option>
                                    <option>This Month</option>
                                    <option>This Year</option>
                                </select>
                            </div>
                            <div className="h-64 w-full bg-gradient-to-b from-primary/5 to-transparent rounded-lg relative overflow-hidden flex items-end">
                                <svg className="absolute bottom-0 left-0 w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 100 100">
                                    <path d="M0,80 C10,75 20,60 30,65 C40,70 50,40 60,35 C70,30 80,45 90,20 C95,10 100,5 100,0 V100 H0 Z" fill="url(#gradient)" opacity="0.2" />
                                    <path d="M0,80 C10,75 20,60 30,65 C40,70 50,40 60,35 C70,30 80,45 90,20 C95,10 100,5 100,0" fill="none" stroke="#1940eb" strokeWidth="2" />
                                    <defs>
                                        <linearGradient id="gradient" x1="0%" x2="0%" y1="0%" y2="100%">
                                            <stop offset="0%" style={{ stopColor: '#1940eb', stopOpacity: 1 }} />
                                            <stop offset="100%" style={{ stopColor: '#1940eb', stopOpacity: 0 }} />
                                        </linearGradient>
                                    </defs>
                                </svg>
                                <div className="absolute bottom-2 left-0 w-full flex justify-between px-4 text-xs text-slate-400">
                                    {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(d => <span key={d}>{d}</span>)}
                                </div>
                            </div>
                        </div>

                        {/* Recent Orders */}
                        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-slate-200 dark:border-gray-800 shadow-sm overflow-hidden">
                            <div className="p-6 border-b border-slate-200 dark:border-gray-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Recent Orders</h3>
                                <div className="flex gap-2">
                                    <div className="relative">
                                        <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-gray-500 text-[18px]">search</span>
                                        <input className="pl-9 pr-4 py-2 rounded-lg bg-slate-50 dark:bg-gray-800 border border-slate-200 dark:border-gray-700 text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-primary/20 w-full sm:w-48 placeholder:text-slate-400 dark:placeholder:text-gray-500" placeholder="Search orders..." type="text" />
                                    </div>
                                    <button className="p-2 text-slate-500 dark:text-gray-400 hover:bg-slate-100 dark:hover:bg-gray-800 rounded-lg transition-colors border border-slate-200 dark:border-gray-700">
                                        <span className="material-symbols-outlined text-[20px]">filter_list</span>
                                    </button>
                                </div>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="bg-slate-50 dark:bg-gray-800/50 border-b border-slate-200 dark:border-gray-800 text-xs uppercase tracking-wider text-slate-500 dark:text-gray-400 font-semibold">
                                            {['Order ID', 'Customer', 'Date', 'Amount', 'Payment', 'Status', 'Action'].map((h, i) => (
                                                <th key={h} className={`px-6 py-4 ${i === 6 ? 'text-right' : ''}`}>{h}</th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-200 dark:divide-gray-800 text-sm text-slate-700 dark:text-gray-300">
                                        {recentOrders.map(order => (
                                            <tr key={order.id} className="hover:bg-slate-50 dark:hover:bg-gray-800 transition-colors">
                                                <td className="px-6 py-4 font-medium text-primary">{order.id}</td>
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-3">
                                                        {order.img ? (
                                                            <img src={order.img} alt={order.customerName} className="size-8 rounded-full object-cover" />
                                                        ) : (
                                                            <div className="size-8 rounded-full bg-slate-200 dark:bg-gray-700 flex items-center justify-center text-xs font-bold text-slate-600 dark:text-gray-300">{order.customer}</div>
                                                        )}
                                                        <span className="font-medium text-slate-900 dark:text-white">{order.customerName}</span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 text-slate-500 dark:text-gray-400">{order.date}</td>
                                                <td className="px-6 py-4 font-medium">{order.amount}</td>
                                                <td className="px-6 py-4">
                                                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${order.paymentColor} dark:opacity-80`}>
                                                        <span className="size-1.5 rounded-full bg-current"></span>
                                                        {order.payment}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium ${order.statusColor} dark:opacity-80`}>
                                                        {order.status}
                                                        <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>expand_more</span>
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-right">
                                                    <button className="text-slate-400 dark:text-gray-500 hover:text-primary transition-colors">
                                                        <span className="material-symbols-outlined text-[20px]">more_vert</span>
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <div className="p-4 border-t border-slate-200 dark:border-gray-800 flex items-center justify-between">
                                <span className="text-sm text-slate-500 dark:text-gray-400">Showing 1 to 5 of 124 results</span>
                                <div className="flex items-center gap-2">
                                    <button disabled className="p-2 border border-slate-200 dark:border-gray-700 rounded-lg text-slate-600 dark:text-gray-400 hover:bg-slate-50 dark:hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed">
                                        <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>chevron_left</span>
                                    </button>
                                    <button className="p-2 border border-slate-200 dark:border-gray-700 rounded-lg text-slate-600 dark:text-gray-400 hover:bg-slate-50 dark:hover:bg-gray-800">
                                        <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>chevron_right</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}
