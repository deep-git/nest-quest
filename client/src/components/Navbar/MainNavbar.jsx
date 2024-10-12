import React, { useContext, useEffect, useRef, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import apiRequest from '../../lib/apiRequest';
import { LogOut, Menu, Settings, User, X } from 'lucide-react';
import { useNotificationStore } from '../../lib/notificationStore';

const MainNavbar = () => {
    const { currentUser, updateUser } = useContext(AuthContext);
    const path = useLocation().pathname;
    const dropdownRef = useRef(null);
    const navigate = useNavigate();

    const [isOpen, setIsOpen] = useState(false);
    const [isNavOpen, setIsNavOpen] = useState(false);

    const toggleDropdown = (e) => {
        e.stopPropagation();
        setIsOpen(!isOpen);
    };

    const toggleNavOpen = () => {
        setIsNavOpen((prev) => !prev);
    }

    const handleLogout = async () => {
        try {
            await apiRequest.post("/auth/logout");
            updateUser(null);
            navigate("/");
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false); // Close the dropdown if clicked outside
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen, isNavOpen]);

    const fetch = useNotificationStore((state) => state.fetch);
    const number = useNotificationStore((state) => state.number);

    if (currentUser) {
        fetch();
    }

    return (
        <div className="fixed w-full top-0 z-30">
            <div className="flex bg-dark_gray px-5 py-4 h-max max-h-[75px]">
                <div className="flex justify-center sm:justify-between items-center w-full 2xl:max-w-screen-2xl ml-auto mr-auto">
                    <p className="hidden sm:flex gap-1 text-white text-[14px]"><span className="text-light_brown_2">QUALITY IS OUR STANDING</span> FOR OVER 30 YEARS</p>
                    <p className="text-light_brown_2 font-semibold">Nest Quest</p>
                </div>
            </div>

            <div className="flex px-5 py-4 bg-light_white border-b-2 border-light_brown_3/20 h-[70px]">
                <div className="flex justify-between items-center w-full 2xl:max-w-screen-2xl ml-auto mr-auto flex-wrap">
                    <Link to="/">
                        <img src="/logo.png" alt="NQ logo" className="w-16 sm:w-24" />
                    </Link>
                    <div className="hidden md:flex gap-10">
                        <Link to="/" className={`${path === "/" ? "text-light_brown_1 underline font-semibold" : "text-black"} hover:text-light_brown_1 transition duration-75`}>
                            Home
                        </Link>
                        <Link to="/listings" state={{ searchType: undefined, searchLocation: undefined, searchMinprice: undefined, searchMaxprice: undefined }} className={`${path === "/listings" ? "text-light_brown_1 underline font-semibold" : "text-black"} hover:text-light_brown_1 transition duration-75`}>
                            Properties
                        </Link>
                        <Link to="/add-listings" className={`${path === "/add-listings" ? "text-light_brown_1 underline font-semibold" : "text-black"} hover:text-light_brown_1 transition duration-75`}>
                            Add Listings
                        </Link>
                    </div>
                    <div className="flex justify-center items-center gap-4">
                        {currentUser ? (
                            <div className="relative flex justify-center items-center gap-5 w-max">
                                <div className="absolute z-30 right-0 lg:left-0 top-7">
                                    {isOpen && (
                                        <div ref={dropdownRef} className="mt-7 w-[200px] bg-white border border-gray-300 rounded-md shadow-md animate-fadeIn">
                                            <Link to="/account" className="flex items-center gap-2 px-4 py-2 bg-white hover:bg-gray-100 text-black cursor-pointer transition">
                                                <Settings className="w-6 h-6" /> Account
                                            </Link>
                                            <div onClick={handleLogout} className="flex group px-4 py-2 bg-white hover:bg-gray-100 text-black cursor-pointer transition">
                                                <span className="flex  items-center gap-2 group-hover:translate-x-1 group-hover:text-red-500 transition duration-100"><LogOut className="w-6 h-6" /> Logout</span>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <span className="hidden sm:flex truncate text-wrap">{currentUser.username}</span>

                                <div onClick={(e) => toggleDropdown(e)} className="relative">
                                    {currentUser?.avatar && currentUser?.avatar !== null && currentUser?.avatar !== "" ? (
                                        <img src={currentUser?.avatar || null} alt="user" className="w-10 h-10 rounded-full select-none" />
                                    ) : (
                                        <div className="flex justify-center items-center bg-dark_gray text-white w-10 h-10 rounded-full p-1 cursor-pointer select-none">
                                            <User />
                                        </div>
                                    )}
                                    <span className="absolute -top-2 -right-2 bg-red-500 text-white flex justify-center items-center w-5 h-5 text-[14px] rounded-full">{number > 0 && number}</span>
                                </div>
                            </div>
                        ) : (
                            <div className="flex gap-2 sm:gap-7 justify-center items-center w-max flex-wrap">
                                <Link to="/login" className="text-sm sm:text-[16px] text-black hover:text-light_brown_1 hover:underline hover:font-semibold transition duration-75">Log In</Link>
                                <Link to="/register" className="text-sm sm:text-[16px] bg-dark_gray text-white px-4 py-2 rounded-md hover:bg-dark_gray/90 hover:shadow-lg transition duration-75">Sign Up</Link>
                            </div>
                        )}

                        {!isNavOpen && (
                            <Menu onClick={toggleNavOpen} className="flex md:hidden w-6 h-6" />
                        )}

                        {isNavOpen && (
                            <div className="absolute md:hidden top-0 right-0 w-full min-h-screen bg-black/70 shadow-lg z-0">
                                <div className="absolute top-0 right-0 flex flex-col min-h-screen p-7 w-[80%] max-w-[400px] bg-light_brown_1 z-20">
                                    <X onClick={toggleNavOpen} className="flex w-6 h-6 ml-auto text-light_brown_3" />
                                    <div className="flex flex-col mt-10 gap-5">
                                        <Link to="/" className="text-2xl text-white py-2 hover:text-light_brown_1 hover:underline transition duration-75" onClick={toggleNavOpen}>
                                            Home
                                        </Link>
                                        <Link to="/listings" state={{ searchType: undefined, searchLocation: undefined, searchMinprice: undefined, searchMaxprice: undefined }} className="text-2xl text-white py-2 hover:text-light_brown_1 hover:underline transition duration-75" onClick={toggleNavOpen}>
                                            Properties
                                        </Link>
                                        <Link to="/add-listings" className="text-2xl text-white py-2 hover:text-light_brown_1 hover:underline transition duration-75" onClick={toggleNavOpen}>
                                            Add Listings
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MainNavbar;