import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import './App.css'
import Login from './pages/Login'
import Register from './pages/Register'
import AdminLayout from './components/layouts/AdminLayout'
import UserLayout from './components/layouts/UserLayout'
import Wallet from './pages/user/Wallet'
import PaymentPage from './pages/user/PaymentPage'
import Transaction from './pages/user/Transaction'
import Profile from './pages/user/Profile'


function App() {

  const router = createBrowserRouter([
    {
      path: '/admin/*',
      element: <AdminLayout />,
      children: [

      ]
    },
    {
      path: '/',
      element: < UserLayout />,
      children: [
        {
          path: '/wallet',
          element: <Wallet />
        },
        {
          path: '/payment',
          element: <PaymentPage />
        },
        {
          path: '/transactions',
          element: <Transaction />
        }, {
          path: '/profile',
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
