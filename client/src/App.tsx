import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom'

import './App.css'
import Login from './pages/Login'
import Register from './pages/Register'
import AdminLayout from './components/layouts/AdminLayout'
import UserLayout from './components/layouts/UserLayout'
import Wallet from './pages/user/Wallet'
import PaymentPage from './pages/user/PaymentPage'
import Transaction from './pages/user/Transaction'
import Profile from './pages/user/Profile'
import Notification from './pages/user/Notification'
import type { RootState } from './store/store'
import { useSelector } from 'react-redux'
import AdminHome from './pages/admin/AdminHome'


function App() {
  const authUser = useSelector((state: RootState) => state.auth.user)
  console.log(authUser);

  const router = createBrowserRouter([
    {
      path: '/admin/*',
      element: authUser.role === 'admin' ? <AdminLayout /> : <Navigate to="/login" />,
      children: [
        {
          index:true,
          element: <AdminHome />
        }
      ]
    },
    {
      path: '/',
      element: authUser?.role === 'user'
        ? <UserLayout />
        : <Navigate to="/login" />,
      children: [
        {
          path: 'wallet',
          element: <Wallet />
        },
        {
          path: 'payment',
          element: <PaymentPage />
        },
        {
          path: 'transactions',
          element: <Transaction />
        },
        {
          path: 'notification',
          element: <Notification />
        },
        {
          path: 'profile',
          element: <Profile />
        }
      ]

    },
    { path: '/login', element: <Login /> },
    { path: '/register', element: <Register /> },
    { path: '*', element: <Login /> }
  ])

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
