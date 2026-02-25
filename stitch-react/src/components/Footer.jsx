import { Link } from 'react-router-dom'

export default function Footer() {
    return (
        <footer className="bg-background-dark dark:bg-gray-950 pt-16 pb-8 text-white transition-colors duration-300">
            <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
                    {/* Brand */}
                    <div className="flex flex-col gap-4">
                        <div className="flex items-center gap-2">
                            <div className="flex size-8 items-center justify-center rounded-lg bg-primary text-white">
                                <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>shopping_bag</span>
                            </div>
                            <h3 className="text-xl font-bold">ShopMern</h3>
                        </div>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            Your one-stop shop for everything you need. Quality products, great prices, and fast shipping.
                        </p>
                    </div>
                    {/* Shop Links */}
                    <div>
                        <h4 className="font-bold mb-4 text-lg">Shop</h4>
                        <ul className="flex flex-col gap-2 text-gray-400 text-sm">
                            <li><Link to="/products" className="hover:text-white transition-colors">All Products</Link></li>
                            <li><Link to="/products" className="hover:text-white transition-colors">Featured</Link></li>
                            <li><Link to="/products" className="hover:text-white transition-colors">Electronics</Link></li>
                            <li><Link to="/products" className="hover:text-white transition-colors">Fashion</Link></li>
                        </ul>
                    </div>
                    {/* Support */}
                    <div>
                        <h4 className="font-bold mb-4 text-lg">Support</h4>
                        <ul className="flex flex-col gap-2 text-gray-400 text-sm">
                            <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">FAQs</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Shipping Policy</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Returns</a></li>
                        </ul>
                    </div>
                    {/* Newsletter */}
                    <div>
                        <h4 className="font-bold mb-4 text-lg">Stay in the loop</h4>
                        <form className="flex flex-col gap-3" onSubmit={e => e.preventDefault()}>
                            <input className="w-full rounded-lg bg-gray-800 border-none px-4 py-3 text-sm text-white placeholder-gray-500 focus:ring-2 focus:ring-primary" placeholder="Enter your email" type="email" />
                            <button className="w-full rounded-lg bg-primary px-4 py-3 text-sm font-bold text-white hover:bg-primary-dark transition-colors">Subscribe</button>
                        </form>
                    </div>
                </div>
                <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
                    <p>© 2024 ShopMern Inc. All rights reserved.</p>
                    <div className="flex gap-6">
                        <a href="#" className="hover:text-white">Privacy Policy</a>
                        <a href="#" className="hover:text-white">Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    )
}
