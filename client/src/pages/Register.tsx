import { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../store/hook'
import { register } from '../features/auth/authSlice'
import { Link } from 'react-router-dom'

const Register = () => {
    const dispatch = useAppDispatch()
    const { loading, error } = useAppSelector((state) => state.auth)

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        if (!email || !password) return

        dispatch(register({ email, password }))
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-black text-white">
            <div className="w-full max-w-md border border-white/20 rounded-xl p-8 bg-[#111111e1]">
                <h1 className="text-3xl font-semibold mb-8 tracking-tight">
                    Register
                </h1>

                <form onSubmit={handleSubmit} className="space-y-6 mb-3">
                    <div>
                        <label className="block text-sm mb-2">
                            Email
                        </label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="
                                w-full bg-black text-white
                                border border-white/30
                                rounded-md px-3 py-2
                                focus:outline-none focus:border-white
                            "
                            placeholder="you@example.com"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm mb-2">
                            Password
                        </label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="
                                w-full bg-black text-white
                                border border-white/30
                                rounded-md px-3 py-2
                                focus:outline-none focus:border-white
                            "
                            placeholder="••••••••"
                            required
                        />
                    </div>

                    {error && (
                        <p className="text-sm text-white/70">
                            {error}
                        </p>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="
                            w-full py-2 mt-4
                            border border-white
                            rounded-md
                            text-white
                            hover:bg-white hover:text-black
                            transition
                            disabled:opacity-50
                        "
                    >
                        {loading ? 'Creating...' : 'Create account'}
                    </button>
                </form>
                <Link to={'/login'}>Already Have Account ?</Link>
            </div>
        </div>
    )
}

export default Register
