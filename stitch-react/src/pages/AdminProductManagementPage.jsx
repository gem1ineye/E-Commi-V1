import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import AdminSidebar from '../components/AdminSidebar'
import api from '../utils/axiosConfig'
import toast from 'react-hot-toast'
import { formatPrice } from '../utils/formatCurrency'

function StatusBadge({ status, isActive }) {
    if (!isActive) return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400">
            <span className="size-1.5 rounded-full bg-current"></span>
            Inactive
        </span>
    )

    return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400">
            <span className="size-1.5 rounded-full bg-current"></span>
            Active
        </span>
    )
}

export default function AdminProductManagementPage() {
    const [products, setProducts] = useState([])
    const [categories, setCategories] = useState([])
    const [loading, setLoading] = useState(true)
    const [search, setSearch] = useState('')
    const [showModal, setShowModal] = useState(false)
    const [editMode, setEditMode] = useState(false)
    const [selectedId, setSelectedId] = useState(null)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isUploading, setIsUploading] = useState(false)

    // Form State
    const initialForm = {
        name: '',
        description: '',
        price: '',
        compareAtPrice: '',
        category: '',
        brand: '',
        stock: '',
        sku: '',
        imageUrl: '',
        isFeatured: false
    }

    const [formData, setFormData] = useState(initialForm)

    useEffect(() => {
        fetchProducts()
        fetchCategories()
    }, [])

    const fetchProducts = async () => {
        try {
            setLoading(true)
            const res = await api.get('/products?limit=100')
            setProducts(res.data.products || [])
        } catch (error) {
            console.error('Error fetching admin products:', error)
            toast.error('Failed to load products')
        } finally {
            setLoading(false)
        }
    }

    const fetchCategories = async () => {
        try {
            const res = await api.get('/categories')
            setCategories(res.data.categories || [])
        } catch (error) {
            console.error('Error fetching categories:', error)
        }
    }

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!formData.category) {
            toast.error('Please select a category')
            return
        }

        try {
            setIsSubmitting(true)

            // Format data for backend
            const productData = {
                ...formData,
                price: Number(formData.price),
                compareAtPrice: formData.compareAtPrice ? Number(formData.compareAtPrice) : undefined,
                stock: Number(formData.stock),
                images: formData.imageUrl ? [{ url: formData.imageUrl }] : []
            }

            if (editMode) {
                await api.put(`/products/${selectedId}`, productData)
                toast.success('Product updated successfully!')
            } else {
                await api.post('/products', productData)
                toast.success('Product created successfully!')
            }

            setShowModal(false)
            setFormData(initialForm)
            setEditMode(false)
            setSelectedId(null)
            fetchProducts()
        } catch (error) {
            console.error('Submit Product Error:', error)
            toast.error(error.response?.data?.error || 'Failed to save product')
        } finally {
            setIsSubmitting(false)
        }
    }

    const handleEdit = (product) => {
        setFormData({
            name: product.name,
            description: product.description,
            price: product.price,
            compareAtPrice: product.compareAtPrice || '',
            category: product.category?._id || product.category,
            brand: product.brand || '',
            stock: product.stock,
            sku: product.sku || '',
            imageUrl: product.images?.[0]?.url || '',
            isFeatured: product.isFeatured || false
        })
        setSelectedId(product._id)
        setEditMode(true)
        setShowModal(true)
    }

    const handleOpenAddModal = () => {
        setFormData(initialForm)
        setEditMode(false)
        setSelectedId(null)
        setShowModal(true)
    }

    const handleFileUpload = async (file) => {
        if (!file) return

        try {
            setIsUploading(true)
            const uploadFormData = new FormData()
            uploadFormData.append('image', file)

            const res = await api.post('/upload', uploadFormData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            })

            if (res.data.success) {
                setFormData(prev => ({ ...prev, imageUrl: res.data.url }))
                toast.success('Image uploaded successfully')
            }
        } catch (error) {
            console.error('Upload Error:', error)
            const errorMsg = error.response?.data?.error || 'Failed to upload image'
            toast.error(errorMsg)
        } finally {
            setIsUploading(false)
        }
    }

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this product?')) return
        try {
            await api.delete(`/products/${id}`)
            toast.success('Product deleted')
            fetchProducts()
        } catch (error) {
            toast.error('Failed to delete product')
        }
    }

    const filtered = products.filter(p =>
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        (p.sku && p.sku.toLowerCase().includes(search.toLowerCase())) ||
        (p.category?.name && p.category.name.toLowerCase().includes(search.toLowerCase()))
    )

    return (
        <div className="bg-[#f6f6f8] dark:bg-gray-950 text-slate-900 dark:text-gray-100 min-h-screen flex overflow-hidden font-display transition-colors duration-300">
            <AdminSidebar />
            <main className="flex-1 lg:ml-72 flex flex-col h-screen overflow-hidden bg-[#f6f6f8] dark:bg-gray-950">
                {/* Header */}
                <header className="h-20 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-slate-200 dark:border-gray-800 flex items-center justify-between px-8 sticky top-0 z-10">
                    <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-gray-400">
                        <Link to="/admin" className="hover:text-primary transition-colors cursor-pointer">Dashboard</Link>
                        <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>chevron_right</span>
                        <span className="text-slate-900 dark:text-white font-medium">Products</span>
                    </div>
                </header>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
                    <div className="max-w-7xl mx-auto space-y-8">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <div>
                                <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">Product Management</h2>
                                <p className="text-slate-500 dark:text-gray-400 mt-1">Manage your store's product catalog.</p>
                            </div>
                            <button onClick={handleOpenAddModal} className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary-dark transition-colors shadow-lg shadow-primary/25 self-start">
                                <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>add</span>
                                Add Product
                            </button>
                        </div>

                        {/* Search Bar */}
                        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-slate-200 dark:border-gray-800 p-4 shadow-sm">
                            <div className="relative">
                                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-gray-500 text-[18px]">search</span>
                                <input value={search} onChange={e => setSearch(e.target.value)} className="pl-9 pr-4 py-2 rounded-lg bg-slate-50 dark:bg-gray-800 border border-slate-200 dark:border-gray-700 text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-primary/20 w-full" placeholder="Search products by name, SKU or category..." type="text" />
                            </div>
                        </div>

                        {/* Products Table */}
                        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-slate-200 dark:border-gray-800 shadow-sm overflow-hidden">
                            {loading ? (
                                <div className="p-20 text-center">
                                    <div className="animate-spin rounded-full h-10 w-10 border-4 border-primary border-t-transparent mx-auto"></div>
                                    <p className="mt-4 text-slate-500">Loading products...</p>
                                </div>
                            ) : (
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left border-collapse">
                                        <thead>
                                            <tr className="bg-slate-50 dark:bg-gray-800/50 border-b border-slate-200 dark:border-gray-800 text-xs uppercase tracking-wider text-slate-500 dark:text-gray-400 font-semibold">
                                                <th className="px-6 py-4">Product</th>
                                                <th className="px-6 py-4">SKU</th>
                                                <th className="px-6 py-4">Category</th>
                                                <th className="px-6 py-4">Price</th>
                                                <th className="px-6 py-4">Stock</th>
                                                <th className="px-6 py-4">Status</th>
                                                <th className="px-6 py-4 text-right">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-200 dark:divide-gray-800 text-sm text-slate-700 dark:text-gray-300">
                                            {filtered.map(p => (
                                                <tr key={p._id} className="hover:bg-slate-50 dark:hover:bg-gray-800 transition-colors">
                                                    <td className="px-6 py-4">
                                                        <div className="flex items-center gap-3">
                                                            <div className="h-10 w-10 flex-shrink-0 overflow-hidden rounded-lg bg-slate-100 dark:bg-gray-800 border border-slate-100 dark:border-gray-700 flex items-center justify-center">
                                                                {p.images?.[0]?.url ? (
                                                                    <img
                                                                        src={p.images[0].url}
                                                                        alt=""
                                                                        className="h-full w-full object-cover"
                                                                        onError={(e) => {
                                                                            e.target.style.display = 'none';
                                                                            e.target.parentElement.innerHTML = '<span class="text-xs opacity-30">📦</span>';
                                                                        }}
                                                                    />
                                                                ) : (
                                                                    <span className="text-xs opacity-30">📦</span>
                                                                )}
                                                            </div>
                                                            <span className="font-semibold text-slate-900 dark:text-white line-clamp-1">{p.name}</span>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 text-slate-500 font-mono text-xs">{p.sku || 'N/A'}</td>
                                                    <td className="px-6 py-4">
                                                        <span className="bg-slate-100 dark:bg-gray-800 text-slate-700 dark:text-gray-300 text-xs font-medium px-2.5 py-1 rounded-full">{p.category?.name || 'Uncategorized'}</span>
                                                    </td>
                                                    <td className="px-6 py-4 font-semibold text-slate-900 dark:text-white">{formatPrice(p.price)}</td>
                                                    <td className="px-6 py-4">
                                                        <span className={`font-semibold ${p.stock === 0 ? 'text-red-600' : 'text-slate-900 dark:text-white'}`}>
                                                            {p.stock}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4"><StatusBadge isActive={p.isActive} /></td>
                                                    <td className="px-6 py-4 text-right">
                                                        <div className="flex items-center justify-end gap-2">
                                                            <button onClick={() => handleEdit(p)} className="p-1.5 text-slate-400 hover:text-primary hover:bg-primary/10 rounded-lg transition-colors">
                                                                <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>edit</span>
                                                            </button>
                                                            <button onClick={() => handleDelete(p._id)} className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                                                                <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>delete</span>
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                            {filtered.length === 0 && (
                                                <tr>
                                                    <td colSpan="7" className="px-6 py-20 text-center text-slate-500">No products found</td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </main>

            {/* Add Product Modal */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                    <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-2xl w-full max-w-2xl border border-slate-100 dark:border-gray-800 overflow-hidden flex flex-col max-h-[90vh]">
                        <div className="flex items-center justify-between p-6 border-b border-slate-100 dark:border-gray-800 shrink-0">
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white">{editMode ? 'Edit Product' : 'Add New Product'}</h3>
                            <button onClick={() => { setShowModal(false); setEditMode(false); }} className="p-2 hover:bg-slate-100 dark:hover:bg-gray-800 rounded-full transition-colors text-slate-500">
                                <span className="material-symbols-outlined">close</span>
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="p-6 space-y-6 overflow-y-auto custom-scrollbar">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-bold mb-2">Product Name*</label>
                                    <input required name="name" value={formData.name} onChange={handleInputChange} className="w-full rounded-xl border-slate-200 dark:border-gray-700 bg-slate-50 dark:bg-gray-800 p-3.5 focus:ring-2 focus:ring-primary" placeholder="Enter product name" />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-bold mb-2">Description*</label>
                                    <textarea required name="description" value={formData.description} onChange={handleInputChange} rows="3" className="w-full rounded-xl border-slate-200 dark:border-gray-700 bg-slate-50 dark:bg-gray-800 p-3.5 focus:ring-2 focus:ring-primary resize-none" placeholder="Provide a detailed description"></textarea>
                                </div>
                                <div>
                                    <label className="block text-sm font-bold mb-2">Price (₹)*</label>
                                    <input required type="number" name="price" value={formData.price} onChange={handleInputChange} className="w-full rounded-xl border-slate-200 dark:border-gray-700 bg-slate-50 dark:bg-gray-800 p-3.5 focus:ring-1 focus:ring-primary" placeholder="0.00" />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold mb-2">Compare At Price (₹)</label>
                                    <input type="number" name="compareAtPrice" value={formData.compareAtPrice} onChange={handleInputChange} className="w-full rounded-xl border-slate-200 dark:border-gray-800 bg-slate-50 dark:bg-gray-800 p-3.5 focus:ring-1 focus:ring-primary" placeholder="0.00" />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold mb-2">Category*</label>
                                    <select required name="category" value={formData.category} onChange={handleInputChange} className="w-full rounded-xl border-slate-200 dark:border-gray-700 bg-slate-50 dark:bg-gray-800 p-3.5 focus:ring-1 focus:ring-primary dark:text-white">
                                        <option value="">Select Category</option>
                                        {categories.map(cat => (
                                            <option key={cat._id} value={cat._id}>{cat.name}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-bold mb-2">Brand</label>
                                    <input name="brand" value={formData.brand} onChange={handleInputChange} className="w-full rounded-xl border-slate-200 dark:border-gray-700 bg-slate-50 dark:bg-gray-800 p-3.5 focus:ring-1 focus:ring-primary" placeholder="Brand name" />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold mb-2">Stock Inventory*</label>
                                    <input required type="number" name="stock" value={formData.stock} onChange={handleInputChange} className="w-full rounded-xl border-slate-200 dark:border-gray-700 bg-slate-50 dark:bg-gray-800 p-3.5 focus:ring-1 focus:ring-primary" placeholder="0" />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold mb-2">SKU Number</label>
                                    <input name="sku" value={formData.sku} onChange={handleInputChange} className="w-full rounded-xl border-slate-200 dark:border-gray-700 bg-slate-50 dark:bg-gray-800 p-3.5 focus:ring-1 focus:ring-primary" placeholder="Unique SKU" />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-bold mb-2">Product Image*</label>
                                    <div className="space-y-4">
                                        {/* Upload Option */}
                                        <div className="flex flex-col sm:flex-row gap-4 items-start">
                                            <div className="flex-1 w-full relative">
                                                <div className={`relative group overflow-hidden rounded-xl border-2 border-dashed transition-colors bg-slate-50 dark:bg-gray-800 ${isUploading ? 'border-primary' : 'border-slate-200 dark:border-gray-700 hover:border-primary/50'}`}>
                                                    <input
                                                        type="file"
                                                        accept="image/*"
                                                        onChange={(e) => handleFileUpload(e.target.files[0])}
                                                        className="absolute inset-0 opacity-0 cursor-pointer z-10 disabled:cursor-not-allowed"
                                                        disabled={isUploading}
                                                    />
                                                    <div className="p-6 text-center">
                                                        {isUploading ? (
                                                            <div className="flex flex-col items-center">
                                                                <div className="animate-spin rounded-full h-8 w-8 border-2 border-primary border-t-transparent"></div>
                                                                <p className="text-[10px] font-bold text-primary mt-2">Uploading...</p>
                                                            </div>
                                                        ) : (
                                                            <>
                                                                <span className="material-symbols-outlined text-3xl text-slate-400 group-hover:text-primary transition-colors">cloud_upload</span>
                                                                <p className="text-xs font-medium text-slate-500 mt-2">Click or drag image</p>
                                                            </>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="flex items-center justify-center h-full self-center py-2 text-slate-400 text-xs font-bold uppercase tracking-wider">
                                                <span>Or</span>
                                            </div>

                                            <div className="flex-1 w-full">
                                                <input
                                                    name="imageUrl"
                                                    value={formData.imageUrl}
                                                    onChange={handleInputChange}
                                                    className="w-full rounded-xl border-slate-200 dark:border-gray-700 bg-slate-50 dark:bg-gray-800 p-3.5 focus:ring-1 focus:ring-primary text-sm"
                                                    placeholder="Paste image URL here..."
                                                />
                                            </div>
                                        </div>

                                        {/* Preview Area */}
                                        {formData.imageUrl && (
                                            <div className="relative w-full aspect-video rounded-2xl overflow-hidden border border-slate-100 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-inner group">
                                                <img
                                                    src={formData.imageUrl}
                                                    alt="Preview"
                                                    className="w-full h-full object-contain"
                                                    onError={(e) => {
                                                        e.target.style.display = 'none';
                                                        toast.error('Invalid image source');
                                                    }}
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => setFormData(prev => ({ ...prev, imageUrl: '' }))}
                                                    className="absolute top-4 right-4 p-2 bg-red-500 text-white rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                                                >
                                                    <span className="material-symbols-outlined text-sm">close</span>
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                    <p className="text-[10px] text-slate-500 mt-3 italic">Max size: 5MB. Supported formats: JPG, PNG, WEBP.</p>
                                </div>
                                <div className="md:col-span-2">
                                    <label className="flex items-center gap-2 cursor-pointer select-none">
                                        <input type="checkbox" name="isFeatured" checked={formData.isFeatured} onChange={handleInputChange} className="size-5 rounded border-slate-300 text-primary focus:ring-primary" />
                                        <span className="text-sm font-bold">Mark as Featured Product</span>
                                    </label>
                                </div>
                            </div>
                            <div className="flex gap-4 pt-4 border-t border-slate-100 dark:border-gray-800 shrink-0">
                                <button type="button" onClick={() => setShowModal(false)} className="flex-1 py-4 px-6 border border-slate-200 dark:border-gray-700 rounded-2xl font-bold hover:bg-slate-50 dark:hover:bg-gray-800 transition-all">Cancel</button>
                                <button type="submit" disabled={isSubmitting} className="flex-1 py-4 px-6 bg-primary text-white font-bold rounded-2xl shadow-lg shadow-primary/30 hover:bg-primary-dark transition-all flex items-center justify-center gap-2">
                                    {isSubmitting ? (
                                        <span className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></span>
                                    ) : (
                                        editMode ? 'Update Product' : 'Create Product'
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}
