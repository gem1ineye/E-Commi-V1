import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import api from '../utils/axiosConfig'
import toast from 'react-hot-toast'
import { formatPrice } from '../utils/formatCurrency'

export default function HomePage() {
    const [categories, setCategories] = useState([])
    const [featuredProducts, setFeaturedProducts] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchHomeData()
    }, [])

    const fetchHomeData = async () => {
        try {
            setLoading(true)

            // Fetch categories and featured products in parallel
            const [categoriesRes, productsRes] = await Promise.all([
                api.get('/categories'),
                api.get('/products?isFeatured=true&limit=8')
            ])

            setCategories(categoriesRes.data.categories || [])
            setFeaturedProducts(productsRes.data.products || [])
        } catch (error) {
            console.error('Error fetching home data:', error)
            toast.error('Failed to load data')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="bg-background-light dark:bg-gray-950 font-display text-slate-900 dark:text-gray-100 antialiased min-h-screen flex flex-col transition-colors duration-300">
            <Navbar />

            <main className="flex-grow">
                {/* Hero Section */}
                <section className="relative bg-gradient-to-br from-primary via-blue-600 to-indigo-700 text-white overflow-hidden">
                    <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
                    <div className="relative mx-auto max-w-[1440px] px-6 py-20 lg:px-12 lg:py-32">
                        <div className="grid lg:grid-cols-2 gap-12 items-center">
                            <div>
                                <div className="inline-block bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold mb-6">
                                    ✨ New Arrivals Just Dropped
                                </div>
                                <h1 className="text-5xl lg:text-6xl font-black mb-6 leading-tight">
                                    Discover Your Next Favorite Product
                                </h1>
                                <p className="text-xl text-blue-100 mb-8 leading-relaxed">
                                    Shop the latest trends with amazing deals. Free shipping on orders over ₹500!
                                </p>
                                <div className="flex flex-wrap gap-4">
                                    <Link to="/products" className="px-8 py-4 bg-white text-primary font-bold rounded-xl hover:bg-blue-50 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                                        Shop Now
                                    </Link>
                                    <Link to="/products?sort=createdAt&order=desc" className="px-8 py-4 bg-white/10 backdrop-blur-sm border-2 border-white text-white font-bold rounded-xl hover:bg-white/20 transition-all">
                                        View New Arrivals
                                    </Link>
                                </div>
                            </div>
                            <div className="hidden lg:block  w-[600px]">
                                <div className="relative">
                                    <div className="absolute inset-0 bg-gradient-to-r from-primary/50 to-transparent blur-3xl"></div>
                                    <img
                                        src="https://suprememobiles.in/cdn/shop/files/1_2ab6c803-16e7-4e9d-8177-09689c589a8a.webp?v=1738819846&width=1100"
                                        alt="Samsung S25 Ultra"
                                        className="relative rounded-2xl shadow-2xl"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Categories Section */}
                <section className="py-16 mx-auto max-w-[1440px] px-6 lg:px-12">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Shop by Category</h2>
                            <p className="text-slate-500 dark:text-gray-400 mt-2">Find what you're looking for</p>
                        </div>
                        <Link to="/products" className="text-primary font-semibold hover:underline hidden md:block">
                            View All →
                        </Link>
                    </div>

                    {loading ? (
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                            {[...Array(6)].map((_, i) => (
                                <div key={i} className="h-32 bg-gray-200 dark:bg-gray-800 rounded-xl animate-pulse"></div>
                            ))}
                        </div>
                    ) : categories.length > 0 ? (
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                            {categories.slice(0, 6).map((category) => (
                                <Link
                                    key={category._id}
                                    to={`/products?category=${category._id}`}
                                    className="group relative bg-white dark:bg-gray-900 rounded-xl p-6 hover:shadow-lg transition-all border border-slate-100 dark:border-gray-800 overflow-hidden"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                    <div className="relative text-center">
                                        <div className="text-4xl mb-3 transform group-hover:scale-110 transition-transform">
                                            {getCategoryIcon(category.name)}
                                        </div>
                                        <h3 className="font-semibold text-slate-900 dark:text-white text-sm">
                                            {category.name}
                                        </h3>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12">
                            <p className="text-gray-500">No categories available</p>
                        </div>
                    )}
                </section>

                {/* Featured Products */}
                <section className="py-16 bg-background-subtle dark:bg-gray-900">
                    <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
                        <div className="flex items-center justify-between mb-8">
                            <div>
                                <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Featured Products</h2>
                                <p className="text-slate-500 dark:text-gray-400 mt-2">Handpicked favorites for you</p>
                            </div>
                            <Link to="/products" className="text-primary font-semibold hover:underline">
                                View All →
                            </Link>
                        </div>

                        {loading ? (
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                                {[...Array(8)].map((_, i) => (
                                    <div key={i} className="h-80 bg-gray-200 dark:bg-gray-800 rounded-xl animate-pulse"></div>
                                ))}
                            </div>
                        ) : featuredProducts.length > 0 ? (
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                                {featuredProducts.map((product) => (
                                    <Link
                                        key={product._id}
                                        to={`/products/${product._id}`}
                                        className="group bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-slate-100 dark:border-gray-700"
                                    >
                                        {/* Product Image */}
                                        <div className="relative aspect-square bg-gray-100 dark:bg-gray-700 overflow-hidden">
                                            {product.images?.[0]?.url ? (
                                                <img
                                                    src={product.images[0].url}
                                                    alt={product.name}
                                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                                    onError={(e) => {
                                                        e.target.onerror = null;
                                                        e.target.parentElement.innerHTML = '<div class="w-full h-full flex items-center justify-center"><span class="text-6xl opacity-30">📦</span></div>';
                                                    }}
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center">
                                                    <span className="text-6xl opacity-30">📦</span>
                                                </div>
                                            )}

                                            {/* Badges */}
                                            {product.isFeatured && (
                                                <span className="absolute top-3 left-3 bg-yellow-400 text-yellow-900 text-xs font-bold px-2 py-1 rounded-full">
                                                    ⭐ Featured
                                                </span>
                                            )}
                                            {product.compareAtPrice && product.compareAtPrice > product.price && (
                                                <span className="absolute top-3 right-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                                                    -{Math.round((1 - product.price / product.compareAtPrice) * 100)}%
                                                </span>
                                            )}
                                        </div>

                                        {/* Product Info */}
                                        <div className="p-4">
                                            <p className="text-xs text-slate-500 dark:text-gray-400 uppercase tracking-wide mb-1">
                                                {product.brand || product.category?.name || 'General'}
                                            </p>
                                            <h3 className="font-semibold text-slate-900 dark:text-white mb-2 line-clamp-2 leading-tight">
                                                {product.name}
                                            </h3>

                                            {/* Rating */}
                                            {product.ratings?.average > 0 && (
                                                <div className="flex items-center gap-1 mb-2">
                                                    <div className="flex text-yellow-400 text-sm">
                                                        {'★'.repeat(Math.round(product.ratings.average))}
                                                    </div>
                                                    <span className="text-xs text-gray-500">
                                                        ({product.ratings.count})
                                                    </span>
                                                </div>
                                            )}

                                            {/* Price */}
                                            <div className="flex items-center gap-2">
                                                <span className="text-lg font-bold text-slate-900 dark:text-white">
                                                    {formatPrice(product.price)}
                                                </span>
                                                {product.compareAtPrice && product.compareAtPrice > product.price && (
                                                    <span className="text-sm text-gray-400 line-through">
                                                        {formatPrice(product.compareAtPrice)}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-16">
                                <div className="text-6xl mb-4">🛍️</div>
                                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">No products available</h3>
                                <p className="text-gray-600 dark:text-gray-400">Check back soon for new items!</p>
                            </div>
                        )}
                    </div>
                </section>

                {/* Features Banner */}
                <section className="py-16">
                    <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
                        <div className="grid md:grid-cols-4 gap-8">
                            {[
                                { icon: 'local_shipping', title: 'Free Shipping', desc: 'On orders over ₹500' },
                                { icon: 'verified_user', title: 'Secure Payment', desc: '100% secure transactions' },
                                { icon: 'autorenew', title: 'Easy Returns', desc: '30-day return policy' },
                                { icon: 'support_agent', title: '24/7 Support', desc: 'Dedicated customer service' },
                            ].map((feature) => (
                                <div key={feature.title} className="text-center">
                                    <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 text-primary rounded-full mb-4">
                                        <span className="material-symbols-outlined" style={{ fontSize: '32px' }}>
                                            {feature.icon}
                                        </span>
                                    </div>
                                    <h3 className="font-bold text-slate-900 dark:text-white mb-2">{feature.title}</h3>
                                    <p className="text-sm text-slate-600 dark:text-gray-400">{feature.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    )
}

// Helper function for category icons
function getCategoryIcon(categoryName) {
    const icons = {
        'Electronics': '📱',
        'Fashion': '👗',
        'Home': '🏠',
        'Beauty': '💄',
        'Sports': '⚽',
        'Books': '📚',
        'Toys': '🧸',
        'Grocery': '🛒'
    }
    return icons[categoryName] || '📦'
}