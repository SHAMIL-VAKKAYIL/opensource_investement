import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import './App.css'
import Login from './pages/Login'
import Register from './pages/Register'
import AdminLayout from './components/layouts/AdminLayout'
import UserLayout from './components/layouts/UserLayout'

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
