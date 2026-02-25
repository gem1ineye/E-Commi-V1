import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { addToCart } from '../store/cartSlice'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import api from '../utils/axiosConfig'
import toast from 'react-hot-toast'
import { formatPrice } from '../utils/formatCurrency'

export default function ProductDetailsPage() {
    const { id } = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [product, setProduct] = useState(null)
    const [loading, setLoading] = useState(true)
    const [activeImage, setActiveImage] = useState(0)
    const [imageError, setImageError] = useState(false)
    const [quantity, setQuantity] = useState(1)
    const [reviews, setReviews] = useState([])
    const [relatedProducts, setRelatedProducts] = useState([])

    useEffect(() => {
        fetchProductDetails()
    }, [id])

    const fetchProductDetails = async () => {
        try {
            setLoading(true)

            // 1. Fetch Product Main Data
            const productRes = await api.get(`/products/${id}`)
            setProduct(productRes.data.product)

            // 2. Fetch Reviews (Optional - don't let it crash the whole page)
            try {
                const reviewsRes = await api.get(`/products/${id}/reviews`)
                setReviews(reviewsRes.data.reviews || [])
            } catch (err) {
                console.warn('Could not fetch reviews:', err)
                setReviews([])
            }

            // 3. Fetch Related products
            if (productRes.data.product.category) {
                const categoryId = productRes.data.product.category._id || productRes.data.product.category
                const relatedRes = await api.get(`/products?category=${categoryId}&limit=4`)
                setRelatedProducts(relatedRes.data.products?.filter(p => p._id !== id) || [])
            }
        } catch (error) {
            console.error('Error fetching product details:', error)
            const errorMsg = error.response?.data?.error || 'Product not found'
            toast.error(errorMsg)
            navigate('/products')
        } finally {
            setLoading(false)
        }
    }

    const handleAddToCart = () => {
        if (!product) return

        dispatch(addToCart({
            product: product._id,
            name: product.name,
            price: product.price,
            image: product.images?.[0]?.url,
            quantity: quantity,
            stock: product.stock
        }))

        toast.success(`${product.name} added to cart!`)
    }

    const handleBuyNow = () => {
        handleAddToCart()
        navigate('/cart')
    }

    if (loading) {
        return (
            <div className="bg-background-light dark:bg-gray-950 min-h-screen flex flex-col">
                <Navbar />
                <div className="flex-grow flex items-center justify-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
                </div>
                <Footer />
            </div>
        )
    }

    if (!product) return null

    return (
        <div className="bg-background-light dark:bg-gray-950 font-display text-slate-900 dark:text-gray-100 antialiased min-h-screen flex flex-col transition-colors duration-300">
            <Navbar />

            <main className="flex-grow mx-auto max-w-[1440px] px-6 py-8 lg:px-12">
                {/* Breadcrumb */}
                <nav className="flex items-center gap-2 text-sm text-slate-500 dark:text-gray-400 mb-8">
                    <Link to="/" className="hover:text-primary transition-colors">Home</Link>
                    <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>chevron_right</span>
                    <Link to="/products" className="hover:text-primary transition-colors">Products</Link>
                    <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>chevron_right</span>
                    <span className="font-medium text-slate-900 dark:text-white truncate">{product.name}</span>
                </nav>

                <div className="grid lg:grid-cols-2 gap-12 items-start mb-16">
                    {/* Image Gallery */}
                    <div className="space-y-4">
                        <div className="aspect-square bg-white dark:bg-gray-900 rounded-2xl overflow-hidden border border-slate-100 dark:border-gray-800 shadow-sm flex items-center justify-center">
                            {product.images?.[activeImage]?.url && !imageError ? (
                                <img
                                    src={product.images[activeImage].url}
                                    alt={product.name}
                                    className="w-full h-full object-contain p-8"
                                    onError={() => setImageError(true)}
                                />
                            ) : (
                                <div className="text-8xl opacity-10">📦</div>
                            )}
                        </div>

                        {product.images?.length > 1 && (
                            <div className="grid grid-cols-4 gap-4">
                                {product.images.map((img, index) => (
                                    <button
                                        key={img._id || index}
                                        onClick={() => setActiveImage(index)}
                                        className={`aspect-square rounded-xl overflow-hidden border-2 transition-all bg-white dark:bg-gray-900 ${activeImage === index ? 'border-primary ring-2 ring-primary/20' : 'border-transparent hover:border-slate-200'
                                            }`}
                                    >
                                        <img src={img.url} alt="" className="w-full h-full object-cover p-2" />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Product Info */}
                    <div className="flex flex-col">
                        <div className="mb-6">
                            <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs font-bold rounded-full mb-4 uppercase tracking-wider">
                                {product.brand || product.category?.name || 'In Stock'}
                            </span>
                            <h1 className="text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-white mb-4">
                                {product.name}
                            </h1>

                            <div className="flex items-center gap-4 mb-6">
                                <div className="flex items-center gap-1.5 px-3 py-1.5 bg-yellow-50 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400 rounded-lg text-sm font-bold">
                                    <span className="material-symbols-outlined fill-current" style={{ fontSize: '18px' }}>star</span>
                                    {product.ratings?.average || '0.0'}
                                    <span className="text-yellow-600/50 dark:text-yellow-400/50 font-normal">
                                        ({product.ratings?.count || 0} reviews)
                                    </span>
                                </div>
                                <div className={`text-sm font-semibold ${product.stock > 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                                    {product.stock > 0 ? `✓ In Stock (${product.stock} units)` : '✗ Out of Stock'}
                                </div>
                            </div>

                            <div className="flex items-baseline gap-3 mb-8">
                                <span className="text-4xl font-black text-slate-900 dark:text-white">
                                    {formatPrice(product.price)}
                                </span>
                                {product.compareAtPrice > product.price && (
                                    <>
                                        <span className="text-xl text-slate-400 line-through">
                                            {formatPrice(product.compareAtPrice)}
                                        </span>
                                        <span className="text-red-500 font-bold">
                                            {Math.round((1 - product.price / product.compareAtPrice) * 100)}% OFF
                                        </span>
                                    </>
                                )}
                            </div>

                            <div className="bg-slate-50 dark:bg-gray-900/50 rounded-2xl p-6 mb-8 border border-slate-100 dark:border-gray-800">
                                <p className="text-slate-600 dark:text-gray-400 leading-relaxed">
                                    {product.description}
                                </p>
                            </div>

                            {/* Quantity and Actions */}
                            <div className="space-y-6">
                                <div>
                                    <label className="block text-sm font-bold text-slate-900 dark:text-white mb-3">Quantity</label>
                                    <div className="inline-flex items-center bg-white dark:bg-gray-800 border-2 border-slate-100 dark:border-gray-700 rounded-xl p-1 shadow-sm">
                                        <button
                                            onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                            className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-slate-50 dark:hover:bg-gray-700 transition"
                                        >
                                            <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>remove</span>
                                        </button>
                                        <span className="w-12 text-center font-bold text-slate-900 dark:text-white">{quantity}</span>
                                        <button
                                            onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                                            className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-slate-50 dark:hover:bg-gray-700 transition"
                                        >
                                            <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>add</span>
                                        </button>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <button
                                        onClick={handleAddToCart}
                                        disabled={product.stock <= 0}
                                        className="py-4 px-8 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold rounded-xl hover:bg-slate-800 dark:hover:bg-slate-100 transition shadow-lg shadow-slate-200 dark:shadow-none disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                    >
                                        <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>shopping_bag</span>
                                        Add to Cart
                                    </button>
                                    <button
                                        onClick={handleBuyNow}
                                        disabled={product.stock <= 0}
                                        className="py-4 px-8 bg-primary text-white font-bold rounded-xl hover:bg-primary-dark transition shadow-lg shadow-primary/30 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                    >
                                        Buy it Now
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Extra Info */}
                        <div className="border-t border-slate-100 dark:border-gray-800 pt-6 space-y-3">
                            <div className="flex items-center gap-3 text-sm text-slate-600 dark:text-gray-400">
                                <span className="material-symbols-outlined text-green-500" style={{ fontSize: '20px' }}>local_shipping</span>
                                Free shipping on orders over ₹500
                            </div>
                            <div className="flex items-center gap-3 text-sm text-slate-600 dark:text-gray-400">
                                <span className="material-symbols-outlined text-blue-500" style={{ fontSize: '20px' }}>verified</span>
                                2 Year warranty included
                            </div>
                        </div>
                    </div>
                </div>

                {/* Reviews Section */}
                <section className="py-16 border-t border-slate-100 dark:border-gray-800">
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-8">Customer Reviews</h2>
                    {reviews.length > 0 ? (
                        <div className="grid md:grid-cols-2 gap-6">
                            {reviews.map((review) => (
                                <div key={review._id} className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-slate-100 dark:border-gray-800 shadow-sm">
                                    <div className="flex justify-between items-start mb-4">
                                        <div>
                                            <div className="font-bold text-slate-900 dark:text-white mb-1">
                                                {review.user?.name || 'Verified Buyer'}
                                            </div>
                                            <div className="flex text-yellow-400">
                                                {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
                                            </div>
                                        </div>
                                        <div className="text-xs text-slate-400">
                                            {new Date(review.createdAt).toLocaleDateString()}
                                        </div>
                                    </div>
                                    <p className="text-slate-600 dark:text-gray-400 text-sm leading-relaxed italic">
                                        "{review.comment}"
                                    </p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="bg-slate-50 dark:bg-gray-900/50 rounded-2xl p-12 text-center border border-dashed border-slate-200 dark:border-gray-700">
                            <p className="text-slate-500 dark:text-gray-400">No reviews yet. Be the first to review this product!</p>
                        </div>
                    )}
                </section>
            </main>

            <Footer />
        </div>
    )
}