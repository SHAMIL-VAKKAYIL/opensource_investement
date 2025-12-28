import { NavLink } from 'react-router-dom'
import { useAppSelector, useAppDispatch } from '../../store/hook'
import { logout } from '../../features/auth/authSlice'

const Navbar = () => {
    const dispatch = useAppDispatch()
    const user = useAppSelector((state) => state.auth.user)

    return (
        <nav className="w-full border-b border-white/20 bg-black text-white">
            <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                
                {/* Left */}
                <div className="text-lg font-semibold tracking-tight">
                    App
                </div>

                {/* Center */}
                <div className="flex items-center gap-8 text-sm">
                      <NavLink
                        to="/"
                        className={({ isActive }) =>
                            `hover:text-white transition ${
                                isActive ? 'underline' : 'text-white/70'
                            }`
                        }
                    >
                        Home
                    </NavLink>
                    <NavLink
                        to="/wallet"
                        className={({ isActive }) =>
                            `hover:text-white transition ${
                                isActive ? 'underline' : 'text-white/70'
                            }`
                        }
                    >
                        Wallet
                    </NavLink>
                    <NavLink
                        to="/transactions"
                        className={({ isActive }) =>
                            `hover:text-white transition ${
                                isActive ? 'underline' : 'text-white/70'
                            }`
                        }
                    >
                        Transactions
                    </NavLink>
                     <NavLink
                        to="/notification"
                        className={({ isActive }) =>
                            `hover:text-white transition ${
                                isActive ? 'underline' : 'text-white/70'
                            }`
                        }
                    >
                        Notification
                    </NavLink>

                    <NavLink
                        to="/profile"
                        className={({ isActive }) =>
                            `hover:text-white transition ${
                                isActive ? 'underline' : 'text-white/70'
                            }`
                        }
                    >
                        Profile
                    </NavLink>
                </div>

                {/* Right */}
                <div className="flex items-center gap-4 text-sm">
                    {user && (
                        <>
                            <span className="text-white/70">
                                {user.email}
                            </span>
                            <button
                                onClick={() => dispatch(logout())}
                                className="
                                    border border-white/30
                                    px-3 py-1 rounded-md
                                    hover:bg-white hover:text-black
                                    transition
                                "
                            >
                                Logout
                            </button>
                        </>
                    )}
                </div>
            </div>
        </nav>
    )
}

export default Navbar
