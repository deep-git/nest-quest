import { Bath, Bed, Bookmark, MapPin, MessageSquareText, Scaling, Star } from 'lucide-react'
import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import apiRequest from '../../lib/apiRequest';

const PropertyCard = ({ property }) => {

    const { currentUser } = useContext(AuthContext);
    const ratingSystem = [1, 2, 3, 4, 5];
    const [saved, setSaved] = useState(false);

    useEffect(() => {
        const handleGetSave = async () => {
            try {
                const response = await apiRequest.get(`/posts/${property.id}`);
                setSaved(response.data.isSaved);
            } catch (error) {
                console.log(error);
            }
        }

        handleGetSave();
    }, []);

    let totalRating = 0;

    for (let i = 0; i < property.review.length; i++) {
        totalRating += property.review[i].rating
    }

    totalRating = totalRating / property.review.length;

    if (!totalRating) {
        totalRating = 0;
    }

    return (
        <div className="flex flex-col sm:flex-row gap-5 w-full">
            <div className="w-full h-[175px] sm:w-[500px] sm:h-[200px]">
                <img src={property.images[0]} alt={property.title} className="w-full h-full object-cover object-center" />
            </div>
            <div className="flex flex-col w-full gap-1 sm:gap-0">
                <Link to={`/${property.id}`} className="text-xl text-light_brown_1 font-semibold hover:underline">{property.title}</Link>

                <div className="flex items-center gap-2 mt-2 text-wrap flex-wrap">
                    <MapPin className="w-5 h-5" />
                    <span className="text-[14px]">{property.address}, {property.city}</span>
                </div>

                <div className="bg-light_brown_3/30 w-max mt-3 px-5 py-2 rounded-md">
                    <span className="text-[16px] text-light_brown_1 font-semibold">$ {property.price.toLocaleString()}</span>
                </div>

                <div className="flex flex-col mt-auto gap-3 w-full">

                    {property.type === "Sale" && (
                        <div className="hidden sm:flex justify-center items-center w-max gap-2">
                            <Scaling className="w-5 h-5" />
                            <span className="text-[14px]">{property.size} sqft</span>
                        </div>
                    )}

                    {property.type === "Rent" && (
                        <div className="flex justify-center items-center w-max gap-1">
                            {ratingSystem.map((lvl) => (
                                <div key={lvl}>
                                    <Star fill={lvl <= totalRating ? "#7A695A" : "white"} className="w-4 h-4 text-light_brown_1" />
                                </div>
                            ))}
                        </div>
                    )}

                    <div className="flex justify-between w-full mt-4 sm:mt-0">
                        <div className="flex justify-center items-center gap-5">
                            <div className="flex justify-center items-center gap-2">
                                <span className="">{property.bedroom} <span className="hidden lg:inline">Bedrooms</span></span>
                                <Bed className="w-6 h-6" />
                            </div>

                            <div className="w-[1px] h-full bg-light_brown_3" />

                            <div className="flex justify-center items-center gap-2">
                                <span>{property.bathroom} <span className="hidden lg:inline">Bathrooms</span></span>
                                <Bath className="w-6 h-6" />
                            </div>
                        </div>

                        <div className="hidden md:flex justify-center items-center gap-5 mr-5">
                            {saved && currentUser && currentUser.id !== property.userId && (
                                <button className={`flex justify-center items-center border ${saved ? "border-yellow-500" : "border-light_brown_3"} p-1 rounded-md`}>
                                    <Bookmark fill={`${saved ? "#eab308" : "#F6F4F3"}`} className={`w-5 h-5 ${saved ? "text-yellow-500" : "text-light_brown_3"}`} />
                                </button>
                            )}

                            <div className="flex justify-center items-center border border-light_brown_3 p-1 rounded-md">
                                <MessageSquareText className="w-5 h-5 text-light_brown_3" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PropertyCard