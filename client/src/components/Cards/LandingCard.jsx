import { Bath, Bed, MapPin, Scaling, Star } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'

const LandingCard = ({ item }) => {

    const ratingSystem = [1, 2, 3, 4, 5];

    let totalRating = 0;

    for (let i = 0; i < item.review.length; i++) {
        totalRating += item.review[i].rating
    }

    totalRating = totalRating / item.review.length;

    if (!totalRating) {
        totalRating = 0;
    }

    return (
        <div className="flex flex-col gap-2 min-w-[270px] max-w-[310px] flex-1 bg-white border border-light_brown_3 rounded-lg overflow-hidden">
            <div className="w-full h-[200px]">
                <img src={item.images[0]} alt={item.title} className="w-full h-full object-cover object-center" />
            </div>
            <div className="flex flex-col w-full gap-1 sm:gap-1 px-4 py-3">
                <Link to={`/${item.id}`} className="text-xl text-light_brown_1 font-semibold hover:underline transition duration-75">{item.title}</Link>

                <div className="flex items-center gap-2 mt-2 flex-wrap">
                    <MapPin className="w-5 h-5 text-light_brown_2" />
                    <div className="text-[14px] text-light_brown_2 text-wrap">{item.address}, {item.city}</div>
                </div>

                <div className="flex flex-col mt-auto gap-3 w-full">

                    {item.type === "Rent" && (
                        <div className="flex justify-center items-center mt-5 w-max gap-1 flex-wrap">
                            {ratingSystem.map((lvl) => (
                                <div key={lvl}>
                                    <Star fill={lvl <= totalRating ? "#7A695A" : "white"} className="w-4 h-4 text-light_brown_1" />
                                </div>
                            ))}
                            <span className="text-light_brown_1 text-sm ml-2 font-semibold underline">{item.review.length} Review</span>
                        </div>
                    )}

                    <div className="flex justify-center items-center w-max mt-4 gap-2">
                        <Scaling className="w-5 h-5 text-light_brown_1" />
                        <span className="text-[14px] text-light_brown_1">{item.size} sqft</span>
                    </div>

                    <div className="flex justify-between w-full mt-1">
                        <div className="flex justify-center items-center gap-5 flex-wrap">
                            <div className="flex justify-center items-center gap-2">
                                <span className="text-light_brown_1">{item.bedroom}</span>
                                <Bed className="w-6 h-6 text-light_brown_1" />
                            </div>

                            <div className="w-[1px] h-full bg-light_brown_3" />

                            <div className="flex justify-center items-center gap-2">
                                <span className="text-light_brown_1">{item.bathroom}</span>
                                <Bath className="w-6 h-6 text-light_brown_1" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="w-full border-t-[1px] border-light_brown_3 px-4 py-3">
                <span className="text-[16px] text-light_brown_1 font-semibold">$ {item.price.toLocaleString()}</span>
            </div>
        </div>
    )
}

export default LandingCard