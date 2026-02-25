import { useState, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import api from '../utils/axiosConfig'
import toast from 'react-hot-toast'

export default function ProductListingPage() {
    const [searchParams, setSearchParams] = useSearchParams()
    const [products, setProducts] = useState([])
    const [categories, setCategories] = useState([])
    const [loading, setLoading] = useState(true)
    const [pagination, setPagination] = useState({
        currentPage: 1,
        totalPages: 1,
        total: 0
    })

    const [filters, setFilters] = useState({
        category: searchParams.get('category') || '',
        minPrice: searchParams.get('minPrice') || '',
        maxPrice: searchParams.get('maxPrice') || '',
        brand: searchParams.get('brand') || '',
        sort: searchParams.get('sort') || 'createdAt',
        order: searchParams.get('order') || 'desc',
        search: searchParams.get('search') || ''
    })

    useEffect(() => {
        fetchCategories()
    }, [])

    useEffect(() => {
        fetchProducts()
    }, [searchParams])

    const fetchCategories = async () => {
        try {
            const res = await api.get('/categories')
            setCategories(res.data.categories || [])
        } catch (error) {
            console.error('Error fetching categories:', error)
        }
    }

    const fetchProducts = async () => {
        try {
            setLoading(true)
            const queryString = searchParams.toString()
            const res = await api.get(`/products?${queryString}`)

            setProducts(res.data.products || [])
            setPagination({
                currentPage: res.data.currentPage || 1,
                totalPages: res.data.pages || 1,
                total: res.data.total || 0
            })
        } catch (error) {
            console.error('Error fetching products:', error)
            toast.error('Failed to load products')
        } finally {
            setLoading(false)
        }
    }

    const handleFilterChange = (key, value) => {
        const newParams = new URLSearchParams(searchParams)
        if (value) {
            newParams.set(key, value)
        } else {
            newParams.delete(key)
        }
        // Reset to page 1 when filters change
        newParams.set('page', '1')
        setSearchParams(newParams)
    }

    const clearAllFilters = () => {
        setSearchParams({})
        setFilters({
            category: '',
            minPrice: '',
            maxPrice: '',
            brand: '',
            sort: 'createdAt',
            order: 'desc',
            search: ''
        })
    }

    const handlePageChange = (page) => {
        const newParams = new URLSearchParams(searchParams)
        newParams.set('page', page)
        setSearchParams(newParams)
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    return (
        <div className="bg-background-light dark:bg-gray-950 font-display text-slate-900 dark:text-gray-100 antialiased min-h-screen flex flex-col transition-colors duration-300">
            <Navbar />

            <main className="flex-grow mx-auto max-w-[1440px] px-6 py-8 lg:px-12">
                {/* Breadcrumb */}
                <nav className="flex items-center gap-2 text-sm text-slate-500 dark:text-gray-400 mb-6">
                    <Link to="/" className="hover:text-primary transition-colors">Home</Link>
                    <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>chevron_right</span>
                    <span className="font-medium text-slate-900 dark:text-white">Products</span>
                </nav>

                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">All Products</h1>
                        <p className="text-slate-600 dark:text-gray-400 mt-1">
                            {loading ? 'Loading...' : `Showing ${products.length} of ${pagination.total} products`}
                        </p>
                    </div>
                </div>

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Filters Sidebar */}
                    <aside className="lg:w-72 shrink-0">
                        <div className="sticky top-24 bg-white dark:bg-gray-900 rounded-xl p-6 border border-slate-200 dark:border-gray-800 shadow-sm">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-lg font-bold text-slate-900 dark:text-white">Filters</h2>
                                <button
                                    onClick={clearAllFilters}
                                    className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                                >
                                    Clear All
                                </button>
                            </div>

                            {/* Sort By */}
                            <div className="mb-6">
                                <label className="block text-sm font-semibold text-slate-900 dark:text-white mb-3">
                                    Sort By
                                </label>
                                <select
                                    value={filters.sort}
                                    onChange={(e) => handleFilterChange('sort', e.target.value)}
                                    className="w-full border border-gray-300 dark:border-gray-700 dark:bg-gray-800 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                                >
                                    <option value="createdAt">Newest First</option>
                                    <option value="price">Price: Low to High</option>
                                    <option value="price-desc">Price: High to Low</option>
                                    <option value="name">Name: A to Z</option>
                                    <option value="ratings.average">Top Rated</option>
                                </select>
                            </div>

                            {/* Price Range */}
                            <div className="mb-6">
                                <label className="block text-sm font-semibold text-slate-900 dark:text-white mb-3">
                                    Price Range
                                </label>
                                <div className="grid grid-cols-2 gap-3">
                                    <input
                                        type="number"
                                        placeholder="Min"
                                        value={filters.minPrice}
                                        onChange={(e) => {
                                            setFilters({ ...filters, minPrice: e.target.value })
                                            handleFilterChange('minPrice', e.target.value)
                                        }}
                                        className="border border-gray-300 dark:border-gray-700 dark:bg-gray-800 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                                    />
                                    <input
                                        type="number"
                                        placeholder="Max"
                                        value={filters.maxPrice}
                                        onChange={(e) => {
                                            setFilters({ ...filters, maxPrice: e.target.value })
                                            handleFilterChange('maxPrice', e.target.value)
                                        }}
                                        className="border border-gray-300 dark:border-gray-700 dark:bg-gray-800 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                                    />
                                </div>
                            </div>

                            {/* Categories */}
                            <div className="mb-6">
                                <label className="block text-sm font-semibold text-slate-900 dark:text-white mb-3">
                                    Categories
                                </label>
                                <div className="space-y-2 max-h-60 overflow-y-auto">
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input
                                            type="radio"
                                            name="category"
                                            value=""
                                            checked={filters.category === ''}
                                            onChange={() => handleFilterChange('category', '')}
                                            className="text-primary focus:ring-primary"
                                        />
                                        <span className="text-sm text-slate-700 dark:text-gray-300">All Categories</span>
                                    </label>
                                    {categories.map((cat) => (
                                        <label key={cat._id} className="flex items-center gap-2 cursor-pointer">
                                            <input
                                                type="radio"
                                                name="category"
                                                value={cat._id}
                                                checked={filters.category === cat._id}
                                                onChange={() => {
                                                    setFilters({ ...filters, category: cat._id })
                                                    handleFilterChange('category', cat._id)
                                                }}
                                                className="text-primary focus:ring-primary"
                                            />
                                            <span className="text-sm text-slate-700 dark:text-gray-300">{cat.name}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Brand Filter */}
                            <div>
                                <label className="block text-sm font-semibold text-slate-900 dark:text-white mb-3">
                                    Brand
                                </label>
                                <input
                                    type="text"
                                    placeholder="Enter brand name"
                                    value={filters.brand}
                                    onChange={(e) => {
                                        setFilters({ ...filters, brand: e.target.value })
                                        handleFilterChange('brand', e.target.value)
                                    }}
                                    className="w-full border border-gray-300 dark:border-gray-700 dark:bg-gray-800 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                                />
                            </div>
                        </div>
                    </aside>

                    {/* Products Grid */}
                    <div className="flex-1">
                        {loading ? (
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
                                {[...Array(9)].map((_, i) => (
                                    <div key={i} className="h-96 bg-gray-200 dark:bg-gray-800 rounded-xl animate-pulse"></div>
                                ))}
                            </div>
                        ) : products.length > 0 ? (
                            <>
                                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
                                    {products.map((product) => (
                                        <Link
                                            key={product._id}
                                            to={`/products/${product._id}`}
                                            className="group bg-white dark:bg-gray-900 rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-slate-100 dark:border-gray-800"
                                        >
                                            {/* Product Image */}
                                            <div className="relative aspect-square bg-gray-100 dark:bg-gray-800 overflow-hidden">
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

                                                {/* Discount Badge */}
                                                {product.compareAtPrice && product.compareAtPrice > product.price && (
                                                    <span className="absolute top-3 right-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                                                        -{Math.round((1 - product.price / product.compareAtPrice) * 100)}%
                                                    </span>
                                                )}
                                            </div>

                                            {/* Product Info */}
                                            <div className="p-4">
                                                <p className="text-xs text-slate-500 dark:text-gray-400 uppercase mb-1">
                                                    {product.brand || product.category?.name || 'General'}
                                                </p>
                                                <h3 className="font-semibold text-slate-900 dark:text-white mb-2 line-clamp-2 text-sm leading-tight">
                                                    {product.name}
                                                </h3>

                                                {/* Rating */}
                                                {product.ratings?.average > 0 && (
                                                    <div className="flex items-center gap-1 mb-2">
                                                        <div className="flex text-yellow-400 text-xs">
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
                                                        ${product.price?.toFixed(2)}
                                                    </span>
                                                    {product.compareAtPrice && product.compareAtPrice > product.price && (
                                                        <span className="text-sm text-gray-400 line-through">
                                                            ${product.compareAtPrice?.toFixed(2)}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                                </div>

                                {/* Pagination */}
                                {pagination.totalPages > 1 && (
                                    <div className="flex items-center justify-center gap-2 mt-12">
                                        <button
                                            onClick={() => handlePageChange(pagination.currentPage - 1)}
                                            disabled={pagination.currentPage === 1}
                                            className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-slate-700 dark:text-gray-300 font-medium hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
                                        >
                                            Previous
                                        </button>

                                        {[...Array(pagination.totalPages)].map((_, i) => {
                                            const page = i + 1
                                            // Show first page, last page, current page, and pages around current
                                            if (
                                                page === 1 ||
                                                page === pagination.totalPages ||
                                                (page >= pagination.currentPage - 1 && page <= pagination.currentPage + 1)
                                            ) {
                                                return (
                                                    <button
                                                        key={page}
                                                        onClick={() => handlePageChange(page)}
                                                        className={`px-4 py-2 rounded-lg font-medium transition ${pagination.currentPage === page
                                                            ? 'bg-primary text-white'
                                                            : 'border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-slate-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                                                            }`}
                                                    >
                                                        {page}
                                                    </button>
                                                )
                                            } else if (
                                                page === pagination.currentPage - 2 ||
                                                page === pagination.currentPage + 2
                                            ) {
                                                return <span key={page} className="px-2">...</span>
                                            }
                                            return null
                                        })}

                                        <button
                                            onClick={() => handlePageChange(pagination.currentPage + 1)}
                                            disabled={pagination.currentPage === pagination.totalPages}
                                            className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-slate-700 dark:text-gray-300 font-medium hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
                                        >
                                            Next
                                        </button>
                                    </div>
                                )}
                            </>
                        ) : (
                            <div className="bg-white dark:bg-gray-900 rounded-xl p-16 text-center border border-slate-200 dark:border-gray-800">
                                <div className="text-6xl mb-4">🔍</div>
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">No products found</h3>
                                <p className="text-slate-600 dark:text-gray-400 mb-6">
                                    Try adjusting your filters or search terms
                                </p>
                                <button
                                    onClick={clearAllFilters}
                                    className="px-6 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary-dark transition"
                                >
                                    Clear All Filters
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    )
}