import React from 'react'
import { Outlet } from 'react-router-dom'

function UserLayout() {
    return (
        <>
            <h2>User</h2>
            <Outlet />
        </>
    )
}

export default UserLayout