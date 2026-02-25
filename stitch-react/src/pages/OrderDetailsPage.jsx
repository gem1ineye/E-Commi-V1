import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const trackingSteps = [
    { label: 'Order Placed', date: 'Oct 24, 2023 · 9:15 AM', done: true, icon: 'shopping_bag' },
    { label: 'Processing', date: 'Oct 24, 2023 · 11:30 AM', done: true, icon: 'inventory_2' },
    { label: 'Shipped', date: 'Oct 25, 2023 · 2:00 PM', done: true, icon: 'local_shipping' },
    { label: 'Out for Delivery', date: 'Oct 27, 2023 · 8:45 AM', done: false, icon: 'directions_bike' },
    { label: 'Delivered', date: 'Expected Oct 27, 2023', done: false, icon: 'home' },
]

const orderItems = [
    { name: 'Wireless Noise Cancelling Headphones', variant: 'Black · Qty: 1', price: '₹14,999.00', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuANVj4nYJmsxmerLDeUZh1bvJxcRCO5NYI4aXoQ70eTDA1ZfGMc9TB5X4etAox_ucWQIGdQnE_-Dx9-QSEflwG0JhTBVapy2iT_-ukCg6bDo9e_ojR9_2rn8BwgApjBq6s67UDckczaWF_3OrtOronvC3Tl2OsUNhK-ywOTUxqyusWQGoNS9em25qRXRuAo6o2GAt0yhUIBAKWCW0_dM4eiKnJttjKwkCZtS_rJLlXLNev1ootYOycNkq_NM6BBrzQjplPsxhXlOX4' },
    { name: 'Pro Runner Sneakers', variant: 'Red · Size 10 · Qty: 1', price: '₹4,999.00', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBacVAPb_4ZPHiuym3FCz5A_RZYoLESVSJXNe-nO4eUqg7fuycfpJd8NsZfMeQRQq7th_GXGJ0bym_doREtWSTe8UZcV-p2n9cIl2-EtlJsRcJkkqISgr-LcJYfmVRf61Pn9lXgV15oM37PaMtTyJBc-XFSsSCY-jIQyesA4meSCS-84Tsh_tA9ZTkMW0aFMJj9ITrNyGIwdjJBjGo8ztuqX5svp9ETpDNTGyBPq1ZoziFgbW3VKoslXQH3IIfRGv-GfGJirj-v9Fo' },
]

export default function OrderDetailsPage() {
    return (
        <div className="bg-background-light dark:bg-gray-950 font-display text-slate-900 dark:text-gray-100 antialiased min-h-screen flex flex-col transition-colors duration-300">
            <Navbar />
            <main className="flex-grow mx-auto max-w-[1440px] px-6 py-8 lg:px-12">
                {/* Header */}
                <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <nav className="flex items-center gap-2 text-sm text-slate-500 dark:text-gray-400 mb-2">
                            <Link to="/" className="hover:text-primary transition-colors">Home</Link>
                            <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>chevron_right</span>
                            <Link to="/profile" className="hover:text-primary transition-colors">My Orders</Link>
                            <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>chevron_right</span>
                            <span className="font-medium text-slate-900 dark:text-white">Order #ORD-29102</span>
                        </nav>
                        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Order Details</h1>
                    </div>
                    <div className="flex gap-3">
                        <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm font-medium text-slate-700 dark:text-gray-300 hover:bg-slate-50 dark:hover:bg-gray-700 shadow-sm transition-colors">
                            <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>receipt_long</span>
                            Invoice
                        </button>
                        <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400 text-sm font-medium hover:bg-red-100 dark:hover:bg-red-900/50 border border-red-100 dark:border-red-900/30 transition-colors">
                            <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>cancel</span>
                            Cancel Order
                        </button>
                    </div>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Left: Tracking + Items */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Status Badge */}
                        <div className="flex items-center gap-3 bg-blue-50 dark:bg-blue-950/30 rounded-xl p-4 border border-blue-100 dark:border-blue-900/30">
                            <span className="material-symbols-outlined text-blue-600 dark:text-blue-400">local_shipping</span>
                            <div>
                                <p className="font-semibold text-blue-900 dark:text-blue-100">In Transit — On the way</p>
                                <p className="text-sm text-blue-600 dark:text-blue-400/80">Your order is expected to arrive by Oct 27, 2023</p>
                            </div>
                        </div>

                        {/* Tracking Timeline */}
                        <div className="bg-white dark:bg-gray-900 rounded-xl border border-slate-200 dark:border-gray-800 p-6 shadow-sm">
                            <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-6">Tracking</h2>
                            <ol className="relative border-l border-slate-200 dark:border-gray-800 ml-4 space-y-8">
                                {trackingSteps.map((step, i) => (
                                    <li key={i} className="ml-6">
                                        <span className={`absolute -left-4 flex h-8 w-8 items-center justify-center rounded-full ${step.done ? 'bg-primary text-white' : 'bg-slate-100 dark:bg-gray-800 text-slate-400 dark:text-gray-600'} ring-4 ring-white dark:ring-gray-900`}>
                                            <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>{step.icon}</span>
                                        </span>
                                        <p className={`text-sm font-semibold ${step.done ? 'text-slate-900 dark:text-white' : 'text-slate-400 dark:text-gray-600'}`}>{step.label}</p>
                                        <p className="text-xs text-slate-500 dark:text-gray-500 mt-0.5">{step.date}</p>
                                    </li>
                                ))}
                            </ol>
                        </div>

                        {/* Order Items */}
                        <div className="bg-white dark:bg-gray-900 rounded-xl border border-slate-200 dark:border-gray-800 p-6 shadow-sm">
                            <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-6">Items Ordered</h2>
                            <div className="divide-y divide-slate-100 dark:divide-gray-800">
                                {orderItems.map(item => (
                                    <div key={item.name} className="flex gap-4 py-4 first:pt-0 last:pb-0">
                                        <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md bg-slate-100 dark:bg-gray-800 border border-slate-100 dark:border-gray-700">
                                            <img src={item.img} alt={item.name} className="h-full w-full object-cover" />
                                        </div>
                                        <div className="flex flex-1 items-center justify-between">
                                            <div>
                                                <p className="text-sm font-semibold text-slate-900 dark:text-white">{item.name}</p>
                                                <p className="text-xs text-slate-500 dark:text-gray-400 mt-0.5">{item.variant}</p>
                                            </div>
                                            <p className="text-sm font-bold text-slate-900 dark:text-white">{item.price}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right: Summary */}
                    <div className="space-y-6">
                        {/* Order Summary */}
                        <div className="bg-white dark:bg-gray-900 rounded-xl border border-slate-200 dark:border-gray-800 p-6 shadow-sm">
                            <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Order Summary</h2>
                            <div className="space-y-3">
                                {[['Order #', 'ORD-29102'], ['Date', 'Oct 24, 2023'], ['Payment', 'Visa •••• 4242'], ['Subtotal', '₹19,998.00'], ['Shipping', 'Free'], ['Tax', '₹3,599.64'], ['Total', '₹23,597.64']].map(([k, v]) => (
                                    <div key={k} className={`flex justify-between ${k === 'Total' ? 'border-t border-slate-200 dark:border-gray-800 pt-3 text-base font-bold text-slate-900 dark:text-white' : 'text-sm text-slate-600 dark:text-gray-400'}`}>
                                        <span className={k === 'Total' ? '' : 'text-slate-500 dark:text-gray-500'}>{k}</span>
                                        <span className={k === 'Total' ? 'text-primary' : 'text-slate-900 dark:text-gray-200'}>{v}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Shipping Info */}
                        <div className="bg-white dark:bg-gray-900 rounded-xl border border-slate-200 dark:border-gray-800 p-6 shadow-sm">
                            <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Shipping Address</h2>
                            <div className="text-sm text-slate-600 dark:text-gray-400 space-y-1">
                                <p className="font-semibold text-slate-900 dark:text-white">John Doe</p>
                                <p>123 Main Street, Apt 4B</p>
                                <p>New York, NY 10001</p>
                                <p>United States</p>
                            </div>
                        </div>

                        {/* Need Help */}
                        <div className="bg-primary/5 dark:bg-primary/10 rounded-xl border border-primary/20 p-6">
                            <h3 className="text-sm font-semibold text-slate-900 dark:text-white mb-2">Need help?</h3>
                            <p className="text-xs text-slate-500 dark:text-gray-400 mb-3">Contact our support team for assistance with your order.</p>
                            <button className="w-full text-sm font-semibold text-primary bg-white dark:bg-gray-800 border border-primary/30 rounded-lg py-2 hover:bg-primary hover:text-white transition-colors">
                                Contact Support
                            </button>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    )
}
