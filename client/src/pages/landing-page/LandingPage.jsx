import React, { Suspense, useState } from 'react'
import { Copyright, Mail, Phone, Search } from 'lucide-react';
import { Await, Link, useLoaderData } from 'react-router-dom';
import LandingCard from '../../components/Cards/LandingCard';

const LandingPage = () => {

    const posts = useLoaderData();

    const [query, setQuery] = useState({
        type: "Sale",
        city: "",
        minPrice: "",
        maxPrice: "",
    });

    const handleUpdateQuery = (e) => {
        e.preventDefault();
        const { name, value } = e.target;

        setQuery((prev) => ({
            ...prev,
            [name]: value
        }));
    }

    const fetchSearchData = async (e) => {
        e.preventDefault();
    }

    return (
        <div className="h-full">
            <section className="h-full">
                <div className="relative flex flex-col justify-center w-full h-[calc(100vh-130px)]">
                    <img src="/hero_image.jpg" alt="hero image" className="w-full h-full z-0 object-cover select-none" />
                    <div className="flex flex-col lg:justify-center lg:flex-row px-4 md:px-10 py-20 w-full h-full z-10 absolute bg-black/30 select-none">
                        <h1 className="text-4xl text-center lg:text-6xl text-white font-semibold font-garamond">Find Your Perfect Home</h1>

                        <div className="lg:absolute w-[100%] lg:w-[80%] xl:w-[70%] flex flex-col items-center lg:bottom-72 h-[100px] rounded-xl shadow-lg z-20 p-3">
                            <div className="hidden md:flex flex-col md:flex-row w-full justify-between items-center gap-5 mt-20">
                                <p className="flex flex-col text-white text-[16px] md:text-2xl bg-dark_gray/70 p-3 rounded-lg"><span className="text-2xl md:text-5xl text-yellow-600">30+</span> Years of Experience</p>
                                <p className="flex flex-col text-white text-[16px] md:text-2xl bg-dark_gray/70 p-3 rounded-lg"><span className="text-2xl md:text-5xl text-yellow-600">100</span> Awards Gained</p>
                                <p className="flex flex-col text-white text-[16px] md:text-2xl bg-dark_gray/70 p-3 rounded-lg"><span className="text-2xl md:text-5xl text-yellow-600">2000+</span> Properties Ready</p>
                            </div>

                            <div className="flex justify-center mt-44 md:mt-14 p-5 items-center bg-dark_gray/90 w-full lg:w-full lg:h-full rounded-xl border-[2px] border-dark_gray">
                                <form onSubmit={fetchSearchData} className="flex flex-col lg:flex-row w-full h-full justify-center gap-5 items-center">
                                    <select name="type" defaultValue={query.type} onChange={handleUpdateQuery} id="type" className="w-44 px-3 h-11 py-3 rounded-lg bg-light_brown_1/90 text-white placeholder-light_brown_3" required>
                                        <option>Sale</option>
                                        <option>Rent</option>
                                    </select>

                                    <input type="text" value={query.city} onChange={handleUpdateQuery} name="city" id="city" placeholder="City" className="w-44 px-3 h-11 py-3 bg-light_brown_1/90 text-white placeholder-light_brown_3 rounded-lg" />

                                    <input type="number" value={query.minPrice} onChange={handleUpdateQuery} name="minPrice" id="minprice" placeholder="Min Price" className="w-44 px-3 h-11 py-3 bg-light_brown_1/90 text-white placeholder-light_brown_3 rounded-lg" />

                                    <input type="number" value={query.maxPrice} onChange={handleUpdateQuery} name="maxPrice" id="maxprice" placeholder="Max Price" className="w-44 px-3 h-11 py-3 bg-light_brown_1/90 text-white placeholder-light_brown_3 rounded-lg" />

                                    <Link to={`/listings?type=${query.type}&city=${query.city}&minPrice=${query.minPrice}&maxPrice=${query.maxPrice}`} className="flex justify-center items-center active:scale-95 w-44 transition duration-100">
                                        <button type="submit" className="bg-yellow-600 px-5 h-11 rounded-lg flex justify-center items-center w-full">
                                            <Search className="w-6 h-6 text-white" />
                                        </button>
                                    </Link>
                                </form>
                            </div>
                        </div>
                    </div>

                </div>
            </section>

            <section className="flex flex-col px-4 sm:px-20 w-full mb-20 min-h-max bg-light_white">
                <h2 className="text-3xl mt-28 text-center font-semibold"><span className="text-light_brown_1">Recently Added</span> Properties</h2>

                <div className="flex gap-10 w-full mt-10 justify-center md:justify-start flex-wrap">
                    <Suspense fallback={<p>Loading...</p>}>
                        <Await
                            resolve={posts.postResponse}
                            errorElement={<p>Error loading posts!</p>}
                        >

                            {(postResponse) => postResponse.data.posts.slice(0, 4).map((post) => (
                                <LandingCard key={post.id} item={post} />
                            ))}
                        </Await>
                    </Suspense>
                </div>
            </section>

            <section className="flex flex-col px-4 sm:px-20 w-full min-h-screen bg-light_white">
                <h2 className="text-3xl mt-28 text-center font-semibold">Featured Property <span className="text-light_brown_1">For Rent</span></h2>

                <div className="flex gap-14 w-full mt-10 justify-center md:justify-start flex-wrap">
                    <Suspense fallback={<p>Loading...</p>}>
                        <Await
                            resolve={posts.postResponse}
                            errorElement={<p>Error loading posts!</p>}
                        >

                            {(postResponse) => postResponse.data.calculatePopularRentPosts.slice(0, 4).map((post) => (
                                <LandingCard key={post.id} item={post} />
                            ))}
                        </Await>
                    </Suspense>
                </div>
            </section>

            <footer className="absolute ml-auto mr-auto left-0 w-full h-max px-10 sm:px-32 bg-dark_gray">
                <div className="w-full flex justify-between items-center py-16 border-b border-light_gray flex-wrap">
                    <div className="mr-auto">
                        <p className="text-[16px] text-white min-w-52 max-w-72">Find your perfect place to nest with with Nest Quest! Explore a wide range of listings for buying or renting, from cozy studios to dream homes.</p>

                        <div className="flex flex-col justify-center mt-10 gap-3">
                            <div className="flex items-center gap-3 flex-wrap">
                                <Mail className="w-6 h-6 text-light_brown_1" />
                                <span className="text-[16px] text-white">1-434-3098-443</span>
                            </div>
                            <div className="flex items-center gap-3 flex-wrap">
                                <Phone className="w-6 h-6 text-light_brown_1" />
                                <span className="text-[16px] text-white">support@nextquest.com</span>
                            </div>
                        </div>
                    </div>
                    <div className="mx-0 mt-14 sm:ml-auto sm:mt-0">
                        <div className="flex flex-col justify-center">
                            <span className="text-[20px] text-light_brown_1 font-semibold">Company</span>

                            <div className="flex flex-col mt-5 gap-4">
                                <Link to="/" className="text-[15px] text-white">Home</Link>
                                <Link to="/listings" className="text-[15px] text-white">Properties</Link>
                                <Link to="/add-listings" className="text-[15px] text-white">Add Listings</Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex justify-center items-center px-5 py-6 gap-1">
                    <Copyright className="w-5 h-5 text-white" />
                    <span className="text-sm text-white">nestquest 2024, All rights reserved.</span>
                </div>
            </footer>
        </div>
    )
}

export default LandingPage