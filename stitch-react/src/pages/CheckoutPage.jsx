import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { clearCart } from '../store/cartSlice'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import toast from 'react-hot-toast'

export default function CheckoutPage() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { items, totalAmount } = useSelector(state => state.cart)
    const [payment, setPayment] = useState('card')

    const shipping = totalAmount > 50 ? 0 : 10
    const tax = +(totalAmount * 0.087).toFixed(2)
    const total = +(totalAmount + shipping + tax).toFixed(2)

    const handlePlaceOrder = (e) => {
        e.preventDefault()
        toast.promise(
            new Promise(resolve => setTimeout(resolve, 1500)),
            {
                loading: 'Processing your order...',
                success: 'Order placed successfully! 🎉',
                error: 'Could not place order',
            }
        ).then(() => {
            dispatch(clearCart())
            navigate('/')
        })
    }

    if (items.length === 0) {
        return (
            <div className="bg-background-light dark:bg-gray-950 min-h-screen">
                <Navbar />
                <div className="flex flex-col items-center justify-center py-20 px-6">
                    <h2 className="text-3xl font-bold mb-4">Your cart is empty</h2>
                    <Link to="/products" className="px-6 py-3 bg-primary text-white rounded-xl font-bold">Go to Shop</Link>
                </div>
                <Footer />
            </div>
        )
    }

    return (
        <div className="bg-background-light dark:bg-gray-950 text-slate-900 dark:text-gray-100 font-display min-h-screen flex flex-col transition-colors duration-300">
            <Navbar />

            <main className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                {/* Progress Steps */}
                <div className="mb-12 flex items-center justify-center gap-4 text-sm font-bold text-slate-400 dark:text-gray-500">
                    <div className="flex items-center gap-2 text-green-500">
                        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-green-500/10 border-2 border-green-500 text-green-500">
                            <span className="material-symbols-outlined text-[18px]">check</span>
                        </span>
                        <span>Cart</span>
                    </div>
                    <div className="h-0.5 w-12 bg-slate-200 dark:bg-gray-800"></div>
                    <div className="flex items-center gap-2 text-primary">
                        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-white">2</span>
                        <span>Checkout</span>
                    </div>
                    <div className="h-0.5 w-12 bg-slate-200 dark:bg-gray-800"></div>
                    <div className="flex items-center gap-2">
                        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-100 dark:bg-gray-800 border-2 border-slate-200 dark:border-gray-700">3</span>
                        <span>Confirmation</span>
                    </div>
                </div>

                <form onSubmit={handlePlaceOrder} className="flex flex-col lg:flex-row gap-8 lg:gap-12">
                    {/* Forms Side */}
                    <div className="flex-1 space-y-8">
                        {/* Shipping */}
                        <section className="bg-white dark:bg-gray-900 rounded-3xl p-8 shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-gray-800">
                            <div className="flex items-center gap-3 mb-8">
                                <div className="p-2 bg-primary/10 text-primary rounded-lg">
                                    <span className="material-symbols-outlined">local_shipping</span>
                                </div>
                                <h2 className="text-2xl font-bold">Shipping Information</h2>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-bold mb-2">Full Name</label>
                                    <input required className="w-full rounded-xl border-slate-200 dark:border-gray-700 bg-slate-50 dark:bg-gray-800 p-4 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary transition-all" placeholder="Enter your full name" type="text" />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-bold mb-2">Street Address</label>
                                    <input required className="w-full rounded-xl border-slate-200 dark:border-gray-700 bg-slate-50 dark:bg-gray-800 p-4 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary transition-all" placeholder="House number and street name" type="text" />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold mb-2">City</label>
                                    <input required className="w-full rounded-xl border-slate-200 dark:border-gray-700 bg-slate-50 dark:bg-gray-800 p-4 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary transition-all" placeholder="City" type="text" />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold mb-2">Postal Code</label>
                                    <input required className="w-full rounded-xl border-slate-200 dark:border-gray-700 bg-slate-50 dark:bg-gray-800 p-4 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary transition-all" placeholder="Zip/Postal code" type="text" />
                                </div>
                            </div>
                        </section>

                        {/* Payment */}
                        <section className="bg-white dark:bg-gray-900 rounded-3xl p-8 shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-gray-800">
                            <div className="flex items-center gap-3 mb-8">
                                <div className="p-2 bg-primary/10 text-primary rounded-lg">
                                    <span className="material-symbols-outlined">payments</span>
                                </div>
                                <h2 className="text-2xl font-bold">Payment Method</h2>
                            </div>
                            <div className="space-y-4">
                                {[
                                    { id: 'card', icon: 'credit_card', label: 'Credit / Debit Card', desc: 'Secure payment via Stripe.' },
                                    { id: 'cod', icon: 'payments', label: 'Cash on Delivery', desc: 'Pay when you receive the order.' },
                                ].map(pm => (
                                    <label key={pm.id} onClick={() => setPayment(pm.id)}
                                        className={`flex cursor-pointer rounded-2xl border-2 p-5 transition-all ${payment === pm.id ? 'border-primary bg-primary/5 dark:bg-primary/20' : 'border-slate-100 dark:border-gray-800 bg-slate-50 dark:bg-gray-900/50 hover:border-slate-200 dark:hover:border-gray-700'}`}>
                                        <div className="flex flex-1 gap-4 items-center">
                                            <div className={`p-2 rounded-lg ${payment === pm.id ? 'bg-primary text-white' : 'bg-slate-200 dark:bg-gray-800 text-slate-500'}`}>
                                                <span className="material-symbols-outlined" style={{ fontSize: '24px' }}>{pm.icon}</span>
                                            </div>
                                            <div>
                                                <span className="block font-bold text-slate-900 dark:text-white">{pm.label}</span>
                                                <span className="block text-sm text-slate-500">{pm.desc}</span>
                                            </div>
                                        </div>
                                        <div className={`flex items-center justify-center size-6 rounded-full border-2 ${payment === pm.id ? 'border-primary bg-primary' : 'border-slate-300 dark:border-gray-700'}`}>
                                            {payment === pm.id && <div className="size-2 bg-white rounded-full"></div>}
                                        </div>
                                    </label>
                                ))}
                            </div>

                            {payment === 'card' && (
                                <div className="mt-8 p-6 bg-slate-50 dark:bg-gray-800/50 rounded-2xl border border-slate-100 dark:border-gray-700 space-y-4 animate-in fade-in slide-in-from-top-2">
                                    <div>
                                        <label className="block text-xs font-black uppercase text-slate-400 mb-2">Card Number</label>
                                        <input required className="w-full rounded-xl border-slate-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-3.5 text-sm" placeholder="0000 0000 0000 0000" type="text" />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-xs font-black uppercase text-slate-400 mb-2">Expiry Date</label>
                                            <input required className="w-full rounded-xl border-slate-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-3.5 text-sm" placeholder="MM/YY" type="text" />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-black uppercase text-slate-400 mb-2">CVC</label>
                                            <input required className="w-full rounded-xl border-slate-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-3.5 text-sm" placeholder="123" type="text" />
                                        </div>
                                    </div>
                                </div>
                            )}
                        </section>
                    </div>

                    {/* Order Sidebar */}
                    <div className="lg:w-[400px] shrink-0">
                        <div className="sticky top-24 bg-white dark:bg-gray-900 rounded-3xl p-8 shadow-2xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-gray-800">
                            <h2 className="text-xl font-bold mb-8">Order Summary</h2>

                            <div className="space-y-6 mb-8 max-h-[320px] overflow-y-auto pr-2 custom-scrollbar">
                                {items.map(item => (
                                    <div key={item.product} className="flex gap-4">
                                        <div className="h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-slate-50 dark:bg-gray-800 border border-slate-100 dark:border-gray-700">
                                            <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                                        </div>
                                        <div className="flex flex-1 flex-col justify-center">
                                            <h3 className="font-bold text-slate-900 dark:text-white line-clamp-1">{item.name}</h3>
                                            <div className="flex justify-between items-center mt-1">
                                                <p className="text-sm text-slate-500">Qty: {item.quantity}</p>
                                                <p className="font-bold text-slate-900 dark:text-white">${(item.price * item.quantity).toFixed(2)}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="space-y-4 pt-6 border-t border-slate-100 dark:border-gray-800">
                                <div className="flex justify-between text-slate-600 dark:text-gray-400">
                                    <span className="font-medium">Subtotal</span>
                                    <span className="font-bold">${totalAmount.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-slate-600 dark:text-gray-400">
                                    <span className="font-medium">Shipping</span>
                                    <span className={`font-bold ${shipping === 0 ? 'text-green-600 font-black' : ''}`}>
                                        {shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}
                                    </span>
                                </div>
                                <div className="flex justify-between text-slate-600 dark:text-gray-400">
                                    <span className="font-medium">Tax</span>
                                    <span className="font-bold">${tax.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between items-center pt-4 border-t border-slate-100 dark:border-gray-800 mt-4">
                                    <span className="text-xl font-bold">Total</span>
                                    <span className="text-3xl font-black text-primary">${total}</span>
                                </div>
                            </div>

                            <button type="submit" className="w-full mt-10 py-5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-black rounded-2xl shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 group">
                                <span className="material-symbols-outlined">verified_user</span>
                                Place Order Now
                            </button>

                            <p className="text-center text-[10px] text-slate-400 dark:text-gray-500 mt-6 uppercase font-black tracking-widest flex items-center justify-center gap-1">
                                <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>lock</span>
                                Encrypted Secure Checkout
                            </p>
                        </div>
                    </div>
                </form>
            </main>

            <Footer />
        </div>
    )
}
