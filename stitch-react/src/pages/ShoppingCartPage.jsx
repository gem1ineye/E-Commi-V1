import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { removeFromCart, updateQuantity } from '../store/cartSlice'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import toast from 'react-hot-toast'
import { formatPrice } from '../utils/formatCurrency'

export default function ShoppingCartPage() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { items, totalAmount } = useSelector(state => state.cart)
    const [coupon, setCoupon] = useState('')

    const handleQtyChange = (productId, currentQty, delta, stock) => {
        const newQty = currentQty + delta
        if (newQty < 1) return
        if (newQty > stock) {
            toast.error('Not enough stock')
            return
        }
        dispatch(updateQuantity({ productId, quantity: newQty }))
    }

    const handleRemove = (productId) => {
        dispatch(removeFromCart(productId))
        toast.success('Item removed')
    }

    const shipping = items.length > 0 ? (totalAmount > 500 ? 0 : 100) : 0
    const tax = +(totalAmount * 0.18).toFixed(2) // Updated to 18% GST for India
    const total = +(totalAmount + shipping + tax).toFixed(2)

    return (
        <div className="bg-background-light dark:bg-gray-950 text-slate-900 dark:text-gray-100 min-h-screen flex flex-col font-display transition-colors duration-300">
            <Navbar />

            <main className="flex-grow w-full max-w-[1440px] mx-auto px-6 py-8 md:px-10 lg:py-12">
                {/* Breadcrumb */}
                <nav className="flex mb-8 text-sm text-slate-500 dark:text-gray-400">
                    <Link to="/" className="hover:text-primary transition-colors">Home</Link>
                    <span className="material-symbols-outlined text-[16px] mx-1">chevron_right</span>
                    <span className="font-medium text-slate-900 dark:text-white">Shopping Cart</span>
                </nav>

                <div className="flex flex-col lg:flex-row gap-10">
                    {/* Cart Items */}
                    <div className="flex-1">
                        <div className="flex items-baseline justify-between mb-6 border-b border-slate-200 dark:border-gray-800 pb-4">
                            <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white">Your Cart</h1>
                            <span className="text-slate-500 dark:text-gray-400 font-medium">{items.length} items</span>
                        </div>

                        {items.length === 0 ? (
                            <div className="bg-white dark:bg-gray-900 rounded-2xl p-12 text-center border border-slate-100 dark:border-gray-800 shadow-sm">
                                <div className="text-6xl mb-4">🛒</div>
                                <h2 className="text-2xl font-bold mb-2">Your cart is empty</h2>
                                <p className="text-slate-500 mb-8">Looks like you haven't added anything to your cart yet.</p>
                                <Link to="/products" className="inline-flex items-center justify-center px-8 py-3 bg-primary text-white font-bold rounded-xl hover:bg-primary-dark transition shadow-lg shadow-primary/30">
                                    Start Shopping
                                </Link>
                            </div>
                        ) : (
                            <div className="flex flex-col gap-6">
                                {items.map(item => (
                                    <div key={item.product} className="flex flex-col sm:flex-row gap-6 p-6 rounded-xl bg-white dark:bg-gray-900 shadow-sm border border-slate-100 dark:border-gray-800 transition-shadow hover:shadow-md">
                                        <div className="shrink-0">
                                            <img src={item.image} alt={item.name} className="h-32 w-32 rounded-lg object-cover bg-slate-50 dark:bg-gray-800" />
                                        </div>
                                        <div className="flex flex-1 flex-col">
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">{item.name}</h3>
                                                    <p className="mt-1 text-sm text-slate-500 dark:text-gray-400">Unit Price: {formatPrice(item.price)}</p>
                                                    <p className={`mt-1 text-xs font-medium flex items-center gap-1 ${item.stock > 0 ? 'text-green-600' : 'text-red-500'}`}>
                                                        <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>
                                                            {item.stock > 0 ? 'check_circle' : 'error'}
                                                        </span>
                                                        {item.stock > 0 ? 'In Stock' : 'Out of Stock'}
                                                    </p>
                                                </div>
                                                <p className="text-lg font-bold text-slate-900 dark:text-white">{formatPrice(item.price * item.quantity)}</p>
                                            </div>
                                            <div className="mt-auto flex items-center justify-between pt-4">
                                                <div className="flex items-center border-2 border-slate-100 dark:border-gray-800 rounded-xl overflow-hidden">
                                                    <button
                                                        onClick={() => handleQtyChange(item.product, item.quantity, -1, item.stock)}
                                                        className="p-2 text-slate-600 dark:text-gray-400 hover:text-primary hover:bg-slate-50 dark:hover:bg-gray-800 transition-all font-bold"
                                                    >
                                                        <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>remove</span>
                                                    </button>
                                                    <span className="w-12 text-center text-sm font-black text-slate-900 dark:text-white">{item.quantity}</span>
                                                    <button
                                                        onClick={() => handleQtyChange(item.product, item.quantity, 1, item.stock)}
                                                        className="p-2 text-slate-600 dark:text-gray-400 hover:text-primary hover:bg-slate-50 dark:hover:bg-gray-800 transition-all font-bold"
                                                    >
                                                        <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>add</span>
                                                    </button>
                                                </div>
                                                <button
                                                    onClick={() => handleRemove(item.product)}
                                                    className="flex items-center gap-1.5 text-sm font-bold text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 px-3 py-1.5 rounded-lg transition-all"
                                                >
                                                    <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>delete</span>
                                                    <span className="hidden sm:inline">Remove</span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                        <div className="mt-8">
                            <Link to="/products" className="inline-flex items-center gap-2 text-sm font-bold text-primary hover:text-primary-dark transition-all group">
                                <span className="material-symbols-outlined text-[18px] group-hover:-translate-x-1 transition-transform">arrow_back</span>
                                Continue Shopping
                            </Link>
                        </div>
                    </div>

                    {/* Order Summary */}
                    <div className="w-full lg:w-[380px] shrink-0">
                        <div className="sticky top-24 rounded-2xl bg-white dark:bg-gray-900 p-8 shadow-xl border border-slate-100 dark:border-gray-800">
                            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6">Order Summary</h2>
                            <div className="space-y-4 border-b border-slate-100 dark:border-gray-800 pb-6">
                                <div className="flex justify-between text-slate-600 dark:text-gray-400">
                                    <span>Subtotal</span>
                                    <span className="font-bold text-slate-900 dark:text-white">{formatPrice(totalAmount)}</span>
                                </div>
                                <div className="flex justify-between text-slate-600 dark:text-gray-400">
                                    <span>Shipping</span>
                                    <span className={`font-bold ${shipping === 0 ? 'text-green-600' : 'text-slate-900 dark:text-white'}`}>
                                        {shipping === 0 ? 'FREE' : formatPrice(shipping)}
                                    </span>
                                </div>
                                <div className="flex justify-between text-slate-600 dark:text-gray-400">
                                    <span>Tax estimate (18% GST)</span>
                                    <span className="font-bold text-slate-900 dark:text-white">{formatPrice(tax)}</span>
                                </div>
                            </div>

                            <div className="py-6 border-b border-slate-100 dark:border-gray-800">
                                <label className="block text-sm font-bold text-slate-700 dark:text-gray-300 mb-2">Promo Code</label>
                                <div className="flex gap-2">
                                    <input
                                        value={coupon}
                                        onChange={e => setCoupon(e.target.value)}
                                        className="block w-full rounded-xl border-slate-200 dark:border-gray-700 bg-slate-50 dark:bg-gray-800 p-3 text-sm focus:border-primary focus:ring-primary dark:text-white"
                                        placeholder="Enter code"
                                        type="text"
                                    />
                                    <button className="px-4 py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold rounded-xl text-sm hover:opacity-90 transition-all">Apply</button>
                                </div>
                            </div>

                            <div className="pt-6">
                                <div className="flex justify-between items-center mb-8">
                                    <span className="text-lg font-bold text-slate-900 dark:text-white">Order Total</span>
                                    <span className="text-3xl font-black text-primary">{formatPrice(total)}</span>
                                </div>
                                <button
                                    onClick={() => navigate('/checkout')}
                                    disabled={items.length === 0}
                                    className="w-full py-4 bg-primary text-white font-bold rounded-xl shadow-lg shadow-primary/30 hover:bg-primary-dark transition-all flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    Proceed to Checkout
                                    <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
                                </button>

                                <div className="mt-8 grid grid-cols-3 gap-4 pb-2">
                                    <div className="flex flex-col items-center gap-1 opacity-40">
                                        <span className="material-symbols-outlined">shield</span>
                                        <span className="text-[10px] font-bold uppercase">Secure</span>
                                    </div>
                                    <div className="flex flex-col items-center gap-1 opacity-40">
                                        <span className="material-symbols-outlined">local_shipping</span>
                                        <span className="text-[10px] font-bold uppercase">Fast</span>
                                    </div>
                                    <div className="flex flex-col items-center gap-1 opacity-40">
                                        <span className="material-symbols-outlined">workspace_premium</span>
                                        <span className="text-[10px] font-bold uppercase">Quality</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    )
}
