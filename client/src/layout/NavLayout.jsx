import React from 'react'
import MainNavbar from '../components/Navbar/MainNavbar'
import { Outlet } from 'react-router-dom'

const NavLayout = () => {
    return (
        <div className="layout flex flex-col w-full font-roboto">
            <div className="navbar fixed z-30">
                <MainNavbar />
            </div>

            <div className="content flex flex-col w-full mt-[130px] 2xl:max-w-screen-2xl ml-auto mr-auto">
                <Outlet />
            </div>
        </div>
    )
}

export default NavLayout