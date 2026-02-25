import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { loginSuccess } from '../store/authSlice'
import Navbar from '../components/Navbar'
import toast from 'react-hot-toast'

export default function LoginPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleSubmit = (e) => {
        e.preventDefault()
        // Mock login
        if (email && password) {
            dispatch(loginSuccess({
                user: { name: 'Demo User', email: email },
                token: 'mock-token'
            }))
            toast.success('Logged in successfully!')
            navigate('/')
        }
    }

    return (
        <div className="bg-background-light dark:bg-gray-950 min-h-screen">
            <Navbar />
            <div className="flex items-center justify-center py-20 px-6">
                <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-xl w-full max-w-md border border-slate-100 dark:border-gray-800">
                    <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">Login</h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-1">Email</label>
                            <input type="email" value={email} onChange={e => setEmail(e.target.value)} required className="w-full rounded-lg border-slate-300 dark:border-gray-700 bg-slate-50 dark:bg-gray-800 text-slate-900 dark:text-white focus:ring-primary py-2.5 px-4" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-1">Password</label>
                            <input type="password" value={password} onChange={e => setPassword(e.target.value)} required className="w-full rounded-lg border-slate-300 dark:border-gray-700 bg-slate-50 dark:bg-gray-800 text-slate-900 dark:text-white focus:ring-primary py-2.5 px-4" />
                        </div>
                        <button type="submit" className="w-full py-3 bg-primary text-white font-bold rounded-xl hover:bg-primary-dark transition-colors shadow-lg shadow-primary/25">
                            Sign In
                        </button>
                    </form>
                    <p className="mt-6 text-center text-sm text-slate-500">
                        Don't have an account? <Link to="/register" className="text-primary font-semibold">Register</Link>
                    </p>
                </div>
            </div>
        </div>
    )
}
