import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import toast from 'react-hot-toast'

export default function RegisterPage() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        toast.success('Account created! Please login.')
        navigate('/login')
    }

    return (
        <div className="bg-background-light dark:bg-gray-950 min-h-screen">
            <Navbar />
            <div className="flex items-center justify-center py-20 px-6">
                <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-xl w-full max-w-md border border-slate-100 dark:border-gray-800">
                    <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">Create Account</h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-1">Full Name</label>
                            <input type="text" value={name} onChange={e => setName(e.target.value)} required className="w-full rounded-lg border-slate-300 dark:border-gray-700 bg-slate-50 dark:bg-gray-800 text-slate-900 dark:text-white focus:ring-primary py-2.5 px-4" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-1">Email</label>
                            <input type="email" value={email} onChange={e => setEmail(e.target.value)} required className="w-full rounded-lg border-slate-300 dark:border-gray-700 bg-slate-50 dark:bg-gray-800 text-slate-900 dark:text-white focus:ring-primary py-2.5 px-4" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-1">Password</label>
                            <input type="password" value={password} onChange={e => setPassword(e.target.value)} required className="w-full rounded-lg border-slate-300 dark:border-gray-700 bg-slate-50 dark:bg-gray-800 text-slate-900 dark:text-white focus:ring-primary py-2.5 px-4" />
                        </div>
                        <button type="submit" className="w-full py-3 bg-primary text-white font-bold rounded-xl hover:bg-primary-dark transition-colors shadow-lg shadow-primary/25">
                            Register
                        </button>
                    </form>
                    <p className="mt-6 text-center text-sm text-slate-500">
                        Already have an account? <Link to="/login" className="text-primary font-semibold">Login</Link>
                    </p>
                </div>
            </div>
        </div>
    )
}
