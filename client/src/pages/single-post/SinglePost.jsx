import { Bath, Bed, Bookmark, Bus, ChevronDown, ChevronUp, Delete, Edit, Handshake, MapPin, MessageSquareText, PawPrint, Scaling, School, Star, User, Utensils, Wrench } from 'lucide-react';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { Link, useLoaderData, useNavigate } from 'react-router-dom';
import Lightbox from "../../components/Lightbox";
import Map from '../../components/Map/Map';
import apiRequest from '../../lib/apiRequest';
import { AuthContext } from '../../context/AuthContext';

const SinglePost = () => {

    const post = useLoaderData();

    const { currentUser } = useContext(AuthContext);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isLightboxOpen, setLightboxOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [saved, setSaved] = useState(post[0].isSaved);
    const maxVisibleImages = post[0].images.length < 3 ? post[0].images.length : 3;
    const isAnimating = useRef(false);
    const navigate = useNavigate();

    const [isChatOpen, setIsChatOpen] = useState(false);
    const [isRatingOpen, setisRatingOpen] = useState(false);
    const [rating, setRating] = useState(0);
    const ratingSystem = [1, 2, 3, 4, 5];
    const [showRatingHover, setShowRatingHover] = useState(false);
    const [tempRating, setTempRating] = useState(0);

    // check to see if a chat between the current user and post owner already exists
    const [chatAlreadyExists, setChatAlreadyExists] = useState(false);

    const nextImage = () => {
        if (isAnimating.current) return;
        isAnimating.current = true;

        setCurrentIndex((prevIndex) => (prevIndex + 1) % post[0].images.length);

        setTimeout(() => {
            isAnimating.current = false;
        }, 300); // Adjust duration to match your transition timing
    };

    const prevImage = () => {
        if (isAnimating.current) return;
        isAnimating.current = true;

        setCurrentIndex((prevIndex) => (prevIndex - 1 + post[0].images.length) % post[0].images.length);

        setTimeout(() => {
            isAnimating.current = false;
        }, 300); // Adjust duration to match your transition timing
    };

    const handleImageClick = (index) => {
        if (isAnimating.current) return; // Prevent clicks during animation
        isAnimating.current = true;

        setCurrentIndex(index);

        setTimeout(() => {
            isAnimating.current = false;
        }, 300); // Adjust duration to match your transition timing
    };

    const handleMainImageClick = () => {
        setLightboxOpen(true);
    };

    const handleSavePost = async (e) => {
        e.preventDefault();

        setIsLoading(true);

        if (!currentUser || currentUser === null) {
            navigate("/login");
            return;
        }

        setSaved((prev) => !prev);

        try {
            const response = await apiRequest.post(`/users/save/${post[0].id}`);

        } catch (error) {
            console.log(error);
            setSaved((prev) => !prev);
        } finally {
            setIsLoading(false);
        }
    }

    // Calculate the displayed images with wrapping
    const displayedImages = Array.from({ length: maxVisibleImages }, (_, index) => {
        return post[0].images[(currentIndex + index) % post[0].images.length];
    });

    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

    const toggleDeleteDialog = () => {
        setIsDeleteDialogOpen((prev) => !prev);
    }

    const handleDeletePost = async (e) => {
        e.preventDefault();

        setIsLoading(true);

        if (!currentUser || currentUser === null) {
            navigate("/login");
            return;
        }

        try {
            const response = await apiRequest.delete(`/posts/${post[0].id}`);

            navigate("/account");

        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }

    const toggleChat = () => {
        if (!currentUser || currentUser === null) {
            navigate("/login");
            return;
        }

        setIsChatOpen((prev) => !prev);
    }

    const handleCreateChat = async (e) => {
        e.preventDefault();

        setIsLoading(true);

        if (!currentUser || currentUser === null) {
            navigate("/login");
            return;
        }

        try {
            // Prepare the data for the chat creation
            const response = await apiRequest.post("/chats", {
                receiverId: post[0].userId
            });

            const chatData = await response.data;

            // Navigate to the account page with chat details
            navigate("/account", {
                state: {
                    openChatId: {
                        id: post[0].userId,
                        avatar: post[0].user.avatar,
                        username: post[0].user.username,
                        chatId: chatData.id, // Include chat ID if needed
                    },
                },
            });

        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }

    const handleOpenChat = async (e) => {
        e.preventDefault();

        setIsLoading(true);

        if (!currentUser || currentUser === null) {
            navigate("/login");
            return;
        }

        try {
            //const chatData = await response.data;

            // Navigate to the account page with chat details
            navigate("/account", {
                state: {
                    openChatId: {
                        id: post[0].userId,
                        avatar: post[0].user.avatar,
                        username: post[0].user.username,
                        //chatId: chatData.id, // Include chat ID if needed
                    },
                },
            });

        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }

    const openRatingDialog = () => {
        setisRatingOpen((prev) => !prev);
    }

    const handleUpdateRating = async (e) => {
        e.preventDefault();

        setIsLoading(true);

        if (!currentUser || currentUser === null) {
            navigate("/login");
            return;
        }

        if (rating < 1 || rating > 5) {
            return;
        }

        try {
            console.log("TEMP RATING: ", tempRating);
            console.log("RATING: ", rating);
            if (tempRating !== 0 && tempRating !== rating) {
                const response = await apiRequest.put(`/posts/${post[0].id}/rating`, {
                    rating
                });

                setRating(response.data.rating)
            } else {
                const response = await apiRequest.post(`/posts/${post[0].id}/rating`, {
                    rating
                });

                setRating(response.data.rating)
            }

            openRatingDialog();
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }

    let totalRating = 0;
    for (let i = 0; i < post[0].review.length; i++) {
        totalRating += post[0].review[i].rating
    }

    totalRating = totalRating / post[0].review.length;

    useEffect(() => {
        const handleFetchUserRating = async () => {
            try {
                const response = await apiRequest.get(`/posts/${post[0].id}/rating`);
                const responseChats = await apiRequest.get(`/chats`)

                // Check if response.data exists and is an object
                if (response.data && typeof response.data === 'object') {
                    // Ensure rating exists in response.data before setting state
                    if (response.data.rating !== undefined) {
                        setRating(response.data.rating);
                        setTempRating(response.data.rating);
                    } else {
                        //console.log('Rating not found in response:', response.data);
                    }
                } else {
                    //console.log('Response data is null or not an object:', response.data);
                }

                if (responseChats.data) {
                    for (let i = 0; i < responseChats.data.length; i++) {
                        if (responseChats.data[i].userIDs.includes(currentUser.id) && responseChats.data[i].userIDs.includes(post[0].userId)) {
                            setChatAlreadyExists(true);
                        }
                    }
                }
            } catch (error) {
                console.log('Error fetching user rating:', error);
            }
        }

        if (currentUser) {
            handleFetchUserRating();
        }
    }, []);

    return (
        <div className="flex flex-col w-full 2xl:flex-row px-5 max-w-[900px] mr-auto ml-auto 2xl:px-0 2xl:m-0 2xl:max-w-max gap-14">
            {isChatOpen === true && currentUser && currentUser.id !== post[0].userId && chatAlreadyExists === false && (
                <div className="fixed inset-0 flex justify-center items-center bg-black/70 z-30">
                    <div className="w-full max-w-[500px] bg-light_white p-4 rounded-md">
                        <h2 className="text-2xl">Message</h2>

                        <div className="flex justify-end items-center mt-5 gap-4">
                            <button onClick={toggleChat} className="flex justify-center items-center gap-3 p-3 bg-light_brown_3/40 cursor-pointer rounded-md hover:bg-light_brown_3/30 transition duration-75">Cancel</button>
                            <button onClick={handleCreateChat} disabled={isLoading} className="flex justify-center items-center gap-3 p-3 bg-dark_gray text-white cursor-pointer rounded-md hover:bg-dark_gray/90 transition duration-75">Open Messages</button>
                        </div>
                    </div>
                </div>
            )}

            {isRatingOpen === true && (
                <div className="fixed inset-0 flex justify-center items-center bg-black/70 z-30">
                    <div className="w-full max-w-[500px] bg-light_white p-4 rounded-md">
                        <h2 className="text-2xl text-center">Rating</h2>

                        <div className="flex mt-5 justify-center items-center gap-2">
                            {ratingSystem.map((lvl) => (
                                <div key={lvl} onClick={() => setRating(lvl)}>
                                    <Star fill={lvl <= rating ? "#eab308" : "white"} className="cursor-pointer" />
                                </div>
                            ))}
                        </div>

                        <div className="flex justify-end items-center mt-10 gap-4">
                            <button onClick={openRatingDialog} className="flex justify-center items-center gap-3 p-3 bg-light_brown_3/40 cursor-pointer rounded-md hover:bg-light_brown_3/30 transition duration-75">Cancel</button>
                            <button onClick={handleUpdateRating} disabled={isLoading} className="flex justify-center items-center gap-3 p-3 bg-dark_gray text-white cursor-pointer rounded-md hover:bg-dark_gray/90 transition duration-75">Submit</button>
                        </div>
                    </div>
                </div>
            )}

            {isDeleteDialogOpen === true && (
                <div className="fixed inset-0 flex justify-center items-center bg-black/70 z-30">
                    <div className="w-full max-w-[500px] bg-light_white p-4 rounded-md">
                        <h2 className="text-2xl">Confirm Post Deletion</h2>
                        <p className="mt-2">Are you sure you would like to delete this post? This action cannot be reversed.</p>

                        <div className="flex justify-end items-center mt-5 gap-4">
                            <button onClick={toggleDeleteDialog} className="flex justify-center items-center gap-3 p-3 bg-light_brown_3/40 cursor-pointer rounded-md hover:bg-light_brown_3/30 transition duration-75">Cancel</button>
                            <button onClick={handleDeletePost} disabled={isLoading} className="flex justify-center items-center gap-3 p-3 bg-red-600 text-white cursor-pointer rounded-md hover:bg-red-600/90 transition duration-75">Delete</button>
                        </div>
                    </div>
                </div>
            )}
            <div className="flex flex-col gap-10 mt-10 flex-1">
                <div className="flex flex-col md:flex-row gap-5 items-center w-full">
                    <div className="w-full md:w-[640px] h-full max-h-[400px] md:h-[425px]">
                        <img
                            src={post[0].images[currentIndex]}
                            alt=""
                            className="w-full h-full max-h-[400px] md:h-[425px] object-cover cursor-pointer select-none rounded-lg"
                            onClick={handleMainImageClick}
                        />
                    </div>

                    <div id="image-slider" className="flex flex-col gap-2 h-[100px] md:h-[425px] md:ml-auto items-center">
                        <ChevronUp onClick={prevImage} className={`hidden md:flex w-10 h-10 cursor-pointer ${isAnimating.current ? 'opacity-50' : ''}`} />

                        <div className="flex flex-row md:flex-col flex-1 gap-2 justify-center items-center">
                            {displayedImages.map((image, index) => (
                                <div key={index} className="flex w-[85px] md:w-[200px] h-[70px] md:h-[110px]">
                                    <img
                                        src={image}
                                        alt=""
                                        className={`w-full h-full object-cover select-none rounded-md ${index === 0 ? 'border-2 border-blue-500' : ''}`}
                                        onClick={() => handleImageClick((currentIndex + index) % post[0].images.length)} // Update main image when clicked
                                    />
                                </div>
                            ))}
                        </div>

                        <ChevronDown onClick={nextImage} className={`hidden md:flex w-10 h-10 cursor-pointer ${isAnimating.current ? 'opacity-50' : ''}`} />
                    </div>

                    {/* Lightbox Component */}
                    <Lightbox
                        isOpen={isLightboxOpen}
                        onClose={() => setLightboxOpen(false)}
                        currentIndex={currentIndex}
                        images={post[0].images}
                        setCurrentIndex={setCurrentIndex}
                    />
                </div>

                <div className="flex flex-col md:flex-row gap-5 md:gap-0 justify-between">
                    <div className="flex flex-col gap-3 w-full">
                        <h1 className="text-2xl text-wrap sm:text-3xl text-light_brown_1 font-semibold truncate">{post[0].title}</h1>

                        <div className="text-[18px]">
                            For <span className="font-semibold">{post[0].type}</span>
                        </div>

                        <div className="flex items-center gap-2 w-full">
                            <MapPin className="w-6 h-6" />
                            <span className="text-wrap truncate">{post[0].address}, {post[0].city}</span>
                        </div>

                        <span className="bg-light_brown_3/30 w-max px-7 py-2 mt-2 text-light_brown_1 font-semibold text-[20px] rounded-md">$ {post[0].price.toLocaleString()}</span>
                    </div>
                    <div className="flex flex-col justify-center items-center gap-5 bg-light_brown_3/30 px-7 py-5 rounded-md text-wrap flex-wrap">
                        {post[0].user.avatar && post[0].user.avatar !== "" ? (
                            <img src={post[0].user.avatar || null} alt={post[0].user.username} className="w-14 h-14 rounded-full" />
                        ) : (
                            <div className="flex justify-center items-center bg-dark_gray text-white w-10 h-10 rounded-full p-1">
                                <User />
                            </div>
                        )}
                        <span>{post[0].user.username}</span>
                    </div>
                </div>

                {post[0].type === "Rent" && (
                    <div onMouseEnter={() => setShowRatingHover(true)} onMouseLeave={() => setShowRatingHover(false)} className="relative flex justify-center items-center w-max gap-1">
                        {showRatingHover && (
                            <div className="absolute flex justify-center -top-16 w-max px-10 py-2 rounded-md bg-dark_gray text-white font-semibold">
                                <span className="z-20">{totalRating ? totalRating : 0}/5</span>
                                <div className="absolute w-4 h-4 bg-dark_gray -bottom-2 rotate-45"></div>
                            </div>
                        )}

                        {ratingSystem.map((lvl) => (
                            <div key={lvl}>
                                <Star fill={lvl <= totalRating ? "#7A695A" : "white"} className="w-5 h-5 text-light_brown_1" />
                            </div>
                        ))}
                    </div>
                )}

                <div className="w-full text-wrap mb-10">
                    {post[0].postDetail.description}
                </div>
            </div>
            <div className="relative ml-auto mr-auto 2xl:mx-4 flex w-full lg:w-[600px] h-full 2xl:h-[calc(100vh-130px)] z-0">
                <div id="sidebar_fixed" className="flex flex-col ml-auto mr-auto 2xl:m-0 2xl:fixed top-[130px] w-[600px] h-full 2xl:h-[calc(100vh-130px)] bg-light_brown_3/20 gap-5 md:gap-0 px-4 pt-10 z-0 2xl:overflow-y-auto">
                    <div className="flex flex-col gap-4">
                        <h2 className="text-[20px]">General</h2>
                        <div className="flex flex-col gap-3 bg-light_white p-4 rounded-lg">
                            <div className="flex items-center gap-3 flex-wrap">
                                <Wrench className="w-9 h-9 text-light_brown_1" />
                                <div className="flex flex-col leading-6">
                                    <span className="text-[18px] font-semibold">Utilities</span>
                                    <span className="text-[16px] text-wrap max-w-[400px] truncate">{post[0].postDetail.utilities}</span>
                                </div>
                            </div>

                            <div className="flex items-center gap-3 flex-wrap">
                                <PawPrint className="w-9 h-9 text-light_brown_1" />
                                <div className="flex flex-col leading-6">
                                    <span className="text-[18px] font-semibold">Pet Policy</span>
                                    <span className="text-[16px] text-wrap max-w-[400px] truncate">{post[0].postDetail.pet}</span>
                                </div>
                            </div>

                            <div className="flex items-center gap-3 flex-wrap">
                                <Handshake className="w-9 h-9 text-light_brown_1" />
                                <div className="flex flex-col leading-6">
                                    <span className="text-[18px] font-semibold">Income Policy</span>
                                    <span className="text-[16px] text-wrap max-w-[400px] truncate">{post[0].postDetail.income}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-4 mt-2">
                        <h2 className="text-[20px]">Sizes</h2>
                        <div className="flex flex-col md:flex-row gap-5">
                            <div className="flex flex-1 flex-wrap items-center gap-3 bg-light_white rounded-lg p-4">
                                <Scaling className="w-7 h-7 text-light_brown_1" />
                                <p className="text-[18px] text-wrap max-w-[175px] truncate">{post[0].size} <span className="text-sm">sqft/m2</span></p>
                            </div>

                            <div className="flex items-center flex-wrap gap-3 bg-light_white rounded-lg p-4">
                                <Bed className="w-7 h-7 text-light_brown_1" />
                                <span className="text-[18px] text-wrap max-w-[125px] truncate">{post[0].bedroom}</span>
                            </div>

                            <div className="flex items-center flex-wrap gap-3 bg-light_white rounded-lg p-4">
                                <Bath className="w-7 h-7 text-light_brown_1" />
                                <span className="text-[18px] text-wrap max-w-[125px] truncate">{post[0].bathroom}</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-4 mt-2">
                        <h2 className="text-[20px]">Nearby Places</h2>
                        <div className="flex flex-col md:flex-row justify-between bg-light_white gap-7 md:gap-0 p-4 rounded-lg">
                            <div className="flex items-center gap-3 flex-1 flex-wrap">
                                <School className="w-7 h-7 text-light_brown_1" />
                                <div className="flex flex-col leading-6">
                                    <span className="text-[18px] font-semibold">School</span>
                                    <span className="text-[16px] text-wrap max-w-[125px] truncate">{post[0].postDetail.school.toLocaleString()}m away</span>
                                </div>
                            </div>

                            <div className="flex justify-start md:justify-center items-center gap-3 flex-1 flex-wrap">
                                <Bus className="w-7 h-7 text-light_brown_1" />
                                <div className="flex flex-col leading-6">
                                    <span className="text-[18px] font-semibold">Bus Stop</span>
                                    <span className="text-[16px] text-wrap max-w-[125px] truncate">{post[0].postDetail.bus}m away</span>
                                </div>
                            </div>

                            <div className="flex justify-start md:justify-end items-center gap-3 flex-1 flex-wrap">
                                <Utensils className="w-7 h-7 text-light_brown_1" />
                                <div className="flex flex-col leading-6">
                                    <span className="text-[18px] font-semibold">Restaurant</span>
                                    <span className="text-[16px] text-wrap max-w-[125px] truncate">{post[0].postDetail.restaurant.toLocaleString()}m away</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-4 mt-2">
                        <h2 className="text-[20px]">Location</h2>
                        <div className="flex justify-between w-full h-[400px] bg-light_white p-4 rounded-lg">
                            <Map posts={[post[0]]} />
                        </div>
                    </div>

                    {post[0].type === "Rent" && (
                        <div onClick={openRatingDialog} className="flex justify-center items-center gap-3 p-3 mt-5 bg-dark_gray cursor-pointer rounded-md hover:bg-dark_gray/90 transition duration-75">
                            <Star className="text-white w-6 h-6" />
                            <span className="text-white">Leave a Rating</span>
                        </div>
                    )}

                    <div className="flex flex-col md:flex-row justify-between mt-7 mb-10">
                        {currentUser && (
                            <>
                                {currentUser.id !== post[0].userId && (
                                    <>
                                        <div
                                            onClick={chatAlreadyExists ? handleOpenChat : toggleChat}
                                            className="flex justify-center items-center gap-3 p-3 bg-dark_gray cursor-pointer rounded-md hover:bg-dark_gray/90 transition duration-75"
                                        >
                                            <MessageSquareText className="w-6 h-6 text-white" />
                                            <span className="text-white">{chatAlreadyExists ? "Open Chat" : "Send a Message"}</span>
                                        </div>

                                        <div
                                            onClick={handleSavePost}
                                            className="flex justify-center items-center gap-3 p-3 bg-dark_gray cursor-pointer rounded-md hover:bg-dark_gray/90 transition duration-75"
                                        >
                                            <Bookmark fill={saved ? "#ca8a04" : ""} className={`w-6 h-6 ${saved ? "text-yellow-600" : "text-white"}`} />
                                            <span className={`${saved ? "text-yellow-600" : "text-white"}`}>{saved ? "Saved" : "Save Post"}</span>
                                        </div>
                                    </>
                                )}

                                {currentUser.id === post[0].userId && (
                                    <div className="flex justify-between w-full items-center gap-3">
                                        <Link
                                            to={`/edit-post/${post[0].id}`}
                                            className="flex justify-center items-center gap-3 p-3 bg-dark_gray cursor-pointer rounded-md hover:bg-dark_gray/90 transition duration-75"
                                        >
                                            <Edit className="w-6 h-6 text-white" />
                                            <span className="text-white">Edit Post</span>
                                        </Link>
                                        <div
                                            onClick={toggleDeleteDialog}
                                            className="flex justify-center items-center gap-3 p-3 bg-red-600 cursor-pointer rounded-md hover:bg-red-600/90 transition duration-75"
                                        >
                                            <Delete className="w-6 h-6 text-white" />
                                            <span className="text-white">Delete Post</span>
                                        </div>
                                    </div>
                                )}
                            </>
                        )}

                        {!currentUser && (
                            <div
                                onClick={toggleChat}
                                className="flex justify-center items-center gap-3 p-3 bg-dark_gray cursor-pointer rounded-md hover:bg-dark_gray/90 transition duration-75"
                            >
                                <MessageSquareText className="w-6 h-6 text-white" />
                                <span className="text-white">Send a Message</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SinglePost