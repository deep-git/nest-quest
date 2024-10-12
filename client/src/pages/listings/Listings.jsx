import { ChevronDown, Search } from 'lucide-react'
import React, { Suspense, useState } from 'react'
import { Await, useLoaderData, useSearchParams } from 'react-router-dom'
import PropertyCard from '../../components/Cards/PropertyCard';
import Spinner from "../../components/Spinner";
import Map from '../../components/Map/Map';
import LoadingSkeleton from '../../components/Skeleton/LoadingSkeleton/LoadingSkeleton';
import LoadingMapSkeleton from '../../components/Skeleton/LoadingMapSkeleton/LoadingMapSkeleton';

const Listings = () => {

    const posts = useLoaderData();
    const [isLoading, setIsLoading] = useState(false);
    const [searchParams, setSearchParams] = useSearchParams();
    const [hideSettings, setHideSettings] = useState(true);

    const [query, setQuery] = useState({
        type: searchParams.get("type") || "",
        city: searchParams.get("city") || "",
        property: searchParams.get("property") || "",
        minPrice: searchParams.get("minPrice") || 0,
        maxPrice: searchParams.get("maxPrice") || 10000000,
        bedroom: searchParams.get("bedroom") || 1,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        setQuery({
            ...query,
            [name]: value
        });
    }

    const handleSearchProperty = () => {
        setIsLoading(true);
        setSearchParams(query);
        setIsLoading(false);
    }

    return (
        <div className="flex flex-col lg:flex-row gap-10 w-full h-[calc(100vh-130px)]">
            <div className="flex flex-col flex-1 py-5">
                <div className="w-full">
                    <div className="flex justify-between px-10 xl:px-5 2xl:px-0 items-center flex-wrap">
                        <div className="flex justify-center items-end gap-5">
                            <h1 className="text-4xl">Listings</h1>
                            {searchParams.get("city") && (
                                <div className="text-sm text-wrap flex-wrap hidden sm:flex gap-1">
                                    [ Search results for <span className="font-semibold">{searchParams.get("city")}</span> ]
                                </div>
                            )}
                        </div>

                        <ChevronDown onClick={() => setHideSettings((prev) => !prev)} className={`w-6 h-6 ${hideSettings ? "rotate-0" : "rotate-180"} transition duration-150`} />
                    </div>

                    {searchParams.get("city") && (
                        <div className="text-sm flex sm:hidden gap-1 px-10 flex-wrap mt-2">
                            [ Search results for <span className="font-semibold truncate">{searchParams.get("city")}</span> ]
                        </div>
                    )}

                    {hideSettings && (
                        <form onSubmit={handleSearchProperty} className={`w-full px-10 xl:px-5 ${hideSettings ? "translate-y-5" : "translate-y-0"} transition duration-100 ease-in-out`}>
                            <div className="flex flex-col gap-1 flex-1">
                                <label htmlFor="city">City</label>
                                <input
                                    id="city"
                                    type="text"
                                    name="city"
                                    placeholder="City"
                                    defaultValue={query.city}
                                    onChange={handleChange}
                                    className="w-full h-[40px] px-4 py-2 rounded-lg border border-light_brown_3 bg-light_white" />
                            </div>

                            <div className="flex flex-col lg:flex-row gap-4 mt-5">
                                <div className="flex flex-col gap-1 flex-1">
                                    <label htmlFor="type">Type</label>
                                    <select
                                        name="type"
                                        id="type"
                                        defaultValue={query.type || "Sale"}
                                        onChange={handleChange}
                                        className="h-[40px] bg-light_white border border-light_brown_3 rounded-lg px-4 py-2">
                                        <option>Sale</option>
                                        <option>Rent</option>
                                    </select>
                                </div>

                                <div className="flex flex-col gap-1 flex-1">
                                    <label htmlFor="property">Property</label>
                                    <select
                                        name="property"
                                        id="property"
                                        defaultValue={query.property}
                                        onChange={handleChange}
                                        className="h-[40px] bg-light_white border border-light_brown_3 rounded-lg px-4 py-2">
                                        <option>Apartment</option>
                                        <option>House</option>
                                        <option>Condo</option>
                                        <option>Land</option>
                                    </select>
                                </div>

                                <div className="hidden lg:flex flex-col gap-1 flex-1">
                                    <label htmlFor="minprice">Min. Price</label>
                                    <input
                                        id="minprice"
                                        type="number"
                                        name="minprice"
                                        defaultValue={query.minPrice}
                                        onChange={handleChange}
                                        className="w-full h-[40px] px-4 py-2 rounded-lg border border-light_brown_3 bg-light_white"
                                    />
                                </div>

                                <div className="hidden lg:flex flex-col gap-1 flex-1">
                                    <label htmlFor="maxprice">Max. Price</label>
                                    <input
                                        id="maxprice"
                                        type="number"
                                        name="maxprice"
                                        defaultValue={query.maxPrice}
                                        onChange={handleChange}
                                        className="w-full h-[40px] px-4 py-2 rounded-lg border border-light_brown_3 bg-light_white"
                                    />
                                </div>

                                <div className="flex lg:hidden gap-4">
                                    <div className="flex flex-col gap-1 flex-1">
                                        <label htmlFor="minprice">Min. Price</label>
                                        <input
                                            id="minprice"
                                            type="number"
                                            name="minprice"
                                            defaultValue={query.minPrice}
                                            onChange={handleChange}
                                            className="w-full h-[40px] px-4 py-2 rounded-lg border border-light_brown_3 bg-light_white"
                                        />
                                    </div>

                                    <div className="flex flex-col gap-1 flex-1">
                                        <label htmlFor="maxprice">Max. Price</label>
                                        <input
                                            id="maxprice"
                                            type="number"
                                            name="maxprice"
                                            defaultValue={query.maxPrice}
                                            onChange={handleChange}
                                            className="w-full h-[40px] px-4 py-2 rounded-lg border border-light_brown_3 bg-light_white"
                                        />
                                    </div>
                                </div>

                                <div className="flex flex-col gap-1 flex-1">
                                    <label htmlFor="bedrooms">Bedrooms</label>
                                    <select name="bedrooms" id="bedrooms" onChange={handleChange} className="h-[40px] bg-light_white border border-light_brown_3 rounded-lg px-4 py-2">
                                        <option>any</option>
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                        <option>6</option>
                                    </select>
                                </div>

                                <button type="submit" disabled={isLoading} className="flex min-h-10 justify-center mt-5 lg:mt-0 items-center flex-1 bg-light_brown_1 disabled:bg-light_brown_3 rounded-lg hover:bg-light_brown_1/90 transition duration-75">
                                    {isLoading ? (
                                        <Spinner />
                                    ) : (
                                        <Search className="w-6 h-6 text-white" />
                                    )}
                                </button>
                            </div>
                        </form>
                    )}
                </div>

                <div className="flex flex-col px-10 xl:px-5 2xl:px-0 gap-7 w-full xl:w-full h-full overflow-y-auto mt-14 text-black">
                    <Suspense fallback={<LoadingSkeleton />}>
                        <Await
                            resolve={posts.postResponse}
                            errorElement={<p>Error loading posts!</p>}
                        >

                            {(postResponse) => postResponse.data.map((post) => (
                                <PropertyCard key={post.id} property={post} />
                            ))}
                        </Await>
                    </Suspense>
                </div>
            </div>
            <div className="hidden xl:flex flex-col w-full pr-5 2xl:pr-0 h-[500px] xl:w-[650px] xl:h-full bg-light_white z-0">
                <Suspense fallback={<LoadingMapSkeleton />}>
                    <Await
                        resolve={posts.postResponse}
                        errorElement={<p>Error loading posts!</p>}
                    >

                        {(postResponse) => <Map posts={postResponse.data} />}
                    </Await>
                </Suspense>
            </div>
        </div>
    )
}

export default Listings