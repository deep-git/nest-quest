import React, { Suspense, useContext, useState } from 'react'
import { AuthContext } from '../../context/AuthContext'
import { LogOut, User } from 'lucide-react';
import { Await, Link, useLoaderData, useLocation } from 'react-router-dom';
import ListPosts from '../../components/ListPosts';
import Chat from '../../components/Chat/Chat';
import LoadingSkeleton from "../../components/Skeleton/LoadingSkeleton/LoadingSkeleton";
import LoadingChatSkeleton from '../../components/Skeleton/LoadingChatSkeleton/LoadingChatSkeleton';

const ProfilePage = () => {

    const { currentUser } = useContext(AuthContext);
    const data = useLoaderData();
    const location = useLocation();
    const { openChatId } = location.state || "";
    const [currentPage, setCurrentPage] = useState(openChatId !== "" ? "chats" : "details");

    console.log(openChatId);
    console.log(data);

    return (
        <div className="flex flex-col 2xl:flex-row gap-5">
            <div className="flex 2xl:hidden justify-around items-center w-full bg-light_brown_3/20 mt-5 px-10 py-5 border-b-2 border-light_brown_1">
                <span onClick={() => setCurrentPage("details")} className={`text-[20px] text-light_brown_1 ${currentPage === "details" ? "font-semibold" : "font-normal"}`}>Details</span>
                <span onClick={() => setCurrentPage("chats")} className={`text-[20px] text-light_brown_1 ${currentPage === "chats" ? "font-semibold" : "font-normal"}`}>Chats</span>
            </div>
            {currentPage === "details" && (
                <div className="flex 2xl:hidden flex-col items-center 2xl:items-start gap-10 mt-5 2xl:mt-10 w-full flex-1">
                    <div className="flex flex-col items-center 2xl:items-start w-full">
                        <div className="flex flex-col w-max gap-5 2xl:flex-row 2xl:w-full 2xl:justify-between 2xl:gap-0">
                            <h2 className="text-2xl sm:text-3xl">User Information</h2>
                            <Link to="/account/update" className="flex justify-center items-center right-0 px-10 py-2 bg-light_brown_1 text-white rounded-md hover:bg-light_brown_1/90 transition duration-75">Update Profile</Link>
                        </div>

                        <div className="flex flex-col gap-5 mt-5">
                            <div className="flex items-center gap-3">
                                <p>Avatar: </p>
                                {currentUser?.avatar && currentUser?.avatar !== null && currentUser?.avatar !== "" ? (
                                    <img src={currentUser?.avatar || null} alt="user" className="w-10 h-10 rounded-full object-cover object-center" />
                                ) : (
                                    <div className="flex justify-center items-center bg-dark_gray text-white w-10 h-10 rounded-full p-1">
                                        <User />
                                    </div>
                                )}
                            </div>

                            <div className="flex items-center gap-3">
                                <p>Username: </p>
                                <span className="font-semibold">{currentUser.username}</span>
                            </div>

                            <div className="flex items-center gap-3">
                                <p>E-mail: </p>
                                <span className="font-semibold">{currentUser.email}</span>
                            </div>

                            <div className="flex group gap-3 bg-dark_gray px-7 py-2 mt-5 text-white w-max rounded-md cursor-pointer hover:bg-dark_gray/90">
                                <div className="flex justify-center items-center gap-3 group-hover:translate-x-1 transition duration-75">
                                    Log out
                                    <LogOut className="w-5 h-5" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-5 mb-20 w-full">
                        <Suspense fallback={<p>Loading...</p>}>
                            <Await
                                resolve={data.postResponse}
                                errorElement={<p>Error loading posts!</p>}
                            >
                                {(postResponse) => <ListPosts data={postResponse.data} />}
                            </Await>
                        </Suspense>
                    </div>
                </div>
            )}

            {currentPage === "chats" && (
                <div className="relative flex 2xl:hidden w-full 2xl:w-[500px] h-full 2xl:h-[calc(100vh-130px)] 2xl:overflow-y-auto">
                    <div className="2xl:fixed w-full 2xl:w-[500px] h-full 2xl:h-[calc(100vh-130px)] 2xl:overflow-y-auto">
                        <Suspense fallback={<p>Loading...</p>}>
                            <Await
                                resolve={data.chatResponse}
                                errorElement={<p>Error loading chats!</p>}
                            >
                                {(chatResponse) => <Chat chats={chatResponse.data} openChatId={openChatId} />}
                            </Await>
                        </Suspense>
                    </div>
                </div>
            )}

            <div className="hidden 2xl:flex flex-col items-center 2xl:items-start gap-10 mt-5 2xl:mt-10 w-full flex-1">
                <div className="flex flex-col items-center 2xl:items-start w-full">
                    <div className="flex flex-col w-max gap-5 2xl:flex-row 2xl:w-full 2xl:justify-between 2xl:gap-0">
                        <h2 className="text-2xl sm:text-3xl">User Information</h2>
                        <Link to="/account/update" className="flex justify-center items-center right-0 px-10 py-2 bg-light_brown_1 text-white rounded-md hover:bg-light_brown_1/90 transition duration-75">Update Profile</Link>
                    </div>

                    <div className="flex flex-col gap-5 mt-5">
                        <div className="flex items-center gap-3">
                            <p>Avatar: </p>
                            {currentUser?.avatar && currentUser?.avatar !== null && currentUser?.avatar !== "" ? (
                                <img src={currentUser?.avatar || null} alt="user" className="w-10 h-10 rounded-full object-cover object-center" />
                            ) : (
                                <div className="flex justify-center items-center bg-dark_gray text-white w-10 h-10 rounded-full p-1">
                                    <User />
                                </div>
                            )}
                        </div>

                        <div className="flex items-center gap-3">
                            <p>Username: </p>
                            <span className="font-semibold">{currentUser.username}</span>
                        </div>

                        <div className="flex items-center gap-3">
                            <p>E-mail: </p>
                            <span className="font-semibold">{currentUser.email}</span>
                        </div>

                        <div className="flex group gap-3 bg-dark_gray px-7 py-2 mt-5 text-white w-max rounded-md cursor-pointer hover:bg-dark_gray/90">
                            <div className="flex justify-center items-center gap-3 group-hover:translate-x-1 transition duration-75">
                                Log out
                                <LogOut className="w-5 h-5" />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-5 mb-20 w-full">
                    <Suspense fallback={<LoadingSkeleton />}>
                        <Await
                            resolve={data.postResponse}
                            errorElement={<p>Error loading posts!</p>}
                        >
                            {(postResponse) => <ListPosts data={postResponse.data} />}
                        </Await>
                    </Suspense>
                </div>
            </div>

            <div className="relative hidden 2xl:flex w-full 2xl:w-[500px] h-full 2xl:h-[calc(100vh-130px)] 2xl:overflow-y-auto">
                <div className="2xl:fixed w-full 2xl:w-[500px] h-full 2xl:h-[calc(100vh-130px)] 2xl:overflow-y-auto">
                    <Suspense fallback={<LoadingChatSkeleton />}>
                        <Await
                            resolve={data.chatResponse}
                            errorElement={<p>Error loading chats!</p>}
                        >
                            {(chatResponse) => <Chat chats={chatResponse.data} openChatId={openChatId} />}
                        </Await>
                    </Suspense>
                </div>
            </div>
        </div>
    )
}

export default ProfilePage