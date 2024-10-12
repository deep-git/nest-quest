import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import { Navigate, Outlet } from 'react-router-dom';
import MainNavbar from '../components/Navbar/MainNavbar';

const RequireAuth = () => {

    const { currentUser } = useContext(AuthContext);

    return (
        !currentUser ? (
            <Navigate to="/login" />
        ) : (
            <div className="layout font-roboto">
                <div className="navbar fixed z-30">
                    <MainNavbar />
                </div>

                <div className="content flex flex-col w-full mt-[130px] 2xl:max-w-screen-2xl ml-auto mr-auto">
                    <Outlet />
                </div>
            </div>
        )
    )
}

export default RequireAuth